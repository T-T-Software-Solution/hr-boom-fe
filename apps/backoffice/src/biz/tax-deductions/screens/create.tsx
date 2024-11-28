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
import { TaxDeductionForm } from '../components/form';
import { taxDeductionFormDefaultValues } from '../constants';
import { TaxDeductionFormProvider, useTaxDeductionForm } from '../context';
import {
  type TaxDeductionForm as TaxDeductionFormType,
  taxDeductionCreateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

interface TaxDeductionCreateScreenProps {
  modalId?: string;
}

export const TaxDeductionCreateScreen: React.FC<
  TaxDeductionCreateScreenProps
> = ({ modalId }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const formHandler = useTaxDeductionForm({
    initialValues: taxDeductionFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(taxDeductionCreateSchema),
  });

  const { mutate: createTaxDeduction, isPending: isCreateTaxDeductionLoading } =
    $backofficeApi.useMutation('post', '/api/TaxDeductions', {
      onSuccess: () => {
        notifications.show({
          color: 'green',
          message: 'บันทึกข้อมูลสำเร็จ',
        });

        if (!modalId) {
          router.push('/tax-deduction');
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
          queryKey: ['get', '/api/TaxDeductions'],
          refetchType: 'all',
        });
      },
    });

  const onHandleSubmit = async (values: TaxDeductionFormType) => {
    try {
      const parsedValue = taxDeductionCreateSchema.parse(values);

      createTaxDeduction({
        body: {
          name: parsedValue?.name || '',
          value: Number(String(parsedValue?.value)),
        },
      });
    } catch (error: unknown) {
      notifications.show({
        color: 'red',
        message: getErrorMessage(error),
      });
    }
  };

  const isEventLoading = isCreateTaxDeductionLoading;

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <TaxDeductionFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <TaxDeductionForm />
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
      </TaxDeductionFormProvider>
    </Fieldset>
  );
};
