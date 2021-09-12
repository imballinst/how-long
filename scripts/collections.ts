import fs from 'fs';
import path from 'path';

const ROOT = path.join(__dirname, '..');
const COLLECTIONS = path.join(ROOT, 'collections');

interface Collection {
  path: string;
  content: any;
}

function convertCollectionsIntoPages() {
  const collections: Collection[] = [];
  const entries = fs.readdirSync(COLLECTIONS, {
    encoding: 'utf-8',
    withFileTypes: true
  });

  for (const entry of entries) {
    recursivelyPushToCollections(
      collections,
      entry,
      `${COLLECTIONS}/${entry.name}`
    );
  }

  console.log(collections);
}

function recursivelyPushToCollections(
  array: Collection[],
  entry: fs.Dirent,
  entryPath: string
) {
  if (entry.isDirectory()) {
    const dirEntries = fs.readdirSync(entryPath, {
      encoding: 'utf-8',
      withFileTypes: true
    });

    for (const dirEntry of dirEntries) {
      recursivelyPushToCollections(
        array,
        dirEntry,
        `${entryPath}/${dirEntry.name}`
      );
    }
  } else {
    const fileContent = fs.readFileSync(entryPath, 'utf-8');
    const json = JSON.parse(fileContent);

    array.push({
      // Trim the path to `COLLECTIONS` and the extension.
      path: entryPath.substring(COLLECTIONS.length + 1, entryPath.length - 5),
      content: json
    });
  }
}

convertCollectionsIntoPages();
