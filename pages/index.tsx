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
      <Box as="h1" fontSize="1.5rem" fontWeight={700} mb={4}>
        Since{' '}
        <InternalLink href="/since" ml={4}>
          View all
        </InternalLink>
      </Box>

      {
        <Directory
          cards={Object.keys(directory.files).map((file) => ({
            title: directory.files[file].title,
            text: directory.files[file].events[0].description,
            date: directory.files[file].events[0].datetime,
            href: `${file}`
          }))}
        />
      }
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
