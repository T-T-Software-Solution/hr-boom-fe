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
import { useTaxConditionSearchFormContext } from '../context';
interface TaxConditionSearchFormProps {}

export const TaxConditionSearchForm: React.FC<
  TaxConditionSearchFormProps
> = ({}) => {
  const { getInputProps, key } = useTaxConditionSearchFormContext();

  return (
    <Grid justify="flex-start" align="center">
      <Grid.Col span={{ base: 12, md: 3 }}>
        <TextInput
          placeholder="ชื่อเงื่อนไขการหักภาษี"
          flex={1}
          key={key('name')}
          {...getInputProps('name')}
        />
      </Grid.Col>{' '}
    </Grid>
  );
};
