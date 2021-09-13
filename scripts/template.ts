import fs from 'fs';
import path from 'path';

import { getCollections } from './collections';

const PATH_TO_PAGES = path.join(__dirname, '../pages');

(async () => {
  const collections = getCollections();

  for (const collection of collections) {
    const filePath = path.join(PATH_TO_PAGES, collection.path);
    // +1 because of `pages` directory depth.
    const filePathDepth = collection.path.split('/').length;
    let importPath = 'components/Timer';

    for (let i = 0; i < filePathDepth; i++) {
      importPath = `../${importPath}`;
    }

    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    const rendered = generateTemplate(
      importPath,
      collection.content.events[0].datetime
    );

    fs.writeFileSync(`${filePath}.tsx`, rendered, { encoding: 'utf-8' });
  }
})();

function generateTemplate(importPath: string, date: string) {
  return `
import { Timer } from '${importPath}';

export default function Template() {
  return <Timer date="${date}" />;
}
  `.trim();
}
