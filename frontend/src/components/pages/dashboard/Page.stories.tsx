import React from 'react';
import { Story, Meta } from '@storybook/react';

import PageComp from './Page';

export default {
  title: 'Pages/Dashboard',
  component: PageComp
} as Meta;

const Template: Story<React.ComponentProps<typeof PageComp>> = (args) => (
  <PageComp {...args} />
);

export const Dashboard = Template.bind({});
Dashboard.args = {};
