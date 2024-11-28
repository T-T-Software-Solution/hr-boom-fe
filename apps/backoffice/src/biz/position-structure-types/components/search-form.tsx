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
import { usePositionStructureTypeSearchFormContext } from '../context';
interface PositionStructureTypeSearchFormProps {}

export const PositionStructureTypeSearchForm: React.FC<
  PositionStructureTypeSearchFormProps
> = ({}) => {
  const { getInputProps, key } = usePositionStructureTypeSearchFormContext();

  return (
    <Grid justify="flex-start" align="center">
      <Grid.Col span={{ base: 12, md: 3 }}>
        <TextInput
          placeholder="ชื่อชนิดของตำแหน่ง"
          flex={1}
          key={key('name')}
          {...getInputProps('name')}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 3 }}>
        <TextInput
          placeholder="โค้ดชนิดของตำแหน่ง"
          flex={1}
          key={key('code')}
          {...getInputProps('code')}
        />
      </Grid.Col>{' '}
    </Grid>
  );
};
