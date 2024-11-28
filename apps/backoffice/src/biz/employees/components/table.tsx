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
import type { Employee } from '../types';

export const employeeTableColumns: MRT_ColumnDef<Employee>[] = [
  {
    accessorKey: 'imagePath',
    header: 'รูป',
    enableResizing: false,
    Cell: ({ row }) => {
      const value = row.original.imagePath ?? '';
      const imageSrc = getFileUrl(value)?.fullPath;

      return (
        <Paper shadow="xs" p="0" radius="md" className="overflow-hidden">
          <Image
            src={imageSrc || placeholderImage}
            alt={imageSrc || ''}
            maw="100px"
            mah="100px"
            onError={(e) => {
              e.currentTarget.src = placeholderImage;
            }}
          />
        </Paper>
      );
    },
  },
  {
    accessorKey: 'employeeId',
    header: 'รหัสพนักงาน',
    enableResizing: false,
    Cell: ({ row }) => {
      const value = row.original.employeeId ?? '';
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
    accessorKey: 'gender',
    header: 'เพศ',
    enableResizing: false,
    Cell: ({ row }) => {
      const value = row.original.gender?.name ?? '';
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
    accessorKey: 'firstName',
    header: 'ชื่อ',
    enableResizing: false,
    Cell: ({ row }) => {
      const value = row.original.firstName ?? '';
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
    accessorKey: 'lastName',
    header: 'นามสกุล',
    enableResizing: false,
    Cell: ({ row }) => {
      const value = row.original.lastName ?? '';
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
    accessorKey: 'nickname',
    header: 'ชื่อเล่น',
    enableResizing: false,
    Cell: ({ row }) => {
      const value = row.original.nickname ?? '';
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
    accessorKey: 'telephone',
    header: 'เบอร์โทรศัพท์',
    enableResizing: false,
    Cell: ({ row }) => {
      const value = row.original.telephone ?? '';
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
    accessorKey: 'email',
    header: 'อีเมล',
    enableResizing: false,
    Cell: ({ row }) => {
      const value = row.original.email ?? '';
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
