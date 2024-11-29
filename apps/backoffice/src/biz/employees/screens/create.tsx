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
import { EmployeeForm } from '../components/form';
import { employeeFormDefaultValues } from '../constants';
import { EmployeeFormProvider, useEmployeeForm } from '../context';
import {
  type EmployeeForm as EmployeeFormType,
  employeeCreateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

import type { Gender } from '@backoffice/biz/genders/types';

import type { Prefix } from '@backoffice/biz/prefixes/types';

import type { PrefixEn } from '@backoffice/biz/prefix-ens/types';

import type { OrgStructure } from '@backoffice/biz/org-structures/types';

import type { Province } from '@backoffice/biz/provinces/types';

interface EmployeeCreateScreenProps {
  modalId?: string;
}

export const EmployeeCreateScreen: React.FC<EmployeeCreateScreenProps> = ({
  modalId,
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const formHandler = useEmployeeForm({
    initialValues: employeeFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(employeeCreateSchema),
  });

  const { data: genders, isLoading: isGendersLoading } =
    $backofficeApi.useQuery('get', '/api/Genders', {
      params: {
        query: {
          pageNo: 1,
          pageSize: 500,
        },
      },
    });

  const { data: prefixes, isLoading: isPrefixesLoading } =
    $backofficeApi.useQuery('get', '/api/Prefixes', {
      params: {
        query: {
          pageNo: 1,
          pageSize: 500,
        },
      },
    });

  const { data: prefixEns, isLoading: isPrefixEnsLoading } =
    $backofficeApi.useQuery('get', '/api/PrefixEns', {
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

  const { data: provinces, isLoading: isProvincesLoading } =
    $backofficeApi.useQuery('get', '/api/Provinces', {
      params: {
        query: {
          pageNo: 1,
          pageSize: 500,
        },
      },
    });
  const { mutate: createEmployee, isPending: isCreateEmployeeLoading } =
    $backofficeApi.useMutation('post', '/api/Employees', {
      onSuccess: () => {
        notifications.show({
          color: 'green',
          message: 'บันทึกข้อมูลสำเร็จ',
        });

        if (!modalId) {
          router.push('/employee');
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
          queryKey: ['get', '/api/Employees'],
          refetchType: 'all',
        });
      },
    });

  const onHandleSubmit = async (values: EmployeeFormType) => {
    try {
      const parsedValue = employeeCreateSchema.parse(values);
      const imagePath = await uploadFileIfNeeded({
        file: values?.imagePath ?? '',
        previewFile: values?.originalImagePath,
        uploadFile,
      });
      createEmployee({
        body: {
          imagePath: imagePath || null,
          employeeId: parsedValue?.employeeId || '',
          genderId: parsedValue?.genderId || '',
          prefixId: parsedValue?.prefixId || '',
          firstName: parsedValue?.firstName || '',
          lastName: parsedValue?.lastName || '',
          nickname: parsedValue?.nickname || '',
          prefixEnId: parsedValue?.prefixEnId || '',
          firstNameEn: parsedValue?.firstNameEn || '',
          lastNameEn: parsedValue?.lastNameEn || '',
          nicknameEn: parsedValue?.nicknameEn || '',
          orgStructureId: parsedValue?.orgStructureId || '',
          dateOfBirth:
            parsedValue?.dateOfBirth &&
            dayjs(parsedValue?.dateOfBirth).isValid()
              ? dayjs(parsedValue?.dateOfBirth).toISOString()
              : undefined,
          placementDate:
            parsedValue?.placementDate &&
            dayjs(parsedValue?.placementDate).isValid()
              ? dayjs(parsedValue?.placementDate).toISOString()
              : undefined,
          retirementDate:
            parsedValue?.retirementDate &&
            dayjs(parsedValue?.retirementDate).isValid()
              ? dayjs(parsedValue?.retirementDate).toISOString()
              : undefined,
          nationalId: parsedValue?.nationalId || '',
          passportNumber: parsedValue?.passportNumber || '',
          telephone: parsedValue?.telephone || '',
          email: parsedValue?.email || '',
          lineId: parsedValue?.lineId || null,
          fatherFullName: parsedValue?.fatherFullName || null,
          motherFullName: parsedValue?.motherFullName || null,
          motherMaidenName: parsedValue?.motherMaidenName || null,
          maritalStatus: parsedValue?.maritalStatus || false,
          spouseFullName: parsedValue?.spouseFullName || null,
          spouseMaidenName: parsedValue?.spouseMaidenName || null,
          contactPersonName: parsedValue?.contactPersonName || '',
          contactPersonTel: parsedValue?.contactPersonTel || '',
          currentHouseNumber: parsedValue?.currentHouseNumber || '',
          currentMoo: parsedValue?.currentMoo || '',
          currentSoi: parsedValue?.currentSoi || '',
          currectYak: parsedValue?.currectYak || '',
          currentRoad: parsedValue?.currentRoad || '',
          currentSubdistrict: parsedValue?.currentSubdistrict || '',
          currentDistrict: parsedValue?.currentDistrict || '',
          currentProvinceId: parsedValue?.currentProvinceId || '',
          currentPostcode: Number(String(parsedValue?.currentPostcode)),
          permanentHouseNumber: parsedValue?.permanentHouseNumber || '',
          permanentMoo: parsedValue?.permanentMoo || '',
          permanentSoi: parsedValue?.permanentSoi || '',
          permanentYak: parsedValue?.permanentYak || '',
          permanentRoad: parsedValue?.permanentRoad || '',
          permanentSubdistrict: parsedValue?.permanentSubdistrict || '',
          permanentDistrict: parsedValue?.permanentDistrict || '',
          permanentProvinceId: parsedValue?.permanentProvinceId || '',
          permanentPostcode: Number(String(parsedValue?.permanentPostcode)),
          note: parsedValue?.note || null,
        },
      });
    } catch (error: unknown) {
      notifications.show({
        color: 'red',
        message: getErrorMessage(error),
      });
    }
  };

  const isEventLoading = isCreateEmployeeLoading;
  const isScreenLoading =
    isGendersLoading ||
    isPrefixesLoading ||
    isPrefixEnsLoading ||
    isOrgStructuresLoading ||
    isProvincesLoading;
  if (isScreenLoading) {
    return <LoadingOverlay visible={isScreenLoading} />;
  }

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <EmployeeFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <EmployeeForm
              dropdowns={{
                genders: getComboboxData(genders?.contents ?? [], 'id', 'name'),
                prefixes: getComboboxData(
                  prefixes?.contents ?? [],
                  'id',
                  'name',
                ),
                prefixEns: getComboboxData(
                  prefixEns?.contents ?? [],
                  'id',
                  'name',
                ),
                orgStructures: getComboboxData(
                  orgStructures?.contents ?? [],
                  'id',
                  'name',
                ),
                provinces: getComboboxData(
                  provinces?.contents ?? [],
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
      </EmployeeFormProvider>
    </Fieldset>
  );
};
