export interface Collection {
  format?: string;
  path: string;
  title: string;
  events: Array<{
    description: string;
    // This is ISO8601 string.
    datetime: string;
  }>;
}

export interface CategorizedCollectionItem {
  title: string;
  slug: string;
  collections: Collection[];
}

export interface TimedCollection {
  since: Collection[];
  until: Collection[];
}

export function groupCollectionsByTime(
  rawCollections: Collection[],
  currentDate: Date
): TimedCollection {
  const valueOf = currentDate.valueOf();
  const timedCollection: TimedCollection = {
    since: [],
    until: []
  };

  for (const collection of rawCollections) {
    if (collection.events.length === 0) {
      continue;
    }

    const collectionDate = new Date(collection.events[0].datetime);
    const key = valueOf >= collectionDate.valueOf() ? 'since' : 'until';
    timedCollection[key].push(collection);
  }

  return timedCollection;
}
