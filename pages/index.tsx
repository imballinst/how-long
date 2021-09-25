import { Box } from '@chakra-ui/react';
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage
} from 'next';
import { Directory } from '../components/Directory';
import { Layout } from '../components/Layout';
import { COLLECTIONS, getDirectoriesAndCollections } from '../lib/collections';

const Home: NextPage = ({
  directory
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout>
      <Box p={4}>
        <Box as="h1" fontSize="2rem" fontWeight={700} mb={4}>
          Since
        </Box>

        {
          <Directory
            cards={Object.keys(directory.folders).map((folder) => ({
              title: folder,
              text: folder
            }))}
          />
        }
      </Box>
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const directory = await getDirectoriesAndCollections(COLLECTIONS);

  return {
    props: {
      directory
    }
  };
};
