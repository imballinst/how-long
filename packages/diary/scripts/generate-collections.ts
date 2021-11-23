import path from 'path';
// The auto import works because of https://stackoverflow.com/a/68453073.
import { generateCollection, getAllCollections } from '@how-long/collections';

const PATH_TO_COLLECTIONS = path.join(__dirname, '../collections');
const PATH_TO_PUBLIC = path.join(__dirname, '../public');

async function main() {
  const result = await getAllCollections(PATH_TO_COLLECTIONS);
  await generateCollection(PATH_TO_PUBLIC, result);

  // TODO(imballinst): as the collection goes larger, we need to separate
  // to each category.
}

main();
