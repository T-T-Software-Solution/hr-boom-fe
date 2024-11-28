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
import type { Education } from '../types';

export const educationTableColumns: MRT_ColumnDef<Education>[] = [
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
    accessorKey: 'educationLevel',
    header: 'ระดับการศึกษา',
    enableResizing: false,
    Cell: ({ row }) => {
      const value = row.original.educationLevel?.name ?? '';
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
    accessorKey: 'institutionGraduated',
    header: 'สถานศึกษาที่จบการศึกษา',
    enableResizing: false,
    Cell: ({ row }) => {
      const value = row.original.institutionGraduated ?? '';
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
    accessorKey: 'dateStart',
    header: 'วันที่เริ่มการศึกษา',
    enableResizing: false,
    Cell: ({ row }) => {
      const value = row.original.dateStart ?? '';
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
    accessorKey: 'dateGraduation',
    header: 'วันที่จบการศึกษา',
    enableResizing: false,
    Cell: ({ row }) => {
      const value = row.original.dateGraduation ?? '';
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
    accessorKey: 'faculty',
    header: 'คณะที่จบการศึกษา',
    enableResizing: false,
    Cell: ({ row }) => {
      const value = row.original.faculty ?? '';
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
    accessorKey: 'major',
    header: 'สาขาวิชาที่จบการศึกษา',
    enableResizing: false,
    Cell: ({ row }) => {
      const value = row.original.major ?? '';
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
