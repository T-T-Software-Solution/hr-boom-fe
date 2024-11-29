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
import { getComboboxData } from '@tt-ss-hr/shared-utils';
import dayjs from 'dayjs';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useRouter } from 'next/navigation';
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
  professionalLicenseCreateSchema,
} from '../types';


interface ProfessionalLicenseCreateScreenProps {
  modalId?: string;
  id?: string;
}

export const ProfessionalLicenseCreateScreen: React.FC<
  ProfessionalLicenseCreateScreenProps
> = ({ modalId, id }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const formHandler = useProfessionalLicenseForm({
    initialValues: professionalLicenseFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(professionalLicenseCreateSchema),
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
  const {
    mutate: createProfessionalLicense,
    isPending: isCreateProfessionalLicenseLoading,
  } = $backofficeApi.useMutation('post', '/api/ProfessionalLicenses', {
    onSuccess: () => {
      notifications.show({
        color: 'green',
        message: 'บันทึกข้อมูลสำเร็จ',
      });

      if (!modalId) {
        router.push('/professional-license');
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
        queryKey: ['get', '/api/ProfessionalLicenses'],
        refetchType: 'all',
      });
    },
  });

  const onHandleSubmit = async (values: ProfessionalLicenseFormType) => {
    try {
      const parsedValue = professionalLicenseCreateSchema.parse(values);

      createProfessionalLicense({
        body: {
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
      if (employees && !isEmployeesLoading && id) {
        formHandler.setFieldValue('employeeId', id)
        formHandler.resetDirty();
      }
    },
    [employees, isEmployeesLoading],
  );

  const isEventLoading = isCreateProfessionalLicenseLoading;
  const isScreenLoading = isEmployeesLoading;
  if (isScreenLoading) {
    return <LoadingOverlay visible={isScreenLoading} />;
  }

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <ProfessionalLicenseFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <ProfessionalLicenseForm
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
