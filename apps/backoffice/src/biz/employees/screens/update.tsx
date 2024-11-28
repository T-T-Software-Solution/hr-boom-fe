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
import { EmployeeForm } from '../components/form';
import { employeeFormDefaultValues } from '../constants';
import { EmployeeFormProvider, useEmployeeForm } from '../context';
import {
  type EmployeeForm as EmployeeFormType,
  employeeUpdateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

import type { Gender } from '@backoffice/biz/genders/types';

import type { Prefix } from '@backoffice/biz/prefixes/types';

import type { PrefixEn } from '@backoffice/biz/prefix-ens/types';

import type { OrgStructure } from '@backoffice/biz/org-structures/types';

import type { Province } from '@backoffice/biz/provinces/types';

interface EmployeeUpdateScreenProps {
  modalId?: string;
  id: string;
}

export const EmployeeUpdateScreen: React.FC<EmployeeUpdateScreenProps> = ({
  modalId,
  id,
}) => {
  const queryClient = useQueryClient();
  const formHandler = useEmployeeForm({
    initialValues: employeeFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(employeeUpdateSchema),
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
  const { data: employee, isLoading: isEmployeeLoading } =
    $backofficeApi.useQuery('get', '/api/Employees/{id}', {
      params: {
        path: {
          id,
        },
      },
    });

  const { mutate: updateEmployee, isPending: isUpdateEmployeeLoading } =
    $backofficeApi.useMutation('put', '/api/Employees/{id}', {
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
            '/api/Employees/{id}',
            { params: { path: { id: id } } },
          ],
          refetchType: 'all',
        });

        await queryClient.invalidateQueries({
          queryKey: ['get', '/api/Employees'],
          refetchType: 'all',
        });
      },
    });

  const onHandleSubmit = async (values: EmployeeFormType) => {
    try {
      const parsedValue = employeeUpdateSchema.parse(values);
      const imagePath = await uploadFileIfNeeded({
        file: values?.imagePath ?? '',
        previewFile: values?.previewImagePath,
        uploadFile,
      });
      updateEmployee({
        params: {
          path: {
            id,
          },
        },
        body: {
          id: parsedValue?.id || '',
          imagePath: imagePath || '',
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
          lineId: parsedValue?.lineId || '',
          fatherFullName: parsedValue?.fatherFullName || '',
          motherFullName: parsedValue?.motherFullName || '',
          motherMaidenName: parsedValue?.motherMaidenName || '',
          maritalStatus: parsedValue?.maritalStatus || false,
          spouseFullName: parsedValue?.spouseFullName || '',
          spouseMaidenName: parsedValue?.spouseMaidenName || '',
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
      if (employee && !isEmployeeLoading) {
        const imagePath = getFileUrl(employee.imagePath);
        formHandler.setValues({
          id: employee?.id ?? '',
          imagePath: imagePath?.fileName ?? '',
          previewImagePath: imagePath?.fullPath ?? '',
          originalImagePath: imagePath?.originalFileName ?? '',
          employeeId: employee?.employeeId ?? '',
          genderId: employee?.gender?.id ?? '',
          prefixId: employee?.prefix?.id ?? '',
          firstName: employee?.firstName ?? '',
          lastName: employee?.lastName ?? '',
          nickname: employee?.nickname ?? '',
          prefixEnId: employee?.prefixEn?.id ?? '',
          firstNameEn: employee?.firstNameEn ?? '',
          lastNameEn: employee?.lastNameEn ?? '',
          nicknameEn: employee?.nicknameEn ?? '',
          orgStructureId: employee?.orgStructure?.id ?? '',
          dateOfBirth:
            employee?.dateOfBirth && dayjs(employee?.dateOfBirth).isValid()
              ? dayjs(employee?.dateOfBirth).toDate()
              : undefined,
          placementDate:
            employee?.placementDate && dayjs(employee?.placementDate).isValid()
              ? dayjs(employee?.placementDate).toDate()
              : undefined,
          retirementDate:
            employee?.retirementDate &&
            dayjs(employee?.retirementDate).isValid()
              ? dayjs(employee?.retirementDate).toDate()
              : undefined,
          nationalId: employee?.nationalId ?? '',
          passportNumber: employee?.passportNumber ?? '',
          telephone: employee?.telephone ?? '',
          email: employee?.email ?? '',
          lineId: employee?.lineId ?? '',
          fatherFullName: employee?.fatherFullName ?? '',
          motherFullName: employee?.motherFullName ?? '',
          motherMaidenName: employee?.motherMaidenName ?? '',
          maritalStatus: employee?.maritalStatus ?? false,
          spouseFullName: employee?.spouseFullName ?? '',
          spouseMaidenName: employee?.spouseMaidenName ?? '',
          contactPersonName: employee?.contactPersonName ?? '',
          contactPersonTel: employee?.contactPersonTel ?? '',
          currentHouseNumber: employee?.currentHouseNumber ?? '',
          currentMoo: employee?.currentMoo ?? '',
          currentSoi: employee?.currentSoi ?? '',
          currectYak: employee?.currectYak ?? '',
          currentRoad: employee?.currentRoad ?? '',
          currentSubdistrict: employee?.currentSubdistrict ?? '',
          currentDistrict: employee?.currentDistrict ?? '',
          currentProvinceId: employee?.currentProvince?.id ?? '',
          currentPostcode: Number(String(employee?.currentPostcode)),
          permanentHouseNumber: employee?.permanentHouseNumber ?? '',
          permanentMoo: employee?.permanentMoo ?? '',
          permanentSoi: employee?.permanentSoi ?? '',
          permanentYak: employee?.permanentYak ?? '',
          permanentRoad: employee?.permanentRoad ?? '',
          permanentSubdistrict: employee?.permanentSubdistrict ?? '',
          permanentDistrict: employee?.permanentDistrict ?? '',
          permanentProvinceId: employee?.permanentProvince?.id ?? '',
          permanentPostcode: Number(String(employee?.permanentPostcode)),
          note: employee?.note ?? '',
        });
        formHandler.resetDirty();
      }
    },
    [employee, isEmployeeLoading],
  );

  const isEventLoading = isUpdateEmployeeLoading;
  const isScreenLoading =
    isEmployeeLoading ||
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
              isUpdate
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
