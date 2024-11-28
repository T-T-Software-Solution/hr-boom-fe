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
import { EmploymentSearchForm } from '../components/search-form';
import { employmentTableColumns } from '../components/table';
import {
  defaultPagination,
  employmentSearchFormDefaultValues,
} from '../constants';
import {
  EmploymentSearchFormProvider,
  useEmploymentSearchForm,
} from '../context';
import {
  type EmploymentSearchForm as EmploymentSearchFormType,
  employmentSearchSchema,
} from '../types';
import { EmploymentCreateScreen } from './create';
import { EmploymentUpdateScreen } from './update';

import type { Employee } from '@backoffice/biz/employees/types';

import type { OrgStructure } from '@backoffice/biz/org-structures/types';

import type { PositionStructure } from '@backoffice/biz/position-structures/types';

import type { EmployeeType } from '@backoffice/biz/employee-types/types';

import type { SocialSecurityType } from '@backoffice/biz/social-security-types/types';

export const EmploymentMainScreen = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useQueryStates({
    pageIndex: parseAsInteger.withDefault(defaultPagination.pageIndex),
    pageSize: parseAsInteger.withDefault(defaultPagination.pageSize),
  });

  const { data: employees, isLoading: isEmployeesLoading } =
    $backofficeApi.useQuery('get', '/api/Employees', {
      params: {
        query: {
          pageNo: 1,
          pageSize: 500,
        },
      },
    });

  const { data: orgStructures, isLoading: isOrgStructuresLoading } =
    $backofficeApi.useQuery('get', '/api/OrgStructures', {
      params: {
        query: {
          pageNo: 1,
          pageSize: 500,
        },
      },
    });

  const { data: positionStructures, isLoading: isPositionStructuresLoading } =
    $backofficeApi.useQuery('get', '/api/PositionStructures', {
      params: {
        query: {
          pageNo: 1,
          pageSize: 500,
        },
      },
    });

  const { data: employeeTypes, isLoading: isEmployeeTypesLoading } =
    $backofficeApi.useQuery('get', '/api/EmployeeTypes', {
      params: {
        query: {
          pageNo: 1,
          pageSize: 500,
        },
      },
    });

  const { data: socialSecurityTypes, isLoading: isSocialSecurityTypesLoading } =
    $backofficeApi.useQuery('get', '/api/SocialSecurityTypes', {
      params: {
        query: {
          pageNo: 1,
          pageSize: 500,
        },
      },
    });
  const [search, setSearch] = useQueryStates({
    employeeId: parseAsString,
    employmentStartDate: parseAsIsoDateTime,
    orgStructureId: parseAsString,
    positionStructureId: parseAsString,
    employeeTypeId: parseAsString,
    socialSecurityTypeId: parseAsString,
  });

  const searchFormHandler = useEmploymentSearchForm({
    mode: 'uncontrolled',
    initialValues: {
      ...employmentSearchFormDefaultValues,
      ...search,
    },
    validateInputOnChange: true,
    validate: zodResolver(employmentSearchSchema),
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
        ...cleanSearchParams(search),
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
      children: <EmploymentCreateScreen modalId={modalId} />,
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

  const handleSearchSubmit = (values: EmploymentSearchFormType) => {
    setPagination({ pageIndex: 1, pageSize: 10 });
    setSearch({
      employeeId: values?.employeeId,
      employmentStartDate:
        values?.employmentStartDate &&
        dayjs(values?.employmentStartDate).isValid()
          ? dayjs(values?.employmentStartDate).toDate()
          : undefined,
      orgStructureId: values?.orgStructureId,
      positionStructureId: values?.positionStructureId,
      employeeTypeId: values?.employeeTypeId,
      socialSecurityTypeId: values?.socialSecurityTypeId,
    });
  };

  const handleClearSearch = () => {
    searchFormHandler.reset();
    setPagination({ pageIndex: 1, pageSize: 10 });
    setSearch({
      employeeId: employmentSearchFormDefaultValues?.employeeId,
      employmentStartDate:
        employmentSearchFormDefaultValues?.employmentStartDate &&
        dayjs(employmentSearchFormDefaultValues?.employmentStartDate).isValid()
          ? dayjs(
              employmentSearchFormDefaultValues?.employmentStartDate,
            ).toDate()
          : undefined,
      orgStructureId: employmentSearchFormDefaultValues?.orgStructureId,
      positionStructureId:
        employmentSearchFormDefaultValues?.positionStructureId,
      employeeTypeId: employmentSearchFormDefaultValues?.employeeTypeId,
      socialSecurityTypeId:
        employmentSearchFormDefaultValues?.socialSecurityTypeId,
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

  const isScreenLoading =
    isEmployeesLoading ||
    isOrgStructuresLoading ||
    isPositionStructuresLoading ||
    isEmployeeTypesLoading ||
    isSocialSecurityTypesLoading;
  if (isScreenLoading) {
    // z-index 190 is lower than modal z-index (200)
    return <LoadingOverlay zIndex={190} visible={isScreenLoading} />;
  }

  return (
    <Stack gap="xs">
      <Group gap="xs" justify="space-between">
        <Title order={1} size="h3">
          การจ้างงาน{' '}
        </Title>
        <Button
          color="primary"
          size="xs"
          variant="outline"
          onClick={handleCreate}
        >
          เพิ่ม การจ้างงาน{' '}
        </Button>
      </Group>
      <Card
        withBorder
        shadow="sm"
        radius="md"
        padding="lg"
        className="flex flex-col gap-2 w-full overflow-hidden"
      >
        <EmploymentSearchFormProvider form={searchFormHandler}>
          <Fieldset variant="unstyled" disabled={isEventLoading}>
            <form
              onSubmit={searchFormHandler.onSubmit(handleSearchSubmit)}
              className="flex flex-col gap-4"
            >
              <EmploymentSearchForm
                dropdowns={{
                  employees: getComboboxData(
                    employees?.contents ?? [],
                    'id',
                    'firstName',
                  ),
                  orgStructures: getComboboxData(
                    orgStructures?.contents ?? [],
                    'id',
                    'name',
                  ),
                  positionStructures: getComboboxData(
                    positionStructures?.contents ?? [],
                    'id',
                    'name',
                  ),
                  employeeTypes: getComboboxData(
                    employeeTypes?.contents ?? [],
                    'id',
                    'name',
                  ),
                  socialSecurityTypes: getComboboxData(
                    socialSecurityTypes?.contents ?? [],
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
        </EmploymentSearchFormProvider>
      </Card>
      <Box component="div" w="100%" className="overflow-hidden">
        <MantineReactTable table={table} />
      </Box>
    </Stack>
  );
};
