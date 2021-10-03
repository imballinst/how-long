import fs from 'fs/promises';
import type { Dirent } from 'fs';
import path from 'path';

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
  [index: string]: DirectoryType;
}
interface CollectionDictionary {
  [index: string]: Collection;
}

export interface DirectoryType {
  folders: DirectoryDictionary;
  files: CollectionDictionary;
}

export async function getDirectoriesAndCollections(
  directoryPath = COLLECTIONS
) {
  const directory: DirectoryType = {
    files: {},
    folders: {}
  };
  const entries = await fs.readdir(directoryPath, {
    encoding: 'utf-8',
    withFileTypes: true
  });

  for (const entry of entries) {
    const result = await recursivelyPushToCollections(
      entry,
      `${directoryPath}/${entry.name}`,
      `${entry.name}`
    );

    for (const key in result.folders) {
      directory.folders[key] = result.folders[key];
    }

    for (const key in result.files) {
      directory.files[key] = result.files[key];
    }
  }

  return directory;
}

// Helper functions.
async function recursivelyPushToCollections(
  entry: Dirent,
  entryPath: string,
  parentPath: string
): Promise<DirectoryType> {
  const directory: DirectoryType = {
    folders: {},
    files: {}
  };

  if (entry.isDirectory()) {
    const dirEntries = await fs.readdir(entryPath, {
      encoding: 'utf-8',
      withFileTypes: true
    });

    directory.folders[entry.name] = {
      files: {},
      folders: {}
    };

    for (const dirEntry of dirEntries) {
      const isFolder = dirEntry.isDirectory();
      const result = await recursivelyPushToCollections(
        dirEntry,
        `${entryPath}/${dirEntry.name}`,
        `${parentPath}/${isFolder ? dirEntry.name : ''}`
      );

      for (const key in result.folders) {
        directory.folders[entry.name].folders[key] = result.folders[key];
      }

      for (const key in result.files) {
        directory.folders[entry.name].files[key] = result.files[key];
        directory.files[key] = result.files[key];
      }
    }
  } else {
    const fileContent = await fs.readFile(entryPath, 'utf-8');
    const json = JSON.parse(fileContent);

    directory.files[`${parentPath}${trimJsonExtension(entry.name)}`] = json;
  }

  return directory;
}

function trimJsonExtension(fileName: string) {
  if (fileName.endsWith('.json')) {
    return fileName.slice(0, -5);
  }

  return fileName;
}
