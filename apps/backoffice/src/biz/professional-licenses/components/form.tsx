'use client';
import { useProfessionalLicenseFormContext } from '../context';
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
interface ProfessionalLicenseFormProps {
  isUpdate?: boolean;
  dropdowns: {
    employees: ComboboxData;
  };
}

export const ProfessionalLicenseForm: React.FC<
  ProfessionalLicenseFormProps
> = ({ isUpdate, dropdowns }) => {
  const { getInputProps, key, getValues } = useProfessionalLicenseFormContext();

  return (
    <Container p={rem(16)}>
      <Grid gutter="md">
        {isUpdate && (
          <Grid.Col span={{ base: 12, md: 4 }}>
            <TextInput
              label="รหัสของใบอนุญาตประกอบวิชาชีพ"
              value={getValues().id ?? ''}
              disabled
            />{' '}
          </Grid.Col>
        )}
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Select
            label="ชื่อพนักงาน"
            placeholder="ชื่อพนักงาน"
            data={dropdowns.employees}
            key={key('employeeId')}
            {...getInputProps('employeeId')}
            withAsterisk
            clearable
            searchable
            nothingFoundMessage="ไม่พบข้อมูล"
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="ชื่อใบอนุญาต"
            placeholder="ชื่อใบอนุญาต"
            key={key('name')}
            {...getInputProps('name')}
            withAsterisk
          />{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="หน่วยงาน"
            placeholder="หน่วยงาน"
            key={key('agency')}
            {...getInputProps('agency')}
            withAsterisk
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="เลขที่ใบอนุญาต"
            placeholder="เลขที่ใบอนุญาต"
            key={key('numberLicense')}
            {...getInputProps('numberLicense')}
            withAsterisk
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <DatePickerInput
            leftSection={
              <IconCalendar
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            }
            clearable
            leftSectionPointerEvents="none"
            label="วันที่มีผลบังคับใช้"
            placeholder="วันที่มีผลบังคับใช้"
            valueFormat="DD/MM/BBBB"
            locale="th"
            yearsListFormat="BBBB"
            decadeLabelFormat="BBBB"
            monthLabelFormat="MMMM BBBB"
            yearLabelFormat="BBBB"
            dropdownType="modal"
            modalProps={{
              zIndex: 1000,
              centered: true,
            }}
            key={key('effectiveDate')}
            {...getInputProps('effectiveDate')}
            withAsterisk
          />{' '}
        </Grid.Col>
      </Grid>{' '}
    </Container>
  );
};
