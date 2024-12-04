import '@fontsource/bai-jamjuree';
import { Flex, Loader, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import utc from 'dayjs/plugin/utc';
import { Suspense } from 'react';
import { Footer } from '../components/footer/footer';
import { Header } from '../components/header/header';
import "../styles/global.scss";
import { theme } from '../theme';

dayjs.extend(utc);
dayjs.extend(buddhistEra);

export const Route = createRootRoute({
  component: () => (
    <MantineProvider theme={theme}>
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
          <Header />
          <Outlet />
          <Footer />
        </Suspense>
      </ModalsProvider>
      <TanStackRouterDevtools />
    </MantineProvider>
  ),
})