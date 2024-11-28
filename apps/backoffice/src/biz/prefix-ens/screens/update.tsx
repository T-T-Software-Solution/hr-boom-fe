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
import { PrefixEnForm } from '../components/form';
import { prefixEnFormDefaultValues } from '../constants';
import { PrefixEnFormProvider, usePrefixEnForm } from '../context';
import {
  type PrefixEnForm as PrefixEnFormType,
  prefixEnUpdateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

interface PrefixEnUpdateScreenProps {
  modalId?: string;
  id: string;
}

export const PrefixEnUpdateScreen: React.FC<PrefixEnUpdateScreenProps> = ({
  modalId,
  id,
}) => {
  const queryClient = useQueryClient();
  const formHandler = usePrefixEnForm({
    initialValues: prefixEnFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(prefixEnUpdateSchema),
  });

  const { data: prefixEn, isLoading: isPrefixEnLoading } =
    $backofficeApi.useQuery('get', '/api/PrefixEns/{id}', {
      params: {
        path: {
          id,
        },
      },
    });

  const { mutate: updatePrefixEn, isPending: isUpdatePrefixEnLoading } =
    $backofficeApi.useMutation('put', '/api/PrefixEns/{id}', {
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
            '/api/PrefixEns/{id}',
            { params: { path: { id: id } } },
          ],
          refetchType: 'all',
        });

        await queryClient.invalidateQueries({
          queryKey: ['get', '/api/PrefixEns'],
          refetchType: 'all',
        });
      },
    });

  const onHandleSubmit = async (values: PrefixEnFormType) => {
    try {
      const parsedValue = prefixEnUpdateSchema.parse(values);

      updatePrefixEn({
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
      if (prefixEn && !isPrefixEnLoading) {
        formHandler.setValues({
          id: prefixEn?.id ?? '',
          name: prefixEn?.name ?? '',
        });
        formHandler.resetDirty();
      }
    },
    [prefixEn, isPrefixEnLoading],
  );

  const isEventLoading = isUpdatePrefixEnLoading;
  const isScreenLoading = isPrefixEnLoading;
  if (isScreenLoading) {
    return <LoadingOverlay visible={isScreenLoading} />;
  }

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <PrefixEnFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <PrefixEnForm isUpdate />
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
      </PrefixEnFormProvider>
    </Fieldset>
  );
};
