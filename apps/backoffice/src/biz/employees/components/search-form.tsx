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
import { useEmployeeSearchFormContext } from '../context';
interface EmployeeSearchFormProps {
  dropdowns: {
    genders: ComboboxData;
  };
}

export const EmployeeSearchForm: React.FC<EmployeeSearchFormProps> = ({
  dropdowns,
}) => {
  const { getInputProps, key } = useEmployeeSearchFormContext();

  return (
    <Grid justify="flex-start" align="center">
      <Grid.Col span={{ base: 12, md: 3 }}>
        <TextInput
          placeholder="รหัสพนักงาน"
          flex={1}
          key={key('employeeId')}
          {...getInputProps('employeeId')}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 3 }}>
        <Select
          placeholder="เพศ"
          nothingFoundMessage="ไม่พบข้อมูล"
          data={dropdowns.genders}
          allowDeselect
          searchable
          key={key('genderId')}
          {...getInputProps('genderId')}
          clearable
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 3 }}>
        <TextInput
          placeholder="ชื่อ"
          flex={1}
          key={key('firstName')}
          {...getInputProps('firstName')}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 3 }}>
        <TextInput
          placeholder="นามสกุล"
          flex={1}
          key={key('lastName')}
          {...getInputProps('lastName')}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 3 }}>
        <TextInput
          placeholder="ชื่อเล่น"
          flex={1}
          key={key('nickname')}
          {...getInputProps('nickname')}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 3 }}>
        <TextInput
          placeholder="ชื่อ(EN)"
          flex={1}
          key={key('firstNameEn')}
          {...getInputProps('firstNameEn')}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 3 }}>
        <TextInput
          placeholder="นามสกุล(EN)"
          flex={1}
          key={key('lastNameEn')}
          {...getInputProps('lastNameEn')}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 3 }}>
        <TextInput
          placeholder="ชื่อเล่น(EN)"
          flex={1}
          key={key('nicknameEn')}
          {...getInputProps('nicknameEn')}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 3 }}>
        <TextInput
          placeholder="อีเมล"
          flex={1}
          key={key('email')}
          {...getInputProps('email')}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 3 }}>
        <TextInput
          placeholder="ไลน์ไอดี"
          flex={1}
          key={key('lineId')}
          {...getInputProps('lineId')}
        />
      </Grid.Col>{' '}
    </Grid>
  );
};
