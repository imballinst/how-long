import {
  appendExpressionToCategorizedCollection,
  CategorizedCollectionItem,
  Collection,
  filterCategorizedCollectionsByTime,
  groupCollectionsByTime,
  sortCollections
} from '.';

const DATE = new Date();
const NEXT_YEAR = new Date(DATE);
NEXT_YEAR.setFullYear(DATE.getFullYear() + 1);

const COLLECTIONS: Collection[] = [
  {
    title: 'Win Premier League',
    events: [
      {
        title: 'Not defined',
        description:
          "<p>It's not predictable when Arsenal will win the Premier League. Perhaps when they can do more as a team and get their DNA back.</p>",
        datetime: NEXT_YEAR.toISOString(),
        meta: {
          description:
            "It's not predictable when Arsenal will win the Premier League. Perhaps when they can do more as a team and get their DNA back."
        }
      }
    ],
    category: 'arsenal',
    parentTitle: 'Arsenal',
    slug: 'win-premier-league'
  },
  {
    title: 'Last Won a Match',
    events: [
      {
        title: 'Arsenal 1-0 Norwich City',
        description:
          '<p>Arsenal won 1-0 against Norwich City in a Premier League match, with Pierre-Emerick Aubameyang scoring the only goal.</p>',
        datetime: '2021-09-11T16:00:00.000Z',
        meta: {
          description:
            'Arsenal won 1-0 against Norwich City in a Premier League match, with Pierre-Emerick Aubameyang scoring the only goal.'
        }
      }
    ],
    category: 'arsenal',
    parentTitle: 'Arsenal',
    slug: 'last-won-a-match'
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

test('appendExpressionToCategorizedCollection', () => {
  const categorizedCollectionItems: CategorizedCollectionItem[] = [
    {
      slug: 'arsenal',
      title: 'Arsenal',
      collections: COLLECTIONS
    }
  ];

  expect(
    appendExpressionToCategorizedCollection(
      categorizedCollectionItems,
      new Date()
    )
  ).toEqual([
    {
      slug: 'arsenal',
      title: 'Arsenal',
      collections: [
        {
          ...COLLECTIONS[0],
          expression: 'until'
        },
        {
          ...COLLECTIONS[1],
          expression: 'since'
        }
      ]
    }
  ]);
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

test('sortCollections', () => {
  const sortedAsc = sortCollections(COLLECTIONS, 'asc');

  expect(sortedAsc[0].title).toBe('Last Won a Match');
  expect(sortedAsc[0].slug).toBe('last-won-a-match');
  expect(sortedAsc[1].title).toBe('Win Premier League');
  expect(sortedAsc[1].slug).toBe('win-premier-league');

  const sortedDesc = sortCollections(COLLECTIONS, 'desc');

  expect(sortedDesc[1].title).toBe('Last Won a Match');
  expect(sortedDesc[1].slug).toBe('last-won-a-match');
  expect(sortedDesc[0].title).toBe('Win Premier League');
  expect(sortedDesc[0].slug).toBe('win-premier-league');
});
