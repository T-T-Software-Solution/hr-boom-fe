'use client';
import { useOrgStructureFormContext } from '../context';
import {
  Button,
  Checkbox,
  type ComboboxData,
  Container,
  FileInput,
  Grid,
  Group,
  Image,
  Input,
  NumberInput,
  Paper,
  Select,
  TextInput,
  Textarea,
  rem,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import {
  IconCalendar,
  IconEye,
  IconFileTypeDoc,
  IconPhotoScan,
} from '@tabler/icons-react';
import { FileDisplay } from '@tt-ss-hr/shared-ui';
import {
  checkFileUrl,
  placeholderImage,
  viewFileInNewTabOrDownload,
} from '@tt-ss-hr/shared-utils';
import 'dayjs/locale/th';
interface OrgStructureFormProps {
  isUpdate?: boolean;
  dropdowns: {
    orgStructureTypes: ComboboxData;
    socialSecurityTypes: ComboboxData;
    provinces: ComboboxData;
    orgStructures: ComboboxData;
  };
}

export const OrgStructureForm: React.FC<OrgStructureFormProps> = ({
  isUpdate,
  dropdowns,
}) => {
  const { getInputProps, key, getValues } = useOrgStructureFormContext();
  const { logoComppanyPath, previewLogoComppanyPath } = getValues();

  return (
    <Container p={rem(16)}>
      <Grid gutter="md">
        {isUpdate && (
          <Grid.Col span={{ base: 12, md: 4 }}>
            <TextInput
              label="รหัสของโครงสร้างองค์กร"
              value={getValues().id ?? ''}
              disabled
            />{' '}
          </Grid.Col>
        )}
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Select
            label="ชนิดของโครงสร้างองค์กร"
            placeholder="ชนิดของโครงสร้างองค์กร"
            data={dropdowns.orgStructureTypes}
            key={key('orgStructureTypeId')}
            {...getInputProps('orgStructureTypeId')}
            withAsterisk
            clearable
            searchable
            nothingFoundMessage="ไม่พบข้อมูล"
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="รหัสขององค์กร"
            placeholder="รหัสขององค์กร"
            key={key('code')}
            {...getInputProps('code')}
            withAsterisk
          />{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="ชื่อ"
            placeholder="ชื่อ"
            key={key('name')}
            {...getInputProps('name')}
            withAsterisk
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="ชื่อ(EN)"
            placeholder="ชื่อ(EN)"
            key={key('nameEn')}
            {...getInputProps('nameEn')}
          />{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="เลขประจำตัวผู้เสียภาษี"
            placeholder="เลขประจำตัวผู้เสียภาษี"
            key={key('taxId')}
            {...getInputProps('taxId')}
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="เลขประจำตัวผู้เสียภาษี 2 (สำรอง)"
            placeholder="เลขประจำตัวผู้เสียภาษี 2 (สำรอง)"
            key={key('taxId2')}
            {...getInputProps('taxId2')}
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Select
            label="สิทธิ์ประกันสังคม"
            placeholder="สิทธิ์ประกันสังคม"
            data={dropdowns.socialSecurityTypes}
            key={key('socialSecurityTypeId')}
            {...getInputProps('socialSecurityTypeId')}
            clearable
            searchable
            nothingFoundMessage="ไม่พบข้อมูล"
          />{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="ที่อยู่บริษัท"
            placeholder="ที่อยู่บริษัท"
            key={key('addressTh')}
            {...getInputProps('addressTh')}
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="ที่อยู่บริษัท (EN)"
            placeholder="ที่อยู่บริษัท (EN)"
            key={key('addressEn')}
            {...getInputProps('addressEn')}
          />{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Select
            label="จังหวัด"
            placeholder="จังหวัด"
            data={dropdowns.provinces}
            key={key('provinceId')}
            {...getInputProps('provinceId')}
            clearable
            searchable
            nothingFoundMessage="ไม่พบข้อมูล"
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="เขต/อำเภอ"
            placeholder="เขต/อำเภอ"
            key={key('district')}
            {...getInputProps('district')}
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="แขวง/ตำบล"
            placeholder="แขวง/ตำบล"
            key={key('subdistrict')}
            {...getInputProps('subdistrict')}
          />{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <NumberInput
            label="รหัสไปรษณีย์"
            placeholder="รหัสไปรษณีย์"
            thousandSeparator=","
            decimalScale={0}
            key={key('postalCode')}
            {...getInputProps('postalCode')}
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="เบอร์โทรศัพท์"
            placeholder="เบอร์โทรศัพท์"
            key={key('phoneNumber')}
            {...getInputProps('phoneNumber')}
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="เบอร์โทรสาร (Fax)"
            placeholder="เบอร์โทรสาร (Fax)"
            key={key('faxNumber')}
            {...getInputProps('faxNumber')}
          />{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="อีเมลบริษัท"
            placeholder="อีเมลบริษัท"
            key={key('emailCompany')}
            {...getInputProps('emailCompany')}
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <>
            <FileInput
              leftSection={
                <IconPhotoScan
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
              }
              label="รูปภาพบริษัท"
              placeholder="รูปภาพบริษัท"
              clearable
              accept="image/png,image/jpeg,image/webp"
              description="รองรับไฟล์ในรูปแบบ PNG, JPEG หรือ WEBP เท่านั้น"
              valueComponent={FileDisplay}
              key={key('logoComppanyPath')}
              {...getInputProps('logoComppanyPath')}
            />
            <Group mt="md">
              {logoComppanyPath && (
                <Paper
                  shadow="xs"
                  p="0"
                  radius="md"
                  className="overflow-hidden"
                >
                  <Image
                    src={
                      logoComppanyPath instanceof File
                        ? URL.createObjectURL(logoComppanyPath)
                        : previewLogoComppanyPath
                    }
                    alt={
                      logoComppanyPath instanceof File
                        ? logoComppanyPath.name
                        : logoComppanyPath
                    }
                    maw="100px"
                    mah="100px"
                    onError={(e) => {
                      e.currentTarget.src = placeholderImage;
                    }}
                  />
                </Paper>
              )}
            </Group>
          </>{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            label="คำอธิบาย"
            placeholder="คำอธิบาย"
            key={key('description')}
            {...getInputProps('description')}
          />{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Select
            label="รหัสต้นสังกัด"
            placeholder="รหัสต้นสังกัด"
            data={dropdowns.orgStructures}
            key={key('parentId')}
            {...getInputProps('parentId')}
            clearable
            searchable
            nothingFoundMessage="ไม่พบข้อมูล"
          />{' '}
        </Grid.Col>
      </Grid>{' '}
    </Container>
  );
};
