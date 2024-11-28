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
import { EducationLevelForm } from '../components/form';
import { educationLevelFormDefaultValues } from '../constants';
import { EducationLevelFormProvider, useEducationLevelForm } from '../context';
import {
  type EducationLevelForm as EducationLevelFormType,
  educationLevelUpdateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

interface EducationLevelUpdateScreenProps {
  modalId?: string;
  id: string;
}

export const EducationLevelUpdateScreen: React.FC<
  EducationLevelUpdateScreenProps
> = ({ modalId, id }) => {
  const queryClient = useQueryClient();
  const formHandler = useEducationLevelForm({
    initialValues: educationLevelFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(educationLevelUpdateSchema),
  });

  const { data: educationLevel, isLoading: isEducationLevelLoading } =
    $backofficeApi.useQuery('get', '/api/EducationLevels/{id}', {
      params: {
        path: {
          id,
        },
      },
    });

  const {
    mutate: updateEducationLevel,
    isPending: isUpdateEducationLevelLoading,
  } = $backofficeApi.useMutation('put', '/api/EducationLevels/{id}', {
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
          '/api/EducationLevels/{id}',
          { params: { path: { id: id } } },
        ],
        refetchType: 'all',
      });

      await queryClient.invalidateQueries({
        queryKey: ['get', '/api/EducationLevels'],
        refetchType: 'all',
      });
    },
  });

  const onHandleSubmit = async (values: EducationLevelFormType) => {
    try {
      const parsedValue = educationLevelUpdateSchema.parse(values);

      updateEducationLevel({
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
      if (educationLevel && !isEducationLevelLoading) {
        formHandler.setValues({
          id: educationLevel?.id ?? '',
          name: educationLevel?.name ?? '',
        });
        formHandler.resetDirty();
      }
    },
    [educationLevel, isEducationLevelLoading],
  );

  const isEventLoading = isUpdateEducationLevelLoading;
  const isScreenLoading = isEducationLevelLoading;
  if (isScreenLoading) {
    return <LoadingOverlay visible={isScreenLoading} />;
  }

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <EducationLevelFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <EducationLevelForm isUpdate />
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
