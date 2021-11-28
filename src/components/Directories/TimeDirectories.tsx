import { useRef } from 'react';

import { Collection, groupCollectionsByTime } from '../../helpers/collections';
import { DirectorySegment } from '.';

export function TimeDirectory({
  pathname = '',
  updateDate,
  collections
}: {
  pathname?: string;
  updateDate: string;
  collections: Collection[];
}) {
  const date = useRef(new Date(updateDate)).current;
  const timedCollection = useRef(
    groupCollectionsByTime(collections, date)
  ).current;

  return (
    <div className="p-4 flex flex-col h-full">
      <div className="flex-0 mb-8">
        <DirectorySegment
          collections={timedCollection.since}
          title="Since "
          linkPrefix="since"
          numOfCards={3}
          pathname={pathname}
        />
      </div>

      <div className="flex-0">
        <DirectorySegment
          collections={timedCollection.until}
          title="Until "
          linkPrefix="until"
          numOfCards={3}
          pathname={pathname}
        />
      </div>

      <div className="flex flex-1 flex-col justify-end items-center italic text-sm text-gray-500">
        Last updated at {date.toISOString()}
      </div>
    </div>
  );
}
