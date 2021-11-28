import { CategorizedCollectionItem } from '../../helpers/collections';
import { DirectorySegment } from '.';

export function CategoryDirectories({
  expression = '',
  updateDate,
  items,
  title
}: {
  expression?: string;
  updateDate: string;
  items: CategorizedCollectionItem[];
  title?: string;
}) {
  return (
    <div className="p-4 flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      {items.map((item) => (
        <div className="flex-0 mb-8" key={item.slug}>
          <DirectorySegment
            collections={item.collections}
            title={item.title}
            slug={`${expression}/${item.slug}`}
            numOfCards={3}
          />
        </div>
      ))}

      <div className="flex flex-1 flex-col justify-end items-center italic text-sm text-gray-500">
        Last updated at {updateDate}
      </div>
    </div>
  );
}
