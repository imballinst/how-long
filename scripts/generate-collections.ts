import path from 'path';
import {
  generateCollection,
  getAllCollections
} from '../lib/collections/server';

const PATH_TO_COLLECTIONS = path.join(__dirname, '../collections');

async function main() {
  const result = await getAllCollections(PATH_TO_COLLECTIONS);
  await generateCollection(PATH_TO_COLLECTIONS, result);

  // TODO(imballinst): as the collection goes larger, we need to separate
  // to each category.
}

main();
