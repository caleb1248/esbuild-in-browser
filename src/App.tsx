import { Box, ChakraProvider } from '@chakra-ui/react';
import { CodeCell } from './components/CodeCell';
declare global {
  var process: {};
}
globalThis.process = {};

export const App = () => {
  return (
    <ChakraProvider>
      <Box bg="#1e1e1e" height="100vh">
        <CodeCell />
      </Box>
    </ChakraProvider>
  );
};
