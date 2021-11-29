import { useRef } from 'react';
import { Collection } from '../../helpers/collections';
import { Card, CardProps } from '../Card';
import { Link } from '../Links';

export interface DirectoryProps {
  cards: CardProps[];
}

export function Directory({ cards }: DirectoryProps) {
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
export interface DirectorySegmentProps {
  titleCardPrefix?: string;
  slug?: string;
  numOfCards?: number;
  title: string;
  collections: Collection[];
}

export function DirectorySegment({
  title,
  titleCardPrefix = '',
  slug = '',
  numOfCards,
  collections
}: DirectorySegmentProps) {
  const shownCollections = useRef(
    numOfCards ? collections.slice(0, numOfCards) : collections
  );

  return (
    <>
      <div className="flex flex-row justify-between items-end">
        <h3 className="text-xl font-bold">{title}</h3>

        {numOfCards !== undefined && <Link href={slug}>View all</Link>}
      </div>

      <hr className="h-1 mt-2 mb-4" />

      <Directory
        cards={shownCollections.current.map((file) => ({
          title: `${titleCardPrefix}${file.title}`,
          text: file.events[0].description,
          date: file.events[0].datetime,
          href: `${file.expression}/${file.category}/${file.slug}`
        }))}
      />
    </>
  );
}
