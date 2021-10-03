import { SimpleGrid } from '@chakra-ui/react';
import { Card, CardProps } from '../Card';

export interface DirectoryProps {
  cards: CardProps[];
}

export function Directory({ cards }: DirectoryProps) {
  return (
    <SimpleGrid
      as="ul"
      listStyleType="none"
      columns={{ sm: 1, md: 2, lg: 3 }}
      spacing={2}
    >
      {cards.map((card) => (
        <Card as="li" key={card.href} {...card} />
      ))}
    </SimpleGrid>
  );
}
