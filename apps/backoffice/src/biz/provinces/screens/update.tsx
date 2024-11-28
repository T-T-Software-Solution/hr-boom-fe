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
import { ProvinceForm } from '../components/form';
import { provinceFormDefaultValues } from '../constants';
import { ProvinceFormProvider, useProvinceForm } from '../context';
import {
  type ProvinceForm as ProvinceFormType,
  provinceUpdateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

interface ProvinceUpdateScreenProps {
  modalId?: string;
  id: string;
}

export const ProvinceUpdateScreen: React.FC<ProvinceUpdateScreenProps> = ({
  modalId,
  id,
}) => {
  const queryClient = useQueryClient();
  const formHandler = useProvinceForm({
    initialValues: provinceFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(provinceUpdateSchema),
  });

  const { data: province, isLoading: isProvinceLoading } =
    $backofficeApi.useQuery('get', '/api/Provinces/{id}', {
      params: {
        path: {
          id,
        },
      },
    });

  const { mutate: updateProvince, isPending: isUpdateProvinceLoading } =
    $backofficeApi.useMutation('put', '/api/Provinces/{id}', {
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
            '/api/Provinces/{id}',
            { params: { path: { id: id } } },
          ],
          refetchType: 'all',
        });

        await queryClient.invalidateQueries({
          queryKey: ['get', '/api/Provinces'],
          refetchType: 'all',
        });
      },
    });

  const onHandleSubmit = async (values: ProvinceFormType) => {
    try {
      const parsedValue = provinceUpdateSchema.parse(values);

      updateProvince({
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
      if (province && !isProvinceLoading) {
        formHandler.setValues({
          id: province?.id ?? '',
          name: province?.name ?? '',
        });
        formHandler.resetDirty();
      }
    },
    [province, isProvinceLoading],
  );

  const isEventLoading = isUpdateProvinceLoading;
  const isScreenLoading = isProvinceLoading;
  if (isScreenLoading) {
    return <LoadingOverlay visible={isScreenLoading} />;
  }

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <ProvinceFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <ProvinceForm isUpdate />
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
      </ProvinceFormProvider>
    </Fieldset>
  );
};
