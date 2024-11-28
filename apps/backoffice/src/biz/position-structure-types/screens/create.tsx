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
import { PositionStructureTypeForm } from '../components/form';
import { positionStructureTypeFormDefaultValues } from '../constants';
import {
  PositionStructureTypeFormProvider,
  usePositionStructureTypeForm,
} from '../context';
import {
  type PositionStructureTypeForm as PositionStructureTypeFormType,
  positionStructureTypeCreateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

interface PositionStructureTypeCreateScreenProps {
  modalId?: string;
}

export const PositionStructureTypeCreateScreen: React.FC<
  PositionStructureTypeCreateScreenProps
> = ({ modalId }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const formHandler = usePositionStructureTypeForm({
    initialValues: positionStructureTypeFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(positionStructureTypeCreateSchema),
  });

  const {
    mutate: createPositionStructureType,
    isPending: isCreatePositionStructureTypeLoading,
  } = $backofficeApi.useMutation('post', '/api/PositionStructureTypes', {
    onSuccess: () => {
      notifications.show({
        color: 'green',
        message: 'บันทึกข้อมูลสำเร็จ',
      });

      if (!modalId) {
        router.push('/position-structure-type');
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
        queryKey: ['get', '/api/PositionStructureTypes'],
        refetchType: 'all',
      });
    },
  });

  const onHandleSubmit = async (values: PositionStructureTypeFormType) => {
    try {
      const parsedValue = positionStructureTypeCreateSchema.parse(values);

      createPositionStructureType({
        body: {
          name: parsedValue?.name || '',
          code: parsedValue?.code || '',
        },
      });
    } catch (error: unknown) {
      notifications.show({
        color: 'red',
        message: getErrorMessage(error),
      });
    }
  };

  const isEventLoading = isCreatePositionStructureTypeLoading;

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <PositionStructureTypeFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <PositionStructureTypeForm />
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
