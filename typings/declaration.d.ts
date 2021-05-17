declare module '*.svg'
declare module '*.gif'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.webp'
declare module '*.css'
declare module '*.scss' {
  const content: { [className: string]: string }
  export default content
}
