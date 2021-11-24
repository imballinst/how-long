import fs from 'fs/promises';
import type { Dirent } from 'fs';
import path from 'path';
import { Collection } from '../../src/helpers/collections';

interface CategorizedCollection {
  [index: string]: Collection[];
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
export function groupCollectionsByName(
  rawCollections: Collection[]
): CategorizedCollection {
  const categorizedCollection: CategorizedCollection = {};

  for (const collection of rawCollections) {
    if (categorizedCollection[collection.path] === undefined) {
      categorizedCollection[collection.path] = [];
    }

    categorizedCollection[collection.path].push(collection);
  }

  return categorizedCollection;
}

export async function getAllCollections(directoryPath: string) {
  const collections: Collection[] = [];
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
      entry,
      entryPath: `${directoryPath}/${entry.name}`,
      basePath: directoryPath
    });
    collections.push(...result);
  }

  return collections;
}

// Helper functions.
async function getCollectionsFromFolder({
  entry,
  entryPath,
  basePath
}: {
  entry: Dirent;
  entryPath: string;
  basePath: string;
}): Promise<Collection[]> {
  const collections: Collection[] = [];

  if (entry.isDirectory()) {
    const dirEntries = await fs.readdir(entryPath, {
      encoding: 'utf-8',
      withFileTypes: true
    });

    for (const dirEntry of dirEntries) {
      const result = await getCollectionsFromFolder({
        entry: dirEntry,
        entryPath: `${entryPath}/${dirEntry.name}`,
        basePath
      });

      collections.push(...result);
    }

    return collections;
  }

  const fileContent = await fs.readFile(entryPath, 'utf-8');
  const json: Collection = {
    ...JSON.parse(fileContent),
    path: trimJsonExtension(entryPath.slice(basePath.length + 1))
  };

  return [json];
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
