'use client';

import { $backofficeApi, ApiError } from '@backoffice/services/api';
import { getErrorMessage } from '@backoffice/utils/error';
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Stack,
  Text,
  Tooltip,
  rem
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import {
  IconEdit,
  IconEye,
  IconTrash
} from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import {
  createTableConfig
} from '@tt-ss-hr/shared-utils';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { useRouter } from 'next/navigation';
import {
  parseAsInteger,
  useQueryStates
} from 'nuqs';
import { employmentTableColumns } from '../components/table';
import {
  defaultPagination
} from '../constants';
import { EmploymentCreateScreen } from './create';
import { EmploymentUpdateScreen } from './update';

interface EmploymentMainScreenProps {
  id?: string;
}

export const EmploymentMainScreen: React.FC<EmploymentMainScreenProps> = ({
  id
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useQueryStates({
    pageIndex: parseAsInteger.withDefault(defaultPagination.pageIndex),
    pageSize: parseAsInteger.withDefault(defaultPagination.pageSize),
  });

  const {
    data: employments,
    isLoading: isEmploymentsLoading,
    isError: isEmploymentsError,
  } = $backofficeApi.useQuery('get', '/api/Employments', {
    params: {
      query: {
        pageNo: pagination.pageIndex,
        pageSize: pagination.pageSize,
        id: id
      },
    },
  });

  const { mutate: deleteEmployment, isPending: isDeleteEmploymentPending } =
    $backofficeApi.useMutation('delete', '/api/Employments/{id}', {
      onSuccess: () => {
        notifications.show({
          color: 'green',
          message: 'ลบข้อมูลสำเร็จ',
        });
      },
      onError: (error: ApiError) => {
        notifications.show({
          color: 'red',
          message: getErrorMessage(error),
        });
      },
      onSettled: async () => {
        await queryClient.invalidateQueries({
          queryKey: ['get', '/api/Employments'],
        });
      },
    });

  const handleDelete = (id?: string | null) => {
    if (!id) {
      notifications.show({
        color: 'red',
        message: 'Unknown ID',
      });
      return;
    }

    modals.openConfirmModal({
      title: 'ลบ การจ้างงาน',
      centered: true,
      children: (
        <Text size="sm">
          คุณต้องการลบ การจ้างงาน ใช่หรือไม่?
          <br />
          การดำเนินการนี้จะทำให้ข้อมูลนี้ถูกลบอย่างถาวร
        </Text>
      ),
      labels: { confirm: 'ใช่, ฉันยืนยันการลบข้อมูลนี้', cancel: 'ยกเลิก' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        deleteEmployment({
          params: { path: { id: id } },
        });
      },
    });
  };

  const handleUpdate = (id: string) => {
    const modalId = 'employment-update-modal';
    modals.open({
      modalId,
      title: 'แก้ไข การจ้างงาน',
      children: <EmploymentUpdateScreen id={id} modalId={modalId} />,
      size: 'xl',
    });
  };

  const handleDetail = (id: string) => {
    router.push(`/employment/detail/${id}`);
  };

  const handleCreate = () => {
    const modalId = 'employment-create-modal';
    modals.open({
      modalId,
      title: 'เพิ่ม การจ้างงาน',
      children: <EmploymentCreateScreen modalId={modalId} id={id} />,
      size: 'xl',
    });
  };

  const isEventLoading = isEmploymentsLoading || isDeleteEmploymentPending;
  const table = useMantineReactTable({
    ...createTableConfig({
      columns: employmentTableColumns,
      data: employments?.contents ?? [],
      totalCount: employments?.totalCount ?? 0,
      pagination,
      setPagination,
      isEventLoading,
      isError: isEmploymentsError,
    }),
    renderRowActions: ({ row }) => (
      <Group display="flex" w="100%" gap="xs">
        <Tooltip label="รายละเอียด" position="bottom">
          <ActionIcon
            aria-label="รายละเอียด"
            color="blue"
            variant="filled"
            size="md"
            radius="md"
            loading={isEventLoading}
            disabled={!row?.original?.id || isEventLoading}
            onClick={() => handleDetail(row?.original?.id ?? '')}
          >
            <IconEye stroke={1.5} style={{ width: rem(18), height: rem(18) }} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="แก้ไข" position="bottom">
          <ActionIcon
            aria-label="แก้ไข"
            color="orange"
            variant="filled"
            size="md"
            radius="md"
            loading={isEventLoading}
            disabled={!row?.original?.id || isEventLoading}
            onClick={() => handleUpdate(row?.original?.id ?? '')}
          >
            <IconEdit
              stroke={1.5}
              style={{ width: rem(18), height: rem(18) }}
            />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="ลบ" position="bottom">
          <ActionIcon
            aria-label="ลบ"
            color="red"
            variant="filled"
            size="md"
            radius="md"
            loading={isEventLoading}
            disabled={!row?.original?.id || isEventLoading}
            onClick={() => handleDelete(row?.original?.id)}
          >
            <IconTrash
              stroke={1.5}
              style={{ width: rem(18), height: rem(18) }}
            />
          </ActionIcon>
        </Tooltip>
      </Group>
    ),
  });

  return (
    <Stack gap="xs">
      <Group gap="xs" justify="space-between">
        <Button
          color="primary"
          size="xs"
          variant="outline"
          onClick={handleCreate}
        >
          เพิ่ม การจ้างงาน{' '}
        </Button>
      </Group>
      <Box component="div" w="100%" className="overflow-hidden">
        <MantineReactTable table={table} />
      </Box>
    </Stack>
  );
};
