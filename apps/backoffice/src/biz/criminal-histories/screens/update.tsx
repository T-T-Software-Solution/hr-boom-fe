'use client';

import { uploadFile } from '@backoffice/actions/uploader';
import { $backofficeApi, type ApiError } from '@backoffice/services/api';
import {
  Button,
  Fieldset,
  FocusTrap,
  Grid,
  LoadingOverlay,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { useQueryClient } from '@tanstack/react-query';
import {
  getComboboxData,
  getFileUrl,
  uploadFileIfNeeded,
} from '@tt-ss-hr/shared-utils';
import dayjs from 'dayjs';
import { zodResolver } from 'mantine-form-zod-resolver';
import type React from 'react';
import { useEffect } from 'react';
import { CriminalHistoryForm } from '../components/form';
import { criminalHistoryFormDefaultValues } from '../constants';
import {
  CriminalHistoryFormProvider,
  useCriminalHistoryForm,
} from '../context';
import {
  type CriminalHistoryForm as CriminalHistoryFormType,
  criminalHistoryUpdateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

import type { Employee } from '@backoffice/biz/employees/types';

interface CriminalHistoryUpdateScreenProps {
  modalId?: string;
  id: string;
}

export const CriminalHistoryUpdateScreen: React.FC<
  CriminalHistoryUpdateScreenProps
> = ({ modalId, id }) => {
  const queryClient = useQueryClient();
  const formHandler = useCriminalHistoryForm({
    initialValues: criminalHistoryFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(criminalHistoryUpdateSchema),
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
  const { data: criminalHistory, isLoading: isCriminalHistoryLoading } =
    $backofficeApi.useQuery('get', '/api/CriminalHistories/{id}', {
      params: {
        path: {
          id,
        },
      },
    });

  const {
    mutate: updateCriminalHistory,
    isPending: isUpdateCriminalHistoryLoading,
  } = $backofficeApi.useMutation('put', '/api/CriminalHistories/{id}', {
    onSuccess: () => {
      notifications.show({
        color: 'green',
        message: 'บันทึกข้อมูลสำเร็จ',
      });

      if (modalId) {
        modals.close(modalId);
      }
    },
    onError: (error: ApiError) => {
      notifications.show({
        color: 'red',
        message: getErrorMessage(error),
      });
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          'get',
          '/api/CriminalHistories/{id}',
          { params: { path: { id: id } } },
        ],
        refetchType: 'all',
      });

      await queryClient.invalidateQueries({
        queryKey: ['get', '/api/CriminalHistories'],
        refetchType: 'all',
      });
    },
  });

  const onHandleSubmit = async (values: CriminalHistoryFormType) => {
    try {
      const parsedValue = criminalHistoryUpdateSchema.parse(values);

      updateCriminalHistory({
        params: {
          path: {
            id,
          },
        },
        body: {
          id: parsedValue?.id || '',
          employeeId: parsedValue?.employeeId || '',
          dateOfPunishment:
            parsedValue?.dateOfPunishment &&
            dayjs(parsedValue?.dateOfPunishment).isValid()
              ? dayjs(parsedValue?.dateOfPunishment).toISOString()
              : undefined,
          listPunishment: parsedValue?.listPunishment || '',
          note: parsedValue?.note || '',
        },
      });
    } catch (error: unknown) {
      notifications.show({
        color: 'red',
        message: getErrorMessage(error),
      });
    }
  };

  useEffect(
    function feedDataToForm() {
      if (criminalHistory && !isCriminalHistoryLoading) {
        formHandler.setValues({
          id: criminalHistory?.id ?? '',
          employeeId: criminalHistory?.employee?.id ?? '',
          dateOfPunishment:
            criminalHistory?.dateOfPunishment &&
            dayjs(criminalHistory?.dateOfPunishment).isValid()
              ? dayjs(criminalHistory?.dateOfPunishment).toDate()
              : undefined,
          listPunishment: criminalHistory?.listPunishment ?? '',
          note: criminalHistory?.note ?? '',
        });
        formHandler.resetDirty();
      }
    },
    [criminalHistory, isCriminalHistoryLoading],
  );

  const isEventLoading = isUpdateCriminalHistoryLoading;
  const isScreenLoading = isCriminalHistoryLoading || isEmployeesLoading;
  if (isScreenLoading) {
    return <LoadingOverlay visible={isScreenLoading} />;
  }

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <CriminalHistoryFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <CriminalHistoryForm
              isUpdate
              dropdowns={{
                employees: getComboboxData(
                  employees?.contents ?? [],
                  'id',
                  'firstName',
                ),
              }}
            />
            <Grid justify="flex-end">
              {modalId && (
                <Grid.Col span={{ base: 12, md: 3 }}>
                  <Button
                    type="button"
                    color="gray.7"
                    size="xs"
                    mt="sm"
                    ml="auto"
                    variant="transparent"
                    fullWidth
                    loading={isEventLoading}
                    onClick={() => {
                      modals.close(modalId);
                    }}
                  >
                    ยกเลิก
                  </Button>
                </Grid.Col>
              )}
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Button
                  type="submit"
                  color="primary"
                  size="xs"
                  mt="sm"
                  ml="auto"
                  variant="outline"
                  fullWidth
                  loading={isEventLoading}
                >
                  บันทึก
                </Button>
              </Grid.Col>
            </Grid>
          </FocusTrap>
        </form>
      </CriminalHistoryFormProvider>
    </Fieldset>
  );
};
