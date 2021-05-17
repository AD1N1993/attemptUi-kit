import { differenceInMilliseconds, format } from 'date-fns'

import { IProjects } from '@ts/projects'
import { ITimeEntrie } from '@ts/times'
import { ITrackerEntry } from '@ts/tracker'

import TimeConvert from '../time/TimeConvert'

export default (timesData: ITimeEntrie[], timeFormat: string, projects: IProjects[]) =>
  timesData.map((time) => {
    const { start, end } = TimeConvert.parseTimeWithOffsetISO(time.start, time.end)
    const durationMs = differenceInMilliseconds(end || new Date(), start)
    const timeFormatDuration = `${durationMs < 3600000 ? '' : 'H ч'} m мин`

    return {
      id: time['@id'],
      title: time.title,
      start,
      end,
      task: time.task,
      inEdit: false,
      link: time.link,
      isActive: time.end === null,
      description: time.description,
      project:
        time.project && projects.find((pr: IProjects) => pr['@id'] === time.project?.['@id']),
      range: `${format(start, timeFormat)} - ${
        time.end === null ? 'сейчас' : format(end, timeFormat)
      }`,
      duration: format(TimeConvert.formatInGMT(new Date(durationMs)), timeFormatDuration),
      durationMs,
      user: time.user['@id'],
    }
  }) as ITrackerEntry[]
