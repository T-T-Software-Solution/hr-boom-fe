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
import { PrefixForm } from '../components/form';
import { prefixFormDefaultValues } from '../constants';
import { PrefixFormProvider, usePrefixForm } from '../context';
import {
  type PrefixForm as PrefixFormType,
  prefixUpdateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

interface PrefixUpdateScreenProps {
  modalId?: string;
  id: string;
}

export const PrefixUpdateScreen: React.FC<PrefixUpdateScreenProps> = ({
  modalId,
  id,
}) => {
  const queryClient = useQueryClient();
  const formHandler = usePrefixForm({
    initialValues: prefixFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(prefixUpdateSchema),
  });

  const { data: prefix, isLoading: isPrefixLoading } = $backofficeApi.useQuery(
    'get',
    '/api/Prefixes/{id}',
    {
      params: {
        path: {
          id,
        },
      },
    },
  );

  const { mutate: updatePrefix, isPending: isUpdatePrefixLoading } =
    $backofficeApi.useMutation('put', '/api/Prefixes/{id}', {
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
            '/api/Prefixes/{id}',
            { params: { path: { id: id } } },
          ],
          refetchType: 'all',
        });

        await queryClient.invalidateQueries({
          queryKey: ['get', '/api/Prefixes'],
          refetchType: 'all',
        });
      },
    });

  const onHandleSubmit = async (values: PrefixFormType) => {
    try {
      const parsedValue = prefixUpdateSchema.parse(values);

      updatePrefix({
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
      if (prefix && !isPrefixLoading) {
        formHandler.setValues({
          id: prefix?.id ?? '',
          name: prefix?.name ?? '',
        });
        formHandler.resetDirty();
      }
    },
    [prefix, isPrefixLoading],
  );

  const isEventLoading = isUpdatePrefixLoading;
  const isScreenLoading = isPrefixLoading;
  if (isScreenLoading) {
    return <LoadingOverlay visible={isScreenLoading} />;
  }

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <PrefixFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <PrefixForm isUpdate />
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
      </PrefixFormProvider>
    </Fieldset>
  );
};
