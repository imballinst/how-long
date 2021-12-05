import {
  generateCollection,
  categorizeCollections
} from './collections/json.js';
import { convertMarkdownsInDirectoryToJson } from './collections/markdown.js';

const PATH_TO_COLLECTIONS = new URL('../../../collections', import.meta.url);
const PATH_TO_STATIC = new URL('../../app/src/static', import.meta.url);

async function main() {
  const collections = await convertMarkdownsInDirectoryToJson({
    directory: PATH_TO_COLLECTIONS.pathname
  });
  const result = await categorizeCollections(collections);
  await generateCollection(PATH_TO_STATIC.pathname, result);

  // TODO(imballinst): as the collection goes larger, we need to separate
  // to each category.
}

main();
