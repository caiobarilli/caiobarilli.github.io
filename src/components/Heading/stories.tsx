import { Story, Meta } from '@storybook/react'
import Heading, { HeadingProps } from '.'

export default {
  title: 'Single Components/Heading',
  component: Heading,
  argTypes: {
    children: {
      type: 'string'
    }
  },
  args: {
    children: 'Caio Pachêco Barilli',
    size: 'large'
  }
} as Meta

export const Default: Story<HeadingProps> = (args) => <Heading {...args} />
Default.parameters = {
  backgrounds: {
    default: 'dark'
  }
}
