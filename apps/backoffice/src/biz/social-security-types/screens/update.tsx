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
import { SocialSecurityTypeForm } from '../components/form';
import { socialSecurityTypeFormDefaultValues } from '../constants';
import {
  SocialSecurityTypeFormProvider,
  useSocialSecurityTypeForm,
} from '../context';
import {
  type SocialSecurityTypeForm as SocialSecurityTypeFormType,
  socialSecurityTypeUpdateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

interface SocialSecurityTypeUpdateScreenProps {
  modalId?: string;
  id: string;
}

export const SocialSecurityTypeUpdateScreen: React.FC<
  SocialSecurityTypeUpdateScreenProps
> = ({ modalId, id }) => {
  const queryClient = useQueryClient();
  const formHandler = useSocialSecurityTypeForm({
    initialValues: socialSecurityTypeFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(socialSecurityTypeUpdateSchema),
  });

  const { data: socialSecurityType, isLoading: isSocialSecurityTypeLoading } =
    $backofficeApi.useQuery('get', '/api/SocialSecurityTypes/{id}', {
      params: {
        path: {
          id,
        },
      },
    });

  const {
    mutate: updateSocialSecurityType,
    isPending: isUpdateSocialSecurityTypeLoading,
  } = $backofficeApi.useMutation('put', '/api/SocialSecurityTypes/{id}', {
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
          '/api/SocialSecurityTypes/{id}',
          { params: { path: { id: id } } },
        ],
        refetchType: 'all',
      });

      await queryClient.invalidateQueries({
        queryKey: ['get', '/api/SocialSecurityTypes'],
        refetchType: 'all',
      });
    },
  });

  const onHandleSubmit = async (values: SocialSecurityTypeFormType) => {
    try {
      const parsedValue = socialSecurityTypeUpdateSchema.parse(values);

      updateSocialSecurityType({
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
      if (socialSecurityType && !isSocialSecurityTypeLoading) {
        formHandler.setValues({
          id: socialSecurityType?.id ?? '',
          name: socialSecurityType?.name ?? '',
        });
        formHandler.resetDirty();
      }
    },
    [socialSecurityType, isSocialSecurityTypeLoading],
  );

  const isEventLoading = isUpdateSocialSecurityTypeLoading;
  const isScreenLoading = isSocialSecurityTypeLoading;
  if (isScreenLoading) {
    return <LoadingOverlay visible={isScreenLoading} />;
  }

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <SocialSecurityTypeFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <SocialSecurityTypeForm isUpdate />
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
      </SocialSecurityTypeFormProvider>
    </Fieldset>
  );
};
