'use client';
import { Anchor, Box, Flex, Image, Paper } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import {
  formatCurrency,
  getFileUrl,
  placeholderImage,
  viewFileInNewTabOrDownload,
} from '@tt-ss-hr/shared-utils';
import dayjs from 'dayjs';
import type { MRT_ColumnDef } from 'mantine-react-table';
import React from 'react';
import { useEffect, useState } from 'react';
import type { OrgStructure } from '../types';

export const orgStructureTableColumns: MRT_ColumnDef<OrgStructure>[] = [
  {
    accessorKey: 'orgStructureType',
    header: 'ชนิดของโครงสร้างองค์กร',
    enableResizing: false,
    Cell: ({ row }) => {
      const value = row.original.orgStructureType?.name ?? '';
      return (
        <Box
          component="div"
          className="whitespace-normal text-pretty break-all"
        >
          {value}
        </Box>
      );
    },
  },
  {
    accessorKey: 'code',
    header: 'รหัสขององค์กร',
    enableResizing: false,
    Cell: ({ row }) => {
      const value = row.original.code ?? '';
      return (
        <Box
          component="div"
          className="whitespace-normal text-pretty break-all"
        >
          {value}
        </Box>
      );
    },
  },
  {
    accessorKey: 'name',
    header: 'ชื่อ',
    enableResizing: false,
    Cell: ({ row }) => {
      const value = row.original.name ?? '';
      return (
        <Box
          component="div"
          className="whitespace-normal text-pretty break-all"
        >
          {value}
        </Box>
      );
    },
  },
];
