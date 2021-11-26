import { useRef } from 'react';

import { Directory } from './Directory';
import { Link } from '../Links';
import { Collection, groupCollectionsByTime } from '../../helpers/collections';

export function CategoryDirectories({
  pathname = '',
  updateDate,
  collections,
  title
}: {
  pathname?: string;
  updateDate: string;
  collections: Collection[];
  title?: string;
}) {
  const date = useRef(new Date(updateDate)).current;
  const timedCollection = useRef(
    groupCollectionsByTime(collections, date)
  ).current;
  let sinceUntilSuffix = '';

  if (pathname.slice(1).length > 0) {
    sinceUntilSuffix = `/${pathname.slice(1).split('/').slice(1).join('/')}`;
  }

  return (
    <div className="p-4 flex flex-col h-full">
      <div className="flex-0 mb-8">
        <div className="flex flex-row justify-between items-end">
          <h2 className="text-2xl font-bold">{title}</h2>

          <Link href={`/since${sinceUntilSuffix}`}>View all</Link>
        </div>

        <hr className="h-4 mt-2 mb-4" />

        <Directory
          cards={timedCollection.since.map((file) => ({
            title: file.title,
            text: file.events[0].description,
            date: file.events[0].datetime,
            href: file.path
          }))}
        />
      </div>

      <div className="flex flex-1 flex-col justify-end items-center italic text-sm text-gray-500">
        Last updated at {date.toISOString()}
      </div>
    </div>
  );
}
