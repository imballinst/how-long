import { Dirent } from 'fs';
import fs from 'fs/promises';
import path from 'path';
import {
  CategorizedCollectionItem,
  Collection
} from '../../src/helpers/collections';

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
  categorizedCollection.slug = slug;

  // Read the rest of collections.
  const collections = await Promise.all(
    dirEntries.map((e) => {
      const fullPath = `${pathToFile}/${e.name}`;
      return readFileAsCollection({
        filePath: fullPath,
        route: trimJsonExtension(fullPath.slice(basePath.length)),
        parentTitle: categorizedCollection.title,
        category: slug
      });
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

async function doesPathExist(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch (err) {
    return false;
  }
}

async function readFileAsJson(filePath: string) {
  const content = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(content);
}

async function readFileAsCollection({
  filePath,
  route,
  category,
  parentTitle
}: {
  filePath: string;
  route: string;
  category: string;
  parentTitle: string;
}) {
  const json: Collection = await readFileAsJson(filePath);
  json.slug = path.basename(route);
  json.category = category;
  json.parentTitle = parentTitle;

  return json;
}
