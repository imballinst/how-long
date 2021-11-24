import { SimpleGrid } from '@chakra-ui/react';
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
    <SimpleGrid
      as="ul"
      listStyleType="none"
      columns={{ sm: 1, md: 2, lg: 3 }}
      spacing={2}
    >
      {cards.map((card) => (
        <Card as="li" key={card.href} isLoading={showSkeleton} {...card} />
      ))}
    </SimpleGrid>
  );
}
