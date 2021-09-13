import styles from './Timer.module.css';

export interface TimerProps {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Timer({
  years,
  months,
  days,
  hours,
  minutes,
  seconds
}: TimerProps) {
  return (
    <>
      <div className={styles.row}>
        <div className={styles.wrapper}>
          <div className={styles.value} id="years">
            {years}
          </div>
          <div className={styles.unit}>years</div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.value} id="months">
            {months}
          </div>
          <div className={styles.unit}>months</div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.value} id="days">
            {days}
          </div>
          <div className={styles.unit}>days</div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.wrapper}>
          <div className={styles.value} id="hours">
            {hours}
          </div>
          <div className={styles.unit}>hours</div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.value} id="minutes">
            {minutes}
          </div>
          <div className={styles.unit}>minutes</div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.value} id="seconds">
            {seconds}
          </div>
          <div className={styles.unit}>seconds</div>
        </div>
      </div>
    </>
  );
}
