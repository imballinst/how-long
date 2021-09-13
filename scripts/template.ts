import fs from 'fs';
import path from 'path';

import { TimerProps } from '../components/Timer';
import { getCollections } from './collections';

const PATH_TO_PAGES = path.join(__dirname, '../pages');

(async () => {
  const collections = getCollections();

  for (const collection of collections) {
    const filePath = path.join(PATH_TO_PAGES, collection.path);
    // +1 because of `pages` directory depth.
    const filePathDepth = collection.path.split('/').length;
    let importPath = 'components/Timer';

    for (let i = 0; i < filePathDepth; i++) {
      importPath = `../${importPath}`;
    }

    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    const date = new Date(collection.content.events[0].datetime);
    const rendered = generateTemplate(importPath, {
      years: date.getUTCFullYear(),
      months: date.getUTCMonth(),
      days: date.getUTCDate(),
      hours: date.getUTCHours(),
      minutes: date.getUTCMinutes(),
      seconds: date.getUTCSeconds()
    });

    fs.writeFileSync(`${filePath}.tsx`, rendered, { encoding: 'utf-8' });
  }
})();

function generateTemplate(importPath: string, timeDistance: TimerProps) {
  return `
import { Timer, TimerProps } from '${importPath}';

const TIME_DISTANCE: TimerProps = {
  seconds: ${timeDistance.seconds},
  minutes: ${timeDistance.minutes},
  hours: ${timeDistance.hours},
  days: ${timeDistance.days},
  months: ${timeDistance.months},
  years: ${timeDistance.years}
};

export default function Template() {
  return <Timer {...TIME_DISTANCE} />;
}
  `.trim();
}
