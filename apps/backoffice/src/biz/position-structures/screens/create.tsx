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
import { PositionStructureForm } from '../components/form';
import { positionStructureFormDefaultValues } from '../constants';
import {
  PositionStructureFormProvider,
  usePositionStructureForm,
} from '../context';
import {
  type PositionStructureForm as PositionStructureFormType,
  positionStructureCreateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

import type { PositionStructureType } from '@backoffice/biz/position-structure-types/types';

interface PositionStructureCreateScreenProps {
  modalId?: string;
}

export const PositionStructureCreateScreen: React.FC<
  PositionStructureCreateScreenProps
> = ({ modalId }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const formHandler = usePositionStructureForm({
    initialValues: positionStructureFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(positionStructureCreateSchema),
  });

  const {
    data: positionStructureTypes,
    isLoading: isPositionStructureTypesLoading,
  } = $backofficeApi.useQuery('get', '/api/PositionStructureTypes', {
    params: {
      query: {
        pageNo: 1,
        pageSize: 500,
      },
    },
  });
  const {
    mutate: createPositionStructure,
    isPending: isCreatePositionStructureLoading,
  } = $backofficeApi.useMutation('post', '/api/PositionStructures', {
    onSuccess: () => {
      notifications.show({
        color: 'green',
        message: 'บันทึกข้อมูลสำเร็จ',
      });

      if (!modalId) {
        router.push('/position-structure');
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
        queryKey: ['get', '/api/PositionStructures'],
        refetchType: 'all',
      });
    },
  });

  const onHandleSubmit = async (values: PositionStructureFormType) => {
    try {
      const parsedValue = positionStructureCreateSchema.parse(values);

      createPositionStructure({
        body: {
          positionStructureTypeId: parsedValue?.positionStructureTypeId || '',
          code: parsedValue?.code || '',
          name: parsedValue?.name || '',
          nameEn: parsedValue?.nameEn || '',
          level: parsedValue?.level || '',
          salary: Number.parseFloat(String(parsedValue?.salary)),
          description: parsedValue?.description || '',
          descriptionEn: parsedValue?.descriptionEn || '',
          parentId: parsedValue?.parentId || '',
        },
      });
    } catch (error: unknown) {
      notifications.show({
        color: 'red',
        message: getErrorMessage(error),
      });
    }
  };

  const isEventLoading = isCreatePositionStructureLoading;
  const isScreenLoading = isPositionStructureTypesLoading;
  if (isScreenLoading) {
    return <LoadingOverlay visible={isScreenLoading} />;
  }

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <PositionStructureFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <PositionStructureForm
              dropdowns={{
                positionStructureTypes: getComboboxData(
                  positionStructureTypes?.contents ?? [],
                  'id',
                  'name',
                ),
              }}
            />
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
      </PositionStructureFormProvider>
    </Fieldset>
  );
};
