import { ReactNode } from 'react';
import {
  Box,
  As,
  useStyleConfig,
  IconButton,
  useColorModeValue
} from '@chakra-ui/react';

export interface CardButtonProps {
  as?: As<any> | undefined;
  'aria-label': string;
  icon: JSX.Element;
  children?: ReactNode;
  href?: string;
}

export function CardButton({ as, children, icon, href }: CardButtonProps) {
  const styles = useStyleConfig('Card');
  const hoverBg = useColorModeValue('teal.500', 'teal.200');
  const hoverIconColor = useColorModeValue('white', 'gray.800');

  return (
    <Box
      as={as}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      className="card-button"
      cursor="pointer"
      href={href}
      sx={styles}
    >
      <Box
        borderRadius="50%"
        border="1px solid"
        borderColor="transparent"
        width="36px"
        height="36px"
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        transition="all 250ms"
        mb={2}
        sx={{
          // Source: https://chakra-ui.com/docs/features/the-sx-prop#creating-nested-selectors.
          '.card-button:hover & ': {
            bg: hoverBg,
            color: hoverIconColor
          }
        }}
      >
        {icon}
      </Box>

      {children}
    </Box>
  );
}
