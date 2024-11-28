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
import { useBankAccountTypeSearchFormContext } from '../context';
interface BankAccountTypeSearchFormProps {}

export const BankAccountTypeSearchForm: React.FC<
  BankAccountTypeSearchFormProps
> = ({}) => {
  const { getInputProps, key } = useBankAccountTypeSearchFormContext();

  return (
    <Grid justify="flex-start" align="center">
      <Grid.Col span={{ base: 12, md: 3 }}>
        <TextInput
          placeholder="ชื่อประเภทบัญชีธนาคาร"
          flex={1}
          key={key('name')}
          {...getInputProps('name')}
        />
      </Grid.Col>{' '}
    </Grid>
  );
};
