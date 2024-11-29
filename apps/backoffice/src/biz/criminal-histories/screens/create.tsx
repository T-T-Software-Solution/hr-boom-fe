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
import { CriminalHistoryForm } from '../components/form';
import { criminalHistoryFormDefaultValues } from '../constants';
import {
  CriminalHistoryFormProvider,
  useCriminalHistoryForm,
} from '../context';
import {
  type CriminalHistoryForm as CriminalHistoryFormType,
  criminalHistoryCreateSchema,
} from '../types';


interface CriminalHistoryCreateScreenProps {
  modalId?: string;
  id?: string;
}

export const CriminalHistoryCreateScreen: React.FC<
  CriminalHistoryCreateScreenProps
> = ({ modalId, id }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const formHandler = useCriminalHistoryForm({
    initialValues: criminalHistoryFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(criminalHistoryCreateSchema),
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
    mutate: createCriminalHistory,
    isPending: isCreateCriminalHistoryLoading,
  } = $backofficeApi.useMutation('post', '/api/CriminalHistories', {
    onSuccess: () => {
      notifications.show({
        color: 'green',
        message: 'บันทึกข้อมูลสำเร็จ',
      });

      if (!modalId) {
        router.push('/criminal-history');
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
        queryKey: ['get', '/api/CriminalHistories'],
        refetchType: 'all',
      });
    },
  });

  const onHandleSubmit = async (values: CriminalHistoryFormType) => {
    try {
      const parsedValue = criminalHistoryCreateSchema.parse(values);

      createCriminalHistory({
        body: {
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
      if (employees && !isEmployeesLoading && id) {
        formHandler.setFieldValue('employeeId', id)
        formHandler.resetDirty();
      }
    },
    [employees, isEmployeesLoading],
  );

  const isEventLoading = isCreateCriminalHistoryLoading;
  const isScreenLoading = isEmployeesLoading;
  if (isScreenLoading) {
    return <LoadingOverlay visible={isScreenLoading} />;
  }

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <CriminalHistoryFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <CriminalHistoryForm
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
