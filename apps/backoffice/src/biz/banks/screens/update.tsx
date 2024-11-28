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
import { BankForm } from '../components/form';
import { bankFormDefaultValues } from '../constants';
import { BankFormProvider, useBankForm } from '../context';
import { type BankForm as BankFormType, bankUpdateSchema } from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

interface BankUpdateScreenProps {
  modalId?: string;
  id: string;
}

export const BankUpdateScreen: React.FC<BankUpdateScreenProps> = ({
  modalId,
  id,
}) => {
  const queryClient = useQueryClient();
  const formHandler = useBankForm({
    initialValues: bankFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(bankUpdateSchema),
  });

  const { data: bank, isLoading: isBankLoading } = $backofficeApi.useQuery(
    'get',
    '/api/Banks/{id}',
    {
      params: {
        path: {
          id,
        },
      },
    },
  );

  const { mutate: updateBank, isPending: isUpdateBankLoading } =
    $backofficeApi.useMutation('put', '/api/Banks/{id}', {
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
            '/api/Banks/{id}',
            { params: { path: { id: id } } },
          ],
          refetchType: 'all',
        });

        await queryClient.invalidateQueries({
          queryKey: ['get', '/api/Banks'],
          refetchType: 'all',
        });
      },
    });

  const onHandleSubmit = async (values: BankFormType) => {
    try {
      const parsedValue = bankUpdateSchema.parse(values);

      updateBank({
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
      if (bank && !isBankLoading) {
        formHandler.setValues({
          id: bank?.id ?? '',
          name: bank?.name ?? '',
        });
        formHandler.resetDirty();
      }
    },
    [bank, isBankLoading],
  );

  const isEventLoading = isUpdateBankLoading;
  const isScreenLoading = isBankLoading;
  if (isScreenLoading) {
    return <LoadingOverlay visible={isScreenLoading} />;
  }

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <BankFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <BankForm isUpdate />
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
      </BankFormProvider>
    </Fieldset>
  );
};
