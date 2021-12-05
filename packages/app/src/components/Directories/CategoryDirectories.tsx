import { CategorizedCollectionItem } from '../../helpers/collections';
import { DirectorySegment, DirectorySegmentProps } from '.';
import { Text } from '../Typography';

export function CategoryDirectories({
  viewAllSlugPrefix = '',
  updateDate,
  items,
  title,
  numOfCards = 3,
  titleCardPrefixes
}: {
  viewAllSlugPrefix?: string;
  updateDate: string;
  items: CategorizedCollectionItem[];
  title?: string;
  numOfCards?: number;
  titleCardPrefixes: DirectorySegmentProps['titleCardPrefixes'];
}) {
  return (
    <div className="sm:p-4 flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4 dark:text-gray-200">{title}</h2>

      {items.map((item) => (
        <div className="flex-0 mb-8" key={item.slug}>
          <DirectorySegment
            collections={item.collections}
            title={item.title}
            slug={`${viewAllSlugPrefix}/${item.slug}`}
            numOfCards={numOfCards}
            titleCardPrefixes={titleCardPrefixes}
          />
        </div>
      ))}

      <Text
        colorScheme="gray"
        className="flex flex-1 flex-col justify-end items-center italic text-sm"
      >
        Last updated at {updateDate}
      </Text>
    </div>
  );
}
