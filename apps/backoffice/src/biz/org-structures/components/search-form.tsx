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
import { useOrgStructureSearchFormContext } from '../context';
interface OrgStructureSearchFormProps {}

export const OrgStructureSearchForm: React.FC<
  OrgStructureSearchFormProps
> = ({}) => {
  const { getInputProps, key } = useOrgStructureSearchFormContext();

  return (
    <Grid justify="flex-start" align="center">
      <Grid.Col span={{ base: 12, md: 3 }}>
        <TextInput
          placeholder="รหัสขององค์กร"
          flex={1}
          key={key('code')}
          {...getInputProps('code')}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 3 }}>
        <TextInput
          placeholder="ชื่อ"
          flex={1}
          key={key('name')}
          {...getInputProps('name')}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 3 }}>
        <TextInput
          placeholder="ชื่อ(EN)"
          flex={1}
          key={key('nameEn')}
          {...getInputProps('nameEn')}
        />
      </Grid.Col>{' '}
    </Grid>
  );
};
