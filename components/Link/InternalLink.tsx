import NextLink from 'next/link';
import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface InternalLinkProps {
  href?: string;
  children: ReactNode;
}

export function InternalLink(props: InternalLinkProps) {
  // Mostly `props.children` will be text... but prehaps there are other times that it's not.
  const node = (
    <Box as="a" _hover={{ color: 'blue.500' }} transition="color 250ms">
      {props.children}
    </Box>
  );

  if (props.href === undefined) {
    return node;
  }

  return (
    <NextLink href={props.href} passHref>
      {node}
    </NextLink>
  );
}
