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
import { TaxConditionForm } from '../components/form';
import { taxConditionFormDefaultValues } from '../constants';
import { TaxConditionFormProvider, useTaxConditionForm } from '../context';
import {
  type TaxConditionForm as TaxConditionFormType,
  taxConditionCreateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

interface TaxConditionCreateScreenProps {
  modalId?: string;
}

export const TaxConditionCreateScreen: React.FC<
  TaxConditionCreateScreenProps
> = ({ modalId }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const formHandler = useTaxConditionForm({
    initialValues: taxConditionFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(taxConditionCreateSchema),
  });

  const { mutate: createTaxCondition, isPending: isCreateTaxConditionLoading } =
    $backofficeApi.useMutation('post', '/api/TaxConditions', {
      onSuccess: () => {
        notifications.show({
          color: 'green',
          message: 'บันทึกข้อมูลสำเร็จ',
        });

        if (!modalId) {
          router.push('/tax-condition');
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
          queryKey: ['get', '/api/TaxConditions'],
          refetchType: 'all',
        });
      },
    });

  const onHandleSubmit = async (values: TaxConditionFormType) => {
    try {
      const parsedValue = taxConditionCreateSchema.parse(values);

      createTaxCondition({
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

  const isEventLoading = isCreateTaxConditionLoading;

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <TaxConditionFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <TaxConditionForm />
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
