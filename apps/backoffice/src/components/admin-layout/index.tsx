'use client';
import { Box, Drawer, Flex } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { cn } from '@tt-ss-hr/shared-utils';
import type React from 'react';
import { Breadcrumb } from '../breadcrumb';
import { Navbar } from './navbar';
import { Sidebar } from './sidebar';
import type { AdminLayoutProps } from './types';

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  sidebarMenuItem,
  siteMetadata,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const isExtraSmall = useMediaQuery('(max-width: 475px)');
  return (
    <Box
      component="main"
      className={cn(
        'flex flex-row max-w-full w-full overflow-hidden',
        'bg-[var(--mantine-color-slate-0)]',
        'dark:bg-[var(--mantine-color-dark-8)]',
      )}
    >
      {isTablet ? (
        <Drawer
          removeScrollProps={{ allowPinchZoom: false }}
          opened={opened}
          onClose={close}
          position="left"
          offset={0}
          size={isExtraSmall ? '100%' : isTablet ? 360 : 280}
          withCloseButton={false}
          overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
          padding={0}
          m={0}
          className="overflow-hidden"
        >
          <Sidebar
            onClose={close}
            sidebarMenuItem={sidebarMenuItem}
            siteMetadata={siteMetadata}
          />
        </Drawer>
      ) : (
        <Box>
          <Sidebar
            sidebarMenuItem={sidebarMenuItem}
            siteMetadata={siteMetadata}
          />
        </Box>
      )}
      <Flex
        direction={{ base: 'column' }}
        className={cn(
          'max-h-screen overflow-x-hidden overflow-y-auto w-full',
          isTablet ? 'max-w-full' : 'max-w-[calc(100vw-280px)]',
        )}
      >
        <Navbar onOpen={open} />
        <div className="max-w-full w-full min-h-[calc(100vh-40px-77px-8px)] flex flex-col gap-1">
          <Breadcrumb />
          <div className="flex-1 py-6 px-4 relative w-full">{children}</div>
        </div>
      </Flex>
    </Box>
  );
};
