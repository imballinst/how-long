import { Directory } from '../Directory';
import { Link } from '../Links';
import { TimedCollection } from '../../helpers/collections';

export function TimeDirectories({
  pathname = '',
  timedCollection
}: {
  pathname?: string;
  timedCollection: TimedCollection;
}) {
  let sinceUntilSuffix = '';

  if (pathname.slice(1).length > 0) {
    sinceUntilSuffix = `/${pathname.slice(1).split('/').slice(1).join('/')}`;
  }

  return (
    <div className="p-4">
      <div className="mb-8">
        <div className="flex flex-row justify-between items-end">
          <h2 className="text-2xl font-bold">Since</h2>

          <Link href={`/since${sinceUntilSuffix}`}>View all</Link>
        </div>

        <hr className="h-4 mt-2 mb-4" />

        <Directory
          cards={timedCollection.since.map((file) => ({
            title: file.title,
            text: file.events[0].description,
            date: file.events[0].datetime,
            href: `${file.path}`
          }))}
        />
      </div>

      <div>
        <div className="flex flex-row justify-between items-end">
          <h2 className="text-2xl font-bold">Until</h2>

          <Link href={`/since${sinceUntilSuffix}`}>View all</Link>
        </div>

        <hr className="h-4 mt-2 mb-4" />

        <Directory
          cards={timedCollection.until.map((file) => ({
            title: file.title,
            text: file.events[0].description,
            date: file.events[0].datetime,
            href: `${file}`
          }))}
        />
      </div>
    </div>
  );
}
