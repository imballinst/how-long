import { useEffect, useState } from 'react';
import { calculate } from 'count-up-down';
import { CountResult } from 'count-up-down/dist/types/common/types';

import styles from './Timer.module.css';

export interface TimerProps {
  // This should be ISO8601 string.
  date: string;
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

export function Timer({ date }: TimerProps) {
  const [state, setState] = useState<TimeState>(
    padAll(calculate(new Date(date), new Date()).result)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setState(padAll(calculate(new Date(date), new Date()).result));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [date]);

  const keys = Object.keys(state) as CountKeys[];

  return (
    <div className="grid grid-cols-3 gap-4">
      {keys.map((key) => (
        <div key={key} className={`${styles['time-text']}} text-center`}>
          <div className="text-5xl">{state[key]}</div>
          <div className="text-xl">{key}</div>
        </div>
      ))}
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
