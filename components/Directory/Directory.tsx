import { SimpleGrid, Skeleton } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Card, CardProps } from '../Card';

export interface DirectoryProps {
  cards?: CardProps[];
  showSkeleton?: boolean;
}

const CARDS_SKELETON_MOCK: CardProps[] = new Array(3).fill({
  title: 'Sample text',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  date: new Date().toString()
});

export function Directory({
  cards = CARDS_SKELETON_MOCK,
  showSkeleton
}: DirectoryProps) {
  let nodes: ReactNode;

  if (showSkeleton) {
    nodes = (
      <>
        {cards.map((card) => (
          <Skeleton>
            <Card as="li" key={card.href} {...card} />
          </Skeleton>
        ))}
      </>
    );
  } else {
    nodes = (
      <>
        {cards.map((card) => (
          <Card as="li" key={card.href} {...card} />
        ))}
      </>
    );
  }

  return (
    <SimpleGrid
      as="ul"
      listStyleType="none"
      columns={{ sm: 1, md: 2, lg: 3 }}
      spacing={2}
    >
      {nodes}
    </SimpleGrid>
  );
}
