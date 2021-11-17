import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CardButton } from './CardButton';

export default {
  title: 'CardButton',
  component: CardButton,
  argTypes: {}
} as ComponentMeta<typeof CardButton>;

const Template: ComponentStory<typeof CardButton> = (args) => (
  <CardButton {...args} />
);

// Constants.
const ONE_HOUR_AGO = new Date(new Date().getTime() - 3600 * 1000);

export const Primary = Template.bind({});
Primary.args = {
  href: '/test/path',
  date: ONE_HOUR_AGO.toISOString(),
  text: 'Arsenal won 1-0 against Norwich City in a Premier League match, with Pierre-Emerick Aubameyang scoring the only goal.',
  tags: ['arsenal', 'premier league'],
  title: 'Arsenal 1-0 Norwich City'
};