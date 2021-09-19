import fs from 'fs/promises';
import type { Dirent } from 'fs';
import path from 'path';

const ROOT = path.join(__dirname, '..');
const COLLECTIONS = path.join(ROOT, 'collections');

interface Collection {
  format?: string;
  events: Array<{
    description: string;
    datetime: string;
  }>;
}

interface DirectoryDictionary {
  [index: string]: Directory;
}
interface CollectionDictionary {
  [index: string]: Collection;
}

interface Directory {
  folders: DirectoryDictionary;
  files: CollectionDictionary;
}

export async function getDirectoriesAndCollections(
  directoryPath = COLLECTIONS
) {
  const directory: Directory = {
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
      `${directoryPath}/${entry.name}`
    );

    directory.files[entry.name] = result.files[entry.name];
    directory.folders[entry.name] = result.folders[entry.name];
  }

  return directory;
}

async function recursivelyPushToCollections(
  entry: Dirent,
  entryPath: string
): Promise<Directory> {
  const directory: Directory = {
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
      const result = await recursivelyPushToCollections(
        dirEntry,
        `${entryPath}/${dirEntry.name}`
      );

      for (const key in result.folders) {
        directory.folders[entry.name].folders[key] = result.folders[key];
      }

      for (const key in result.files) {
        directory.folders[entry.name].files[key] = result.files[key];
      }
    }
  } else {
    const fileContent = await fs.readFile(entryPath, 'utf-8');
    const json = JSON.parse(fileContent);

    directory.files[trimJsonExtension(entry.name)] = json;
  }

  return directory;
}

function trimJsonExtension(fileName: string) {
  return fileName.slice(0, -5);
}
