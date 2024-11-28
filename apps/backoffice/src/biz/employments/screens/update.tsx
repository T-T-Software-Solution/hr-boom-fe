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
import { EmploymentForm } from '../components/form';
import { employmentFormDefaultValues } from '../constants';
import { EmploymentFormProvider, useEmploymentForm } from '../context';
import {
  type EmploymentForm as EmploymentFormType,
  employmentUpdateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

import type { Employee } from '@backoffice/biz/employees/types';

import type { OrgStructure } from '@backoffice/biz/org-structures/types';

import type { PositionStructure } from '@backoffice/biz/position-structures/types';

import type { EmployeeType } from '@backoffice/biz/employee-types/types';

import type { SocialSecurityType } from '@backoffice/biz/social-security-types/types';

import type { TaxCondition } from '@backoffice/biz/tax-conditions/types';

import type { TaxBracket } from '@backoffice/biz/tax-brackets/types';

import type { PaymentChannel } from '@backoffice/biz/payment-channels/types';

import type { Bank } from '@backoffice/biz/banks/types';

import type { BankAccountType } from '@backoffice/biz/bank-account-types/types';

interface EmploymentUpdateScreenProps {
  modalId?: string;
  id: string;
}

export const EmploymentUpdateScreen: React.FC<EmploymentUpdateScreenProps> = ({
  modalId,
  id,
}) => {
  const queryClient = useQueryClient();
  const formHandler = useEmploymentForm({
    initialValues: employmentFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(employmentUpdateSchema),
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

  const { data: orgStructures, isLoading: isOrgStructuresLoading } =
    $backofficeApi.useQuery('get', '/api/OrgStructures', {
      params: {
        query: {
          pageNo: 1,
          pageSize: 500,
        },
      },
    });

  const { data: positionStructures, isLoading: isPositionStructuresLoading } =
    $backofficeApi.useQuery('get', '/api/PositionStructures', {
      params: {
        query: {
          pageNo: 1,
          pageSize: 500,
        },
      },
    });

  const { data: employeeTypes, isLoading: isEmployeeTypesLoading } =
    $backofficeApi.useQuery('get', '/api/EmployeeTypes', {
      params: {
        query: {
          pageNo: 1,
          pageSize: 500,
        },
      },
    });

  const { data: socialSecurityTypes, isLoading: isSocialSecurityTypesLoading } =
    $backofficeApi.useQuery('get', '/api/SocialSecurityTypes', {
      params: {
        query: {
          pageNo: 1,
          pageSize: 500,
        },
      },
    });

  const { data: taxConditions, isLoading: isTaxConditionsLoading } =
    $backofficeApi.useQuery('get', '/api/TaxConditions', {
      params: {
        query: {
          pageNo: 1,
          pageSize: 500,
        },
      },
    });

  const { data: taxBrackets, isLoading: isTaxBracketsLoading } =
    $backofficeApi.useQuery('get', '/api/TaxBrackets', {
      params: {
        query: {
          pageNo: 1,
          pageSize: 500,
        },
      },
    });

  const { data: paymentChannels, isLoading: isPaymentChannelsLoading } =
    $backofficeApi.useQuery('get', '/api/PaymentChannels', {
      params: {
        query: {
          pageNo: 1,
          pageSize: 500,
        },
      },
    });

  const { data: banks, isLoading: isBanksLoading } = $backofficeApi.useQuery(
    'get',
    '/api/Banks',
    {
      params: {
        query: {
          pageNo: 1,
          pageSize: 500,
        },
      },
    },
  );

  const { data: bankAccountTypes, isLoading: isBankAccountTypesLoading } =
    $backofficeApi.useQuery('get', '/api/BankAccountTypes', {
      params: {
        query: {
          pageNo: 1,
          pageSize: 500,
        },
      },
    });
  const { data: employment, isLoading: isEmploymentLoading } =
    $backofficeApi.useQuery('get', '/api/Employments/{id}', {
      params: {
        path: {
          id,
        },
      },
    });

  const { mutate: updateEmployment, isPending: isUpdateEmploymentLoading } =
    $backofficeApi.useMutation('put', '/api/Employments/{id}', {
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
            '/api/Employments/{id}',
            { params: { path: { id: id } } },
          ],
          refetchType: 'all',
        });

        await queryClient.invalidateQueries({
          queryKey: ['get', '/api/Employments'],
          refetchType: 'all',
        });
      },
    });

  const onHandleSubmit = async (values: EmploymentFormType) => {
    try {
      const parsedValue = employmentUpdateSchema.parse(values);

      updateEmployment({
        params: {
          path: {
            id,
          },
        },
        body: {
          id: parsedValue?.id || '',
          employeeId: parsedValue?.employeeId || '',
          employmentStartDate:
            parsedValue?.employmentStartDate &&
            dayjs(parsedValue?.employmentStartDate).isValid()
              ? dayjs(parsedValue?.employmentStartDate).toISOString()
              : undefined,
          yearsOfWork: Number(String(parsedValue?.yearsOfWork)),
          monthsOfWork: Number(String(parsedValue?.monthsOfWork)),
          daysOfWork: Number(String(parsedValue?.daysOfWork)),
          orgStructureId: parsedValue?.orgStructureId || '',
          positionStructureId: parsedValue?.positionStructureId || '',
          employeeTypeId: parsedValue?.employeeTypeId || '',
          socialSecurityTypeId: parsedValue?.socialSecurityTypeId || '',
          salary: Number.parseFloat(String(parsedValue?.salary)),
          withholdingTax: Number.parseFloat(
            String(parsedValue?.withholdingTax),
          ),
          isWithholdingTax: parsedValue?.isWithholdingTax || false,
          taxConditionId: parsedValue?.taxConditionId || '',
          taxBracketId: parsedValue?.taxBracketId || '',
          netSalary: Number.parseFloat(String(parsedValue?.netSalary)),
          paymentChannelId: parsedValue?.paymentChannelId || '',
          bankId: parsedValue?.bankId || '',
          bankBranch: parsedValue?.bankBranch || '',
          bankAccountNumber: Number(String(parsedValue?.bankAccountNumber)),
          bankAccountTypeId: parsedValue?.bankAccountTypeId || '',
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

  useEffect(
    function feedDataToForm() {
      if (employment && !isEmploymentLoading) {
        formHandler.setValues({
          id: employment?.id ?? '',
          employeeId: employment?.employee?.id ?? '',
          employmentStartDate:
            employment?.employmentStartDate &&
            dayjs(employment?.employmentStartDate).isValid()
              ? dayjs(employment?.employmentStartDate).toDate()
              : undefined,
          yearsOfWork: Number(String(employment?.yearsOfWork)),
          monthsOfWork: Number(String(employment?.monthsOfWork)),
          daysOfWork: Number(String(employment?.daysOfWork)),
          orgStructureId: employment?.orgStructure?.id ?? '',
          positionStructureId: employment?.positionStructure?.id ?? '',
          employeeTypeId: employment?.employeeType?.id ?? '',
          socialSecurityTypeId: employment?.socialSecurityType?.id ?? '',
          salary: Number.parseFloat(String(employment?.salary)),
          withholdingTax: Number.parseFloat(String(employment?.withholdingTax)),
          isWithholdingTax: employment?.isWithholdingTax ?? false,
          taxConditionId: employment?.taxCondition?.id ?? '',
          taxBracketId: employment?.taxBracket?.id ?? '',
          netSalary: Number.parseFloat(String(employment?.netSalary)),
          paymentChannelId: employment?.paymentChannel?.id ?? '',
          bankId: employment?.bank?.id ?? '',
          bankBranch: employment?.bankBranch ?? '',
          bankAccountNumber: Number(String(employment?.bankAccountNumber)),
          bankAccountTypeId: employment?.bankAccountType?.id ?? '',
          note: employment?.note ?? '',
        });
        formHandler.resetDirty();
      }
    },
    [employment, isEmploymentLoading],
  );

  const isEventLoading = isUpdateEmploymentLoading;
  const isScreenLoading =
    isEmploymentLoading ||
    isEmployeesLoading ||
    isOrgStructuresLoading ||
    isPositionStructuresLoading ||
    isEmployeeTypesLoading ||
    isSocialSecurityTypesLoading ||
    isTaxConditionsLoading ||
    isTaxBracketsLoading ||
    isPaymentChannelsLoading ||
    isBanksLoading ||
    isBankAccountTypesLoading;
  if (isScreenLoading) {
    return <LoadingOverlay visible={isScreenLoading} />;
  }

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <EmploymentFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <EmploymentForm
              isUpdate
              dropdowns={{
                employees: getComboboxData(
                  employees?.contents ?? [],
                  'id',
                  'firstName',
                ),
                orgStructures: getComboboxData(
                  orgStructures?.contents ?? [],
                  'id',
                  'name',
                ),
                positionStructures: getComboboxData(
                  positionStructures?.contents ?? [],
                  'id',
                  'name',
                ),
                employeeTypes: getComboboxData(
                  employeeTypes?.contents ?? [],
                  'id',
                  'name',
                ),
                socialSecurityTypes: getComboboxData(
                  socialSecurityTypes?.contents ?? [],
                  'id',
                  'name',
                ),
                taxConditions: getComboboxData(
                  taxConditions?.contents ?? [],
                  'id',
                  'name',
                ),
                taxBrackets: getComboboxData(
                  taxBrackets?.contents ?? [],
                  'id',
                  'name',
                ),
                paymentChannels: getComboboxData(
                  paymentChannels?.contents ?? [],
                  'id',
                  'name',
                ),
                banks: getComboboxData(banks?.contents ?? [], 'id', 'name'),
                bankAccountTypes: getComboboxData(
                  bankAccountTypes?.contents ?? [],
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
      </EmploymentFormProvider>
    </Fieldset>
  );
};
