import { useEffect, useState } from 'react';
import ky from 'ky';
import {
  Collection,
  groupCollectionsByTime,
  TimedCollection
} from '@how-long/collections';

import { Directory } from '../Directory';
import { Link } from '../Links';

interface TimedCollectionResponse {
  title: string;
  collections: Collection[];
}

export function TimeDirectories({ pathname = '' }: { pathname?: string }) {
  const [timedCollection, setTimedCollection] = useState<
    TimedCollection | undefined
  >();
  const [title, setTitle] = useState<string | undefined>();

  useEffect(() => {
    async function getTimedCollection() {
      const prefix =
        pathname.slice(1).length > 0
          ? `${pathname.slice(1).replace(/\//g, '-')}--`
          : '';
      const response = await ky(`/${prefix}collection.json`);
      const { title, collections }: TimedCollectionResponse =
        await response.json();

      // In this screen, we don't need to update so often.
      setTimedCollection(groupCollectionsByTime(collections, new Date()));
      setTitle(title);
    }

    getTimedCollection();
  }, [pathname]);

  let sinceUntilSuffix = '';

  if (pathname.slice(1).length > 0) {
    sinceUntilSuffix = `/${pathname.slice(1).split('/').slice(1).join('/')}`;
  }

  if (title === undefined) {
    return null;
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex flex-row justify-center items-center">
          <h2 className="text-2xl font-bold">Since</h2>

          <Link href={`/since${sinceUntilSuffix}`}>View all</Link>
        </div>

        <hr className="h-4 mt-2 mb-4" />

        <Directory
          cards={timedCollection?.since.map((file) => ({
            title: file.title,
            text: file.events[0].description,
            date: file.events[0].datetime,
            href: `${file.path}`
          }))}
          showSkeleton={timedCollection === undefined}
        />
      </div>

      <div>
        <div className="flex flex-row justify-center items-center">
          <h2 className="text-2xl font-bold">Until</h2>

          <Link href={`/since${sinceUntilSuffix}`}>View all</Link>
        </div>

        <hr className="h-4 mt-2 mb-4" />

        <Directory
          cards={timedCollection?.until.map((file) => ({
            title: file.title,
            text: file.events[0].description,
            date: file.events[0].datetime,
            href: `${file}`
          }))}
          showSkeleton={timedCollection === undefined}
        />
      </div>
    </div>
  );
}
