import {
  addDays,
  addMonths,
  addWeeks,
  endOfDay,
  endOfMonth,
  endOfWeek,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns'
import { DefinedRange } from 'materialui-daterange-picker'

export default {
  datesDatePicker: (date: Date): DefinedRange[] => [
    {
      label: 'Сегодня',
      startDate: startOfDay(date),
      endDate: endOfDay(date),
    },
    {
      label: 'Вчера',
      startDate: addDays(date, -1),
      endDate: addDays(date, -1),
    },
    {
      label: 'Текущая неделя',
      startDate: startOfWeek(date),
      endDate: endOfWeek(date),
    },
    {
      label: 'Прошлая неделя',
      startDate: startOfWeek(addWeeks(date, -1)),
      endDate: endOfWeek(addWeeks(date, -1)),
    },
    {
      label: 'Текущий месяц',
      startDate: startOfMonth(date),
      endDate: endOfMonth(date),
    },
    {
      label: 'Прошлый месяц',
      startDate: startOfMonth(addMonths(date, -1)),
      endDate: endOfMonth(addMonths(date, -1)),
    },
  ],
  apiUrls: {
    users: '/api/users',
    projects: '/api/projects',
    time_entries: '/api/time-entries',
    contractors: '/api/contractors',
    reports: '/api/time/reports',
    managers: '/api/managers',
    developers: '/api/developers',
    reports_project: '/api/time/report-projects',
    tasks: '/api/tasks',
  },
  defaultLimit: 10,
}
