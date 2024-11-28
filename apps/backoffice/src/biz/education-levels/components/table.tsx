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
import type { EducationLevel } from '../types';

export const educationLevelTableColumns: MRT_ColumnDef<EducationLevel>[] = [
  {
    accessorKey: 'name',
    header: 'ชื่อวุฒิการศึกษา',
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
