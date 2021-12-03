import path from 'path';

import { generateCollection, getAllCollections } from './collections/json';

const PATH_TO_COLLECTIONS = path.join(__dirname, '../collections');
const PATH_TO_STATIC = path.join(__dirname, '../src/static');

async function main() {
  const result = await getAllCollections(PATH_TO_COLLECTIONS);
  await generateCollection(PATH_TO_STATIC, result);

  // TODO(imballinst): as the collection goes larger, we need to separate
  // to each category.
}

main();
