import path from 'path';
import fs from 'fs/promises';
import {
  readCollection,
  categorizeCollections,
  generateCollection
} from './json';
import { CategorizedCollectionItem } from '../../src/helpers/collections';

const PATH_TO_COLLECTIONS = path.join(__dirname, 'test-collections');
let expectedCollections: CategorizedCollectionItem[];

test('getAllCollections', async () => {
  const lastWonAMatch = await fs.readFile(
    path.join(PATH_TO_COLLECTIONS, 'arsenal/last-won-a-match.json'),
    'utf-8'
  );
  const winPremierLeague = await fs.readFile(
    path.join(PATH_TO_COLLECTIONS, 'arsenal/win-premier-league.json'),
    'utf-8'
  );

  const lastWonAMatchJson = JSON.parse(lastWonAMatch);
  const winPremierLeagueJson = JSON.parse(winPremierLeague);

  const categorized = categorizeCollections([
    lastWonAMatchJson,
    winPremierLeagueJson
  ]);
  expectedCollections = categorized;

  expect(categorized.length).toBe(1);
  expect(categorized[0].title).toBe('Arsenal');
  expect(categorized[0].slug).toBe('arsenal');
  expect(categorized[0].collections.length).toBe(2);

  expect(categorized[0].collections[0].title).toBe('Last Won a Match');
  expect(categorized[0].collections[0].slug).toBe('arsenal/last-won-a-match');
  expect(categorized[0].collections[1].title).toBe('Win Premier League');
  expect(categorized[0].collections[1].slug).toBe('arsenal/win-premier-league');
});

test('generateCollection', async () => {
  await generateCollection(PATH_TO_COLLECTIONS, expectedCollections);

  const resultCollection = await readCollection(PATH_TO_COLLECTIONS);
  expect(resultCollection).toBe(JSON.stringify(expectedCollections));
});
