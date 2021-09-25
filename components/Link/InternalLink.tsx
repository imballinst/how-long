import NextLink from 'next/link';
import { Box, BoxProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface InternalLinkProps extends BoxProps {
  href?: string;
  children?: ReactNode;
}

export function InternalLink({ href, children, ...props }: InternalLinkProps) {
  if (href === undefined) {
    return <>{children}</>;
  }

  return (
    <NextLink href={href} passHref>
      <Box as="a" {...props}>
        {children}
      </Box>
    </NextLink>
  );
}
