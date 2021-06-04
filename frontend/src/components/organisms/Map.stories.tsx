import React from 'react';
import { Story, Meta } from '@storybook/react';

import MapComp from './Map';

export default {
  title: 'Organisms/Map',
  component: MapComp
} as Meta;

const Template: Story<React.ComponentProps<typeof MapComp>> = (args) => (
  <MapComp {...args} />
);

export const Map = Template.bind({});
Map.args = {};
