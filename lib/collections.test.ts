import path from 'path';
import { getDirectoriesAndCollections } from './collections';

const PATH_TO_COLLECTIONS = path.join(__dirname, 'test-collections');

it('getDirectoriesAndCollections', async () => {
  const collection = await getDirectoriesAndCollections(PATH_TO_COLLECTIONS);

  expect(collection.folders.since).toBeDefined();
  expect(collection.files['since/arsenal/last-won-a-match']).toBeDefined();
  expect(collection.folders.until).toBeDefined();
  expect(collection.files['until/arsenal/win-premier-league']).toBeDefined();

  expect(collection.folders.since.folders.arsenal).toBeDefined();
  expect(
    collection.folders.since.files['since/arsenal/last-won-a-match']
  ).toBeDefined();
  expect(collection.folders.until.folders.arsenal).toBeDefined();
  expect(
    collection.folders.until.files['until/arsenal/win-premier-league']
  ).toBeDefined();

  expect(
    collection.folders.since.folders.arsenal.files[
      'since/arsenal/last-won-a-match'
    ]
  ).toBeDefined();
  expect(
    collection.folders.until.folders.arsenal.files[
      'until/arsenal/win-premier-league'
    ]
  ).toBeDefined();
});
