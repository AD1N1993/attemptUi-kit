import React from 'react'
import { Meta, Story } from '@storybook/react'

import Button from './Button'
import { IButton } from './IButton'

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta

const Template: Story<IButton> = (args) => <Button {...args} />

export const Test = Template.bind({})
Test.args = {
  label: 'SuperButton',
}
