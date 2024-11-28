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
import { useProfessionalLicenseSearchFormContext } from '../context';
interface ProfessionalLicenseSearchFormProps {
  dropdowns: {
    employees: ComboboxData;
  };
}

export const ProfessionalLicenseSearchForm: React.FC<
  ProfessionalLicenseSearchFormProps
> = ({ dropdowns }) => {
  const { getInputProps, key } = useProfessionalLicenseSearchFormContext();

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
      </Grid.Col>{' '}
    </Grid>
  );
};
