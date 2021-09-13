import { Timer, TimerProps } from '../components/Timer';

const TIME_DISTANCE: TimerProps = {
  seconds: 0,
  minutes: 0,
  hours: 0,
  days: 0,
  months: 0,
  years: 0
};

export default function Template() {
  return <Timer {...TIME_DISTANCE} />;
}
