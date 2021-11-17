import { Box, As, useStyleConfig, IconButton } from '@chakra-ui/react';

export interface CardButtonProps {
  as?: As<any> | undefined;
  'aria-label': string;
  icon: JSX.Element;
}

export function CardButton({ as, ...rest }: CardButtonProps) {
  const styles = useStyleConfig('Card');

  return (
    <Box as={as} sx={styles}>
      <IconButton colorScheme="teal" {...rest} />
    </Box>
  );
}
