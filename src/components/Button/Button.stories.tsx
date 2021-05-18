import React from 'react'
import { action, actions } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react'

import Button from './Button'
import { IButton } from './IButton'

export default {
  title: 'Elements/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
    onClick: { action: 'clicked' },
  },
} as Meta

const Template: Story<IButton> = (args) => <Button {...args} onClick={action('Click handler')} />

export const LightMode = Template.bind({})
LightMode.args = {
  label: 'Button',
  theme: 'light',
  type: 'standard',
}

export const DarkMode = Template.bind({})
DarkMode.args = {
  label: 'Button',
  theme: 'dark',
}
DarkMode.parameters = {
  backgrounds: { default: 'dark' },
}
