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
import type { TaxBracket } from '../types';

export const taxBracketTableColumns: MRT_ColumnDef<TaxBracket>[] = [
  {
    accessorKey: 'name',
    header: 'อัตราภาษี',
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
    accessorKey: 'maxIncome',
    header: 'รายได้สูงสุดที่อยู่ในระดับภาษีนั้น',
    enableResizing: false,
    Cell: ({ row }) => {
      const value = row.original.maxIncome ?? '';
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
