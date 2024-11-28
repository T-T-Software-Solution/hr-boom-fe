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
import { ProfessionalLicenseForm } from '../components/form';
import { professionalLicenseFormDefaultValues } from '../constants';
import {
  ProfessionalLicenseFormProvider,
  useProfessionalLicenseForm,
} from '../context';
import {
  type ProfessionalLicenseForm as ProfessionalLicenseFormType,
  professionalLicenseUpdateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

import type { Employee } from '@backoffice/biz/employees/types';

interface ProfessionalLicenseUpdateScreenProps {
  modalId?: string;
  id: string;
}

export const ProfessionalLicenseUpdateScreen: React.FC<
  ProfessionalLicenseUpdateScreenProps
> = ({ modalId, id }) => {
  const queryClient = useQueryClient();
  const formHandler = useProfessionalLicenseForm({
    initialValues: professionalLicenseFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(professionalLicenseUpdateSchema),
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
  const { data: professionalLicense, isLoading: isProfessionalLicenseLoading } =
    $backofficeApi.useQuery('get', '/api/ProfessionalLicenses/{id}', {
      params: {
        path: {
          id,
        },
      },
    });

  const {
    mutate: updateProfessionalLicense,
    isPending: isUpdateProfessionalLicenseLoading,
  } = $backofficeApi.useMutation('put', '/api/ProfessionalLicenses/{id}', {
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
          '/api/ProfessionalLicenses/{id}',
          { params: { path: { id: id } } },
        ],
        refetchType: 'all',
      });

      await queryClient.invalidateQueries({
        queryKey: ['get', '/api/ProfessionalLicenses'],
        refetchType: 'all',
      });
    },
  });

  const onHandleSubmit = async (values: ProfessionalLicenseFormType) => {
    try {
      const parsedValue = professionalLicenseUpdateSchema.parse(values);

      updateProfessionalLicense({
        params: {
          path: {
            id,
          },
        },
        body: {
          id: parsedValue?.id || '',
          employeeId: parsedValue?.employeeId || '',
          name: parsedValue?.name || '',
          agency: parsedValue?.agency || '',
          numberLicense: parsedValue?.numberLicense || '',
          effectiveDate:
            parsedValue?.effectiveDate &&
            dayjs(parsedValue?.effectiveDate).isValid()
              ? dayjs(parsedValue?.effectiveDate).toISOString()
              : undefined,
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
      if (professionalLicense && !isProfessionalLicenseLoading) {
        formHandler.setValues({
          id: professionalLicense?.id ?? '',
          employeeId: professionalLicense?.employee?.id ?? '',
          name: professionalLicense?.name ?? '',
          agency: professionalLicense?.agency ?? '',
          numberLicense: professionalLicense?.numberLicense ?? '',
          effectiveDate:
            professionalLicense?.effectiveDate &&
            dayjs(professionalLicense?.effectiveDate).isValid()
              ? dayjs(professionalLicense?.effectiveDate).toDate()
              : undefined,
        });
        formHandler.resetDirty();
      }
    },
    [professionalLicense, isProfessionalLicenseLoading],
  );

  const isEventLoading = isUpdateProfessionalLicenseLoading;
  const isScreenLoading = isProfessionalLicenseLoading || isEmployeesLoading;
  if (isScreenLoading) {
    return <LoadingOverlay visible={isScreenLoading} />;
  }

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <ProfessionalLicenseFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <ProfessionalLicenseForm
              isUpdate
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
      </ProfessionalLicenseFormProvider>
    </Fieldset>
  );
};
