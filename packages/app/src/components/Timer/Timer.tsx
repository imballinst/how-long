import { ReactNode, useMemo } from 'react';

import styles from './Timer.module.css';
import { Collection } from '../../helpers/collections';
import { Directory, DirectoryFooter } from '../Directories';
import { Text } from '../Typography';
import { htmlToReact } from '../../helpers/collections/markdown';
import { titleCase } from '../../helpers/formatter';

export interface TimerProps {
  // This should be ISO8601 string.
  date: string;
}

const formatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: '2-digit'
});

interface TimerArticleProps {
  // This should be ISO8601 string.
  date: string;
  children: ReactNode;
  collection: Collection;
  expression: 'since' | 'until';
}

export function TimerArticle({
  date,
  expression,
  collection,
  children
}: TimerArticleProps) {
  const [currentEvent, previousEvents] = useMemo(
    () => [collection.events[0], collection.events.slice(1)],
    [collection]
  );

  const headingTitle = `How Long ${titleCase(expression)} ${
    collection.parentTitle
  } ${collection.title}?`;

  const description = htmlToReact(currentEvent.description);
  const firstParagraph = Array.isArray(description) ? description[0] : null;
  const restOfParagraphs = Array.isArray(description)
    ? description.slice(1)
    : description;

  return (
    <div className="md:p-4 h-full flex flex-col">
      <Text as="h2" className="text-2xl text-center font-bold mt-6 mb-8">
        {headingTitle}
      </Text>

      {children}

      <div
        className={`mt-8 text-base border-t border-b py-4 border-gray-400 md:border-gray-500 md:border md:p-4 md:rounded ${styles['paragraphs']}`}
      >
        <Text as="span" className="font-bold">
          {`${formatter.format(new Date(date))} ― `}
        </Text>

        {firstParagraph}
        {restOfParagraphs}
      </div>

      {previousEvents.length > 0 && (
        <div className="mt-8">
          <Text as="h3" className="mb-2 text-xl">
            Previous events
          </Text>

          <Directory
            cards={previousEvents.map((event) => ({
              date: event.datetime,
              title: event.title,
              text: event.description
            }))}
          />
        </div>
      )}

      <DirectoryFooter updateDate={date} />
    </div>
  );
}
