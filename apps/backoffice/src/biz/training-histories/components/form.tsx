'use client';
import { useTrainingHistoryFormContext } from '../context';
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
interface TrainingHistoryFormProps {
  isUpdate?: boolean;
  dropdowns: {
    employees: ComboboxData;
  };
}

export const TrainingHistoryForm: React.FC<TrainingHistoryFormProps> = ({
  isUpdate,
  dropdowns,
}) => {
  const { getInputProps, key, getValues } = useTrainingHistoryFormContext();

  return (
    <Container p={rem(16)}>
      <Grid gutter="md">
        {isUpdate && (
          <Grid.Col span={{ base: 12, md: 4 }}>
            <TextInput
              label="รหัสของประวัติการฝึกอบรม"
              value={getValues().id ?? ''}
              disabled
            />{' '}
          </Grid.Col>
        )}
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 6 }}>
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

        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            label="หลักสูตรอบรม"
            placeholder="หลักสูตรอบรม"
            key={key('name')}
            {...getInputProps('name')}
            withAsterisk
          />{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <DatePickerInput
            leftSection={
              <IconCalendar
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            }
            clearable
            leftSectionPointerEvents="none"
            label="วันที่เริ่มต้น"
            placeholder="วันที่เริ่มต้น"
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
            key={key('startDate')}
            {...getInputProps('startDate')}
            withAsterisk
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <DatePickerInput
            leftSection={
              <IconCalendar
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            }
            clearable
            leftSectionPointerEvents="none"
            label="วันที่สิ้นสุด"
            placeholder="วันที่สิ้นสุด"
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
            key={key('endDate')}
            {...getInputProps('endDate')}
            withAsterisk
          />{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 12 }}>
          <TextInput
            label="หน่วยงานที่จัดฝึกอบรม"
            placeholder="หน่วยงานที่จัดฝึกอบรม"
            key={key('trainingOrganization')}
            {...getInputProps('trainingOrganization')}
            withAsterisk
          />{' '}
        </Grid.Col>
      </Grid>{' '}
    </Container>
  );
};
