import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { theme } from './theme';

export function App() {
  return (
    <div>
      <MantineProvider theme={theme}>Hello World</MantineProvider>
    </div>
  );
}

export default App;
