import { Collection } from '../types';

interface TimedCollection {
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
    const key = collectionDate.valueOf() >= valueOf ? 'since' : 'until';
    timedCollection[key].push(collection);
  }

  return timedCollection;
}
