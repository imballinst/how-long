import { SimpleGrid } from '@chakra-ui/react';
import { Card, CardProps } from '../Card';

export interface DirectoryProps {
  cards: CardProps[];
}

export function Directory({ cards }: DirectoryProps) {
  return (
    <SimpleGrid as="ul" listStyleType="none" columns={{ sm: 2, md: 3 }}>
      {cards.map((card) => (
        <Card as="li" key={card.href} {...card} />
      ))}
    </SimpleGrid>
  );
}
