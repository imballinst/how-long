import { Box } from '@chakra-ui/react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

interface CardProps {
  title: string;
  tags: string[];
  // ISO8601 date string.
  date: string;
  text: string;
}

export function Card(props: CardProps) {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {props.tags.join('&bull;')}
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {props.title}
        </Box>

        <Box>
          {formatDistanceToNow(new Date(props.date), {
            addSuffix: true
          })}
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
