'use client';
import { useCriminalHistoryFormContext } from '../context';
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
interface CriminalHistoryFormProps {
  isUpdate?: boolean;
  dropdowns: {
    employees: ComboboxData;
  };
}

export const CriminalHistoryForm: React.FC<CriminalHistoryFormProps> = ({
  isUpdate,
  dropdowns,
}) => {
  const { getInputProps, key, getValues } = useCriminalHistoryFormContext();

  return (
    <Container p={rem(16)}>
      <Grid gutter="md">
        {isUpdate && (
          <Grid.Col span={{ base: 12, md: 4 }}>
            <TextInput
              label="รหัสของประวัติโทษทางวินัยและการนิรโทษกรรม"
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
          <DatePickerInput
            leftSection={
              <IconCalendar
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            }
            clearable
            leftSectionPointerEvents="none"
            label="วันที่ทำผิด"
            placeholder="วันที่ทำผิด"
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
            key={key('dateOfPunishment')}
            {...getInputProps('dateOfPunishment')}
            withAsterisk
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="รายการที่ถูกลงโทษ"
            placeholder="รายการที่ถูกลงโทษ"
            key={key('listPunishment')}
            {...getInputProps('listPunishment')}
            withAsterisk
          />{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 12 }}>
          <TextInput
            label="เอกสารอ้างอิง"
            placeholder="เอกสารอ้างอิง"
            key={key('note')}
            {...getInputProps('note')}
            withAsterisk
          />{' '}
        </Grid.Col>
      </Grid>{' '}
    </Container>
  );
};
