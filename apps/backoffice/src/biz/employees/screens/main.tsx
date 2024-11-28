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
import { EmployeeSearchForm } from '../components/search-form';
import { employeeTableColumns } from '../components/table';
import {
  defaultPagination,
  employeeSearchFormDefaultValues,
} from '../constants';
import { EmployeeSearchFormProvider, useEmployeeSearchForm } from '../context';
import {
  type EmployeeSearchForm as EmployeeSearchFormType,
  employeeSearchSchema,
} from '../types';
import { EmployeeCreateScreen } from './create';
import { EmployeeUpdateScreen } from './update';

import type { Gender } from '@backoffice/biz/genders/types';

export const EmployeeMainScreen = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useQueryStates({
    pageIndex: parseAsInteger.withDefault(defaultPagination.pageIndex),
    pageSize: parseAsInteger.withDefault(defaultPagination.pageSize),
  });

  const { data: genders, isLoading: isGendersLoading } =
    $backofficeApi.useQuery('get', '/api/Genders', {
      params: {
        query: {
          pageNo: 1,
          pageSize: 500,
        },
      },
    });
  const [search, setSearch] = useQueryStates({
    employeeId: parseAsString,
    genderId: parseAsString,
    firstName: parseAsString,
    lastName: parseAsString,
    nickname: parseAsString,
    firstNameEn: parseAsString,
    lastNameEn: parseAsString,
    nicknameEn: parseAsString,
    email: parseAsString,
    lineId: parseAsString,
  });

  const searchFormHandler = useEmployeeSearchForm({
    mode: 'uncontrolled',
    initialValues: {
      ...employeeSearchFormDefaultValues,
      ...search,
    },
    validateInputOnChange: true,
    validate: zodResolver(employeeSearchSchema),
  });

  const {
    data: employees,
    isLoading: isEmployeesLoading,
    isError: isEmployeesError,
  } = $backofficeApi.useQuery('get', '/api/Employees', {
    params: {
      query: {
        pageNo: pagination.pageIndex,
        pageSize: pagination.pageSize,
        ...cleanSearchParams(search),
      },
    },
  });

  const { mutate: deleteEmployee, isPending: isDeleteEmployeePending } =
    $backofficeApi.useMutation('delete', '/api/Employees/{id}', {
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
          queryKey: ['get', '/api/Employees'],
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
      title: 'ลบ ข้อมูลบุคลากร',
      centered: true,
      children: (
        <Text size="sm">
          คุณต้องการลบ ข้อมูลบุคลากร ใช่หรือไม่?
          <br />
          การดำเนินการนี้จะทำให้ข้อมูลนี้ถูกลบอย่างถาวร
        </Text>
      ),
      labels: { confirm: 'ใช่, ฉันยืนยันการลบข้อมูลนี้', cancel: 'ยกเลิก' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        deleteEmployee({
          params: { path: { id: id } },
        });
      },
    });
  };

  const handleUpdate = (id: string) => {
    const modalId = 'employee-update-modal';
    modals.open({
      modalId,
      title: 'แก้ไข ข้อมูลบุคลากร',
      children: <EmployeeUpdateScreen id={id} modalId={modalId} />,
      size: 'xl',
    });
  };

  const handleDetail = (id: string) => {
    router.push(`/employee/detail/${id}`);
  };

  const handleCreate = () => {
    const modalId = 'employee-create-modal';
    modals.open({
      modalId,
      title: 'เพิ่ม ข้อมูลบุคลากร',
      children: <EmployeeCreateScreen modalId={modalId} />,
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

  const handleSearchSubmit = (values: EmployeeSearchFormType) => {
    setPagination({ pageIndex: 1, pageSize: 10 });
    setSearch({
      employeeId: values?.employeeId,
      genderId: values?.genderId,
      firstName: values?.firstName,
      lastName: values?.lastName,
      nickname: values?.nickname,
      firstNameEn: values?.firstNameEn,
      lastNameEn: values?.lastNameEn,
      nicknameEn: values?.nicknameEn,
      email: values?.email,
      lineId: values?.lineId,
    });
  };

  const handleClearSearch = () => {
    searchFormHandler.reset();
    setPagination({ pageIndex: 1, pageSize: 10 });
    setSearch({
      employeeId: employeeSearchFormDefaultValues?.employeeId,
      genderId: employeeSearchFormDefaultValues?.genderId,
      firstName: employeeSearchFormDefaultValues?.firstName,
      lastName: employeeSearchFormDefaultValues?.lastName,
      nickname: employeeSearchFormDefaultValues?.nickname,
      firstNameEn: employeeSearchFormDefaultValues?.firstNameEn,
      lastNameEn: employeeSearchFormDefaultValues?.lastNameEn,
      nicknameEn: employeeSearchFormDefaultValues?.nicknameEn,
      email: employeeSearchFormDefaultValues?.email,
      lineId: employeeSearchFormDefaultValues?.lineId,
    });
  };

  const isEventLoading = isEmployeesLoading || isDeleteEmployeePending;
  const table = useMantineReactTable({
    ...createTableConfig({
      columns: employeeTableColumns,
      data: employees?.contents ?? [],
      totalCount: employees?.totalCount ?? 0,
      pagination,
      setPagination,
      isEventLoading,
      isError: isEmployeesError,
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

  const isScreenLoading = isGendersLoading;
  if (isScreenLoading) {
    // z-index 190 is lower than modal z-index (200)
    return <LoadingOverlay zIndex={190} visible={isScreenLoading} />;
  }

  return (
    <Stack gap="xs">
      <Group gap="xs" justify="space-between">
        <Title order={1} size="h3">
          ข้อมูลบุคลากร{' '}
        </Title>
        <Button
          color="primary"
          size="xs"
          variant="outline"
          onClick={handleCreate}
        >
          เพิ่ม ข้อมูลบุคลากร{' '}
        </Button>
      </Group>
      <Card
        withBorder
        shadow="sm"
        radius="md"
        padding="lg"
        className="flex flex-col gap-2 w-full overflow-hidden"
      >
        <EmployeeSearchFormProvider form={searchFormHandler}>
          <Fieldset variant="unstyled" disabled={isEventLoading}>
            <form
              onSubmit={searchFormHandler.onSubmit(handleSearchSubmit)}
              className="flex flex-col gap-4"
            >
              <EmployeeSearchForm
                dropdowns={{
                  genders: getComboboxData(
                    genders?.contents ?? [],
                    'id',
                    'name',
                  ),
                }}
              />
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
        </EmployeeSearchFormProvider>
      </Card>
      <Box component="div" w="100%" className="overflow-hidden">
        <MantineReactTable table={table} />
      </Box>
    </Stack>
  );
};
