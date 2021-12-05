import { useRef } from 'react';

import { Collection, groupCollectionsByTime } from '../../helpers/collections';
import { Text } from '../Typography';
import { DirectorySegment, DirectorySegmentProps } from './Directory';

export function TimeDirectory({
  updateDate,
  collections,
  slugSuffix = '',
  sinceTitleCardPrefixes,
  untilTitleCardPrefixes
}: {
  updateDate: string;
  slugSuffix?: string;
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
    <div className="sm:p-4 flex flex-col h-full">
      {timedCollection.since.length > 0 && (
        <div className="flex-0 mb-8">
          <DirectorySegment
            collections={timedCollection.since}
            title="Since"
            titleCardPrefixes={sinceTitleCardPrefixes}
            slug={`since${slugSuffix}`}
            numOfCards={3}
          />
        </div>
      )}

      {timedCollection.until.length > 0 && (
        <div className="flex-0">
          <DirectorySegment
            collections={timedCollection.until}
            title="Until"
            titleCardPrefixes={untilTitleCardPrefixes}
            slug={`until${slugSuffix}`}
            numOfCards={3}
          />
        </div>
      )}

      <Text
        colorScheme="gray"
        className="flex flex-1 flex-col justify-end items-center italic text-sm"
      >
        Last updated at {date.toISOString()}
      </Text>
    </div>
  );
}
