export interface IVersions {
  version: string
  current: boolean
}

export default (projectVersion: string): void => {
  const oldVersions = localStorage.getItem('version')

  if (oldVersions) {
    const { version } = JSON.parse(oldVersions) as IVersions

    if (projectVersion !== version) {
      const versions = { version: projectVersion, current: false } as IVersions

      localStorage.setItem('version', JSON.stringify(versions))
    }
  } else {
    const versions = { version: projectVersion, current: true } as IVersions

    localStorage.setItem('version', JSON.stringify(versions))
  }
}

const updateWithCache = (): void => {
  const oldVersions = localStorage.getItem('version')

  if (oldVersions) {
    const { version } = JSON.parse(oldVersions) as IVersions

    const versions = { version, current: true } as IVersions

    localStorage.setItem('version', JSON.stringify(versions))

    location.reload(true)
  }
}

export { updateWithCache }
