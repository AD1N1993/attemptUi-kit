/**
 * scroll to offset helper
 *
 */

export default (
  element: HTMLElement,
  target: number,
  duration: number,
): Promise<never | void | null> => {
  const roundedTarget = Math.round(target)
  const roundedDuration = Math.round(duration)

  if (roundedDuration < 0) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('bad duration')
  }
  if (roundedDuration === 0) {
    element.scrollTop = roundedTarget
    return Promise.resolve()
  }

  const startTime = Date.now()
  const endTime = startTime + roundedDuration
  const startTop = element.scrollTop
  const distance = roundedTarget - startTop

  const smootStep = (start: number, end: number, point: number) => {
    if (point <= start) {
      return 0
    }

    if (point >= end) {
      return 1
    }

    const x = (point - start) / (end - start) // interpolation

    return x * x * (3 - 2 * x)
  }

  return new Promise((resolve) => {
    // This is to keep track of where the element's scrollTop is
    // supposed to be, based on what we're doing
    let previousTop = Number(element.scrollTop)

    // This is like a think function from a game loop
    const scrollFrame = () => {
      if (Number(element.scrollTop) !== previousTop) {
        resolve(null)
      }
      // set the scrollTop for this frame
      const now = Date.now()
      const point = smootStep(startTime, endTime, now)
      const frameTop = Math.round(startTop + distance * point)

      element.scrollTop = frameTop

      // check if we're done!
      if (now >= endTime) {
        resolve(null)
        return
      }

      // If we were supposed to scroll but didn't, then we
      // probably hit the limit, so consider it done; not
      // interrupted.
      if (
        Math.ceil(element.scrollTop) === previousTop &&
        Math.ceil(element.scrollTop) !== frameTop
      ) {
        resolve(null)
        return
      }
      previousTop = element.scrollTop

      // schedule next frame for execution
      setTimeout(scrollFrame, 0)
    }

    // boostrap the animation process
    setTimeout(scrollFrame, 0)
  })
}
