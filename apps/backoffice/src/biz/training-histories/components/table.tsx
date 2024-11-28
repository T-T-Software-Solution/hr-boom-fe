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
import type { TrainingHistory } from '../types';

export const trainingHistoryTableColumns: MRT_ColumnDef<TrainingHistory>[] = [
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
    accessorKey: 'name',
    header: 'หลักสูตรอบรม',
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
  {
    accessorKey: 'startDate',
    header: 'วันที่เริ่มต้น',
    enableResizing: false,
    Cell: ({ row }) => {
      const value = row.original.startDate ?? '';
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
    accessorKey: 'endDate',
    header: 'วันที่สิ้นสุด',
    enableResizing: false,
    Cell: ({ row }) => {
      const value = row.original.endDate ?? '';
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
    accessorKey: 'trainingOrganization',
    header: 'หน่วยงานที่จัดฝึกอบรม',
    enableResizing: false,
    Cell: ({ row }) => {
      const value = row.original.trainingOrganization ?? '';
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
