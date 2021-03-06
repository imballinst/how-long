import fs from 'fs/promises';
import path from 'path';
import {
  CategorizedCollectionItem,
  Collection
} from '../../../app/src/helpers/collections';
import { Dictionary } from '../../../app/src/helpers/types';

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
    path.join(directoryPath, 'items.json'),
    JSON.stringify({
      date: new Date().toISOString(),
      items: json
    }),
    'utf-8'
  );
}

// Read collection.
export async function readCollection(directoryPath: string) {
  return fs.readFile(path.join(directoryPath, 'items.json'), 'utf-8');
}

// Categorize collection.
export function categorizeCollections(collections: Collection[]) {
  const dictionary: Dictionary<CategorizedCollectionItem> = {};

  for (const collection of collections) {
    const { parentTitle, category } = collection;

    if (dictionary[category] === undefined) {
      // Initialize.
      dictionary[category] = {
        title: parentTitle,
        slug: category,
        collections: []
      };
    }

    dictionary[category].collections.push(collection);
  }

  return Object.values(dictionary);
}

// Helper functions.
async function doesPathExist(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch (err) {
    return false;
  }
}
