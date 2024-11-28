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
import { TaxBracketForm } from '../components/form';
import { taxBracketFormDefaultValues } from '../constants';
import { TaxBracketFormProvider, useTaxBracketForm } from '../context';
import {
  type TaxBracketForm as TaxBracketFormType,
  taxBracketUpdateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

interface TaxBracketUpdateScreenProps {
  modalId?: string;
  id: string;
}

export const TaxBracketUpdateScreen: React.FC<TaxBracketUpdateScreenProps> = ({
  modalId,
  id,
}) => {
  const queryClient = useQueryClient();
  const formHandler = useTaxBracketForm({
    initialValues: taxBracketFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(taxBracketUpdateSchema),
  });

  const { data: taxBracket, isLoading: isTaxBracketLoading } =
    $backofficeApi.useQuery('get', '/api/TaxBrackets/{id}', {
      params: {
        path: {
          id,
        },
      },
    });

  const { mutate: updateTaxBracket, isPending: isUpdateTaxBracketLoading } =
    $backofficeApi.useMutation('put', '/api/TaxBrackets/{id}', {
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
            '/api/TaxBrackets/{id}',
            { params: { path: { id: id } } },
          ],
          refetchType: 'all',
        });

        await queryClient.invalidateQueries({
          queryKey: ['get', '/api/TaxBrackets'],
          refetchType: 'all',
        });
      },
    });

  const onHandleSubmit = async (values: TaxBracketFormType) => {
    try {
      const parsedValue = taxBracketUpdateSchema.parse(values);

      updateTaxBracket({
        params: {
          path: {
            id,
          },
        },
        body: {
          id: parsedValue?.id || '',
          name: parsedValue?.name || '',
          maxIncome: Number(String(parsedValue?.maxIncome)),
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
      if (taxBracket && !isTaxBracketLoading) {
        formHandler.setValues({
          id: taxBracket?.id ?? '',
          name: taxBracket?.name ?? '',
          maxIncome: Number(String(taxBracket?.maxIncome)),
        });
        formHandler.resetDirty();
      }
    },
    [taxBracket, isTaxBracketLoading],
  );

  const isEventLoading = isUpdateTaxBracketLoading;
  const isScreenLoading = isTaxBracketLoading;
  if (isScreenLoading) {
    return <LoadingOverlay visible={isScreenLoading} />;
  }

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <TaxBracketFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <TaxBracketForm isUpdate />
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
      </TaxBracketFormProvider>
    </Fieldset>
  );
};
