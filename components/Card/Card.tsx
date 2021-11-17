import { ReactNode, useMemo } from 'react';
import {
  Box,
  Badge,
  HStack,
  As,
  useStyleConfig,
  useColorModeValue
} from '@chakra-ui/react';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { InternalLink } from '../Links';

export interface CardProps {
  as?: As<any> | undefined;
  href: string;
  title: string;
  tags?: string[];
  // ISO8601 date string.
  date?: string;
  text: string;
}

export function Card(props: CardProps) {
  const styles = useStyleConfig('Card');

  const tags: ReactNode[] = useMemo(() => {
    const tags: ReactNode[] = [];

    if (props.tags) {
      for (let i = 0; i < props.tags.length; i++) {
        tags.push(<Badge>{props.tags[i]}</Badge>);

        if (i + 1 < props.tags.length) {
          tags.push(<>&bull;</>);
        }
      }
    }

    return tags;
  }, [props.tags]);

  return (
    <Box as={props.as} sx={styles}>
      <Box fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
        <InternalLink href={props.href}>{props.title}</InternalLink>
      </Box>

      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mb="1"
      >
        {props.date !== undefined && (
          <Box fontSize="sm" color="gray.500">
            {formatDistanceToNowStrict(new Date(props.date), {
              addSuffix: true
            })}
          </Box>
        )}

        <Box
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
        >
          {tags}
        </Box>
      </Box>

      <Box d="flex" mt="2" alignItems="center">
        <Box as="span" fontSize="sm" noOfLines={3}>
          {props.text}
        </Box>
      </Box>
    </Box>
  );
}
