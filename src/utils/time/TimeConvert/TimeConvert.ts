import { format, getDate, getMonth, parseISO, setDate, setHours, setMonth } from 'date-fns'

import { TTimeRange, TTimeType } from './types'

/**
 * Класс для работы с временем
 */
class TimeConvert {
  public inMilliseconds: number

  /**
   * @param time Время
   * @param type Тип времени, доступные значения ('ms', 'seconds', 'hours')
   */
  constructor(time: number, type: TTimeType = 'ms') {
    this.inMilliseconds = TimeConvert.toMilliseconds(time, type)
  }

  /**
   * Получает время в секундах
   */
  get inSeconds(): number {
    return TimeConvert.toSeconds(this.inMilliseconds, 'ms')
  }
  /**
   * Устанавливает время в секундах
   * @param timeInSeconds время в секундах
   */
  set inSeconds(timeInSeconds: number) {
    this.inMilliseconds = TimeConvert.toMilliseconds(timeInSeconds, 'seconds')
  }

  /**
   * Получает время в минутах
   */
  get inMinutes(): number {
    return TimeConvert.toMinutes(this.inMilliseconds, 'ms')
  }

  /**
   * Устанавливает время в минутах
   * @param timeInMinutes время в минутах
   */
  set inMinutes(timeInMinutes: number) {
    this.inMilliseconds = TimeConvert.toMilliseconds(timeInMinutes, 'minutes')
  }

  /**
   * Получает время в часах
   */
  get inHours(): number {
    return TimeConvert.toHours(this.inMilliseconds, 'ms')
  }

  /**
   * Устанавливает время в часах
   * @param timeInHours время в часах
   */
  set inHours(timeInHours: number) {
    this.inMilliseconds = TimeConvert.toMilliseconds(timeInHours, 'hours')
  }

  public static toMilliseconds(time: number, type: TTimeType = 'ms'): number {
    switch (type) {
      case 'seconds':
        return time * 1000
      case 'minutes':
        return time * 1000 * 60
      case 'hours':
        return time * 1000 * 60 * 60
      default:
        return time
    }
  }

  public static toSeconds(time: number, type: TTimeType = 'ms'): number {
    switch (type) {
      case 'ms':
        return time / 1000
      case 'minutes':
        return time * 60
      case 'hours':
        return time * 60 * 60
      default:
        return time
    }
  }

  public static toMinutes(time: number, type: TTimeType = 'ms'): number {
    switch (type) {
      case 'ms':
        return time / 1000 / 60
      case 'seconds':
        return time / 60
      case 'hours':
        return time * 60
      default:
        return time
    }
  }

  public static toHours(time: number, type: TTimeType = 'ms'): number {
    switch (type) {
      case 'ms':
        return time / 1000 / 60 / 60
      case 'seconds':
        return time / 60 / 60
      case 'minutes':
        return time / 60
      default:
        return time
    }
  }

  public static inGMT(date = new Date()): string {
    // eslint-disable-next-line quotes
    return format(date, "yyyy-MM-dd'T'HH:mm:ssxxx")
  }

  public static formatInGMT(date: Date): Date {
    const offset = date.getTimezoneOffset() / 60

    return setHours(date, date.getHours() + offset)
  }

  public static parseTimeWithOffsetISO(startTime: string, endTime: string | null): TTimeRange {
    const { start, end } = {
      start: parseISO(startTime.slice(0, -6)),
      end: parseISO((endTime || TimeConvert.inGMT(new Date())).slice(0, -6)),
    }

    return { start, end }
  }

  public static formatInSelectDate(date: Date, selectDate: Date): Date {
    const month = getMonth(selectDate)
    const day = getDate(selectDate)
    return setMonth(setDate(date, day), month)
  }
}

export default TimeConvert
