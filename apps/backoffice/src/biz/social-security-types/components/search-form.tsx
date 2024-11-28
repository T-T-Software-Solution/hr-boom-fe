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
import { useSocialSecurityTypeSearchFormContext } from '../context';
interface SocialSecurityTypeSearchFormProps {}

export const SocialSecurityTypeSearchForm: React.FC<
  SocialSecurityTypeSearchFormProps
> = ({}) => {
  const { getInputProps, key } = useSocialSecurityTypeSearchFormContext();

  return (
    <Grid justify="flex-start" align="center">
      <Grid.Col span={{ base: 12, md: 3 }}>
        <TextInput
          placeholder="ชื่อสิทธิ์ประกันสังคม"
          flex={1}
          key={key('name')}
          {...getInputProps('name')}
        />
      </Grid.Col>{' '}
    </Grid>
  );
};
