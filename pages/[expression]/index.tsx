import { useRouter } from 'next/router';

import { NotFound } from '../../components/NotFound';
import { TimeDirectories } from '../../components/TimeDirectories';

const ACCEPTED_EXPRESSIONS = ['/since', '/until'];
const TITLE_MAPPING = {
  '/since': 'Since',
  '/until': 'Until'
};

type KEYS = keyof typeof TITLE_MAPPING;

const Expression = () => {
  const { pathname } = useRouter();

  if (!ACCEPTED_EXPRESSIONS.includes(pathname)) {
    return <NotFound />;
  }

  return <TimeDirectories title={TITLE_MAPPING[pathname as KEYS]} />;
};

export default Expression;
