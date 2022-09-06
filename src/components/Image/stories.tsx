import { Story, Meta } from '@storybook/react'
import Image, { ImageProps } from '.'

export default {
  title: 'Single Components/Image',
  component: Image,
  argTypes: {
    src: { control: 'text' }
  },
  args: {
    src: '/img/profile.png',
    mode: 'rounded'
  }
} as Meta

export const Default: Story<ImageProps> = (args) => <Image {...args} />
Default.parameters = {
  backgrounds: {
    default: 'dark'
  }
}
