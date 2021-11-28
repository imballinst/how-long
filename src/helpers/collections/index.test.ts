import { addYears } from 'date-fns';
import {
  CategorizedCollectionItem,
  filterCategorizedCollectionsByTime,
  groupCollectionsByTime
} from '.';

const DATE = new Date();
const COLLECTIONS = [
  {
    title: 'Arsenal Win Premier League',
    events: [
      {
        description:
          "It's not predictable when Arsenal will win the Premier League. Perhaps when they can do more as a team and get their DNA back.",
        datetime: addYears(DATE, 1).toISOString()
      }
    ],
    path: 'arsenal/win-premier-league'
  },
  {
    title: 'Arsenal Last Won a Match',
    events: [
      {
        description:
          'Arsenal won 1-0 against Norwich City in a Premier League match, with Pierre-Emerick Aubameyang scoring the only goal.',
        datetime: '2021-09-11T16:00:00.000Z'
      }
    ],
    path: 'arsenal/won-a-match'
  }
];

test('groupCollectionsByTime', () => {
  const grouped = groupCollectionsByTime(COLLECTIONS, DATE);

  expect(grouped.since[0]).toBe(COLLECTIONS[1]);
  expect(grouped.until[0]).toBe(COLLECTIONS[0]);
});

test('filterCategorizedCollectionsByTime', () => {
  const categorizedCollectionItems: CategorizedCollectionItem[] = [
    {
      slug: 'arsenal',
      title: 'Arsenal',
      collections: COLLECTIONS
    }
  ];

  expect(
    filterCategorizedCollectionsByTime(
      categorizedCollectionItems,
      new Date(),
      'since'
    )
  ).toEqual([
    {
      slug: 'arsenal',
      title: 'Arsenal',
      collections: [COLLECTIONS[1]]
    }
  ]);
  expect(
    filterCategorizedCollectionsByTime(
      categorizedCollectionItems,
      new Date(),
      'until'
    )
  ).toEqual([
    {
      slug: 'arsenal',
      title: 'Arsenal',
      collections: [COLLECTIONS[0]]
    }
  ]);
});
