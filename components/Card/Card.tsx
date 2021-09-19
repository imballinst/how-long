import { ReactNode, useMemo } from 'react';
import { Box, Badge, HStack, As } from '@chakra-ui/react';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { InternalLink } from '../Link';

export interface CardProps {
  as?: As<any> | undefined;
  href: string;
  title: string;
  tags: string[];
  // ISO8601 date string.
  date: string;
  text: string;
}

export function Card(props: CardProps) {
  const tags: ReactNode[] = useMemo(() => {
    const tags: ReactNode[] = [];

    for (let i = 0; i < props.tags?.length; i++) {
      tags.push(<Badge>{props.tags[i]}</Badge>);

      if (i + 1 < props.tags.length) {
        tags.push(<>&bull;</>);
      }
    }

    return tags;
  }, [props.tags]);

  return (
    <Box
      as={props.as}
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={6}
      _hover={{ borderColor: 'blue.500' }}
      transition="border-color 250ms"
    >
      <HStack>
        <Box
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
        >
          {tags}
        </Box>

        <Box fontSize="sm">
          {formatDistanceToNowStrict(new Date(props.date || new Date()))}
        </Box>
      </HStack>

      <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
        <InternalLink href={props.href}>{props.title}</InternalLink>
      </Box>

      <Box d="flex" mt="2" alignItems="center">
        <Box as="span" fontSize="sm" noOfLines={3}>
          {props.text}
        </Box>
      </Box>
    </Box>
  );
}
