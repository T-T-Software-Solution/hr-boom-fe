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
import { OrgStructureForm } from '../components/form';
import { orgStructureFormDefaultValues } from '../constants';
import { OrgStructureFormProvider, useOrgStructureForm } from '../context';
import {
  type OrgStructureForm as OrgStructureFormType,
  orgStructureCreateSchema,
} from '../types';
import { getErrorMessage } from '@backoffice/utils/error';

import type { OrgStructureType } from '@backoffice/biz/org-structure-types/types';

import type { SocialSecurityType } from '@backoffice/biz/social-security-types/types';

import type { Province } from '@backoffice/biz/provinces/types';

interface OrgStructureCreateScreenProps {
  modalId?: string;
}

export const OrgStructureCreateScreen: React.FC<
  OrgStructureCreateScreenProps
> = ({ modalId }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const formHandler = useOrgStructureForm({
    initialValues: orgStructureFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(orgStructureCreateSchema),
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
  const { mutate: createOrgStructure, isPending: isCreateOrgStructureLoading } =
    $backofficeApi.useMutation('post', '/api/OrgStructures', {
      onSuccess: () => {
        notifications.show({
          color: 'green',
          message: 'บันทึกข้อมูลสำเร็จ',
        });

        if (!modalId) {
          router.push('/org-structure');
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
          queryKey: ['get', '/api/OrgStructures'],
          refetchType: 'all',
        });
      },
    });

  const onHandleSubmit = async (values: OrgStructureFormType) => {
    try {
      const parsedValue = orgStructureCreateSchema.parse(values);
      const logoComppanyPath = await uploadFileIfNeeded({
        file: values?.logoComppanyPath ?? '',
        previewFile: values?.previewLogoComppanyPath,
        uploadFile,
      });
      createOrgStructure({
        body: {
          orgStructureTypeId: parsedValue?.orgStructureTypeId || '',
          code: parsedValue?.code || '',
          name: parsedValue?.name || '',
          nameEn: parsedValue?.nameEn || '',
          taxId: parsedValue?.taxId || '',
          taxId2: parsedValue?.taxId2 || '',
          socialSecurityTypeId: parsedValue?.socialSecurityTypeId || '',
          addressTh: parsedValue?.addressTh || '',
          addressEn: parsedValue?.addressEn || '',
          provinceId: parsedValue?.provinceId || '',
          district: parsedValue?.district || '',
          subdistrict: parsedValue?.subdistrict || '',
          postalCode: Number(String(parsedValue?.postalCode)),
          phoneNumber: parsedValue?.phoneNumber || '',
          faxNumber: parsedValue?.faxNumber || '',
          emailCompany: parsedValue?.emailCompany || '',
          logoComppanyPath: logoComppanyPath || '',
          description: parsedValue?.description || '',
          parentId: parsedValue?.parentId || '',
        },
      });
    } catch (error: unknown) {
      notifications.show({
        color: 'red',
        message: getErrorMessage(error),
      });
    }
  };

  const isEventLoading = isCreateOrgStructureLoading;
  const isScreenLoading =
    isOrgStructureTypesLoading ||
    isSocialSecurityTypesLoading ||
    isProvincesLoading;
  if (isScreenLoading) {
    return <LoadingOverlay visible={isScreenLoading} />;
  }

  return (
    <Fieldset variant="unstyled" disabled={isEventLoading}>
      <OrgStructureFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <OrgStructureForm
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
