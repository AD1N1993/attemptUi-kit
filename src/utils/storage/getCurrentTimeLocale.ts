/**
 * Возвращает локаль из LocalStorage
 * для использования в Date.prototype.toLocaleDateString() или Date.prototype.toLocaleString()
 */
export default function getCurrentTimeLocale(): string {
  const timeSettings = localStorage.getItem('timeSettings')
  const timeJson = timeSettings ? JSON.parse(timeSettings) : null
  return timeJson ? timeJson.timeLocale ?? 'ru-RU' : 'ru-RU'
}
