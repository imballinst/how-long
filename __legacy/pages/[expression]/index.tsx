import { useRouter } from 'next/router';

import { TimeDirectories } from '../../components/TimeDirectories';

const Expression = () => {
  const { query } = useRouter();
  const pathname = query.expression as string;

  return <TimeDirectories pathname={pathname} />;
};

export default Expression;
