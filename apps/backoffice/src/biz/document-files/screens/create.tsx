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
import { DocumentFileForm } from '../components/form';
import { documentFileFormDefaultValues } from '../constants';
import { DocumentFileFormProvider, useDocumentFileForm } from '../context';
import {
  type DocumentFileForm as DocumentFileFormType,
  documentFileCreateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

import type { Employee } from '@backoffice/biz/employees/types';

interface DocumentFileCreateScreenProps {
  modalId?: string;
}

export const DocumentFileCreateScreen: React.FC<
  DocumentFileCreateScreenProps
> = ({ modalId }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const formHandler = useDocumentFileForm({
    initialValues: documentFileFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(documentFileCreateSchema),
  });

  const { data: employees, isLoading: isEmployeesLoading } =
    $backofficeApi.useQuery('get', '/api/Employees', {
      params: {
        query: {
          pageNo: 1,
          pageSize: 500,
        },
      },
    });
  const { mutate: createDocumentFile, isPending: isCreateDocumentFileLoading } =
    $backofficeApi.useMutation('post', '/api/DocumentFiles', {
      onSuccess: () => {
        notifications.show({
          color: 'green',
          message: 'บันทึกข้อมูลสำเร็จ',
        });

        if (!modalId) {
          router.push('/document-file');
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
          queryKey: ['get', '/api/DocumentFiles'],
          refetchType: 'all',
        });
      },
    });

  const onHandleSubmit = async (values: DocumentFileFormType) => {
    try {
      const parsedValue = documentFileCreateSchema.parse(values);
      const filePath = await uploadFileIfNeeded({
        file: values?.filePath ?? '',
        previewFile: values?.previewFilePath,
        uploadFile,
      });
      createDocumentFile({
        body: {
          employeeId: parsedValue?.employeeId || '',
          filePath: filePath || '',
          fileType: parsedValue?.fileType || '',
          note: parsedValue?.note || '',
        },
      });
    } catch (error: unknown) {
      notifications.show({
        color: 'red',
        message: getErrorMessage(error),
      });
    }
  };

  const isEventLoading = isCreateDocumentFileLoading;
  const isScreenLoading = isEmployeesLoading;
  if (isScreenLoading) {
    return <LoadingOverlay visible={isScreenLoading} />;
  }

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <DocumentFileFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <DocumentFileForm
              dropdowns={{
                employees: getComboboxData(
                  employees?.contents ?? [],
                  'id',
                  'firstName',
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
      </DocumentFileFormProvider>
    </Fieldset>
  );
};
