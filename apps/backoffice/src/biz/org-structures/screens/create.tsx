'use client';

import { uploadFile } from '@backoffice/actions/uploader';
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
import { getComboboxData, uploadFileIfNeeded } from '@tt-ss-hr/shared-utils';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useEffect } from 'react';
import { OrgStructureForm } from '../components/form';
import { orgStructureFormDefaultValues } from '../constants';
import { OrgStructureFormProvider, useOrgStructureForm } from '../context';
import {
  type OrgStructureForm as OrgStructureFormType,
  orgStructureCreateSchema,
} from '../types';

interface OrgStructureCreateScreenProps {
  modalId?: string;
  parentId?: string;
}

export const OrgStructureCreateScreen: React.FC<
  OrgStructureCreateScreenProps
> = ({ modalId, parentId }) => {
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

  const { data: orgStructures, isLoading: isOrgStructuresLoading } =
    $backofficeApi.useQuery('get', '/api/OrgStructures', {
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
          taxId: parsedValue?.taxId || null,
          taxId2: parsedValue?.taxId2 || null,
          socialSecurityTypeId: parsedValue?.socialSecurityTypeId || null,
          addressTh: parsedValue?.addressTh || null,
          addressEn: parsedValue?.addressEn || null,
          provinceId: parsedValue?.provinceId || null,
          district: parsedValue?.district || null,
          subdistrict: parsedValue?.subdistrict || null,
          postalCode: Number(String(parsedValue?.postalCode)),
          phoneNumber: parsedValue?.phoneNumber || null,
          faxNumber: parsedValue?.faxNumber || null,
          emailCompany: parsedValue?.emailCompany || null,
          logoComppanyPath: logoComppanyPath || null,
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
      if (orgStructures && !isOrgStructuresLoading && parentId) {
        formHandler.setFieldValue('parentId', parentId)
        formHandler.resetDirty();
      }
    },
    [orgStructures, isOrgStructuresLoading],
  );

  const isEventLoading = isCreateOrgStructureLoading;
  const isScreenLoading =
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
              parentId={parentId}
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
