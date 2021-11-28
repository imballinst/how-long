import { useRef } from 'react';

import { Collection, groupCollectionsByTime } from '../../helpers/collections';
import { DirectorySegment, DirectorySegmentProps } from '.';

export function TimeDirectory({
  updateDate,
  collections,
  cardLinkIncludedProperties
}: {
  updateDate: string;
  collections: Collection[];
  cardLinkIncludedProperties: DirectorySegmentProps['cardLinkIncludedProperties'];
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
          cardLinkIncludedProperties={cardLinkIncludedProperties}
        />
      </div>

      <div className="flex-0">
        <DirectorySegment
          collections={timedCollection.until}
          title="Until"
          titleCardPrefix="Until "
          slug="until"
          numOfCards={3}
          cardLinkIncludedProperties={cardLinkIncludedProperties}
        />
      </div>

      <div className="flex flex-1 flex-col justify-end items-center italic text-sm text-gray-500">
        Last updated at {date.toISOString()}
      </div>
    </div>
  );
}
