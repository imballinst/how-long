import path from 'path';

import { generateCollection, categorizeCollections } from './collections/json';
import { convertMarkdownsInDirectoryToJson } from './collections/markdown';

const PATH_TO_COLLECTIONS = path.join(__dirname, '../collections');
const PATH_TO_STATIC = path.join(__dirname, '../src/static');

async function main() {
  const collections = await convertMarkdownsInDirectoryToJson({
    directory: PATH_TO_COLLECTIONS
  });
  const result = await categorizeCollections(collections);
  await generateCollection(PATH_TO_STATIC, result);

  // TODO(imballinst): as the collection goes larger, we need to separate
  // to each category.
}

main();
