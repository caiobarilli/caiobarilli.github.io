import { Story, Meta } from '@storybook/react'
import Button, { ButtonProps } from '.'

import { Github } from '@styled-icons/boxicons-logos/Github'

export default {
  title: 'Single Components/Button',
  component: Button,
  argTypes: {
    children: {
      type: 'string'
    },
    as: {
      table: {
        disable: true
      }
    },
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

export const Default: Story<ButtonProps> = (args) => <Button {...args} />
Default.parameters = {
  backgrounds: {
    default: 'dark'
  }
}

export const asLink: Story<ButtonProps> = (args) => <Button {...args} />
asLink.args = {
  as: 'a',
  href: 'http://www.github.com',
  target: '_blank'
}
asLink.parameters = {
  backgrounds: {
    default: 'dark'
  }
}

export const WithIcon: Story<ButtonProps> = (args) => <Button {...args} />
WithIcon.args = {
  icon: <Github />
}
WithIcon.parameters = {
  backgrounds: {
    default: 'dark'
  }
}
