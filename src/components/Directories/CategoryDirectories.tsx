import { Directory } from './Directory';
import { Link } from '../Links';
import { CategorizedCollectionItem } from '../../helpers/collections';

export function CategoryDirectories({
  pathname = '',
  updateDate,
  items,
  title
}: {
  pathname?: string;
  updateDate: string;
  items: CategorizedCollectionItem[];
  title?: string;
}) {
  let sinceUntilSuffix = '';

  if (pathname.slice(1).length > 0) {
    sinceUntilSuffix = `/${pathname.slice(1).split('/').slice(1).join('/')}`;
  }

  return (
    <div className="p-4 flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      {items.map((item) => (
        <div className="flex-0 mb-8" key={item.slug}>
          <div className="flex flex-row justify-between items-end">
            <h3 className="text-xl font-bold">{item.title}</h3>

            <Link href={`/since${sinceUntilSuffix}`}>View all</Link>
          </div>

          <hr className="h-4 mt-2 mb-4" />

          <Directory
            cards={item.collections.map((collection) => ({
              title: collection.title,
              text: collection.events[0].description,
              date: collection.events[0].datetime,
              href: collection.path
            }))}
          />
        </div>
      ))}

      <div className="flex flex-1 flex-col justify-end items-center italic text-sm text-gray-500">
        Last updated at {updateDate}
      </div>
    </div>
  );
}
