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
import { OrgStructureForm } from '../components/form';
import { orgStructureFormDefaultValues } from '../constants';
import { OrgStructureFormProvider, useOrgStructureForm } from '../context';
import {
  type OrgStructureForm as OrgStructureFormType,
  orgStructureUpdateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

import type { OrgStructureType } from '@backoffice/biz/org-structure-types/types';

import type { SocialSecurityType } from '@backoffice/biz/social-security-types/types';

import type { Province } from '@backoffice/biz/provinces/types';

import type { OrgStructure } from '@backoffice/biz/org-structures/types';

interface OrgStructureUpdateScreenProps {
  modalId?: string;
  id: string;
}

export const OrgStructureUpdateScreen: React.FC<
  OrgStructureUpdateScreenProps
> = ({ modalId, id }) => {
  const queryClient = useQueryClient();
  const formHandler = useOrgStructureForm({
    initialValues: orgStructureFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(orgStructureUpdateSchema),
  });

  const { data: orgStructureTypes, isLoading: isOrgStructureTypesLoading } =
    $backofficeApi.useQuery('get', '/api/OrgStructureTypes', {
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

  const { data: provinces, isLoading: isProvincesLoading } =
    $backofficeApi.useQuery('get', '/api/Provinces', {
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
  const { data: orgStructure, isLoading: isOrgStructureLoading } =
    $backofficeApi.useQuery('get', '/api/OrgStructures/{id}', {
      params: {
        path: {
          id,
        },
      },
    });

  const { mutate: updateOrgStructure, isPending: isUpdateOrgStructureLoading } =
    $backofficeApi.useMutation('put', '/api/OrgStructures/{id}', {
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
            '/api/OrgStructures/{id}',
            { params: { path: { id: id } } },
          ],
          refetchType: 'all',
        });

        await queryClient.invalidateQueries({
          queryKey: ['get', '/api/OrgStructures'],
          refetchType: 'all',
        });
      },
    });

  const onHandleSubmit = async (values: OrgStructureFormType) => {
    try {
      const parsedValue = orgStructureUpdateSchema.parse(values);
      const logoCompanyPath = await uploadFileIfNeeded({
        file: values?.logoCompanyPath ?? '',
        previewFile: values?.originalLogoCompanyPath,
        uploadFile,
      });
      updateOrgStructure({
        params: {
          path: {
            id,
          },
        },
        body: {
          id: parsedValue?.id || '',
          orgStructureTypeId: parsedValue?.orgStructureTypeId || '',
          code: parsedValue?.code || '',
          name: parsedValue?.name || '',
          nameEn: parsedValue?.nameEn || null,
          taxId: parsedValue?.taxId || null,
          taxId2: parsedValue?.taxId2 || null,
          socialSecurityTypeId: parsedValue?.socialSecurityTypeId || null,
          addressTh: parsedValue?.addressTh || null,
          addressEn: parsedValue?.addressEn || null,
          provinceId: parsedValue?.provinceId || null,
          district: parsedValue?.district || null,
          subdistrict: parsedValue?.subdistrict || null,
          postalCode: !isNaN(Number(String(parsedValue?.postalCode)))
            ? Number(String(parsedValue?.postalCode))
            : null,
          phoneNumber: parsedValue?.phoneNumber || null,
          faxNumber: parsedValue?.faxNumber || null,
          emailCompany: parsedValue?.emailCompany || null,
          logoCompanyPath: logoCompanyPath || null,
          description: parsedValue?.description || null,
          parentId: parsedValue?.parentId || null,
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
      if (orgStructure && !isOrgStructureLoading) {
        const logoCompanyPath = orgStructure.logoCompanyPath
          ? getFileUrl(orgStructure.logoCompanyPath)
          : null;
        formHandler.setValues({
          id: orgStructure?.id ?? '',
          orgStructureTypeId: orgStructure?.orgStructureType?.id ?? '',
          code: orgStructure?.code ?? '',
          name: orgStructure?.name ?? '',
          nameEn: orgStructure?.nameEn ?? null,
          taxId: orgStructure?.taxId ?? null,
          taxId2: orgStructure?.taxId2 ?? null,
          socialSecurityTypeId: orgStructure?.socialSecurityType?.id ?? null,
          addressTh: orgStructure?.addressTh ?? null,
          addressEn: orgStructure?.addressEn ?? null,
          provinceId: orgStructure?.province?.id ?? null,
          district: orgStructure?.district ?? null,
          subdistrict: orgStructure?.subdistrict ?? null,
          postalCode: !isNaN(Number(String(orgStructure?.postalCode)))
            ? Number(String(orgStructure?.postalCode))
            : null,
          phoneNumber: orgStructure?.phoneNumber ?? null,
          faxNumber: orgStructure?.faxNumber ?? null,
          emailCompany: orgStructure?.emailCompany ?? null,
          logoCompanyPath: logoCompanyPath?.fileName ?? null,
          previewLogoCompanyPath: logoCompanyPath?.fullPath ?? null,
          originalLogoCompanyPath: logoCompanyPath?.originalFileName ?? null,
          description: orgStructure?.description ?? null,
          parentId: orgStructure?.parent?.id ?? null,
        });
        formHandler.resetDirty();
      }
    },
    [orgStructure, isOrgStructureLoading],
  );

  const isEventLoading = isUpdateOrgStructureLoading;
  const isScreenLoading =
    isOrgStructureLoading ||
    isOrgStructureTypesLoading ||
    isSocialSecurityTypesLoading ||
    isProvincesLoading ||
    isOrgStructuresLoading;
  if (isScreenLoading) {
    return <LoadingOverlay visible={isScreenLoading} />;
  }

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <OrgStructureFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <OrgStructureForm
              isUpdate
              dropdowns={{
                orgStructureTypes: getComboboxData(
                  orgStructureTypes?.contents ?? [],
                  'id',
                  'name',
                ),
                socialSecurityTypes: getComboboxData(
                  socialSecurityTypes?.contents ?? [],
                  'id',
                  'name',
                ),
                provinces: getComboboxData(
                  provinces?.contents ?? [],
                  'id',
                  'name',
                ),
                orgStructures: getComboboxData(
                  orgStructures?.contents ?? [],
                  'id',
                  'code',
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
      </OrgStructureFormProvider>
    </Fieldset>
  );
};
