import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ky from 'ky';

import { Directory } from '../Directory';
import { Layout } from '../Layout';
import { InternalLink } from '../Links';
import {
  groupCollectionsByTime,
  TimedCollection
} from '../../lib/collections/client';
import { Collection } from '../../lib/collections/types';

export function TimeDirectories({
  title,
  pathname = ''
}: {
  title: string;
  pathname?: string;
}) {
  const [timedCollection, setTimedCollection] = useState<
    TimedCollection | undefined
  >();

  useEffect(() => {
    async function getTimedCollection() {
      const prefix =
        pathname.slice(1).length > 0
          ? `${pathname.slice(1).replace(/\//g, '-')}--`
          : '';
      const response = await ky(`/${prefix}collection.json`);
      const collection: Collection[] = await response.json();

      // In this screen, we don't need to update so often.
      setTimedCollection(groupCollectionsByTime(collection, new Date()));
    }

    getTimedCollection();
  }, [pathname]);

  let sinceUntilSuffix = '';

  if (pathname.slice(1).length > 0) {
    sinceUntilSuffix = `/${pathname.slice(1).split('/').slice(1).join('/')}`;
  }

  return (
    <Layout subtitle={title}>
      <Box mb={8}>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box as="h1" fontSize="1.5rem" fontWeight={700}>
            Since
          </Box>

          <InternalLink href={`/since${sinceUntilSuffix}`}>
            View all
          </InternalLink>
        </Box>

        <Box as="hr" height={1} mt={2} mb={4} />

        <Directory
          cards={timedCollection?.since.map((file) => ({
            title: file.title,
            text: file.events[0].description,
            date: file.events[0].datetime,
            href: `${file.path}`
          }))}
          showSkeleton={timedCollection === undefined}
        />
      </Box>

      <Box>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box as="h1" fontSize="1.5rem" fontWeight={700}>
            Until
          </Box>

          <InternalLink href={`/until${sinceUntilSuffix}`}>
            View all
          </InternalLink>
        </Box>

        <Box as="hr" height={1} mt={2} mb={4} />

        <Directory
          cards={timedCollection?.until.map((file) => ({
            title: file.title,
            text: file.events[0].description,
            date: file.events[0].datetime,
            href: `${file}`
          }))}
          showSkeleton={timedCollection === undefined}
        />
      </Box>
    </Layout>
  );
}
