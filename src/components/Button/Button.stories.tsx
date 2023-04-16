import { ComponentMeta, ComponentStory } from '@storybook/react'
import Button from './index'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    isLoading: {
      description: 'Hiển thị icon loading'
    },
    children: {
      description: 'Nội dung button'
    }
  }
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (props) => <Button {...props} />

export const Primary = Template.bind({})

Primary.args = {
  children: 'Login',
  className: 'mt-3 mb-5 flex w-full  items-center justify-center bg-orange pt-2 pb-2 text-white',
  isLoading: true
}

export const Secondary = Template.bind({})

Secondary.args = {
  children: 'Register',
  className: 'mt-3 mb-5 flex w-full  items-center justify-center bg-orange pt-2 pb-2 text-white',
  isLoading: true,
  disabled: true
}