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
import { EducationLevelForm } from '../components/form';
import { educationLevelFormDefaultValues } from '../constants';
import { EducationLevelFormProvider, useEducationLevelForm } from '../context';
import {
  type EducationLevelForm as EducationLevelFormType,
  educationLevelCreateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

interface EducationLevelCreateScreenProps {
  modalId?: string;
}

export const EducationLevelCreateScreen: React.FC<
  EducationLevelCreateScreenProps
> = ({ modalId }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const formHandler = useEducationLevelForm({
    initialValues: educationLevelFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(educationLevelCreateSchema),
  });

  const {
    mutate: createEducationLevel,
    isPending: isCreateEducationLevelLoading,
  } = $backofficeApi.useMutation('post', '/api/EducationLevels', {
    onSuccess: () => {
      notifications.show({
        color: 'green',
        message: 'บันทึกข้อมูลสำเร็จ',
      });

      if (!modalId) {
        router.push('/education-level');
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
        queryKey: ['get', '/api/EducationLevels'],
        refetchType: 'all',
      });
    },
  });

  const onHandleSubmit = async (values: EducationLevelFormType) => {
    try {
      const parsedValue = educationLevelCreateSchema.parse(values);

      createEducationLevel({
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

  const isEventLoading = isCreateEducationLevelLoading;

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <EducationLevelFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <EducationLevelForm />
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
      </EducationLevelFormProvider>
    </Fieldset>
  );
};
