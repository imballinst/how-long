export interface Collection {
  format?: string;
  slug: string;
  expression?: 'since' | 'until';
  category?: string;
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

export function groupCollectionsByTime({
  rawCollections,
  currentDate
}: {
  rawCollections: Collection[];
  currentDate: Date;
}): TimedCollection {
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

    timedCollection[key].push({ ...collection, expression: key });
  }

  return timedCollection;
}

export function appendExpressionToCategorizedCollection(
  rawCollections: CategorizedCollectionItem[],
  currentDate: Date
): CategorizedCollectionItem[] {
  const currentValueOf = currentDate.valueOf();
  const filtered: CategorizedCollectionItem[] = [];

  for (const item of rawCollections) {
    const collections = item.collections;
    const newCollections: Collection[] = [];

    for (let i = 0, length = collections.length; i < length; i += 1) {
      const collection = collections[i];
      const firstEventDate = new Date(collection.events[0].datetime);
      const firstEventMs = firstEventDate.valueOf();
      const expression = currentValueOf >= firstEventMs ? 'since' : 'until';

      newCollections.push({ ...collection, expression });
    }

    filtered.push({
      ...item,
      collections: newCollections
    });
  }

  return filtered;
}

export function filterCategorizedCollectionsByTime(
  rawCollections: CategorizedCollectionItem[],
  currentDate: Date,
  key: 'since' | 'until'
): CategorizedCollectionItem[] {
  const currentValueOf = currentDate.valueOf();
  const filtered: CategorizedCollectionItem[] = [];

  for (const item of rawCollections) {
    const collections = item.collections;
    const newCollections: Collection[] = [];

    for (let i = 0, length = collections.length; i < length; i += 1) {
      const collection = collections[i];
      const newCollection: Collection = { ...collection, expression: key };
      const newEvents: Collection['events'] = [];

      for (const event of collection.events) {
        const eventDate = new Date(event.datetime);
        const eventMs = eventDate.valueOf();

        if (
          (key === 'since' && currentValueOf >= eventMs) ||
          (key === 'until' && currentValueOf < eventMs)
        ) {
          newEvents.push(event);
        }
      }

      if (newEvents.length > 0) {
        newCollection.events = newEvents;
        newCollections.push(newCollection);
      }
    }

    if (newCollections.length > 0) {
      filtered.push({
        ...item,
        collections: newCollections
      });
    }
  }

  return filtered;
}
