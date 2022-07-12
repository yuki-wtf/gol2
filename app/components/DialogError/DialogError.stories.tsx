import type { ComponentStory, ComponentMeta } from '@storybook/react';

import DialogError from './DialogError';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/DialogError',
  component: DialogError,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    open: {
      defaultValue: true,
      type: "boolean"
    },
    onClose: {
      defaultValue: null,
      type: 'function'
    }
  },
} as ComponentMeta<typeof DialogError>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DialogError> = (args) => <DialogError {...args} />;

export const Open = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Open.args = {
  open: true,
};
