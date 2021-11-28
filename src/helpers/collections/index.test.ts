import { addYears } from 'date-fns';
import {
  CategorizedCollectionItem,
  Collection,
  filterCategorizedCollectionsByTime,
  groupCollectionsByTime
} from '.';

const DATE = new Date();
const COLLECTIONS: Collection[] = [
  {
    title: 'Arsenal Win Premier League',
    events: [
      {
        description:
          "It's not predictable when Arsenal will win the Premier League. Perhaps when they can do more as a team and get their DNA back.",
        datetime: addYears(DATE, 1).toISOString()
      }
    ],
    slug: 'win-premier-league'
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
    slug: 'won-a-match'
  }
];

test('groupCollectionsByTime', () => {
  const grouped = groupCollectionsByTime({
    rawCollections: COLLECTIONS,
    currentDate: DATE
  });

  expect(grouped.since[0]).toEqual({
    ...COLLECTIONS[1],
    expression: 'since'
  });
  expect(grouped.until[0]).toEqual({
    ...COLLECTIONS[0],
    expression: 'until'
  });
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
      collections: [
        {
          ...COLLECTIONS[1],
          expression: 'since'
        }
      ]
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
      collections: [
        {
          ...COLLECTIONS[0],
          expression: 'until'
        }
      ]
    }
  ]);
});
