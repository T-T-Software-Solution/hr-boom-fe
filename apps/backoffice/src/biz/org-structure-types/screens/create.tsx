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
import { OrgStructureTypeForm } from '../components/form';
import { orgStructureTypeFormDefaultValues } from '../constants';
import {
  OrgStructureTypeFormProvider,
  useOrgStructureTypeForm,
} from '../context';
import {
  type OrgStructureTypeForm as OrgStructureTypeFormType,
  orgStructureTypeCreateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

interface OrgStructureTypeCreateScreenProps {
  modalId?: string;
}

export const OrgStructureTypeCreateScreen: React.FC<
  OrgStructureTypeCreateScreenProps
> = ({ modalId }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const formHandler = useOrgStructureTypeForm({
    initialValues: orgStructureTypeFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(orgStructureTypeCreateSchema),
  });

  const {
    mutate: createOrgStructureType,
    isPending: isCreateOrgStructureTypeLoading,
  } = $backofficeApi.useMutation('post', '/api/OrgStructureTypes', {
    onSuccess: () => {
      notifications.show({
        color: 'green',
        message: 'บันทึกข้อมูลสำเร็จ',
      });

      if (!modalId) {
        router.push('/org-structure-type');
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
        queryKey: ['get', '/api/OrgStructureTypes'],
        refetchType: 'all',
      });
    },
  });

  const onHandleSubmit = async (values: OrgStructureTypeFormType) => {
    try {
      const parsedValue = orgStructureTypeCreateSchema.parse(values);

      createOrgStructureType({
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

  const isEventLoading = isCreateOrgStructureTypeLoading;

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <OrgStructureTypeFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <OrgStructureTypeForm />
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
