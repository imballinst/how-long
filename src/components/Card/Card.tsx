import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { Link } from '../Links';

import styles from './Card.module.css';

export interface CardProps {
  href?: string;
  title: string;
  // ISO8601 date string.
  date: string;
  text: string;
}

export function Card(props: CardProps) {
  return (
    <div className="border rounded-lg border-gray-200 hover:border-teal-500 dark:hover:border-teal-200 p-4 transition-colors">
      <h4 className="font-semibold leading-tight truncate">
        {props.href ? (
          <Link href={props.href}>{props.title}</Link>
        ) : (
          <span className="dark:text-gray-200">{props.title}</span>
        )}
      </h4>

      <div className="flex flex-row items-center mb-1 text-xs text-gray-600 dark:text-gray-400">
        {formatDistanceToNowStrict(new Date(props.date), {
          addSuffix: true
        })}
      </div>

      <div className="flex mt-2 items-center">
        <p className={`text-sm ${styles['card-text']} dark:text-gray-200`}>
          {props.text}
        </p>
      </div>
    </div>
  );
}
