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
import { BankAccountTypeForm } from '../components/form';
import { bankAccountTypeFormDefaultValues } from '../constants';
import {
  BankAccountTypeFormProvider,
  useBankAccountTypeForm,
} from '../context';
import {
  type BankAccountTypeForm as BankAccountTypeFormType,
  bankAccountTypeCreateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

interface BankAccountTypeCreateScreenProps {
  modalId?: string;
}

export const BankAccountTypeCreateScreen: React.FC<
  BankAccountTypeCreateScreenProps
> = ({ modalId }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const formHandler = useBankAccountTypeForm({
    initialValues: bankAccountTypeFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(bankAccountTypeCreateSchema),
  });

  const {
    mutate: createBankAccountType,
    isPending: isCreateBankAccountTypeLoading,
  } = $backofficeApi.useMutation('post', '/api/BankAccountTypes', {
    onSuccess: () => {
      notifications.show({
        color: 'green',
        message: 'บันทึกข้อมูลสำเร็จ',
      });

      if (!modalId) {
        router.push('/bank-account-type');
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
        queryKey: ['get', '/api/BankAccountTypes'],
        refetchType: 'all',
      });
    },
  });

  const onHandleSubmit = async (values: BankAccountTypeFormType) => {
    try {
      const parsedValue = bankAccountTypeCreateSchema.parse(values);

      createBankAccountType({
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

  const isEventLoading = isCreateBankAccountTypeLoading;

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <BankAccountTypeFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <BankAccountTypeForm />
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
