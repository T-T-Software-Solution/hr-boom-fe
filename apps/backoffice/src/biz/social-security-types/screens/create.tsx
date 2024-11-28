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
import { SocialSecurityTypeForm } from '../components/form';
import { socialSecurityTypeFormDefaultValues } from '../constants';
import {
  SocialSecurityTypeFormProvider,
  useSocialSecurityTypeForm,
} from '../context';
import {
  type SocialSecurityTypeForm as SocialSecurityTypeFormType,
  socialSecurityTypeCreateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

interface SocialSecurityTypeCreateScreenProps {
  modalId?: string;
}

export const SocialSecurityTypeCreateScreen: React.FC<
  SocialSecurityTypeCreateScreenProps
> = ({ modalId }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const formHandler = useSocialSecurityTypeForm({
    initialValues: socialSecurityTypeFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(socialSecurityTypeCreateSchema),
  });

  const {
    mutate: createSocialSecurityType,
    isPending: isCreateSocialSecurityTypeLoading,
  } = $backofficeApi.useMutation('post', '/api/SocialSecurityTypes', {
    onSuccess: () => {
      notifications.show({
        color: 'green',
        message: 'บันทึกข้อมูลสำเร็จ',
      });

      if (!modalId) {
        router.push('/social-security-type');
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
        queryKey: ['get', '/api/SocialSecurityTypes'],
        refetchType: 'all',
      });
    },
  });

  const onHandleSubmit = async (values: SocialSecurityTypeFormType) => {
    try {
      const parsedValue = socialSecurityTypeCreateSchema.parse(values);

      createSocialSecurityType({
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

  const isEventLoading = isCreateSocialSecurityTypeLoading;

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <SocialSecurityTypeFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <SocialSecurityTypeForm />
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
