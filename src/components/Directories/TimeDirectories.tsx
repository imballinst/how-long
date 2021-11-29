import { useRef } from 'react';

import { Collection, groupCollectionsByTime } from '../../helpers/collections';
import { DirectorySegment } from '.';

export function TimeDirectory({
  updateDate,
  collections
}: {
  updateDate: string;
  collections: Collection[];
}) {
  const date = useRef(new Date(updateDate)).current;
  const timedCollection = useRef(
    groupCollectionsByTime({
      rawCollections: collections,
      currentDate: date
    })
  ).current;

  return (
    <div className="p-4 flex flex-col h-full">
      <div className="flex-0 mb-8">
        <DirectorySegment
          collections={timedCollection.since}
          title="Since"
          titleCardPrefix="Since "
          slug="since"
          numOfCards={3}
        />
      </div>

      <div className="flex-0">
        <DirectorySegment
          collections={timedCollection.until}
          title="Until"
          titleCardPrefix="Until "
          slug="until"
          numOfCards={3}
        />
      </div>

      <div className="flex flex-1 flex-col justify-end items-center italic text-sm text-gray-500">
        Last updated at {date.toISOString()}
      </div>
    </div>
  );
}
