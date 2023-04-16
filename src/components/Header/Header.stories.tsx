// import type { Meta, StoryObj } from '@storybook/react'

// import Header from './index'

// // More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
// const meta: Meta<typeof Header> = {
//   title: 'component/Header',
//   component: Header,
//   tags: ['autodocs'],
//   parameters: {
//     layout: 'fullscreen'
//   }
// }

// export default meta
// type Story = StoryObj<typeof meta>

// // More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
// export const Primary: Story = {
//   render: () => (
//     <div>
//       <Header />
//     </div>
//   )
// }

import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import Header from './index'

export default {
  title: 'Components/Header',
  component: Header
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = () => <Header />

export const Primary = Template.bind({})
