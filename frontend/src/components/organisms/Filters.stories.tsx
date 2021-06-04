import React from 'react';
import { Story, Meta } from '@storybook/react';

import FiltersComp from './Filters';

export default {
  title: 'Organisms/Filters',
  component: FiltersComp,
  argTypes: {
    onFilterChange: { action: 'filter changed' }
  }
} as Meta;

const Template: Story<React.ComponentProps<typeof FiltersComp>> = (args) => (
  <FiltersComp {...args} />
);

export const Default = Template.bind({});
Default.args = {};
