'use client';
import {
  Button,
  Checkbox,
  type ComboboxData,
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
import { IconCalendar } from '@tabler/icons-react';
import { useEmploymentSearchFormContext } from '../context';
interface EmploymentSearchFormProps {
  dropdowns: {
    employees: ComboboxData;
    orgStructures: ComboboxData;
    positionStructures: ComboboxData;
    employeeTypes: ComboboxData;
    socialSecurityTypes: ComboboxData;
  };
}

export const EmploymentSearchForm: React.FC<EmploymentSearchFormProps> = ({
  dropdowns,
}) => {
  const { getInputProps, key } = useEmploymentSearchFormContext();

  return (
    <Grid justify="flex-start" align="center">
      <Grid.Col span={{ base: 12, md: 3 }}>
        <Select
          placeholder="ชื่อพนักงาน"
          nothingFoundMessage="ไม่พบข้อมูล"
          data={dropdowns.employees}
          allowDeselect
          searchable
          key={key('employeeId')}
          {...getInputProps('employeeId')}
          clearable
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 3 }}>
        <DatePickerInput
          leftSection={
            <IconCalendar
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          }
          clearable
          leftSectionPointerEvents="none"
          placeholder="วันที่เริ่มงาน"
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
          key={key('employmentStartDate')}
          {...getInputProps('employmentStartDate')}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 3 }}>
        <Select
          placeholder="แผนก"
          nothingFoundMessage="ไม่พบข้อมูล"
          data={dropdowns.orgStructures}
          allowDeselect
          searchable
          key={key('orgStructureId')}
          {...getInputProps('orgStructureId')}
          clearable
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 3 }}>
        <Select
          placeholder="ตำแหน่งงาน"
          nothingFoundMessage="ไม่พบข้อมูล"
          data={dropdowns.positionStructures}
          allowDeselect
          searchable
          key={key('positionStructureId')}
          {...getInputProps('positionStructureId')}
          clearable
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 3 }}>
        <Select
          placeholder="ประเภทพนักงาน"
          nothingFoundMessage="ไม่พบข้อมูล"
          data={dropdowns.employeeTypes}
          allowDeselect
          searchable
          key={key('employeeTypeId')}
          {...getInputProps('employeeTypeId')}
          clearable
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 3 }}>
        <Select
          placeholder="สิทธิ์ประกันสังคม"
          nothingFoundMessage="ไม่พบข้อมูล"
          data={dropdowns.socialSecurityTypes}
          allowDeselect
          searchable
          key={key('socialSecurityTypeId')}
          {...getInputProps('socialSecurityTypeId')}
          clearable
        />
      </Grid.Col>{' '}
    </Grid>
  );
};
