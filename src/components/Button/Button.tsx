import React from 'react'
import cn from 'classnames'

import { IButton } from './IButton'

import s from './Button.scss'

const Button: React.FC<IButton> = ({ disabled, label, onClick, theme, type }) => {
  return (
    <>
      <div
        className={cn(s.btn, {
          [s['btn--disabled']]: disabled,
          [s[`btn--${theme}`]]: theme,
          [s[`btn--${theme}-${type}`]]: type,
        })}
        onClick={onClick}
        tabIndex={1}
      >
        {label}
      </div>
    </>
  )
}

export default Button
