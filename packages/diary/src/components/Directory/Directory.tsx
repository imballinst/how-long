import { Card, CardProps } from '../Card';

export interface DirectoryProps {
  cards?: CardProps[];
  showSkeleton?: boolean;
}

const CARDS_SKELETON_MOCK: CardProps[] = Array.from(new Array(3), (_, idx) => ({
  title: 'Sample text',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  date: '2021-11-22T12:46:18.655Z',
  href: `/${idx}`
}));

export function Directory({
  cards = CARDS_SKELETON_MOCK,
  showSkeleton
}: DirectoryProps) {
  return (
    <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card) => (
        <li key={card.href}>
          <Card isLoading={showSkeleton} {...card} />
        </li>
      ))}
    </ul>
  );
}
