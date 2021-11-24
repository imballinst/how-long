import path from 'path';
import {
  getAllCollections,
  groupCollectionsByName,
  generateCollection,
  readCollection
} from '.';
import { Collection } from '../../src/helpers/collections/types';

const PATH_TO_COLLECTIONS = path.join(__dirname, 'test-collections');
let expectedCollections: Collection[];

test('getAllCollections', async () => {
  const collections = await getAllCollections(PATH_TO_COLLECTIONS);

  expectedCollections = collections;

  expect(collections.length).toBe(2);
});

test('groupCollectionsByName', async () => {
  const grouped = groupCollectionsByName(expectedCollections);

  expect(grouped['arsenal/won-a-match']).toBeDefined();
  expect(grouped['arsenal/win-premier-league']).toBeDefined();
});

test('generateCollection', async () => {
  await generateCollection(PATH_TO_COLLECTIONS, expectedCollections);

  const resultCollection = await readCollection(PATH_TO_COLLECTIONS);
  expect(resultCollection).toBe(JSON.stringify(expectedCollections));
});
