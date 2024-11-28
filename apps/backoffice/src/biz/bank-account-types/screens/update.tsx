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
import { BankAccountTypeForm } from '../components/form';
import { bankAccountTypeFormDefaultValues } from '../constants';
import {
  BankAccountTypeFormProvider,
  useBankAccountTypeForm,
} from '../context';
import {
  type BankAccountTypeForm as BankAccountTypeFormType,
  bankAccountTypeUpdateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

interface BankAccountTypeUpdateScreenProps {
  modalId?: string;
  id: string;
}

export const BankAccountTypeUpdateScreen: React.FC<
  BankAccountTypeUpdateScreenProps
> = ({ modalId, id }) => {
  const queryClient = useQueryClient();
  const formHandler = useBankAccountTypeForm({
    initialValues: bankAccountTypeFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(bankAccountTypeUpdateSchema),
  });

  const { data: bankAccountType, isLoading: isBankAccountTypeLoading } =
    $backofficeApi.useQuery('get', '/api/BankAccountTypes/{id}', {
      params: {
        path: {
          id,
        },
      },
    });

  const {
    mutate: updateBankAccountType,
    isPending: isUpdateBankAccountTypeLoading,
  } = $backofficeApi.useMutation('put', '/api/BankAccountTypes/{id}', {
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
          '/api/BankAccountTypes/{id}',
          { params: { path: { id: id } } },
        ],
        refetchType: 'all',
      });

      await queryClient.invalidateQueries({
        queryKey: ['get', '/api/BankAccountTypes'],
        refetchType: 'all',
      });
    },
  });

  const onHandleSubmit = async (values: BankAccountTypeFormType) => {
    try {
      const parsedValue = bankAccountTypeUpdateSchema.parse(values);

      updateBankAccountType({
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
      if (bankAccountType && !isBankAccountTypeLoading) {
        formHandler.setValues({
          id: bankAccountType?.id ?? '',
          name: bankAccountType?.name ?? '',
        });
        formHandler.resetDirty();
      }
    },
    [bankAccountType, isBankAccountTypeLoading],
  );

  const isEventLoading = isUpdateBankAccountTypeLoading;
  const isScreenLoading = isBankAccountTypeLoading;
  if (isScreenLoading) {
    return <LoadingOverlay visible={isScreenLoading} />;
  }

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <BankAccountTypeFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <BankAccountTypeForm isUpdate />
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
      </BankAccountTypeFormProvider>
    </Fieldset>
  );
};
