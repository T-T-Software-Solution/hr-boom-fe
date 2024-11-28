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
import type { CriminalHistory } from '../types';

export const criminalHistoryTableColumns: MRT_ColumnDef<CriminalHistory>[] = [
  {
    accessorKey: 'employee',
    header: 'ชื่อพนักงาน',
    enableResizing: false,
    Cell: ({ row }) => {
      const value = row.original.employee?.firstName ?? '';
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
    accessorKey: 'dateOfPunishment',
    header: 'วันที่ทำผิด',
    enableResizing: false,
    Cell: ({ row }) => {
      const value = row.original.dateOfPunishment ?? '';
      const formattedValue =
        value && dayjs(value).isValid()
          ? dayjs(value).format('DD/MM/BBBB')
          : '-';

      return (
        <Box
          component="div"
          className="whitespace-normal text-pretty break-all"
        >
          <Flex align="center">{formattedValue}</Flex>
        </Box>
      );
    },
  },
  {
    accessorKey: 'listPunishment',
    header: 'รายการที่ถูกลงโทษ',
    enableResizing: false,
    Cell: ({ row }) => {
      const value = row.original.listPunishment ?? '';
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
    accessorKey: 'note',
    header: 'เอกสารอ้างอิง',
    enableResizing: false,
    Cell: ({ row }) => {
      const value = row.original.note ?? '';
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
