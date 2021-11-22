import path from 'path';
import {
  generateCollection,
  getAllCollections
} from '../lib/collections/server';

const PATH_TO_COLLECTIONS = path.join(__dirname, '../collections');
const PATH_TO_PUBLIC = path.join(__dirname, '../public/collection.json');

async function main() {
  const result = await getAllCollections(PATH_TO_COLLECTIONS);
  await generateCollection(PATH_TO_PUBLIC, result);

  // TODO(imballinst): as the collection goes larger, we need to separate
  // to each category.
}

main();
