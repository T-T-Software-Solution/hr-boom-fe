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
import { PaymentChannelForm } from '../components/form';
import { paymentChannelFormDefaultValues } from '../constants';
import { PaymentChannelFormProvider, usePaymentChannelForm } from '../context';
import {
  type PaymentChannelForm as PaymentChannelFormType,
  paymentChannelUpdateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

interface PaymentChannelUpdateScreenProps {
  modalId?: string;
  id: string;
}

export const PaymentChannelUpdateScreen: React.FC<
  PaymentChannelUpdateScreenProps
> = ({ modalId, id }) => {
  const queryClient = useQueryClient();
  const formHandler = usePaymentChannelForm({
    initialValues: paymentChannelFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(paymentChannelUpdateSchema),
  });

  const { data: paymentChannel, isLoading: isPaymentChannelLoading } =
    $backofficeApi.useQuery('get', '/api/PaymentChannels/{id}', {
      params: {
        path: {
          id,
        },
      },
    });

  const {
    mutate: updatePaymentChannel,
    isPending: isUpdatePaymentChannelLoading,
  } = $backofficeApi.useMutation('put', '/api/PaymentChannels/{id}', {
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
          '/api/PaymentChannels/{id}',
          { params: { path: { id: id } } },
        ],
        refetchType: 'all',
      });

      await queryClient.invalidateQueries({
        queryKey: ['get', '/api/PaymentChannels'],
        refetchType: 'all',
      });
    },
  });

  const onHandleSubmit = async (values: PaymentChannelFormType) => {
    try {
      const parsedValue = paymentChannelUpdateSchema.parse(values);

      updatePaymentChannel({
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
      if (paymentChannel && !isPaymentChannelLoading) {
        formHandler.setValues({
          id: paymentChannel?.id ?? '',
          name: paymentChannel?.name ?? '',
        });
        formHandler.resetDirty();
      }
    },
    [paymentChannel, isPaymentChannelLoading],
  );

  const isEventLoading = isUpdatePaymentChannelLoading;
  const isScreenLoading = isPaymentChannelLoading;
  if (isScreenLoading) {
    return <LoadingOverlay visible={isScreenLoading} />;
  }

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <PaymentChannelFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <PaymentChannelForm isUpdate />
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
      </PaymentChannelFormProvider>
    </Fieldset>
  );
};
