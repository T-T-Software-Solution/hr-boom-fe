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
import { useEducationSearchFormContext } from '../context';
interface EducationSearchFormProps {
  dropdowns: {
    employees: ComboboxData;
    educationLevels: ComboboxData;
  };
}

export const EducationSearchForm: React.FC<EducationSearchFormProps> = ({
  dropdowns,
}) => {
  const { getInputProps, key } = useEducationSearchFormContext();

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
        <Select
          placeholder="ระดับการศึกษา"
          nothingFoundMessage="ไม่พบข้อมูล"
          data={dropdowns.educationLevels}
          allowDeselect
          searchable
          key={key('educationLevelId')}
          {...getInputProps('educationLevelId')}
          clearable
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 3 }}>
        <TextInput
          placeholder="สถานศึกษาที่จบการศึกษา"
          flex={1}
          key={key('institutionGraduated')}
          {...getInputProps('institutionGraduated')}
        />
      </Grid.Col>{' '}
    </Grid>
  );
};
