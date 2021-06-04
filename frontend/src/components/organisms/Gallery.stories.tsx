import React from 'react';
import { Story, Meta } from '@storybook/react';

import GalleryComp from './Gallery';

import { images } from '../../stories/mocks/imageList';

export default {
  title: 'Organisms/Gallery',
  component: GalleryComp
} as Meta;

const Template: Story<React.ComponentProps<typeof GalleryComp>> = (args) => (
  <GalleryComp {...args} />
);

export const Gallery = Template.bind({});
Gallery.args = {
  imageList: images
};
