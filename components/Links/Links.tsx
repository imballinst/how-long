import { PropsWithChildren } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

type InternalLinkProps = PropsWithChildren<
  NextLinkProps & Omit<ChakraLinkProps, 'as'>
>;

export function InternalLink({
  href,
  as,
  replace,
  scroll,
  shallow,
  prefetch,
  children,
  ...chakraProps
}: InternalLinkProps) {
  return (
    <NextLink
      passHref={true}
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      prefetch={prefetch}
    >
      <ChakraLink colorScheme="teal" {...chakraProps}>
        {children}
      </ChakraLink>
    </NextLink>
  );
}

export function ExternalLink({ children, ...props }: ChakraLinkProps) {
  return (
    <ChakraLink
      isExternal
      display="flex"
      flexDirection="row"
      alignItems="center"
      colorScheme="teal"
      {...props}
    >
      {children} <ExternalLinkIcon mx="4px" />
    </ChakraLink>
  );
}
