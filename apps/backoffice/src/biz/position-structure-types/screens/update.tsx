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
import { PositionStructureTypeForm } from '../components/form';
import { positionStructureTypeFormDefaultValues } from '../constants';
import {
  PositionStructureTypeFormProvider,
  usePositionStructureTypeForm,
} from '../context';
import {
  type PositionStructureTypeForm as PositionStructureTypeFormType,
  positionStructureTypeUpdateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

interface PositionStructureTypeUpdateScreenProps {
  modalId?: string;
  id: string;
}

export const PositionStructureTypeUpdateScreen: React.FC<
  PositionStructureTypeUpdateScreenProps
> = ({ modalId, id }) => {
  const queryClient = useQueryClient();
  const formHandler = usePositionStructureTypeForm({
    initialValues: positionStructureTypeFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(positionStructureTypeUpdateSchema),
  });

  const {
    data: positionStructureType,
    isLoading: isPositionStructureTypeLoading,
  } = $backofficeApi.useQuery('get', '/api/PositionStructureTypes/{id}', {
    params: {
      path: {
        id,
      },
    },
  });

  const {
    mutate: updatePositionStructureType,
    isPending: isUpdatePositionStructureTypeLoading,
  } = $backofficeApi.useMutation('put', '/api/PositionStructureTypes/{id}', {
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
          '/api/PositionStructureTypes/{id}',
          { params: { path: { id: id } } },
        ],
        refetchType: 'all',
      });

      await queryClient.invalidateQueries({
        queryKey: ['get', '/api/PositionStructureTypes'],
        refetchType: 'all',
      });
    },
  });

  const onHandleSubmit = async (values: PositionStructureTypeFormType) => {
    try {
      const parsedValue = positionStructureTypeUpdateSchema.parse(values);

      updatePositionStructureType({
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
      if (positionStructureType && !isPositionStructureTypeLoading) {
        formHandler.setValues({
          id: positionStructureType?.id ?? '',
          name: positionStructureType?.name ?? '',
        });
        formHandler.resetDirty();
      }
    },
    [positionStructureType, isPositionStructureTypeLoading],
  );

  const isEventLoading = isUpdatePositionStructureTypeLoading;
  const isScreenLoading = isPositionStructureTypeLoading;
  if (isScreenLoading) {
    return <LoadingOverlay visible={isScreenLoading} />;
  }

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <PositionStructureTypeFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <PositionStructureTypeForm isUpdate />
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
      </PositionStructureTypeFormProvider>
    </Fieldset>
  );
};
