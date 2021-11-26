import { Dirent } from 'fs';
import fs from 'fs/promises';
import path from 'path';
import { Collection } from '../../src/helpers/collections';

export interface CategorizedCollectionItem {
  title: string;
  slug: string;
  collections: Collection[];
}

interface CollectionEntry {
  title: string;
}

// Generate collection.
export async function generateCollection<TCollectionType>(
  directoryPath: string,
  json: TCollectionType
) {
  const isExists = await doesPathExist(directoryPath);

  if (!isExists) {
    await fs.mkdir(directoryPath, { recursive: true });
  }

  return fs.writeFile(
    path.join(directoryPath, 'collection.json'),
    JSON.stringify(json),
    'utf-8'
  );
}

// Read collection.
export async function readCollection(directoryPath: string) {
  return fs.readFile(path.join(directoryPath, 'collection.json'), 'utf-8');
}

// Create collection.
export async function getAllCollections(directoryPath: string) {
  const categorizedCollections: CategorizedCollectionItem[] = [];
  const entries = await fs.readdir(directoryPath, {
    encoding: 'utf-8',
    withFileTypes: true
  });

  for (const entry of entries) {
    // Ignore top-level collection.json.
    if (entry.name === 'collection.json') {
      continue;
    }

    const result = await getCollectionsFromFolder({
      pathToFile: `${directoryPath}/${entry.name}`,
      basePath: directoryPath
    });
    categorizedCollections.push(result);
  }

  return categorizedCollections;
}

// Helper functions.
async function getCollectionsFromFolder({
  pathToFile,
  basePath
}: {
  pathToFile: string;
  basePath: string;
}): Promise<CategorizedCollectionItem> {
  const categorizedCollection: CategorizedCollectionItem = {
    title: '',
    slug: '',
    collections: []
  };
  const dirEntries = await fs.readdir(pathToFile, {
    encoding: 'utf-8',
    withFileTypes: true
  });

  const entryFileIndex = dirEntries.findIndex((e) =>
    e.name.endsWith('index.json')
  );
  let entryFile: Dirent | undefined;

  if (entryFileIndex !== -1) {
    entryFile = dirEntries.splice(entryFileIndex, 1)[0];
  }

  const slug = trimJsonExtension(path.basename(pathToFile));
  categorizedCollection.slug = trimJsonExtension(path.basename(pathToFile));

  // Read entry file.
  if (entryFile) {
    const entryJson: CollectionEntry = await readFileAsJson(
      `${pathToFile}/${entryFile.name}`
    );
    categorizedCollection.title = entryJson.title;
  } else {
    // Fallback to use slug.
    categorizedCollection.title = slug;
  }

  // Read the rest of collections.
  const collections = await Promise.all(
    dirEntries.map((e) => {
      const fullPath = `${pathToFile}/${e.name}`;
      return readFileAsCollection(
        fullPath,
        trimJsonExtension(fullPath.slice(basePath.length))
      );
    })
  );
  categorizedCollection.collections = collections;

  return categorizedCollection;
}

const JSON_EXTENSION = '.json';

function trimJsonExtension(fileName: string) {
  if (fileName.endsWith(JSON_EXTENSION)) {
    return fileName.slice(0, -JSON_EXTENSION.length);
  }

  return fileName;
}

async function doesPathExist(path: string) {
  try {
    await fs.access(path);
    return true;
  } catch (err) {
    return false;
  }
}

async function readFileAsJson(path: string) {
  const content = await fs.readFile(path, 'utf-8');
  return JSON.parse(content);
}

async function readFileAsCollection(path: string, route: string) {
  const json: Collection = await readFileAsJson(path);
  json.path = route;

  return json;
}
