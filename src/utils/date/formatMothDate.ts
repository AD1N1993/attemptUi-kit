import { format, isSameDay, isSameMonth } from 'date-fns'
import { DateRange, DefinedRange } from 'materialui-daterange-picker'

export default (range: DefinedRange | DateRange): DefinedRange => {
  const startDate: Date = range.startDate || new Date()
  const endDate: Date = range.endDate || new Date()

  const cDay = isSameDay(startDate, endDate)
  const cMonth = isSameMonth(startDate, endDate)

  let label = ''

  if (cDay) {
    label = format(startDate, 'dd MMM')
  }

  if (cMonth && !cDay) {
    label = `${format(startDate, 'dd')} - ${format(endDate, 'dd MMM')}`
  }

  if (!cMonth && !cDay) {
    label = `${format(startDate, 'dd MMM')} - ${format(endDate, 'dd MMM')}`
  }

  return { ...range, label } as DefinedRange
}
