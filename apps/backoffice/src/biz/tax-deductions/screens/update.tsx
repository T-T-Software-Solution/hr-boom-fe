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
import { TaxDeductionForm } from '../components/form';
import { taxDeductionFormDefaultValues } from '../constants';
import { TaxDeductionFormProvider, useTaxDeductionForm } from '../context';
import {
  type TaxDeductionForm as TaxDeductionFormType,
  taxDeductionUpdateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

interface TaxDeductionUpdateScreenProps {
  modalId?: string;
  id: string;
}

export const TaxDeductionUpdateScreen: React.FC<
  TaxDeductionUpdateScreenProps
> = ({ modalId, id }) => {
  const queryClient = useQueryClient();
  const formHandler = useTaxDeductionForm({
    initialValues: taxDeductionFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(taxDeductionUpdateSchema),
  });

  const { data: taxDeduction, isLoading: isTaxDeductionLoading } =
    $backofficeApi.useQuery('get', '/api/TaxDeductions/{id}', {
      params: {
        path: {
          id,
        },
      },
    });

  const { mutate: updateTaxDeduction, isPending: isUpdateTaxDeductionLoading } =
    $backofficeApi.useMutation('put', '/api/TaxDeductions/{id}', {
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
            '/api/TaxDeductions/{id}',
            { params: { path: { id: id } } },
          ],
          refetchType: 'all',
        });

        await queryClient.invalidateQueries({
          queryKey: ['get', '/api/TaxDeductions'],
          refetchType: 'all',
        });
      },
    });

  const onHandleSubmit = async (values: TaxDeductionFormType) => {
    try {
      const parsedValue = taxDeductionUpdateSchema.parse(values);

      updateTaxDeduction({
        params: {
          path: {
            id,
          },
        },
        body: {
          id: parsedValue?.id || '',
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

  useEffect(
    function feedDataToForm() {
      if (taxDeduction && !isTaxDeductionLoading) {
        formHandler.setValues({
          id: taxDeduction?.id ?? '',
          name: taxDeduction?.name ?? '',
          value: Number(String(taxDeduction?.value)),
        });
        formHandler.resetDirty();
      }
    },
    [taxDeduction, isTaxDeductionLoading],
  );

  const isEventLoading = isUpdateTaxDeductionLoading;
  const isScreenLoading = isTaxDeductionLoading;
  if (isScreenLoading) {
    return <LoadingOverlay visible={isScreenLoading} />;
  }

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <TaxDeductionFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <TaxDeductionForm isUpdate />
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
