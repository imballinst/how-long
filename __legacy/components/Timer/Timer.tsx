import { useEffect, useState } from 'react';
import { calculate } from 'count-up-down';

import styles from './Timer.module.css';

export interface TimerProps {
  // This should be ISO8601 string.
  date: string;
}

export function Timer({ date }: TimerProps) {
  const [state, setState] = useState(
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

  return (
    <div className={styles.root}>
      <div className={styles.row}>
        <div className={styles.wrapper}>
          <div className={styles.value} id="years">
            {state.years}
          </div>
          <div className={styles.unit}>years</div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.value} id="months">
            {state.months}
          </div>
          <div className={styles.unit}>months</div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.value} id="days">
            {state.days}
          </div>
          <div className={styles.unit}>days</div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.wrapper}>
          <div className={styles.value} id="hours">
            {state.hours}
          </div>
          <div className={styles.unit}>hours</div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.value} id="minutes">
            {state.minutes}
          </div>
          <div className={styles.unit}>minutes</div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.value} id="seconds">
            {state.seconds}
          </div>
          <div className={styles.unit}>seconds</div>
        </div>
      </div>
    </div>
  );
}

// Helper functions.
function padAll(input: { [index: string]: number }) {
  const output: {
    [index: string]: string;
  } = {};

  for (const key in input) {
    output[key] = `${input[key]}`.padStart(2, '0');
  }

  return output;
}