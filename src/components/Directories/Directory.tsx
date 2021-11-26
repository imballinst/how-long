import { useRef } from 'react';
import { Collection } from '../../helpers/collections';
import { Card, CardProps } from '../Card';
import { Link } from '../Links';

export interface DirectoryProps {
  cards?: CardProps[];
}

const CARDS_SKELETON_MOCK: CardProps[] = Array.from(new Array(3), (_, idx) => ({
  title: 'Sample text',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  date: '2021-11-22T12:46:18.655Z',
  href: `/${idx}`
}));

export function Directory({ cards = CARDS_SKELETON_MOCK }: DirectoryProps) {
  return (
    <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card) => (
        <li key={card.href}>
          <Card {...card} />
        </li>
      ))}
    </ul>
  );
}

// Directory segment.
// This is used when a view contains multiple segments, e.g. list of categories.
export function DirectorySegment({
  pathname = '',
  title,
  cardTitlePrefix = '',
  numOfCards,
  collections
}: {
  pathname?: string;
  cardTitlePrefix?: string;
  numOfCards?: number;
  title: string;
  collections: Collection[];
}) {
  const shownCollections = useRef(
    numOfCards ? collections.slice(0, numOfCards) : collections
  );
  let sinceUntilSuffix = '';

  if (pathname.slice(1).length > 0) {
    sinceUntilSuffix = `/${pathname.slice(1).split('/').slice(1).join('/')}`;
  }

  return (
    <>
      <div className="flex flex-row justify-between items-end">
        <h2 className="text-2xl font-bold">{title}</h2>

        {numOfCards === undefined && (
          <Link href={`/since${sinceUntilSuffix}`}>View all</Link>
        )}
      </div>

      <hr className="h-4 mt-2 mb-4" />

      <Directory
        cards={shownCollections.current.map((file) => ({
          title: `${cardTitlePrefix}${file.title}`,
          text: file.events[0].description,
          date: file.events[0].datetime,
          href: file.path
        }))}
      />
    </>
  );
}
