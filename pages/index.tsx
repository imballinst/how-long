import { Box } from '@chakra-ui/react';
import { useEffect } from '@storybook/addons';
import { useState } from 'react';
import { Directory } from '../components/Directory';
import { Layout } from '../components/Layout';
import { InternalLink } from '../components/Links';
import { TimedCollection } from '../lib/collections/client';
import { Collection } from '../lib/collections/types';

const Home = () => {
  const [timedCollection, setTimedCollection] = useState<
    TimedCollection | undefined
  >();

  useEffect(() => {
    async function getTimedCollection() {}

    getTimedCollection();
  }, []);

  return (
    <Layout subtitle="Home">
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

          <InternalLink href="/since">View all</InternalLink>
        </Box>

        <Box as="hr" height={1} mt={2} mb={4} />

        {
          <Directory
            cards={Object.keys(directory.collection.files.since).map(
              (file) => ({
                title: directory.collection.files.since[file].title,
                text: directory.collection.files.since[file].events[0]
                  .description,
                date: directory.collection.files.since[file].events[0].datetime,
                href: `${file}`
              })
            )}
          />
        }
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

          <InternalLink href="/until">View all</InternalLink>
        </Box>

        <Box as="hr" height={1} mt={2} mb={4} />

        {
          <Directory
            cards={Object.keys(directory.collection.files.until).map(
              (file) => ({
                title: directory.collection.files.until[file].title,
                text: directory.collection.files.until[file].events[0]
                  .description,
                date: directory.collection.files.until[file].events[0].datetime,
                href: `${file}`
              })
            )}
          />
        }
      </Box>
    </Layout>
  );
};

export default Home;
