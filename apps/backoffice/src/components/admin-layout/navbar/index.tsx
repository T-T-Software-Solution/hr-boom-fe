'use client';

import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Flex,
  Group,
  Menu,
  Text,
  Tooltip,
  UnstyledButton,
  rem,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconLogout,
  IconMenu2,
  IconMoon,
  IconSettings,
  IconSun,
} from '@tabler/icons-react';
import { cn } from '@tt-ss-hr/shared-utils';
import type React from 'react';
import type { NavbarProps } from './types';

export const Navbar: React.FC<NavbarProps> = ({ onOpen }) => {
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const isSmall = useMediaQuery('(max-width: 768px)');
  const isExtraSmall = useMediaQuery('(max-width: 475px)');
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });
  const isDark: boolean = computedColorScheme === 'dark';
  const toggleColorScheme = () => {
    setColorScheme(isDark ? 'light' : 'dark');
  };

  return (
    <Box
      component="nav"
      className={cn(
        'w-full py-4 px-4 shadow-sm border-b sticky top-0 z-[20] gap-2 flex justify-between items-center flex-row flex-wrap h-[77px] max-h-[77px]',
        'bg-white border-b-[var(--mantine-color-slate-0)]',
        'dark:bg-[var(--mantine-color-dark-7)] dark:border-b-[var(--mantine-color-dark-6)]',
      )}
    >
      <Badge color="primary" variant="light">
        Administrator
      </Badge>
      <Group justify="flex-end" align="center">
        <Tooltip label={isDark ? 'Light mode' : 'Dark mode'} position="bottom">
          <ActionIcon
            aria-label="Color scheme"
            variant="outline"
            size="md"
            radius="md"
            className="dark:border-[var(--mantine-color-yellow-6)] border-[mantine-color-blue-6]"
            onClick={() => toggleColorScheme()}
          >
            <IconSun
              className={cn(
                'block dark:hidden',
                'text-[mantine-color-blue-6]',
                'dark:text-[var(--mantine-color-yellow-6)]',
              )}
              stroke={1.5}
              style={{ width: rem(16), height: rem(16) }}
            />
            <IconMoon
              className={cn(
                'hidden dark:block',
                'text-[mantine-color-blue-6]',
                'dark:text-[var(--mantine-color-yellow-6)]',
              )}
              stroke={1.5}
              style={{ width: rem(16), height: rem(16) }}
            />
          </ActionIcon>
        </Tooltip>
        <Menu shadow="md" width={300} position="bottom-end">
          <Menu.Target>
            <UnstyledButton>
              <Group>
                {!isSmall && (
                  <Flex flex={1} direction="column">
                    <Text size="sm" fw={500}>
                      Harriette Spoonlicker
                    </Text>

                    <Text c="dimmed" size="xs">
                      hspoonlicker@outlook.com
                    </Text>
                  </Flex>
                )}
                <Avatar
                  name="Harriette Spoonlicker"
                  color="primary"
                  radius="xl"
                />
              </Group>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label c="primary">Account</Menu.Label>
            <Menu.Item
              component="a"
              href="/profile"
              leftSection={
                <IconSettings style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Settings
            </Menu.Item>
            <Menu.Item
              component="a"
              href="/logout"
              color="red"
              leftSection={
                <IconLogout style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        {onOpen && isTablet && (
          <Tooltip label="View PDF" position="bottom">
            <ActionIcon
              type="button"
              aria-label="View PDF"
              variant="outline"
              size="md"
              radius="md"
              onClick={onOpen}
            >
              <IconMenu2
                stroke={1.5}
                style={{ width: rem(16), height: rem(16) }}
              />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
    </Box>
  );
};
