import path from 'path';
import {
  getAllCollections,
  generateCollection,
  readCollection,
  CategorizedCollectionItem
} from '.';

const PATH_TO_COLLECTIONS = path.join(__dirname, 'test-collections');
let expectedCollections: CategorizedCollectionItem[];

test('getAllCollections', async () => {
  const result = await getAllCollections(PATH_TO_COLLECTIONS);
  expectedCollections = result;

  expect(result.length).toBe(1);
  expect(result[0].category).toBe('Arsenal');
  expect(result[0].slug).toBe('arsenal');
  expect(result[0].collections.length).toBe(2);

  expect(result[0].collections[0].title).toBe('Arsenal Win Premier League');
  expect(result[0].collections[0].path).toBe('/arsenal/win-premier-league');

  expect(result[0].collections[1].title).toBe('Arsenal Last Won a Match');
  expect(result[0].collections[1].path).toBe('/arsenal/won-a-match');
});

test('generateCollection', async () => {
  await generateCollection(PATH_TO_COLLECTIONS, expectedCollections);

  const resultCollection = await readCollection(PATH_TO_COLLECTIONS);
  expect(resultCollection).toBe(JSON.stringify(expectedCollections));
});
