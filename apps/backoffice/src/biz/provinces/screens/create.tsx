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
import { ProvinceForm } from '../components/form';
import { provinceFormDefaultValues } from '../constants';
import { ProvinceFormProvider, useProvinceForm } from '../context';
import {
  type ProvinceForm as ProvinceFormType,
  provinceCreateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

interface ProvinceCreateScreenProps {
  modalId?: string;
}

export const ProvinceCreateScreen: React.FC<ProvinceCreateScreenProps> = ({
  modalId,
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const formHandler = useProvinceForm({
    initialValues: provinceFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(provinceCreateSchema),
  });

  const { mutate: createProvince, isPending: isCreateProvinceLoading } =
    $backofficeApi.useMutation('post', '/api/Provinces', {
      onSuccess: () => {
        notifications.show({
          color: 'green',
          message: 'บันทึกข้อมูลสำเร็จ',
        });

        if (!modalId) {
          router.push('/province');
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
          queryKey: ['get', '/api/Provinces'],
          refetchType: 'all',
        });
      },
    });

  const onHandleSubmit = async (values: ProvinceFormType) => {
    try {
      const parsedValue = provinceCreateSchema.parse(values);

      createProvince({
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

  const isEventLoading = isCreateProvinceLoading;

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <ProvinceFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <ProvinceForm />
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
