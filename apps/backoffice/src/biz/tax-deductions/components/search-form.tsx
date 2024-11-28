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
import { useTaxDeductionSearchFormContext } from '../context';
interface TaxDeductionSearchFormProps {}

export const TaxDeductionSearchForm: React.FC<
  TaxDeductionSearchFormProps
> = ({}) => {
  const { getInputProps, key } = useTaxDeductionSearchFormContext();

  return (
    <Grid justify="flex-start" align="center">
      <Grid.Col span={{ base: 12, md: 3 }}>
        <TextInput
          placeholder="ชื่อรายการลดหย่อนภาษี"
          flex={1}
          key={key('name')}
          {...getInputProps('name')}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 3 }}>
        <NumberInput
          placeholder="มูลค่าการลดหย่อนภาษี"
          thousandSeparator=","
          decimalScale={0}
          key={key('value')}
          {...getInputProps('value')}
        />
      </Grid.Col>{' '}
    </Grid>
  );
};
