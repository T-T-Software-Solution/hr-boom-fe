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
import { EducationForm } from '../components/form';
import { educationFormDefaultValues } from '../constants';
import { EducationFormProvider, useEducationForm } from '../context';
import {
  type EducationForm as EducationFormType,
  educationCreateSchema,
} from '../types';



interface EducationCreateScreenProps {
  modalId?: string;
  id?: string;
}

export const EducationCreateScreen: React.FC<EducationCreateScreenProps> = ({
  modalId,
  id
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const formHandler = useEducationForm({
    initialValues: educationFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(educationCreateSchema),
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

  const { data: educationLevels, isLoading: isEducationLevelsLoading } =
    $backofficeApi.useQuery('get', '/api/EducationLevels', {
      params: {
        query: {
          pageNo: 1,
          pageSize: 500,
        },
      },
    });
  const { mutate: createEducation, isPending: isCreateEducationLoading } =
    $backofficeApi.useMutation('post', '/api/Educations', {
      onSuccess: () => {
        notifications.show({
          color: 'green',
          message: 'บันทึกข้อมูลสำเร็จ',
        });

        if (!modalId) {
          router.push('/education');
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
          queryKey: ['get', '/api/Educations'],
          refetchType: 'all',
        });
      },
    });

  const onHandleSubmit = async (values: EducationFormType) => {
    try {
      const parsedValue = educationCreateSchema.parse(values);

      createEducation({
        body: {
          employeeId: parsedValue?.employeeId || '',
          educationLevelId: parsedValue?.educationLevelId || '',
          institutionGraduated: parsedValue?.institutionGraduated || '',
          dateStart:
            parsedValue?.dateStart && dayjs(parsedValue?.dateStart).isValid()
              ? dayjs(parsedValue?.dateStart).toISOString()
              : undefined,
          dateGraduation:
            parsedValue?.dateGraduation &&
              dayjs(parsedValue?.dateGraduation).isValid()
              ? dayjs(parsedValue?.dateGraduation).toISOString()
              : undefined,
          faculty: parsedValue?.faculty || '',
          major: parsedValue?.major || '',
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

  const isEventLoading = isCreateEducationLoading;
  const isScreenLoading = isEmployeesLoading || isEducationLevelsLoading;
  if (isScreenLoading) {
    return <LoadingOverlay visible={isScreenLoading} />;
  }

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <EducationFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <EducationForm
              dropdowns={{
                employees: getComboboxData(
                  employees?.contents ?? [],
                  'id',
                  'firstName',
                ),
                educationLevels: getComboboxData(
                  educationLevels?.contents ?? [],
                  'id',
                  'name',
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
      </EducationFormProvider>
    </Fieldset>
  );
};
