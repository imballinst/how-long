import { ReactNode } from 'react';
import { Box, Badge, HStack } from '@chakra-ui/react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

interface CardProps {
  title: string;
  tags: string[];
  // ISO8601 date string.
  date: string;
  text: string;
}

export function Card(props: CardProps) {
  const tags: ReactNode[] = [];

  for (let i = 0; i < props.tags.length; i++) {
    tags.push(<Badge>{props.tags[i]}</Badge>);

    if (i + 1 < props.tags.length) {
      tags.push(<>&bull;</>);
    }
  }

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p="6">
        <HStack>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {tags}
          </Box>

          <Box>
            {formatDistanceToNow(new Date(props.date), {
              addSuffix: true
            })}
          </Box>
        </HStack>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {props.title}
        </Box>

        <Box d="flex" mt="2" alignItems="center">
          <Box as="span" color="gray.600" fontSize="sm" isTruncated>
            {props.text}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
