'use client';

import { $backofficeApi, type ApiError } from '@backoffice/services/api';
import { getErrorMessage } from '@backoffice/utils/error';
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
import { getComboboxData } from '@tt-ss-hr/shared-utils';
import dayjs from 'dayjs';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useRouter } from 'next/navigation';
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
  trainingHistoryCreateSchema,
} from '../types';


interface TrainingHistoryCreateScreenProps {
  modalId?: string;
  id?: string;
}

export const TrainingHistoryCreateScreen: React.FC<
  TrainingHistoryCreateScreenProps
> = ({ modalId, id }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const formHandler = useTrainingHistoryForm({
    initialValues: trainingHistoryFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(trainingHistoryCreateSchema),
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
  const {
    mutate: createTrainingHistory,
    isPending: isCreateTrainingHistoryLoading,
  } = $backofficeApi.useMutation('post', '/api/TrainingHistories', {
    onSuccess: () => {
      notifications.show({
        color: 'green',
        message: 'บันทึกข้อมูลสำเร็จ',
      });

      if (!modalId) {
        router.push('/training-history');
        return;
      }

      modals.close(modalId);
    },
    onError: (error: ApiError) => {
      notifications.show({
        color: 'red',
        message: getErrorMessage(error),
      });
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['get', '/api/TrainingHistories'],
        refetchType: 'all',
      });
    },
  });

  const onHandleSubmit = async (values: TrainingHistoryFormType) => {
    try {
      const parsedValue = trainingHistoryCreateSchema.parse(values);

      createTrainingHistory({
        body: {
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
      if (employees && !isEmployeesLoading && id) {
        formHandler.setFieldValue('employeeId', id)
        formHandler.resetDirty();
      }
    },
    [employees, isEmployeesLoading],
  );

  const isEventLoading = isCreateTrainingHistoryLoading;
  const isScreenLoading = isEmployeesLoading;
  if (isScreenLoading) {
    return <LoadingOverlay visible={isScreenLoading} />;
  }

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <TrainingHistoryFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <TrainingHistoryForm
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
