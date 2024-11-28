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
import { TaxConditionForm } from '../components/form';
import { taxConditionFormDefaultValues } from '../constants';
import { TaxConditionFormProvider, useTaxConditionForm } from '../context';
import {
  type TaxConditionForm as TaxConditionFormType,
  taxConditionUpdateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

interface TaxConditionUpdateScreenProps {
  modalId?: string;
  id: string;
}

export const TaxConditionUpdateScreen: React.FC<
  TaxConditionUpdateScreenProps
> = ({ modalId, id }) => {
  const queryClient = useQueryClient();
  const formHandler = useTaxConditionForm({
    initialValues: taxConditionFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(taxConditionUpdateSchema),
  });

  const { data: taxCondition, isLoading: isTaxConditionLoading } =
    $backofficeApi.useQuery('get', '/api/TaxConditions/{id}', {
      params: {
        path: {
          id,
        },
      },
    });

  const { mutate: updateTaxCondition, isPending: isUpdateTaxConditionLoading } =
    $backofficeApi.useMutation('put', '/api/TaxConditions/{id}', {
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
            '/api/TaxConditions/{id}',
            { params: { path: { id: id } } },
          ],
          refetchType: 'all',
        });

        await queryClient.invalidateQueries({
          queryKey: ['get', '/api/TaxConditions'],
          refetchType: 'all',
        });
      },
    });

  const onHandleSubmit = async (values: TaxConditionFormType) => {
    try {
      const parsedValue = taxConditionUpdateSchema.parse(values);

      updateTaxCondition({
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
      if (taxCondition && !isTaxConditionLoading) {
        formHandler.setValues({
          id: taxCondition?.id ?? '',
          name: taxCondition?.name ?? '',
        });
        formHandler.resetDirty();
      }
    },
    [taxCondition, isTaxConditionLoading],
  );

  const isEventLoading = isUpdateTaxConditionLoading;
  const isScreenLoading = isTaxConditionLoading;
  if (isScreenLoading) {
    return <LoadingOverlay visible={isScreenLoading} />;
  }

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <TaxConditionFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <TaxConditionForm isUpdate />
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
      </TaxConditionFormProvider>
    </Fieldset>
  );
};
