import { ReactNode } from 'react';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { Link } from '../Links';
import { Skeleton, SkeletonText } from '../Skeletons';

import styles from './Card.module.css';

export interface CardProps {
  href: string;
  title: string;
  tags?: string[];
  // ISO8601 date string.
  date?: string;
  text: string;
  isLoading?: boolean;
}

export function Card(props: CardProps) {
  return (
    <div className="border rounded-lg border-gray-200 hover:border-teal-500 p-4 transition-colors">
      <Skeleton isLoaded={!props.isLoading}>
        <h4 className="font-semibold leading-tight truncate">
          <Link href={props.href}>{props.title}</Link>
        </h4>
      </Skeleton>

      {props.isLoading ? (
        <SkeletonText numOfLines={3} className="w-full" />
      ) : (
        <div className="flex flex-row justify-between items-center mb-1">
          {props.date !== undefined && (
            <div className="text-sm text-gray-500">
              {formatDistanceToNowStrict(new Date(props.date), {
                addSuffix: true
              })}
            </div>
          )}
          <div className="text-gray-500 font-semibold tracking-wide text-xs uppercase">
            <Tags tags={props.tags} />
          </div>
        </div>
      )}

      <div className="flex mt-2 items-center">
        {props.isLoading ? (
          <SkeletonText numOfLines={3} className="w-full" />
        ) : (
          <p className={`text-sm ${styles['card-text']}`}>{props.text}</p>
        )}
      </div>
    </div>
  );
}

// Composing functions.
function Tags(props: { tags?: string[] }) {
  const tags: ReactNode[] = [];

  if (props.tags) {
    for (let i = 0; i < props.tags.length; i++) {
      tags.push(<div className="p-1 uppercase">{props.tags[i]}</div>);

      if (i + 1 < props.tags.length) {
        tags.push(<>&bull;</>);
      }
    }
  }

  return <>{tags}</>;
}
