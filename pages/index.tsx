import { Box } from '@chakra-ui/react';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Directory } from '../components/Directory';
import { Layout } from '../components/Layout';
import { InternalLink } from '../components/Links';
import {
  COLLECTIONS,
  DirectoryType,
  getDirectoriesAndCollections
} from '../lib/collections';

const Home = ({
  directory
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout>
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
            cards={Object.keys(directory.folders.since.files).map((file) => ({
              title: directory.folders.since.files[file].title,
              text: directory.folders.since.files[file].events[0].description,
              date: directory.folders.since.files[file].events[0].datetime,
              href: `${file}`
            }))}
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
            cards={Object.keys(directory.folders.until.files).map((file) => ({
              title: directory.folders.until.files[file].title,
              text: directory.folders.until.files[file].events[0].description,
              date: directory.folders.until.files[file].events[0].datetime,
              href: `${file}`
            }))}
          />
        }
      </Box>
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<{
  directory: DirectoryType;
}> = async (_context) => {
  const directory = await getDirectoriesAndCollections(COLLECTIONS);

  return {
    props: {
      directory
    }
  };
};
