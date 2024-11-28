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
import type { DocumentFile } from '../types';

export const documentFileTableColumns: MRT_ColumnDef<DocumentFile>[] = [
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
    accessorKey: 'filePath',
    header: 'ไฟล์เอกสาร',
    enableResizing: false,
    Cell: ({ row }) => {
      const value = row.original.filePath ?? '';
      return (
        <Box
          component="div"
          className="whitespace-normal text-pretty break-all"
        >
          {value ? (
            <Anchor href={value} target="_blank">
              {value}
            </Anchor>
          ) : (
            '-'
          )}
        </Box>
      );
    },
  },
  {
    accessorKey: 'fileType',
    header: 'ชื่อเอกสาร',
    enableResizing: false,
    Cell: ({ row }) => {
      const value = row.original.fileType ?? '';
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
