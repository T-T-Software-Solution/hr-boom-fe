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
      { label: 'รายการ', link: '/employee' },
      { label: 'เพิ่มข้อมูล', link: '/employee/create' },
      { label: 'รายงาน', link: '/employee/report' },
    ],
  },
  {
    label: 'การจ้างงาน',
    icon: IconCategoryFilled,
    initiallyOpened: false,
    childrens: [
      { label: 'รายการ', link: '/employment' },
      { label: 'เพิ่มข้อมูล', link: '/employment/create' },
    ],
  },
  {
    label: 'เอกสารอื่นๆ',
    icon: IconCategoryFilled,
    initiallyOpened: false,
    childrens: [
      { label: 'รายการ', link: '/document-file' },
      { label: 'เพิ่มข้อมูล', link: '/document-file/create' },
    ],
  },
  {
    label: 'ประวัติการศึกษา',
    icon: IconCategoryFilled,
    initiallyOpened: false,
    childrens: [
      { label: 'รายการ', link: '/education' },
      { label: 'เพิ่มข้อมูล', link: '/education/create' },
    ],
  },
  {
    label: 'ใบอนุญาตประกอบวิชาชีพ',
    icon: IconCategoryFilled,
    initiallyOpened: false,
    childrens: [
      { label: 'รายการ', link: '/professional-license' },
      { label: 'เพิ่มข้อมูล', link: '/professional-license/create' },
    ],
  },
  {
    label: 'ประวัติการฝึกอบรม',
    icon: IconCategoryFilled,
    initiallyOpened: false,
    childrens: [
      { label: 'รายการ', link: '/training-history' },
      { label: 'เพิ่มข้อมูล', link: '/training-history/create' },
    ],
  },
  {
    label: 'ประวัติการได้รับโทษทางวินัยและการนิรโทษกรรม',
    icon: IconCategoryFilled,
    initiallyOpened: false,
    childrens: [
      { label: 'รายการ', link: '/criminal-history' },
      { label: 'เพิ่มข้อมูล', link: '/criminal-history/create' },
    ],
  },
  {
    label: 'ข้อมูลโครงสร้างองค์กร',
    icon: IconCategoryFilled,
    initiallyOpened: false,
    childrens: [
      { label: 'รายการ', link: '/org-structure' },
      { label: 'เพิ่มข้อมูล', link: '/org-structure/create' },
    ],
  },
  {
    label: 'โครงสร้างตำแหน่ง',
    icon: IconCategoryFilled,
    initiallyOpened: false,
    childrens: [
      { label: 'รายการ', link: '/position-structure' },
      { label: 'เพิ่มข้อมูล', link: '/position-structure/create' },
    ],
  },
  {
    label: 'ตั้งค่าชนิดขององค์กร',
    icon: IconCategoryFilled,
    initiallyOpened: false,
    childrens: [
      { label: 'รายการ', link: '/org-structure-type' },
      { label: 'เพิ่มข้อมูล', link: '/org-structure-type/create' },
    ],
  },
  {
    label: 'ตั้งค่าชนิดของตำแหน่ง',
    icon: IconCategoryFilled,
    initiallyOpened: false,
    childrens: [
      { label: 'รายการ', link: '/position-structure-type' },
      { label: 'เพิ่มข้อมูล', link: '/position-structure-type/create' },
    ],
  },
  {
    label: 'ตั้งค่าเงื่อนไขการหักภาษี',
    icon: IconCategoryFilled,
    initiallyOpened: false,
    childrens: [
      { label: 'รายการ', link: '/tax-condition' },
      { label: 'เพิ่มข้อมูล', link: '/tax-condition/create' },
    ],
  },
  {
    label: 'ตั้งค่าฐานภาษี',
    icon: IconCategoryFilled,
    initiallyOpened: false,
    childrens: [
      { label: 'รายการ', link: '/tax-bracket' },
      { label: 'เพิ่มข้อมูล', link: '/tax-bracket/create' },
    ],
  },
  {
    label: 'ตั้งค่ารายการลดหย่อนภาษี',
    icon: IconCategoryFilled,
    initiallyOpened: false,
    childrens: [
      { label: 'รายการ', link: '/tax-deduction' },
      { label: 'เพิ่มข้อมูล', link: '/tax-deduction/create' },
    ],
  },
  {
    label: 'ตั้งค่าสิทธิ์ประกันสังคม',
    icon: IconCategoryFilled,
    initiallyOpened: false,
    childrens: [
      { label: 'รายการ', link: '/social-security-type' },
      { label: 'เพิ่มข้อมูล', link: '/social-security-type/create' },
    ],
  },
  {
    label: 'ตั้งค่าประเภทพนักงาน',
    icon: IconCategoryFilled,
    initiallyOpened: false,
    childrens: [
      { label: 'รายการ', link: '/employee-type' },
      { label: 'เพิ่มข้อมูล', link: '/employee-type/create' },
    ],
  },
  {
    label: 'ตั้งค่าช่องทางจ่ายเงินเดือน',
    icon: IconCategoryFilled,
    initiallyOpened: false,
    childrens: [
      { label: 'รายการ', link: '/payment-channel' },
      { label: 'เพิ่มข้อมูล', link: '/payment-channel/create' },
    ],
  },
  {
    label: 'ตั้งค่าธนาคาร',
    icon: IconCategoryFilled,
    initiallyOpened: false,
    childrens: [
      { label: 'รายการ', link: '/bank' },
      { label: 'เพิ่มข้อมูล', link: '/bank/create' },
    ],
  },
  {
    label: 'ตั้งค่าประเภทบัญชีธนาคาร',
    icon: IconCategoryFilled,
    initiallyOpened: false,
    childrens: [
      { label: 'รายการ', link: '/bank-account-type' },
      { label: 'เพิ่มข้อมูล', link: '/bank-account-type/create' },
    ],
  },
  {
    label: 'ตั้งค่าระดับการศึกษา',
    icon: IconCategoryFilled,
    initiallyOpened: false,
    childrens: [
      { label: 'รายการ', link: '/education-level' },
      { label: 'เพิ่มข้อมูล', link: '/education-level/create' },
    ],
  },
  {
    label: 'ตั้งค่าคำนำหน้าชื่อ',
    icon: IconCategoryFilled,
    initiallyOpened: false,
    childrens: [
      { label: 'รายการ', link: '/prefix' },
      { label: 'เพิ่มข้อมูล', link: '/prefix/create' },
    ],
  },
  {
    label: 'ตั้งค่าคำนำหน้าชื่อEN',
    icon: IconCategoryFilled,
    initiallyOpened: false,
    childrens: [
      { label: 'รายการ', link: '/prefix-en' },
      { label: 'เพิ่มข้อมูล', link: '/prefix-en/create' },
    ],
  },
  {
    label: 'ตั้งค่าเพศ',
    icon: IconCategoryFilled,
    initiallyOpened: false,
    childrens: [
      { label: 'รายการ', link: '/gender' },
      { label: 'เพิ่มข้อมูล', link: '/gender/create' },
    ],
  },
  {
    label: 'ตั้งค่าจังหวัด',
    icon: IconCategoryFilled,
    initiallyOpened: false,
    childrens: [
      { label: 'รายการ', link: '/province' },
      { label: 'เพิ่มข้อมูล', link: '/province/create' },
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
