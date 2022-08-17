import type { ComponentStory, ComponentMeta } from '@storybook/react'

import Button from './Button'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    primary: {
      defaultValue: false,
      type: 'boolean',
    },
    secondary: {
      defaultValue: false,
      type: 'boolean',
    },
    tertiary: {
      defaultValue: false,
      type: 'boolean',
    },
    icon: {
      type: 'symbol',
    },
    isLoading: {
      defaultValue: false,
      type: 'boolean',
    },
    label: {
      defaultValue: 'Click!',
      type: 'string',
    },
    disabled: {
      defaultValue: false,
      type: 'boolean',
    },
    onClick: {
      type: 'function',
    },
    full: {
      defaultValue: false,
      type: 'boolean',
    },
    tertiaryColor: {
      type: 'string',
    },
  },
} as ComponentMeta<typeof Button>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {}
