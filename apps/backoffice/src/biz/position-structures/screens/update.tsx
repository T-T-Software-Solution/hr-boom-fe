'use client';

import { $backofficeApi, type ApiError } from '@backoffice/services/api';
import { getErrorMessage } from '@backoffice/utils/error';
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
  getComboboxData
} from '@tt-ss-hr/shared-utils';
import { zodResolver } from 'mantine-form-zod-resolver';
import type React from 'react';
import { useEffect } from 'react';
import { PositionStructureForm } from '../components/form';
import { positionStructureFormDefaultValues } from '../constants';
import {
  PositionStructureFormProvider,
  usePositionStructureForm,
} from '../context';
import {
  type PositionStructureForm as PositionStructureFormType,
  positionStructureUpdateSchema,
} from '../types';



interface PositionStructureUpdateScreenProps {
  modalId?: string;
  id: string;
}

export const PositionStructureUpdateScreen: React.FC<
  PositionStructureUpdateScreenProps
> = ({ modalId, id }) => {
  const queryClient = useQueryClient();
  const formHandler = usePositionStructureForm({
    initialValues: positionStructureFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(positionStructureUpdateSchema),
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

  const { data: positionStructures, isLoading: isPositionStructuresLoading } =
    $backofficeApi.useQuery('get', '/api/PositionStructures', {
      params: {
        query: {
          pageNo: 1,
          pageSize: 500,
        },
      },
    });
  const { data: positionStructure, isLoading: isPositionStructureLoading } =
    $backofficeApi.useQuery('get', '/api/PositionStructures/{id}', {
      params: {
        path: {
          id,
        },
      },
    });

  const {
    mutate: updatePositionStructure,
    isPending: isUpdatePositionStructureLoading,
  } = $backofficeApi.useMutation('put', '/api/PositionStructures/{id}', {
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
          '/api/PositionStructures/{id}',
          { params: { path: { id: id } } },
        ],
        refetchType: 'all',
      });

      await queryClient.invalidateQueries({
        queryKey: ['get', '/api/PositionStructures'],
        refetchType: 'all',
      });
    },
  });

  const onHandleSubmit = async (values: PositionStructureFormType) => {
    try {
      const parsedValue = positionStructureUpdateSchema.parse(values);

      updatePositionStructure({
        params: {
          path: {
            id,
          },
        },
        body: {
          id: parsedValue?.id || '',
          positionStructureTypeId: parsedValue?.positionStructureTypeId || '',
          code: parsedValue?.code || '',
          name: parsedValue?.name || '',
          nameEn: parsedValue?.nameEn || '',
          level: parsedValue?.level || null,
          salary: Number.parseFloat(String(parsedValue?.salary)),
          description: parsedValue?.description || null,
          descriptionEn: parsedValue?.descriptionEn || null,
          parentId: parsedValue?.parentId || null,
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
      if (positionStructure && !isPositionStructureLoading) {
        formHandler.setValues({
          id: positionStructure?.id ?? '',
          positionStructureTypeId:
            positionStructure?.positionStructureType?.id ?? '',
          code: positionStructure?.code ?? '',
          name: positionStructure?.name ?? '',
          nameEn: positionStructure?.nameEn ?? '',
          level: positionStructure?.level ?? '',
          salary: Number.parseFloat(String(positionStructure?.salary)),
          description: positionStructure?.description ?? '',
          descriptionEn: positionStructure?.descriptionEn ?? '',
          parentId: positionStructure?.parent?.id ?? '',
        });
        formHandler.resetDirty();
      }
    },
    [positionStructure, isPositionStructureLoading],
  );

  const isEventLoading = isUpdatePositionStructureLoading;
  const isScreenLoading =
    isPositionStructureLoading ||
    isPositionStructureTypesLoading ||
    isPositionStructuresLoading;
  if (isScreenLoading) {
    return <LoadingOverlay visible={isScreenLoading} />;
  }

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <PositionStructureFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <PositionStructureForm
              isUpdate
              dropdowns={{
                positionStructureTypes: getComboboxData(
                  positionStructureTypes?.contents ?? [],
                  'id',
                  'name',
                ),
                positionStructures: getComboboxData(
                  positionStructures?.contents ?? [],
                  'id',
                  'code',
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
