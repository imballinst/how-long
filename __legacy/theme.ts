import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { mode, SystemStyleFunction } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false
};

// Link.
const linkVariantPrimary: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props;
  return {
    padding: 0,
    height: 'auto',
    lineHeight: 'normal',
    verticalAlign: 'baseline',
    color: mode(`${c}.500`, `${c}.200`)(props),
    _hover: {
      textDecoration: 'underline',
      _disabled: {
        textDecoration: 'none'
      }
    },
    _active: {
      color: mode(`${c}.700`, `${c}.500`)(props)
    }
  };
};

// Card.
const cardVariantPrimary: SystemStyleFunction = (props) => {
  return {
    borderWidth: '1px',
    borderRadius: 'lg',
    borderColor: mode(`gray.200`, `gray.500`)(props),
    p: 4,
    _hover: { borderColor: mode(`teal.500`, `teal.200`)(props) },
    transition: 'border-color 250ms'
  };
};

const theme = extendTheme({
  config,
  components: {
    Link: {
      variants: {
        primary: linkVariantPrimary
      },
      defaultProps: {
        variant: 'primary'
      }
    },
    Card: {
      variants: {
        primary: cardVariantPrimary
      },
      defaultProps: {
        variant: 'primary'
      }
    }
  }
});
export default theme;
