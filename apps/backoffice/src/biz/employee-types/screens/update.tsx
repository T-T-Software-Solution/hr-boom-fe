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
import { EmployeeTypeForm } from '../components/form';
import { employeeTypeFormDefaultValues } from '../constants';
import { EmployeeTypeFormProvider, useEmployeeTypeForm } from '../context';
import {
  type EmployeeTypeForm as EmployeeTypeFormType,
  employeeTypeUpdateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

interface EmployeeTypeUpdateScreenProps {
  modalId?: string;
  id: string;
}

export const EmployeeTypeUpdateScreen: React.FC<
  EmployeeTypeUpdateScreenProps
> = ({ modalId, id }) => {
  const queryClient = useQueryClient();
  const formHandler = useEmployeeTypeForm({
    initialValues: employeeTypeFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(employeeTypeUpdateSchema),
  });

  const { data: employeeType, isLoading: isEmployeeTypeLoading } =
    $backofficeApi.useQuery('get', '/api/EmployeeTypes/{id}', {
      params: {
        path: {
          id,
        },
      },
    });

  const { mutate: updateEmployeeType, isPending: isUpdateEmployeeTypeLoading } =
    $backofficeApi.useMutation('put', '/api/EmployeeTypes/{id}', {
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
            '/api/EmployeeTypes/{id}',
            { params: { path: { id: id } } },
          ],
          refetchType: 'all',
        });

        await queryClient.invalidateQueries({
          queryKey: ['get', '/api/EmployeeTypes'],
          refetchType: 'all',
        });
      },
    });

  const onHandleSubmit = async (values: EmployeeTypeFormType) => {
    try {
      const parsedValue = employeeTypeUpdateSchema.parse(values);

      updateEmployeeType({
        params: {
          path: {
            id,
          },
        },
        body: {
          id: parsedValue?.id || '',
          name: parsedValue?.name || '',
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
      if (employeeType && !isEmployeeTypeLoading) {
        formHandler.setValues({
          id: employeeType?.id ?? '',
          name: employeeType?.name ?? '',
        });
        formHandler.resetDirty();
      }
    },
    [employeeType, isEmployeeTypeLoading],
  );

  const isEventLoading = isUpdateEmployeeTypeLoading;
  const isScreenLoading = isEmployeeTypeLoading;
  if (isScreenLoading) {
    return <LoadingOverlay visible={isScreenLoading} />;
  }

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <EmployeeTypeFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <EmployeeTypeForm isUpdate />
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
      </EmployeeTypeFormProvider>
    </Fieldset>
  );
};
