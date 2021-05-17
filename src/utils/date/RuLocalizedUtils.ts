import DateFnsUtils from '@date-io/date-fns'
import format from 'date-fns/format'

class RuLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date: Date) {
    // eslint-disable-next-line no-undef
    return format(date, 'LLLL, yyyy', { locale: this.locale })
  }

  getDatePickerHeaderText(date: Date) {
    return format(date, 'dd MMMM', { locale: this.locale })
  }
}

export default RuLocalizedUtils
