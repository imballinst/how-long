import path from 'path';
import { getDirectoriesAndCollections } from './collections';

const PATH_TO_COLLECTIONS = path.join(__dirname, 'test-collections');

it('getDirectoriesAndCollections', async () => {
  const collection = await getDirectoriesAndCollections(PATH_TO_COLLECTIONS);

  expect(
    collection.folders.since.folders.arsenal.files['last-won-a-match']
  ).toBeDefined();
  expect(
    collection.folders.until.folders.arsenal.files['win-premier-league']
  ).toBeDefined();
});
