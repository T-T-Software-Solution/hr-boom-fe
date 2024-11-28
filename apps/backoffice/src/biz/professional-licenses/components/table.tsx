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
import type { ProfessionalLicense } from '../types';

export const professionalLicenseTableColumns: MRT_ColumnDef<ProfessionalLicense>[] =
  [
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
      header: 'ชื่อใบอนุญาต',
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
      accessorKey: 'agency',
      header: 'หน่วยงาน',
      enableResizing: false,
      Cell: ({ row }) => {
        const value = row.original.agency ?? '';
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
      accessorKey: 'numberLicense',
      header: 'เลขที่ใบอนุญาต',
      enableResizing: false,
      Cell: ({ row }) => {
        const value = row.original.numberLicense ?? '';
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
      accessorKey: 'effectiveDate',
      header: 'วันที่มีผลบังคับใช้',
      enableResizing: false,
      Cell: ({ row }) => {
        const value = row.original.effectiveDate ?? '';
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
  ];
