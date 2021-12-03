import fs from 'fs/promises';
import path from 'path';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

import { Dictionary } from '../../src/helpers/types';
import { Collection } from '../../src/helpers/collections';

export async function convertMarkdownsInDirectoryToJson({
  directory
}: {
  directory: string;
}): Promise<Collection[]> {
  const collections: Collection[] = [];
  const dirEntries = await fs.readdir(directory, { encoding: 'utf-8' });

  for (const dirEntry of dirEntries) {
    const categoryPath = path.join(directory, dirEntry);
    // `dirEntry` here is the category folder. We need to iterate it once more.
    const categoryEntries = await fs.readdir(categoryPath, {
      encoding: 'utf-8',
      withFileTypes: true
    });

    const mainMarkdownIdx = categoryEntries.findIndex(
      (entry) => entry.name === 'index.md'
    );
    const [mainMarkdown] = categoryEntries.splice(mainMarkdownIdx, 1);

    const mainFrontmatterPath = path.join(categoryPath, mainMarkdown.name);
    const mainFrontmatterFile = await fs.readFile(mainFrontmatterPath, 'utf-8');
    const frontmatterLines = mainFrontmatterFile.split('\n');
    const mainFrontmatter: Dictionary<string> = {};

    for (const line of frontmatterLines) {
      const [key, value] = readFrontmatterLine(line);
      mainFrontmatter[key] = value;
    }

    if (mainFrontmatter.title === undefined) {
      throw new Error(
        `Invalid frontmatter: there is no \`title\` field in ${mainFrontmatterPath}. Please add the field and try again.`
      );
    }

    const parentTitle = mainFrontmatter.title;

    for (const entry of categoryEntries) {
      const entryPath = path.join(categoryPath, entry.name);

      collections.push(
        await convertMarkdownToJson({
          filePath: entryPath,
          parentTitle
        })
      );
    }
  }

  return collections;
}

// Helper functions.
async function convertMarkdownToJson({
  filePath,
  parentTitle
}: {
  filePath: string;
  parentTitle: string;
}): Promise<Collection> {
  const directory = path.basename(filePath);
  const category = path.basename(directory);

  const file = await fs.readFile(filePath, 'utf-8');
  const [_, frontmatter, content] = file.split('---\n');

  const frontmatterObj: Dictionary<string> = {};
  const frontmatterLines = frontmatter.split('\n');

  for (const line of frontmatterLines) {
    const [key, value] = line.split(/:\s+/);
    frontmatterObj[key] = value;
  }

  // Throw error if `title` isn't present.
  if (frontmatterObj.title === undefined) {
    throw new Error(
      `Invalid frontmatter: there is no \`title\` field in ${filePath}. Please add the field and try again.`
    );
  }

  const events: Collection['events'] = [];
  // Split by newlines, we don't want multiple newlines.
  const lines = content.split('\n');
  let eventIdx = -1;

  for (const line of lines) {
    if (line.startsWith('## ')) {
      // Event title.
      eventIdx += 1;

      events.push({
        title: line.replace(/##/g, '').trim(),
        datetime: '',
        description: ''
      });
    } else if (line.startsWith('<!-- ')) {
      // Event frontmatters.
      events[eventIdx].datetime = line
        .replace('<!--', '')
        .replace('-->', '')
        .trim();
    } else if (line !== '') {
      events[eventIdx].description += await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(line);
    }
  }

  return {
    events,
    parentTitle,
    slug: `${category}/${path.basename(filePath, '.json')}`,
    title: frontmatterObj.title,
    category
  };
}

function readFrontmatterLine(line: string) {
  return line.trim().split(/:\s+/);
}
