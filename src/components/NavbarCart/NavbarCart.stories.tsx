// import type { Meta, StoryObj } from '@storybook/react'

// import NavbarCart from './index'

// // More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
// const meta: Meta<typeof NavbarCart> = {
//   title: 'component/NavbarCart',
//   component: NavbarCart,
//   tags: ['autodocs'],
//   parameters: {
//     layout: 'fullscreen'
//   }
// }

// export default meta
// type Story = StoryObj<typeof meta>

// // More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
// export const LoggedIn: Story = {
//   args: {
//     user: {
//       email: 'mh@gmail.com'
//     }
//   }
// }

// export const LoggedOut: Story = {}

import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import NavbarCart from './index'

export default {
  title: 'Components/NavbarCart',
  component: NavbarCart
} as ComponentMeta<typeof NavbarCart>

const Template: ComponentStory<typeof NavbarCart> = () => <NavbarCart />

export const Primary = Template.bind({})
