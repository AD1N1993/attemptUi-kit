import React from 'react'

import { IButton } from './IButton'

import s from './Button.scss'

const Button: React.FC<IButton> = ({ label }) => {
  return (
    <>
      <button className={s.button}>{label}</button>
    </>
  )
}

export default Button
