'use client';

import { Flex, Loader, MantineProvider, createTheme } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

// Allow dayjs to use buddhist era (BBBB format) and UTC offset
import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
dayjs.extend(buddhistEra);

// This is a workaround for a bug in react-pdf https://github.com/wojtekmaj/react-pdf/issues/1811, https://github.com/wojtekmaj/react-pdf/issues/1873, https://github.com/wojtekmaj/react-pdf
import 'core-js/full/promise/with-resolvers.js';
import { pdfjs } from 'react-pdf';
polyfillPromiseWithResolvers();
console.log('pdfjs.version: ', pdfjs.version);
pdfjs.GlobalWorkerOptions.workerSrc =
  '/pdf/pdfjs-dist@4.4.168/legacy/build/pdf.worker.min.mjs';

interface AppProvidersProps {
  children: React.ReactNode;
}

import type {
  SidebarMenuItem,
  SiteMetadata,
} from '@backoffice/components/admin-layout/types';
import {
  IconCategoryFilled,
  IconGauge
} from '@tabler/icons-react';
// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import {
  QueryClient,
  QueryClientProvider,
  isServer,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { polyfillPromiseWithResolvers } from '@tt-ss-hr/shared-utils';
import { Suspense } from 'react';
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
        retry: 2,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        enabled: true,
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

export const siteMetadata: SiteMetadata = {
  title: 'Tt Ss Hr',
  logoPath: '/logo/ttss.jpg',
};

export const adminMenu: SidebarMenuItem[] = [
  { label: 'แดชบอร์ด', icon: IconGauge, link: '/' },
  {
    label: 'ข้อมูลบุคลากร',
    icon: IconCategoryFilled,
    initiallyOpened: false,
    childrens: [
      { label: 'รายการบุคลากร', link: '/employee' },
      { label: 'รายงาน', link: '/employee/report' },
    ],
  },
  {
    label: 'ข้อมูลโครงสร้างองค์กร',
    icon: IconCategoryFilled,
    initiallyOpened: false,
    link: '/org-structure'
  },
  {
    label: 'ข้อมูลโครงสร้างตำแหน่ง',
    icon: IconCategoryFilled,
    initiallyOpened: false,
    link: '/position-structure'
  },
  {
    label: 'ตั้งค่าระบบ',
    icon: IconCategoryFilled,
    initiallyOpened: false,
    childrens: [
      { label: 'ตั้งค่าชนิดขององค์กร', link: '/org-structure-type' },
      { label: 'ตั้งค่าชนิดของตำแหน่ง', link: '/position-structure-type' },
      { label: 'ตั้งค่าเงื่อนไขการหักภาษี', link: '/tax-condition' },
      { label: 'ตั้งค่าฐานภาษี', link: '/tax-bracket' },
      { label: 'ตั้งค่ารายการลดหย่อนภาษี', link: '/tax-deduction' },
      { label: 'ตั้งค่าสิทธิ์ประกันสังคม', link: '/social-security-type' },
      { label: 'ตั้งค่าประเภทพนักงาน', link: '/employee-type' },
      { label: 'ตั้งค่าช่องทางจ่ายเงินเดือน', link: '/payment-channel' },
      { label: 'ตั้งค่าธนาคาร', link: '/bank' },
      { label: 'ตั้งค่าประเภทบัญชีธนาคาร', link: '/bank-account-type' },
      { label: 'ตั้งค่าระดับการศึกษา', link: '/education-level' },
      { label: 'ตั้งค่าคำนำหน้าชื่อ', link: '/prefix' },
      { label: 'ตั้งค่าคำนำหน้าชื่อEN', link: '/prefix-en' },
      { label: 'ตั้งค่าเพศ', link: '/gender' },
      { label: 'ตั้งค่าจังหวัด', link: '/province' },
    ],
  },
];

export const AppProviders: React.FC<Readonly<AppProvidersProps>> = ({
  children,
}) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
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
            {children}
          </Suspense>
        </ModalsProvider>
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
