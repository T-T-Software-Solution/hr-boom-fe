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
import { getComboboxData, uploadFileIfNeeded } from '@tt-ss-hr/shared-utils';
import dayjs from 'dayjs';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { EmployeeTypeForm } from '../components/form';
import { employeeTypeFormDefaultValues } from '../constants';
import { EmployeeTypeFormProvider, useEmployeeTypeForm } from '../context';
import {
  type EmployeeTypeForm as EmployeeTypeFormType,
  employeeTypeCreateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

interface EmployeeTypeCreateScreenProps {
  modalId?: string;
}

export const EmployeeTypeCreateScreen: React.FC<
  EmployeeTypeCreateScreenProps
> = ({ modalId }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const formHandler = useEmployeeTypeForm({
    initialValues: employeeTypeFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(employeeTypeCreateSchema),
  });

  const { mutate: createEmployeeType, isPending: isCreateEmployeeTypeLoading } =
    $backofficeApi.useMutation('post', '/api/EmployeeTypes', {
      onSuccess: () => {
        notifications.show({
          color: 'green',
          message: 'บันทึกข้อมูลสำเร็จ',
        });

        if (!modalId) {
          router.push('/employee-type');
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
          queryKey: ['get', '/api/EmployeeTypes'],
          refetchType: 'all',
        });
      },
    });

  const onHandleSubmit = async (values: EmployeeTypeFormType) => {
    try {
      const parsedValue = employeeTypeCreateSchema.parse(values);

      createEmployeeType({
        body: {
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

  const isEventLoading = isCreateEmployeeTypeLoading;

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <EmployeeTypeFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <EmployeeTypeForm />
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
