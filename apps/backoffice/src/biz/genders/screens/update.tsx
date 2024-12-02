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
import { GenderForm } from '../components/form';
import { genderFormDefaultValues } from '../constants';
import { GenderFormProvider, useGenderForm } from '../context';
import {
  type GenderForm as GenderFormType,
  genderUpdateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

interface GenderUpdateScreenProps {
  modalId?: string;
  id: string;
}

export const GenderUpdateScreen: React.FC<GenderUpdateScreenProps> = ({
  modalId,
  id,
}) => {
  const queryClient = useQueryClient();
  const formHandler = useGenderForm({
    initialValues: genderFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(genderUpdateSchema),
  });

  const { data: gender, isLoading: isGenderLoading } = $backofficeApi.useQuery(
    'get',
    '/api/Genders/{id}',
    {
      params: {
        path: {
          id,
        },
      },
    },
  );

  const { mutate: updateGender, isPending: isUpdateGenderLoading } =
    $backofficeApi.useMutation('put', '/api/Genders/{id}', {
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
            '/api/Genders/{id}',
            { params: { path: { id: id } } },
          ],
          refetchType: 'all',
        });

        await queryClient.invalidateQueries({
          queryKey: ['get', '/api/Genders'],
          refetchType: 'all',
        });
      },
    });

  const onHandleSubmit = async (values: GenderFormType) => {
    try {
      const parsedValue = genderUpdateSchema.parse(values);

      updateGender({
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
      if (gender && !isGenderLoading) {
        formHandler.setValues({
          id: gender?.id ?? '',
          name: gender?.name ?? '',
        });
        formHandler.resetDirty();
      }
    },
    [gender, isGenderLoading],
  );

  const isEventLoading = isUpdateGenderLoading;
  const isScreenLoading = isGenderLoading;
  if (isScreenLoading) {
    return <LoadingOverlay visible={isScreenLoading} />;
  }

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <GenderFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <GenderForm isUpdate />
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
      </GenderFormProvider>
    </Fieldset>
  );
};
