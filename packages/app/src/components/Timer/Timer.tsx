import { ReactNode, useEffect, useMemo, useState } from 'react';
import { calculate } from 'count-up-down';
import { CountResult } from 'count-up-down/dist/types/common/types';

import styles from './Timer.module.css';
import { Collection } from '../../helpers/collections';
import { Directory } from '../Directories';
import { Text } from '../Typography';
import { htmlToReact } from '../../helpers/collections/markdown';

export interface TimerProps {
  // This should be ISO8601 string.
  date: string;
  collection: Collection;
  expression: 'since' | 'until';
  children: ReactNode;
}

interface TimeState {
  years: string;
  months: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}
type CountKeys = keyof CountResult;

const formatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: '2-digit'
});

export function Timer({ date, expression, collection, children }: TimerProps) {
  // TODO(imballinst): if we are using `padAll(...)` here,
  // at the time of writing, it will cause dev server issues.
  // Also, probably jumping from 0s is better than jumping from non-0s.
  // See: https://github.com/withastro/astro/issues/2004.
  const [state, setState] = useState<TimeState>({
    years: '00',
    months: '00',
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });
  const [currentEvent, previousEvents] = useMemo(
    () => [collection.events[0], collection.events.slice(1)],
    [collection]
  );

  useEffect(() => {
    setState(padAll(calculate(new Date(date), new Date()).result));

    const interval = setInterval(() => {
      setState(padAll(calculate(new Date(date), new Date()).result));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [date]);

  const keys = Object.keys(state) as CountKeys[];
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

      <Text
        as="div"
        className={`grid grid-cols-3 gap-4 ${styles['time-text']}`}
      >
        {keys.map((key) => (
          <div key={key} className="text-center">
            <div className="text-5xl">{state[key]}</div>
            <div className="text-xl">{key}</div>
          </div>
        ))}
      </Text>

      <div
        className={`mt-8 text-base sm:border sm:p-4 sm:rounded ${styles['paragraphs']}`}
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

      {children}
    </div>
  );
}

// Helper functions.
function padAll(input: CountResult) {
  const output: {
    [index in CountKeys]: string;
  } = {
    years: '',
    months: '',
    days: '',
    hours: '',
    minutes: '',
    seconds: ''
  };

  const keys = Object.keys(input) as CountKeys[];

  for (const key of keys) {
    output[key] = `${input[key]}`.padStart(2, '0');
  }

  return output;
}

function titleCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
