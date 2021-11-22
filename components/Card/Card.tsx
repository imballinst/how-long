import { ReactNode } from 'react';
import {
  Box,
  Badge,
  As,
  useStyleConfig,
  Skeleton,
  SkeletonText
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
  isLoading?: boolean;
}

export function Card(props: CardProps) {
  const styles = useStyleConfig('Card');

  return (
    <Box as={props.as} sx={styles}>
      <Skeleton isLoaded={!props.isLoading}>
        <Box fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          <InternalLink href={props.href}>{props.title}</InternalLink>
        </Box>
      </Skeleton>

      {props.isLoading ? (
        <SkeletonText noOfLines={1} mt={2} />
      ) : (
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
            <Tags tags={props.tags} />
          </Box>
        </Box>
      )}

      <Box d="flex" mt="2" alignItems="center">
        {props.isLoading ? (
          <SkeletonText noOfLines={3} width="100%" />
        ) : (
          <Box as="span" fontSize="sm" noOfLines={3}>
            {props.text}
          </Box>
        )}
      </Box>
    </Box>
  );
}

// Composing functions.
function Tags(props: { tags?: string[] }) {
  const tags: ReactNode[] = [];

  if (props.tags) {
    for (let i = 0; i < props.tags.length; i++) {
      tags.push(<Badge>{props.tags[i]}</Badge>);

      if (i + 1 < props.tags.length) {
        tags.push(<>&bull;</>);
      }
    }
  }

  return <>{tags}</>;
}
