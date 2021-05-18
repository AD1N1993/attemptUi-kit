export interface IButton {
  disabled?: boolean
  onClick: () => void
  label: string
  theme: 'light' | 'dark'
  type: 'standard' | 'save' | 'accent' | 'additional' | 'dangerous' | 'inversion'
}
