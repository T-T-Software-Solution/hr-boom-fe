'use client';
import {
  ActionIcon,
  Box,
  Collapse,
  Flex,
  Group,
  Image,
  ScrollArea,
  Text,
  ThemeIcon,
  Tooltip,
  UnstyledButton,
  rem,
} from '@mantine/core';
import { useLocalStorage, useMediaQuery } from '@mantine/hooks';
import { IconChevronRight, IconX } from '@tabler/icons-react';
import { cn } from '@tt-ss-hr/shared-utils';
import { usePathname } from 'next/navigation';
import type React from 'react';
import { useEffect, useState } from 'react';
import type { SidebarMenuItem } from '../types';
import type { SidebarProps } from './types';

interface LinksGroupProps {
  icon: React.ElementType;
  label: string;
  initiallyOpened?: boolean;
  link?: string;
  childrens?: { label: string; link: string }[];
}

const LinksGroup: React.FC<SidebarMenuItem> = ({
  icon: Icon,
  label,
  initiallyOpened,
  link,
  childrens,
}) => {
  const hasChilds = Array.isArray(childrens);
  const pathname = usePathname();
  const [openedSections, setOpenedSections] = useLocalStorage<
    Record<string, boolean>
  >({
    key: 'opened-sections',
    defaultValue: {},
  });
  const [opened, setOpened] = useState<boolean>(!!initiallyOpened);

  useEffect(() => {
    const isOpened = openedSections[label];
    if (isOpened) {
      setOpened(true);
    }
  }, [openedSections, label]);

  const toggleSection = () => {
    setOpened(!opened);
    setOpenedSections((prev) => ({
      ...prev,
      [label]: !opened,
    }));
  };

  // Check if the current path matches any of the child links or parent link
  const isActive =
    link === pathname || childrens?.some((child) => child.link === pathname);

  // Automatically expand the group if the current path matches one of its children
  useEffect(() => {
    if (isActive) {
      setOpened(true);
    }
  }, [isActive]);

  const items = (hasChilds ? childrens : []).map((child) => {
    const isChildActive = child.link === pathname;
    return (
      <UnstyledButton
        component="a"
        style={{
          borderLeft:
            '1px solid light-dark(var(--mantine-color-primary-3), var(--mantine-color-primary-4))',
        }}
        className={cn(
          'font-weight-500 block text-sm no-underline',
          'py-[var(--mantine-spacing-xs)] pr-[var(--mantine-spacing-md)] pl-[var(--mantine-spacing-md)]',
          'ml-[var(--mantine-spacing-xl)]',
          'hover:bg-[var(--mantine-color-primary-0)] hover:text-[var(--mantine-color-primary-7)]',
          'hover:dark:bg-[var(--mantine-color-dark-6)] hover:dark:text-[var(--mantine-color-primary-4)',
          isChildActive
            ? 'bg-[var(--mantine-color-primary-0)] text-[var(--mantine-color-primary-7)] dark:bg-[var(--mantine-color-dark-6)] dark:text-[var(--mantine-color-primary-4)]'
            : 'text-[var(--mantine-color-text)]',
        )}
        key={child.label}
        href={child.link}
      >
        {child.label}
      </UnstyledButton>
    );
  });

  if (!link) {
    return (
      <>
        <UnstyledButton
          // onClick={() => setOpened((open) => !open)}
          onClick={toggleSection}
          className={cn(
            'font-weight-500 block w-full py-[var(--mantine-spacing-xs)] px-[var(--mantine-spacing-md)] text-sm',
            'hover:bg-[var(--mantine-color-primary-0)] hover:text-[var(--mantine-color-primary-7)]',
            'hover:dark:bg-[var(--mantine-color-dark-6)] hover:dark:text-[var(--mantine-color-primary-4)',
            isActive
              ? 'bg-[var(--mantine-color-primary-0)] text-[var(--mantine-color-primary-7)] dark:bg-[var(--mantine-color-dark-6)] dark:text-[var(--mantine-color-primary-4)]'
              : 'text-[var(--mantine-color-text)]',
          )}
        >
          <Group justify="space-between" gap={0}>
            <Box className="flex items-center">
              <ThemeIcon variant="light" size={30}>
                <Icon style={{ width: rem(18), height: rem(18) }} />
              </ThemeIcon>
              <Box ml="md">{label}</Box>
            </Box>
            <IconChevronRight
              className={cn('transform transition-transform duration-200')}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? 'rotate(-90deg)' : 'none',
              }}
            />
          </Group>
        </UnstyledButton>
        {hasChilds ? <Collapse in={opened}>{items}</Collapse> : null}
      </>
    );
  }

  return (
    <UnstyledButton
      component="a"
      href={link || '#'}
      className={cn(
        'font-weight-500 block w-full py-[var(--mantine-spacing-xs)] px-[var(--mantine-spacing-md)] text-sm',
        'hover:bg-[var(--mantine-color-primary-0)] hover:text-[var(--mantine-color-primary-7)]',
        'hover:dark:bg-[var(--mantine-color-dark-6)] hover:dark:text-[var(--mantine-color-primary-4)',
        isActive
          ? 'bg-[var(--mantine-color-primary-0)] text-[var(--mantine-color-primary-7)] dark:bg-[var(--mantine-color-dark-6)] dark:text-[var(--mantine-color-primary-4)]'
          : 'text-[var(--mantine-color-text)]',
      )}
    >
      <Group justify="space-between" gap={0}>
        <Box className="flex items-center">
          <ThemeIcon variant="light" size={30}>
            <Icon style={{ width: rem(18), height: rem(18) }} />
          </ThemeIcon>
          <Box ml="md">{label}</Box>
        </Box>
      </Group>
    </UnstyledButton>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({
  onClose,
  sidebarMenuItem,
  siteMetadata,
}) => {
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const isExtraSmall = useMediaQuery('(max-width: 475px)');
  const links = sidebarMenuItem.map((item) => {
    return <LinksGroup {...item} key={item.label} />;
  });

  return (
    <Box
      component="aside"
      className={cn(
        'border-r h-[calc(100vh)] relative drop-shadow-md z-[9]',
        'bg-white border-r-[var(--mantine-color-slate-0)]',
        'dark:bg-[var(--mantine-color-dark-7)] dark:border-r-[var(--mantine-color-dark-6)]',
        isExtraSmall
          ? 'w-full min-w-full'
          : isTablet
            ? 'w-[360px] min-w-[360px]'
            : 'w-[280px] min-w-[280px]',
      )}
    >
      <Box
        component="div"
        className={cn(
          'py-3 px-4 border-b w-full flex items-center justify-between gap-2 h-[64px]',
          'bg-white border-b-[var(--mantine-color-slate-0)]',
          'dark:bg-[var(--mantine-color-dark-7)] dark:border-b-[var(--mantine-color-dark-4)]',
        )}
      >
        <Flex gap="sm" align="center">
          {siteMetadata?.logoPath && (
            <Image
              src={siteMetadata.logoPath}
              maw="40px"
              radius="100%"
              alt="T.T. Software Solution"
            />
          )}
          {siteMetadata?.title && <Text size="md">{siteMetadata.title}</Text>}
        </Flex>
        {onClose && (
          <Tooltip label="Close" position="bottom">
            <ActionIcon
              type="button"
              aria-label="Close"
              variant="outline"
              size="sm"
              radius="sm"
              onClick={onClose}
            >
              <IconX />
            </ActionIcon>
          </Tooltip>
        )}
      </Box>
      <Box component="div" className="px-4 w-full">
        <ScrollArea
          className={cn(
            'flex-1 ml-[calc(var(--mantine-spacing-md)*-1)] mr-[calc(var(--mantine-spacing-md)*-1)] h-[calc(100vh-64px)]',
          )}
        >
          <Box
            component="div"
            className={cn(
              'pt-[var(--mantine-spacing-md)] pb-[var(--mantine-spacing-xl)]',
            )}
          >
            {links}
          </Box>
        </ScrollArea>
      </Box>
    </Box>
  );
};
