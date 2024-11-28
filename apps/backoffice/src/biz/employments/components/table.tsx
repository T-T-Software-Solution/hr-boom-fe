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
import type { Employment } from '../types';

export const employmentTableColumns: MRT_ColumnDef<Employment>[] = [
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
    accessorKey: 'orgStructure',
    header: 'แผนก',
    enableResizing: false,
    Cell: ({ row }) => {
      const value = row.original.orgStructure?.name ?? '';
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
    accessorKey: 'positionStructure',
    header: 'ตำแหน่งงาน',
    enableResizing: false,
    Cell: ({ row }) => {
      const value = row.original.positionStructure?.name ?? '';
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
    accessorKey: 'employeeType',
    header: 'ประเภทพนักงาน',
    enableResizing: false,
    Cell: ({ row }) => {
      const value = row.original.employeeType?.name ?? '';
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
    accessorKey: 'socialSecurityType',
    header: 'สิทธิ์ประกันสังคม',
    enableResizing: false,
    Cell: ({ row }) => {
      const value = row.original.socialSecurityType?.name ?? '';
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
    accessorKey: 'salary',
    header: 'เงินเดือน',
    enableResizing: false,
    Cell: ({ row }) => {
      const value = row.original.salary ?? '';
      const formattedValue = value
        ? formatCurrency(Number.parseFloat(String(value)), true)
        : '0';

      return (
        <Box
          component="div"
          className="whitespace-normal text-pretty break-all"
        >
          {formattedValue}
        </Box>
      );
    },
  },
  {
    accessorKey: 'taxCondition',
    header: 'เงื่อนไขการหักภาษี',
    enableResizing: false,
    Cell: ({ row }) => {
      const value = row.original.taxCondition?.name ?? '';
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
    accessorKey: 'netSalary',
    header: 'เงินเดือนสุทธิ',
    enableResizing: false,
    Cell: ({ row }) => {
      const value = row.original.netSalary ?? '';
      const formattedValue = value
        ? formatCurrency(Number.parseFloat(String(value)), true)
        : '0';

      return (
        <Box
          component="div"
          className="whitespace-normal text-pretty break-all"
        >
          {formattedValue}
        </Box>
      );
    },
  },
];
