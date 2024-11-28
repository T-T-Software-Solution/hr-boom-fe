'use client';

import { Box, Divider, Group, Text, rem } from '@mantine/core';
import { IconChevronRight, IconHome } from '@tabler/icons-react';
import { cn } from '@tt-ss-hr/shared-utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import type { BreadcrumbProps } from './types';

// Function to detect if a segment is a UUID (simplified check for common UUID patterns)
const isUUID = (segment: string) => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(segment);
};

export const Breadcrumb: React.FC<BreadcrumbProps> = () => {
  const pathname = usePathname();

  // Split the pathname into segments, excluding empty strings
  const segments = pathname.split('/').filter(Boolean);

  // Build the breadcrumb items
  const breadcrumbItems = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join('/')}`;

    // Check if the segment is a UUID, if so, don't modify it
    const segmentName = isUUID(segment)
      ? segment
      : decodeURIComponent(segment)
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (char) => char.toUpperCase());

    const isLast = index === segments.length - 1;

    return (
      <React.Fragment key={href}>
        <IconChevronRight
          stroke={1.5}
          style={{ width: rem(12), height: rem(12) }}
        />
        {isLast ? (
          // Disable link for the last segment
          <Text c="primary" size="sm" fw="bold">
            {segmentName}
          </Text>
        ) : (
          <Link href={href}>
            <Text c="gray" size="sm" fw="normal">
              {segmentName}
            </Text>
          </Link>
        )}
      </React.Fragment>
    );
  });

  return (
    <Box
      component="div"
      className={cn(
        'border-b drop-shadow-sm py-2 px-4 h-auto z-[1] flex gap-4 items-center',
        'bg-white border-b-[var(--mantine-color-slate-0)]',
        'dark:bg-[var(--mantine-color-dark-7)] dark:border-b-[var(--mantine-color-dark-6)]',
      )}
    >
      {/* Home Breadcrumb */}
      <Link href="/">
        <Group gap={5}>
          <IconHome stroke={1.5} style={{ width: rem(18), height: rem(18) }} />
          <Text size="sm" fw="bold">
            Home
          </Text>
        </Group>
      </Link>

      {/* Divider */}
      {segments.length > 0 && <Divider orientation="vertical" />}

      {/* Dynamic Breadcrumb Items */}
      <Group gap={5}>{breadcrumbItems}</Group>
    </Box>
  );
};
