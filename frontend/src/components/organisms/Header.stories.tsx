import React from 'react';
import { Story, Meta } from '@storybook/react';

import HeaderComp from './Header';

export default {
  title: 'Organisms/Header',
  component: HeaderComp
} as Meta;

const Template: Story<React.ComponentProps<typeof HeaderComp>> = (args) => (
  <HeaderComp {...args} />
);

export const Header = Template.bind({});
Header.args = {
  tabList: ['Timeline', 'Gallery', 'Map'],
  activeTab: 1,
  showSettings: true
};
