import { Store } from '@store/Store'

import TimeConvert from '@utils/time/TimeConvert'

import { ITaskPost } from '@ts/task'
import { ITimeEntieCreate, ITimesPost } from '@ts/times'

export default async function (
  store: Store,
  state: ITimeEntieCreate,
  newTask: boolean,
  action: 'create' | 'open' | 'edit',
): Promise<void> {
  const {
    TimeStore: { createTimeEntry, openTimeEntry, editTimeEntry, trackerSelectedDate: selectedDate },
    TaskStore: { createTask, editTask },
  } = store
  const { id, title, project, start, end, user: userId, link, description, task } = state
  let startComputed
  let endComputed

  if (start) {
    const startDate = selectedDate.setHours(start.getHours(), start.getMinutes(), 0)
    const endDate = end ? selectedDate.setHours(end.getHours(), end.getMinutes(), 0) : null
    startComputed = TimeConvert.inGMT(new Date(startDate))
    endComputed = endDate ? TimeConvert.inGMT(new Date(endDate)) : null
  }

  const taskPost: ITaskPost = {
    user: userId || '',
    project: project?.['@id'] || '',
    title,
    description,
    link,
  }

  const timeEntryPost: ITimesPost = {
    ...taskPost,
    start: startComputed || '',
    end: endComputed,
    task,
  }

  if (newTask) {
    timeEntryPost.task = await createTask(taskPost)
      .then((task) => task['@id'])
      .catch((err) => {
        return Promise.reject(err)
      })
  } else {
    timeEntryPost.task = await editTask(task, taskPost)
      .then((task) => task['@id'])
      .catch((err) => {
        return Promise.reject(err)
      })
  }

  switch (action) {
    case 'create':
      return createTimeEntry(timeEntryPost)
    case 'open':
      delete timeEntryPost.end
      delete timeEntryPost.start
      return openTimeEntry(timeEntryPost)
    default:
      return id ? editTimeEntry(id, timeEntryPost) : Promise.reject()
  }
}
