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
import { useEmployeeTypeSearchFormContext } from '../context';
interface EmployeeTypeSearchFormProps {}

export const EmployeeTypeSearchForm: React.FC<
  EmployeeTypeSearchFormProps
> = ({}) => {
  const { getInputProps, key } = useEmployeeTypeSearchFormContext();

  return (
    <Grid justify="flex-start" align="center">
      <Grid.Col span={{ base: 12, md: 3 }}>
        <TextInput
          placeholder="ชื่อประเภทพนักงาน"
          flex={1}
          key={key('name')}
          {...getInputProps('name')}
        />
      </Grid.Col>{' '}
    </Grid>
  );
};
