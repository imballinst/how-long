import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { BreadcrumbHeader } from './BreadcrumbHeader';

export default {
  title: 'BreadcrumbHeader',
  component: BreadcrumbHeader,
  argTypes: {}
} as ComponentMeta<typeof BreadcrumbHeader>;

const Template: ComponentStory<typeof BreadcrumbHeader> = (args) => (
  <BreadcrumbHeader {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  pages: [
    {
      href: '/',
      title: 'How Long'
    },
    {
      href: '/since-arsenal',
      title: 'Since Arsenal'
    },
    {
      href: '/since-arsenal/last-won-a-premier-league-match',
      title: 'Last Won a Premier League Match'
    }
  ]
};
