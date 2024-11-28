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
import { usePositionStructureSearchFormContext } from '../context';
interface PositionStructureSearchFormProps {}

export const PositionStructureSearchForm: React.FC<
  PositionStructureSearchFormProps
> = ({}) => {
  const { getInputProps, key } = usePositionStructureSearchFormContext();

  return (
    <Grid justify="flex-start" align="center">
      <Grid.Col span={{ base: 12, md: 3 }}>
        <TextInput
          placeholder="ชื่อตำแหน่ง"
          flex={1}
          key={key('name')}
          {...getInputProps('name')}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 3 }}>
        <TextInput
          placeholder="ระดับตำแหน่ง"
          flex={1}
          key={key('level')}
          {...getInputProps('level')}
        />
      </Grid.Col>{' '}
    </Grid>
  );
};
