import { Story, Meta } from '@storybook/react'

import { Github } from '@styled-icons/boxicons-logos/Github'

import Text, { TextProps } from '.'

export default {
  title: 'Single Components/Text',
  component: Text,
  argTypes: {
    children: { control: 'text' },
    icon: {
      table: {
        disable: true
      }
    }
  },
  args: {
    children: 'Reactjs Boilerplate'
  }
} as Meta

export const Default: Story<TextProps> = (args) => <Text {...args} />
Default.parameters = {
  backgrounds: {
    default: 'dark'
  }
}

export const WithIcon: Story<TextProps> = (args) => <Text {...args} />
WithIcon.args = {
  icon: <Github />,
  size: 'small'
}
WithIcon.parameters = {
  backgrounds: {
    default: 'dark'
  }
}
