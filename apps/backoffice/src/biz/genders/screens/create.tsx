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
import { GenderForm } from '../components/form';
import { genderFormDefaultValues } from '../constants';
import { GenderFormProvider, useGenderForm } from '../context';
import {
  type GenderForm as GenderFormType,
  genderCreateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

interface GenderCreateScreenProps {
  modalId?: string;
}

export const GenderCreateScreen: React.FC<GenderCreateScreenProps> = ({
  modalId,
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const formHandler = useGenderForm({
    initialValues: genderFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(genderCreateSchema),
  });

  const { mutate: createGender, isPending: isCreateGenderLoading } =
    $backofficeApi.useMutation('post', '/api/Genders', {
      onSuccess: () => {
        notifications.show({
          color: 'green',
          message: 'บันทึกข้อมูลสำเร็จ',
        });

        if (!modalId) {
          router.push('/gender');
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
          queryKey: ['get', '/api/Genders'],
          refetchType: 'all',
        });
      },
    });

  const onHandleSubmit = async (values: GenderFormType) => {
    try {
      const parsedValue = genderCreateSchema.parse(values);

      createGender({
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

  const isEventLoading = isCreateGenderLoading;

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <GenderFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <GenderForm />
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
