import { Box } from '@chakra-ui/react';

export function NotFound() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box as="h2" fontSize={24}>
        Oops!
      </Box>

      <Box as="p">
        It seems that the page you are looking for does not exist.
      </Box>
    </Box>
  );
}
