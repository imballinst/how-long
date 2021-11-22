import fs from 'fs/promises';
import type { Dirent } from 'fs';
import path from 'path';

import { isAfter, isBefore } from 'date-fns';

let ROOT = path.join(__dirname, '..');

// When the environment is development, then the working directory is
// .next/cache/server.
if (process.env.NODE_ENV !== 'test') {
  ROOT = path.join(ROOT, '../..');
}

export const COLLECTIONS = path.join(ROOT, 'collections');

interface Collection {
  format?: string;
  title: string;
  events: Array<{
    description: string;
    datetime: string;
  }>;
}

interface DirectoryDictionary {
  [index: string]: CollectionType;
}

interface CollectionDictionary {
  since: {
    [index: string]: Collection;
  };
  until: {
    [index: string]: Collection;
  };
  exact: {
    [index: string]: Collection;
  };
}

export interface CollectionType {
  folders: DirectoryDictionary;
  files: CollectionDictionary;
}

// Generate collection.
export async function generateCollection(
  directoryPath = COLLECTIONS,
  json: CollectionType
) {
  return fs.writeFile(
    path.join(directoryPath, 'collection.json'),
    JSON.stringify(json),
    'utf-8'
  );
}

// Read collection.
export async function readCollection(directoryPath = COLLECTIONS) {
  return fs.readFile(path.join(directoryPath, 'collection.json'), 'utf-8');
}

// Create collection.

// TODO(imballinst): this is "get all".
// Think about get per expression (since/until/exact) and per category.
export async function getDirectoriesAndCollections(
  directoryPath = COLLECTIONS
) {
  const currentDate = new Date();
  const collection: CollectionType = {
    files: {
      since: {},
      until: {},
      exact: {}
    },
    folders: {}
  };
  const entries = await fs.readdir(directoryPath, {
    encoding: 'utf-8',
    withFileTypes: true
  });

  for (const entry of entries) {
    // Ignore top-level collection.json.
    if (entry.name === 'collection.json') {
      continue;
    }

    const result = await recursivelyPushToCollections(
      entry,
      `${directoryPath}/${entry.name}`,
      `${entry.name}`,
      currentDate
    );

    for (const key in result.folders) {
      collection.folders[key] = result.folders[key];
    }

    for (const key in result.files.since) {
      collection.files.since[key] = result.files.since[key];
    }

    for (const key in result.files.until) {
      collection.files.until[key] = result.files.until[key];
    }

    for (const key in result.files.exact) {
      collection.files.exact[key] = result.files.exact[key];
    }
  }

  return { collection, date: currentDate.toISOString() };
}

// Helper functions.
async function recursivelyPushToCollections(
  entry: Dirent,
  entryPath: string,
  parentPath: string,
  currentDate: Date
): Promise<CollectionType> {
  const directory: CollectionType = {
    folders: {},
    files: {
      since: {},
      until: {},
      exact: {}
    }
  };

  if (entry.isDirectory()) {
    const dirEntries = await fs.readdir(entryPath, {
      encoding: 'utf-8',
      withFileTypes: true
    });

    directory.folders[entry.name] = {
      files: {
        since: {},
        until: {},
        exact: {}
      },
      folders: {}
    };

    for (const dirEntry of dirEntries) {
      const isFolder = dirEntry.isDirectory();
      const result = await recursivelyPushToCollections(
        dirEntry,
        `${entryPath}/${dirEntry.name}`,
        `${parentPath}/${isFolder ? dirEntry.name : ''}`,
        currentDate
      );

      for (const key in result.folders) {
        directory.folders[entry.name].folders[key] = result.folders[key];
      }

      for (const key in result.files.since) {
        directory.folders[entry.name].files.since[key] =
          result.files.since[key];
        directory.files.since[key] = result.files.since[key];
      }

      for (const key in result.files.until) {
        directory.folders[entry.name].files.until[key] =
          result.files.until[key];
        directory.files.until[key] = result.files.until[key];
      }

      for (const key in result.files.exact) {
        directory.folders[entry.name].files.exact[key] =
          result.files.exact[key];
        directory.files.exact[key] = result.files.exact[key];
      }
    }
  } else {
    const fileContent = await fs.readFile(entryPath, 'utf-8');
    const json: Collection = JSON.parse(fileContent);

    const lastDate = new Date(json.events[0].datetime);
    const isDateBefore = isBefore(currentDate, lastDate);
    const isDateAfter = isAfter(currentDate, lastDate);

    let key = `${parentPath}${trimJsonExtension(entry.name)}`;
    let status: keyof CollectionDictionary;

    if (isDateBefore) {
      status = 'until';
      key = `until/${key}`;
    } else if (isDateAfter) {
      status = 'since';
      key = `since/${key}`;
    } else {
      status = 'exact';
      key = `exact/${key}`;
    }

    directory.files[status][key] = json;
  }

  return directory;
}

function trimJsonExtension(fileName: string) {
  if (fileName.endsWith('.json')) {
    return fileName.slice(0, -5);
  }

  return fileName;
}
