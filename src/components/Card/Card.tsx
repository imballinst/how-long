import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { Link } from '../Links';

import styles from './Card.module.css';

export interface CardProps {
  href: string;
  title: string;
  // ISO8601 date string.
  date: string;
  text: string;
}

export function Card(props: CardProps) {
  return (
    <div className="border rounded-lg border-gray-200 hover:border-teal-500 p-4 transition-colors">
      <h4 className="font-semibold leading-tight truncate">
        <Link href={props.href}>{props.title}</Link>
      </h4>

      <div className="flex flex-row items-center mb-1 text-xs text-gray-500">
        {formatDistanceToNowStrict(new Date(props.date), {
          addSuffix: true
        })}
      </div>

      <div className="flex mt-2 items-center">
        <p className={`text-sm ${styles['card-text']}`}>{props.text}</p>
      </div>
    </div>
  );
}
