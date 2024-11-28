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
import { TrainingHistoryForm } from '../components/form';
import { trainingHistoryFormDefaultValues } from '../constants';
import {
  TrainingHistoryFormProvider,
  useTrainingHistoryForm,
} from '../context';
import {
  type TrainingHistoryForm as TrainingHistoryFormType,
  trainingHistoryUpdateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

import type { Employee } from '@backoffice/biz/employees/types';

interface TrainingHistoryUpdateScreenProps {
  modalId?: string;
  id: string;
}

export const TrainingHistoryUpdateScreen: React.FC<
  TrainingHistoryUpdateScreenProps
> = ({ modalId, id }) => {
  const queryClient = useQueryClient();
  const formHandler = useTrainingHistoryForm({
    initialValues: trainingHistoryFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(trainingHistoryUpdateSchema),
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
  const { data: trainingHistory, isLoading: isTrainingHistoryLoading } =
    $backofficeApi.useQuery('get', '/api/TrainingHistories/{id}', {
      params: {
        path: {
          id,
        },
      },
    });

  const {
    mutate: updateTrainingHistory,
    isPending: isUpdateTrainingHistoryLoading,
  } = $backofficeApi.useMutation('put', '/api/TrainingHistories/{id}', {
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
          '/api/TrainingHistories/{id}',
          { params: { path: { id: id } } },
        ],
        refetchType: 'all',
      });

      await queryClient.invalidateQueries({
        queryKey: ['get', '/api/TrainingHistories'],
        refetchType: 'all',
      });
    },
  });

  const onHandleSubmit = async (values: TrainingHistoryFormType) => {
    try {
      const parsedValue = trainingHistoryUpdateSchema.parse(values);

      updateTrainingHistory({
        params: {
          path: {
            id,
          },
        },
        body: {
          id: parsedValue?.id || '',
          employeeId: parsedValue?.employeeId || '',
          name: parsedValue?.name || '',
          startDate:
            parsedValue?.startDate && dayjs(parsedValue?.startDate).isValid()
              ? dayjs(parsedValue?.startDate).toISOString()
              : undefined,
          endDate:
            parsedValue?.endDate && dayjs(parsedValue?.endDate).isValid()
              ? dayjs(parsedValue?.endDate).toISOString()
              : undefined,
          trainingOrganization: parsedValue?.trainingOrganization || '',
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
      if (trainingHistory && !isTrainingHistoryLoading) {
        formHandler.setValues({
          id: trainingHistory?.id ?? '',
          employeeId: trainingHistory?.employee?.id ?? '',
          name: trainingHistory?.name ?? '',
          startDate:
            trainingHistory?.startDate &&
            dayjs(trainingHistory?.startDate).isValid()
              ? dayjs(trainingHistory?.startDate).toDate()
              : undefined,
          endDate:
            trainingHistory?.endDate &&
            dayjs(trainingHistory?.endDate).isValid()
              ? dayjs(trainingHistory?.endDate).toDate()
              : undefined,
          trainingOrganization: trainingHistory?.trainingOrganization ?? '',
        });
        formHandler.resetDirty();
      }
    },
    [trainingHistory, isTrainingHistoryLoading],
  );

  const isEventLoading = isUpdateTrainingHistoryLoading;
  const isScreenLoading = isTrainingHistoryLoading || isEmployeesLoading;
  if (isScreenLoading) {
    return <LoadingOverlay visible={isScreenLoading} />;
  }

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <TrainingHistoryFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <TrainingHistoryForm
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
      </TrainingHistoryFormProvider>
    </Fieldset>
  );
};
