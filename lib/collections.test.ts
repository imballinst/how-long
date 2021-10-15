import path from 'path';
import fs from 'fs/promises';
import {
  getDirectoriesAndCollections,
  CollectionType,
  generateCollection
} from './collections';

const PATH_TO_COLLECTIONS = path.join(__dirname, 'test-collections');
let expectedCollection: CollectionType;

test('getDirectoriesAndCollections', async () => {
  const { collection, date } = await getDirectoriesAndCollections(
    PATH_TO_COLLECTIONS
  );

  expectedCollection = collection;

  // Check top level.
  expect(Object.keys(collection.folders.arsenal).length).toBeGreaterThan(0);
  expect(collection.files.since['since/arsenal/won-a-match']).toBeDefined();
  expect(
    collection.files.until['until/arsenal/win-premier-league']
  ).toBeDefined();
  expect(Object.keys(collection.files.exact).length).toBe(0);

  // Check second level.
  expect(Object.keys(collection.folders.arsenal.folders).length).toBe(0);
  expect(
    Object.keys(collection.folders.arsenal.files.since).length
  ).toBeGreaterThan(0);
  expect(
    Object.keys(collection.folders.arsenal.files.until).length
  ).toBeGreaterThan(0);
  expect(Object.keys(collection.folders.arsenal.files.exact).length).toBe(0);

  expect(typeof date === 'string').toBe(true);
});

test('generateCollection', async () => {
  await generateCollection(PATH_TO_COLLECTIONS, expectedCollection);

  const resultCollection = await fs.readFile(
    path.join(PATH_TO_COLLECTIONS, 'collection.json'),
    'utf-8'
  );
  expect(resultCollection).toBe(JSON.stringify(expectedCollection));
});
