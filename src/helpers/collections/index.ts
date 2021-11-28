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

export function filterCategorizedCollectionsByTime(
  rawCollections: CategorizedCollectionItem[],
  currentDate: Date,
  key: 'since' | 'until'
): CategorizedCollectionItem[] {
  const currentValueOf = currentDate.valueOf();
  const filtered: CategorizedCollectionItem[] = [];

  for (const item of rawCollections) {
    const collections = [...item.collections];

    for (const collection of collections) {
      const newCollection = { ...collection };
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

      newCollection.events = newEvents;
    }

    filtered.push({
      ...item,
      collections
    });
  }

  return filtered;
}
