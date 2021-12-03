import path from 'path';
import { convertMarkdownsInDirectoryToJson } from './markdown';

const PATH_TO_COLLECTIONS_MD = path.join(__dirname, 'test-collections-md');
const PATH_TO_COLLECTIONS_JSON = path.join(__dirname, 'test-collections');

const ARSENAL_WIN_PREMIER_LEAGUE_JSON = path.join(
  PATH_TO_COLLECTIONS_JSON,
  'arsenal/win-premier-league.json'
);
const ARSENAL_WON_A_MATCH_JSON = path.join(
  PATH_TO_COLLECTIONS_JSON,
  'arsenal/won-a-match.json'
);

test('convertMarkdownsInDirectoryToJson', async () => {
  const result = await convertMarkdownsInDirectoryToJson({
    directory: PATH_TO_COLLECTIONS_MD
  });

  console.log(result);
});
