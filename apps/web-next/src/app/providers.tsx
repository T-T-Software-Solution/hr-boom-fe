// In Next.js, this file would be called: app/providers.jsx
'use client';

// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { polyfillPromiseWithResolvers } from '@tt-ss-hr/shared-utils';

// Allow dayjs to use buddhist era (BBBB format)
import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
dayjs.extend(buddhistEra);

// This is a workaround for a bug in react-pdf https://github.com/wojtekmaj/react-pdf/issues/1811, https://github.com/wojtekmaj/react-pdf/issues/1873, https://github.com/wojtekmaj/react-pdf
import { ColorSchemeScript, createTheme, Flex, Loader, MantineProvider } from '@mantine/core';
import 'core-js/full/promise/with-resolvers.js';
import { Suspense } from 'react';
import { pdfjs } from 'react-pdf';
polyfillPromiseWithResolvers();
pdfjs.GlobalWorkerOptions.workerSrc =
  '/pdf/pdfjs-dist@4.4.168/legacy/build/pdf.worker.min.mjs';

const theme = createTheme({
  primaryColor: 'primary',
  primaryShade: { light: 4, dark: 6 },
  colors: {
    primary: [
      '#ffece4',
      '#ffd8cd',
      '#ffb19a',
      '#ff8663',
      '#ff6336',
      '#ff4c18',
      '#ff3f07',
      '#e43100',
      '#cc2800',
      '#b21d00',
    ],
    slate: [
      '#f1f5f9',
      '#e2e6ec',
      '#c0ccd9',
      '#9bb1c8',
      '#7c99b9',
      '#688ab0',
      '#5e83ac',
      '#4d7098',
      '#426588',
      '#345779',
    ],
  },
  /** Your theme override here */
});

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  }

  // Browser: make a new query client if we don't already have one
  // This is very important, so we don't re-make a new client if React
  // suspends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeScript forceColorScheme="light" />
      <MantineProvider theme={theme} forceColorScheme='light'>
        <ModalsProvider
          labels={{ confirm: 'บันทึก', cancel: 'ยกเลิก' }}
          modalProps={{ centered: true }}
        >
          <Notifications position="bottom-center" />
          <Suspense
            fallback={
              <Flex justify="center" align="center" w="100%">
                <Loader size="md" />
              </Flex>
            }
          >
            {children}
          </Suspense>
        </ModalsProvider>
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left' />
    </QueryClientProvider>
  );
}
