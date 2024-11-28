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
import { PrefixForm } from '../components/form';
import { prefixFormDefaultValues } from '../constants';
import { PrefixFormProvider, usePrefixForm } from '../context';
import {
  type PrefixForm as PrefixFormType,
  prefixCreateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

interface PrefixCreateScreenProps {
  modalId?: string;
}

export const PrefixCreateScreen: React.FC<PrefixCreateScreenProps> = ({
  modalId,
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const formHandler = usePrefixForm({
    initialValues: prefixFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(prefixCreateSchema),
  });

  const { mutate: createPrefix, isPending: isCreatePrefixLoading } =
    $backofficeApi.useMutation('post', '/api/Prefixes', {
      onSuccess: () => {
        notifications.show({
          color: 'green',
          message: 'บันทึกข้อมูลสำเร็จ',
        });

        if (!modalId) {
          router.push('/prefix');
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
          queryKey: ['get', '/api/Prefixes'],
          refetchType: 'all',
        });
      },
    });

  const onHandleSubmit = async (values: PrefixFormType) => {
    try {
      const parsedValue = prefixCreateSchema.parse(values);

      createPrefix({
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

  const isEventLoading = isCreatePrefixLoading;

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <PrefixFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <PrefixForm />
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
      </PrefixFormProvider>
    </Fieldset>
  );
};
