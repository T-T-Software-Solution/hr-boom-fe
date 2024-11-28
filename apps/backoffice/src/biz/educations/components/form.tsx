'use client';
import { useEducationFormContext } from '../context';
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
interface EducationFormProps {
  isUpdate?: boolean;
  dropdowns: {
    employees: ComboboxData;
    educationLevels: ComboboxData;
  };
}

export const EducationForm: React.FC<EducationFormProps> = ({
  isUpdate,
  dropdowns,
}) => {
  const { getInputProps, key, getValues } = useEducationFormContext();

  return (
    <Container p={rem(16)}>
      <Grid gutter="md">
        {isUpdate && (
          <Grid.Col span={{ base: 12, md: 4 }}>
            <TextInput
              label="รหัสของประวัติการศึกษา"
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
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Select
            label="ระดับการศึกษา"
            placeholder="ระดับการศึกษา"
            data={dropdowns.educationLevels}
            key={key('educationLevelId')}
            {...getInputProps('educationLevelId')}
            withAsterisk
            clearable
            searchable
            nothingFoundMessage="ไม่พบข้อมูล"
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="สถานศึกษาที่จบการศึกษา"
            placeholder="สถานศึกษาที่จบการศึกษา"
            key={key('institutionGraduated')}
            {...getInputProps('institutionGraduated')}
            withAsterisk
          />{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
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
            label="วันที่เริ่มการศึกษา"
            placeholder="วันที่เริ่มการศึกษา"
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
            key={key('dateStart')}
            {...getInputProps('dateStart')}
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
            label="วันที่จบการศึกษา"
            placeholder="วันที่จบการศึกษา"
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
            key={key('dateGraduation')}
            {...getInputProps('dateGraduation')}
            withAsterisk
          />{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="คณะที่จบการศึกษา"
            placeholder="คณะที่จบการศึกษา"
            key={key('faculty')}
            {...getInputProps('faculty')}
            withAsterisk
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="สาขาวิชาที่จบการศึกษา"
            placeholder="สาขาวิชาที่จบการศึกษา"
            key={key('major')}
            {...getInputProps('major')}
            withAsterisk
          />{' '}
        </Grid.Col>
      </Grid>{' '}
    </Container>
  );
};
