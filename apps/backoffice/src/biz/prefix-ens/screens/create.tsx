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
import { PrefixEnForm } from '../components/form';
import { prefixEnFormDefaultValues } from '../constants';
import { PrefixEnFormProvider, usePrefixEnForm } from '../context';
import {
  type PrefixEnForm as PrefixEnFormType,
  prefixEnCreateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

interface PrefixEnCreateScreenProps {
  modalId?: string;
}

export const PrefixEnCreateScreen: React.FC<PrefixEnCreateScreenProps> = ({
  modalId,
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const formHandler = usePrefixEnForm({
    initialValues: prefixEnFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(prefixEnCreateSchema),
  });

  const { mutate: createPrefixEn, isPending: isCreatePrefixEnLoading } =
    $backofficeApi.useMutation('post', '/api/PrefixEns', {
      onSuccess: () => {
        notifications.show({
          color: 'green',
          message: 'บันทึกข้อมูลสำเร็จ',
        });

        if (!modalId) {
          router.push('/prefix-en');
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
          queryKey: ['get', '/api/PrefixEns'],
          refetchType: 'all',
        });
      },
    });

  const onHandleSubmit = async (values: PrefixEnFormType) => {
    try {
      const parsedValue = prefixEnCreateSchema.parse(values);

      createPrefixEn({
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

  const isEventLoading = isCreatePrefixEnLoading;

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <PrefixEnFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <PrefixEnForm />
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
      </PrefixEnFormProvider>
    </Fieldset>
  );
};
