import { useRef } from 'react';

import { Collection, groupCollectionsByTime } from '../../helpers/collections';
import { DirectorySegment, DirectorySegmentProps } from './Directory';

export function TimeDirectory({
  updateDate,
  collections,
  sinceTitleCardPrefixes,
  untilTitleCardPrefixes
}: {
  updateDate: string;
  collections: Collection[];
  sinceTitleCardPrefixes: DirectorySegmentProps['titleCardPrefixes'];
  untilTitleCardPrefixes: DirectorySegmentProps['titleCardPrefixes'];
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
          titleCardPrefixes={sinceTitleCardPrefixes}
          slug="since"
          numOfCards={3}
        />
      </div>

      <div className="flex-0">
        <DirectorySegment
          collections={timedCollection.until}
          title="Until"
          titleCardPrefixes={untilTitleCardPrefixes}
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
