import { useEffect, useState } from 'react';
import { calculate } from 'count-up-down';
import { CountResult } from 'count-up-down/dist/types/common/types';

import styles from './Timer.module.css';
import { Collection } from '../../helpers/collections';
import { Directory } from '../Directories';

export interface TimerProps {
  // This should be ISO8601 string.
  date: string;
  collection: Collection;
  expression: 'since' | 'until';
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

export function Timer({ date, expression, collection }: TimerProps) {
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
  const headingTitle = `How Long ${titleCase(expression)} ${titleCase(
    collection.category!
  )} ${collection.title}?`;

  return (
    <div className="h-full flex flex-col pl-4">
      <h2 className="text-2xl text-center font-bold mb-8 dark:text-gray-200">
        {headingTitle}
      </h2>

      <div
        className={`grid grid-cols-3 gap-4 ${styles['time-text']} dark:text-gray-200`}
      >
        {keys.map((key) => (
          <div key={key} className="text-center">
            <div className="text-5xl">{state[key]}</div>
            <div className="text-xl">{key}</div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-sm text-center border px-2 py-4 rounded-lg dark:text-gray-200">
        <span className="font-bold">{formatter.format(new Date(date))}</span>
        <span> -- </span>
        {collection.events[0].description}
      </p>

      <div className="mt-8">
        <h3 className="mb-2 dark:text-gray-200">Previous events</h3>

        <Directory
          cards={collection.events.slice(1).map((event) => ({
            date: event.datetime,
            title: event.title,
            text: event.description
          }))}
        />
      </div>
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
