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
import { OrgStructureTypeForm } from '../components/form';
import { orgStructureTypeFormDefaultValues } from '../constants';
import {
  OrgStructureTypeFormProvider,
  useOrgStructureTypeForm,
} from '../context';
import {
  type OrgStructureTypeForm as OrgStructureTypeFormType,
  orgStructureTypeUpdateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

interface OrgStructureTypeUpdateScreenProps {
  modalId?: string;
  id: string;
}

export const OrgStructureTypeUpdateScreen: React.FC<
  OrgStructureTypeUpdateScreenProps
> = ({ modalId, id }) => {
  const queryClient = useQueryClient();
  const formHandler = useOrgStructureTypeForm({
    initialValues: orgStructureTypeFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(orgStructureTypeUpdateSchema),
  });

  const { data: orgStructureType, isLoading: isOrgStructureTypeLoading } =
    $backofficeApi.useQuery('get', '/api/OrgStructureTypes/{id}', {
      params: {
        path: {
          id,
        },
      },
    });

  const {
    mutate: updateOrgStructureType,
    isPending: isUpdateOrgStructureTypeLoading,
  } = $backofficeApi.useMutation('put', '/api/OrgStructureTypes/{id}', {
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
          '/api/OrgStructureTypes/{id}',
          { params: { path: { id: id } } },
        ],
        refetchType: 'all',
      });

      await queryClient.invalidateQueries({
        queryKey: ['get', '/api/OrgStructureTypes'],
        refetchType: 'all',
      });
    },
  });

  const onHandleSubmit = async (values: OrgStructureTypeFormType) => {
    try {
      const parsedValue = orgStructureTypeUpdateSchema.parse(values);

      updateOrgStructureType({
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
      if (orgStructureType && !isOrgStructureTypeLoading) {
        formHandler.setValues({
          id: orgStructureType?.id ?? '',
          name: orgStructureType?.name ?? '',
        });
        formHandler.resetDirty();
      }
    },
    [orgStructureType, isOrgStructureTypeLoading],
  );

  const isEventLoading = isUpdateOrgStructureTypeLoading;
  const isScreenLoading = isOrgStructureTypeLoading;
  if (isScreenLoading) {
    return <LoadingOverlay visible={isScreenLoading} />;
  }

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <OrgStructureTypeFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <OrgStructureTypeForm isUpdate />
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
      </OrgStructureTypeFormProvider>
    </Fieldset>
  );
};
