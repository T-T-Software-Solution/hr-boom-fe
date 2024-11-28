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
import { TaxBracketForm } from '../components/form';
import { taxBracketFormDefaultValues } from '../constants';
import { TaxBracketFormProvider, useTaxBracketForm } from '../context';
import {
  type TaxBracketForm as TaxBracketFormType,
  taxBracketCreateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

interface TaxBracketCreateScreenProps {
  modalId?: string;
}

export const TaxBracketCreateScreen: React.FC<TaxBracketCreateScreenProps> = ({
  modalId,
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const formHandler = useTaxBracketForm({
    initialValues: taxBracketFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(taxBracketCreateSchema),
  });

  const { mutate: createTaxBracket, isPending: isCreateTaxBracketLoading } =
    $backofficeApi.useMutation('post', '/api/TaxBrackets', {
      onSuccess: () => {
        notifications.show({
          color: 'green',
          message: 'บันทึกข้อมูลสำเร็จ',
        });

        if (!modalId) {
          router.push('/tax-bracket');
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
          queryKey: ['get', '/api/TaxBrackets'],
          refetchType: 'all',
        });
      },
    });

  const onHandleSubmit = async (values: TaxBracketFormType) => {
    try {
      const parsedValue = taxBracketCreateSchema.parse(values);

      createTaxBracket({
        body: {
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

  const isEventLoading = isCreateTaxBracketLoading;

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <TaxBracketFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <TaxBracketForm />
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
