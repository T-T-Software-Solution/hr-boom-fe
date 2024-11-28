'use client';

import { $backofficeApi, ApiError } from '@backoffice/services/api';
import { getErrorMessage } from '@backoffice/utils/error';
import { useRouter } from 'next/navigation';
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Fieldset,
  Grid,
  Group,
  LoadingOverlay,
  Stack,
  Text,
  Title,
  Tooltip,
  rem,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import {
  IconDownload,
  IconEdit,
  IconEye,
  IconSearch,
  IconTrash,
  IconX,
} from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import {
  cleanSearchParams,
  createTableConfig,
  getComboboxData,
  getFileUrl,
  viewFileInNewTabOrDownload,
} from '@tt-ss-hr/shared-utils';
import dayjs from 'dayjs';
import { zodResolver } from 'mantine-form-zod-resolver';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import {
  parseAsBoolean,
  parseAsInteger,
  parseAsIsoDateTime,
  parseAsFloat,
  parseAsString,
  useQueryStates,
} from 'nuqs';
import { BankSearchForm } from '../components/search-form';
import { bankTableColumns } from '../components/table';
import { defaultPagination, bankSearchFormDefaultValues } from '../constants';
import { BankSearchFormProvider, useBankSearchForm } from '../context';
import {
  type BankSearchForm as BankSearchFormType,
  bankSearchSchema,
} from '../types';
import { BankCreateScreen } from './create';
import { BankUpdateScreen } from './update';

export const BankMainScreen = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useQueryStates({
    pageIndex: parseAsInteger.withDefault(defaultPagination.pageIndex),
    pageSize: parseAsInteger.withDefault(defaultPagination.pageSize),
  });

  const [search, setSearch] = useQueryStates({
    name: parseAsString,
  });

  const searchFormHandler = useBankSearchForm({
    mode: 'uncontrolled',
    initialValues: {
      ...bankSearchFormDefaultValues,
      ...search,
    },
    validateInputOnChange: true,
    validate: zodResolver(bankSearchSchema),
  });

  const {
    data: banks,
    isLoading: isBanksLoading,
    isError: isBanksError,
  } = $backofficeApi.useQuery('get', '/api/Banks', {
    params: {
      query: {
        pageNo: pagination.pageIndex,
        pageSize: pagination.pageSize,
        ...cleanSearchParams(search),
      },
    },
  });

  const { mutate: deleteBank, isPending: isDeleteBankPending } =
    $backofficeApi.useMutation('delete', '/api/Banks/{id}', {
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
          queryKey: ['get', '/api/Banks'],
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
      title: 'ลบ ตั้งค่าธนาคาร',
      centered: true,
      children: (
        <Text size="sm">
          คุณต้องการลบ ตั้งค่าธนาคาร ใช่หรือไม่?
          <br />
          การดำเนินการนี้จะทำให้ข้อมูลนี้ถูกลบอย่างถาวร
        </Text>
      ),
      labels: { confirm: 'ใช่, ฉันยืนยันการลบข้อมูลนี้', cancel: 'ยกเลิก' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        deleteBank({
          params: { path: { id: id } },
        });
      },
    });
  };

  const handleUpdate = (id: string) => {
    const modalId = 'bank-update-modal';
    modals.open({
      modalId,
      title: 'แก้ไข ตั้งค่าธนาคาร',
      children: <BankUpdateScreen id={id} modalId={modalId} />,
      size: 'xl',
    });
  };

  const handleDetail = (id: string) => {
    router.push(`/bank/detail/${id}`);
  };

  const handleCreate = () => {
    const modalId = 'bank-create-modal';
    modals.open({
      modalId,
      title: 'เพิ่ม ตั้งค่าธนาคาร',
      children: <BankCreateScreen modalId={modalId} />,
      size: 'xl',
    });
  };

  const handleViewFile = async (file?: string | null) => {
    if (!file) {
      notifications.show({
        color: 'red',
        message: 'ไม่พบไฟล์',
      });
      return;
    }

    const fileUrl = getFileUrl(file);
    viewFileInNewTabOrDownload({
      uploadFile: fileUrl?.fileName,
      previewFile: fileUrl?.fullPath,
    });
  };

  const handleSearchSubmit = (values: BankSearchFormType) => {
    setPagination({ pageIndex: 1, pageSize: 10 });
    setSearch({
      name: values?.name,
    });
  };

  const handleClearSearch = () => {
    searchFormHandler.reset();
    setPagination({ pageIndex: 1, pageSize: 10 });
    setSearch({
      name: bankSearchFormDefaultValues?.name,
    });
  };

  const isEventLoading = isBanksLoading || isDeleteBankPending;
  const table = useMantineReactTable({
    ...createTableConfig({
      columns: bankTableColumns,
      data: banks?.contents ?? [],
      totalCount: banks?.totalCount ?? 0,
      pagination,
      setPagination,
      isEventLoading,
      isError: isBanksError,
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
        <Title order={1} size="h3">
          ตั้งค่าธนาคาร{' '}
        </Title>
        <Button
          color="primary"
          size="xs"
          variant="outline"
          onClick={handleCreate}
        >
          เพิ่ม ตั้งค่าธนาคาร{' '}
        </Button>
      </Group>
      <Card
        withBorder
        shadow="sm"
        radius="md"
        padding="lg"
        className="flex flex-col gap-2 w-full overflow-hidden"
      >
        <BankSearchFormProvider form={searchFormHandler}>
          <Fieldset variant="unstyled" disabled={isEventLoading}>
            <form
              onSubmit={searchFormHandler.onSubmit(handleSearchSubmit)}
              className="flex flex-col gap-4"
            >
              <BankSearchForm />
              <Grid justify="flex-end" align="flex-end">
                {Object.values(search).some(
                  (value) => value !== null && value !== undefined,
                ) && (
                  <Grid.Col span={{ base: 12, md: 2 }}>
                    <Button
                      type="button"
                      variant="outline"
                      bd="none"
                      leftSection={<IconX size={14} />}
                      loading={isEventLoading}
                      w="100%"
                      onClick={handleClearSearch}
                    >
                      ล้างข้อมูล
                    </Button>
                  </Grid.Col>
                )}
                <Grid.Col span={{ base: 12, md: 3 }}>
                  <Button
                    type="submit"
                    leftSection={<IconSearch size={14} />}
                    loading={isEventLoading}
                    w="100%"
                  >
                    ค้นหา
                  </Button>
                </Grid.Col>
              </Grid>
            </form>
          </Fieldset>
        </BankSearchFormProvider>
      </Card>
      <Box component="div" w="100%" className="overflow-hidden">
        <MantineReactTable table={table} />
      </Box>
    </Stack>
  );
};
