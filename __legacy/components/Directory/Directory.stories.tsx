import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Directory } from './Directory';

export default {
  title: 'Directory',
  component: Directory,
  argTypes: {}
} as ComponentMeta<typeof Directory>;

const Template: ComponentStory<typeof Directory> = (args) => (
  <Directory {...args} />
);

// Constants.
const ONE_HOUR_AGO = new Date(new Date().getTime() - 3600 * 1000);
const THREE_CARDS = [
  {
    href: '/test/path',
    date: ONE_HOUR_AGO.toISOString(),
    text: 'Arsenal won 1-0 against Norwich City in a Premier League match, with Pierre-Emerick Aubameyang scoring the only goal.',
    tags: ['arsenal', 'premier league'],
    title: 'Arsenal 1-0 Norwich City'
  },
  {
    href: '/test/path',
    date: ONE_HOUR_AGO.toISOString(),
    text: 'Arsenal won 1-0 against Norwich City in a Premier League match.',
    tags: ['arsenal', 'premier league'],
    title: 'Arsenal 1-0 Norwich City'
  },
  {
    href: '/test/path',
    date: ONE_HOUR_AGO.toISOString(),
    text: 'Arsenal won 1-0 against Norwich City.',
    tags: ['arsenal', 'premier league'],
    title: 'Arsenal 1-0 Norwich City'
  }
];

export const ThreeCards = Template.bind({});
ThreeCards.storyName = '3 cards';
ThreeCards.args = {
  cards: THREE_CARDS
};

export const SixCards = Template.bind({});
SixCards.storyName = '6 cards';
SixCards.args = {
  cards: [...THREE_CARDS, ...THREE_CARDS]
};

export const SevenCards = Template.bind({});
SevenCards.storyName = '7 cards';
SevenCards.args = {
  cards: [
    ...THREE_CARDS,
    {
      href: '/test/path',
      date: ONE_HOUR_AGO.toISOString(),
      text: 'Arsenal won 1-0 against Norwich City in a Premier League match, with Pierre-Emerick Aubameyang scoring the only goal. The game was quite sloppy and Arsenal needed to do better than that.',
      tags: ['arsenal', 'premier league'],
      title: 'Arsenal 1-0 Norwich City'
    },
    ...THREE_CARDS
  ]
};
