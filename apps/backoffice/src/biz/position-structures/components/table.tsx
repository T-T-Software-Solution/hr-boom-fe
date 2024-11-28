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
import type { PositionStructure } from '../types';

export const positionStructureTableColumns: MRT_ColumnDef<PositionStructure>[] =
  [
    {
      accessorKey: 'positionStructureType',
      header: 'ชนิดของตำแหน่ง',
      enableResizing: false,
      Cell: ({ row }) => {
        const value = row.original.positionStructureType?.name ?? '';
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
      header: 'รหัสของตำแหน่ง',
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
      header: 'ชื่อตำแหน่ง',
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
      accessorKey: 'nameEn',
      header: 'ชื่อตำแหน่งงาน (EN)',
      enableResizing: false,
      Cell: ({ row }) => {
        const value = row.original.nameEn ?? '';
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
      accessorKey: 'level',
      header: 'ระดับตำแหน่ง',
      enableResizing: false,
      Cell: ({ row }) => {
        const value = row.original.level ?? '';
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
      header: 'เงินเดือนประจำตำแหน่ง',
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
      accessorKey: 'descriptionEn',
      header: 'คำอธิบายของตำแหน่งงาน (EN)',
      enableResizing: false,
      Cell: ({ row }) => {
        const value = row.original.descriptionEn ?? '';
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
