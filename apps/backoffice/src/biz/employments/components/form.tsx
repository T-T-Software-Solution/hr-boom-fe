'use client';
import {
  Checkbox,
  type ComboboxData,
  Container,
  Grid,
  Group,
  Input,
  NumberInput,
  Select,
  TextInput,
  rem
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import {
  IconCalendar
} from '@tabler/icons-react';
import 'dayjs/locale/th';
import { useEmploymentFormContext } from '../context';
interface EmploymentFormProps {
  isUpdate?: boolean;
  dropdowns: {
    employees: ComboboxData;
    orgStructures: ComboboxData;
    positionStructures: ComboboxData;
    employeeTypes: ComboboxData;
    socialSecurityTypes: ComboboxData;
    taxConditions: ComboboxData;
    taxBrackets: ComboboxData;
    paymentChannels: ComboboxData;
    banks: ComboboxData;
    bankAccountTypes: ComboboxData;
  };
}

export const EmploymentForm: React.FC<EmploymentFormProps> = ({
  isUpdate,
  dropdowns,
}) => {
  const { getInputProps, key, getValues } = useEmploymentFormContext();

  return (
    <Container p={rem(16)}>
      <Grid gutter="md">
        {isUpdate && (
          <Grid.Col span={{ base: 12, md: 4 }}>
            <TextInput
              label="รหัสของการจ้างงาน"
              value={getValues().id ?? ''}
              disabled
            />{' '}
          </Grid.Col>
        )}
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Select
            label="ชื่อพนักงาน"
            placeholder="ชื่อพนักงาน"
            data={dropdowns.employees}
            key={key('employeeId')}
            {...getInputProps('employeeId')}
            disabled
            nothingFoundMessage="ไม่พบข้อมูล"
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <DatePickerInput
            leftSection={
              <IconCalendar
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            }
            clearable
            leftSectionPointerEvents="none"
            label="วันที่เริ่มงาน"
            placeholder="วันที่เริ่มงาน"
            valueFormat="DD/MM/BBBB"
            locale="th"
            yearsListFormat="BBBB"
            decadeLabelFormat="BBBB"
            monthLabelFormat="MMMM BBBB"
            yearLabelFormat="BBBB"
            dropdownType="modal"
            modalProps={{
              zIndex: 1000,
              centered: true,
            }}
            key={key('employmentStartDate')}
            {...getInputProps('employmentStartDate')}
            withAsterisk
          />{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <NumberInput
            label="อายุงาน/ปี"
            placeholder="อายุงาน/ปี"
            thousandSeparator=","
            decimalScale={0}
            key={key('yearsOfWork')}
            {...getInputProps('yearsOfWork')}
            withAsterisk
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <NumberInput
            label="อายุงาน/เดือน"
            placeholder="อายุงาน/เดือน"
            thousandSeparator=","
            decimalScale={0}
            key={key('monthsOfWork')}
            {...getInputProps('monthsOfWork')}
            withAsterisk
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <NumberInput
            label="อายุงาน/วัน"
            placeholder="อายุงาน/วัน"
            thousandSeparator=","
            decimalScale={0}
            key={key('daysOfWork')}
            {...getInputProps('daysOfWork')}
            withAsterisk
          />{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Select
            label="แผนก"
            placeholder="แผนก"
            data={dropdowns.orgStructures}
            key={key('orgStructureId')}
            {...getInputProps('orgStructureId')}
            withAsterisk
            clearable
            searchable
            nothingFoundMessage="ไม่พบข้อมูล"
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Select
            label="ตำแหน่งงาน"
            placeholder="ตำแหน่งงาน"
            data={dropdowns.positionStructures}
            key={key('positionStructureId')}
            {...getInputProps('positionStructureId')}
            withAsterisk
            clearable
            searchable
            nothingFoundMessage="ไม่พบข้อมูล"
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Select
            label="ประเภทพนักงาน"
            placeholder="ประเภทพนักงาน"
            data={dropdowns.employeeTypes}
            key={key('employeeTypeId')}
            {...getInputProps('employeeTypeId')}
            withAsterisk
            clearable
            searchable
            nothingFoundMessage="ไม่พบข้อมูล"
          />{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Select
            label="สิทธิ์ประกันสังคม"
            placeholder="สิทธิ์ประกันสังคม"
            data={dropdowns.socialSecurityTypes}
            key={key('socialSecurityTypeId')}
            {...getInputProps('socialSecurityTypeId')}
            withAsterisk
            clearable
            searchable
            nothingFoundMessage="ไม่พบข้อมูล"
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <NumberInput
            label="เงินเดือน"
            placeholder="เงินเดือน"
            thousandSeparator=","
            decimalScale={2}
            key={key('salary')}
            {...getInputProps('salary')}
            withAsterisk
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <NumberInput
            label="จำนวนหักภาษีต่อเดือน"
            placeholder="จำนวนหักภาษีต่อเดือน"
            thousandSeparator=","
            decimalScale={2}
            key={key('withholdingTax')}
            {...getInputProps('withholdingTax')}
            withAsterisk
          />{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Input.Wrapper label="หักภาษี">
            <Group mt="xs">
              <Checkbox
                label="ใช่"
                key={key('isWithholdingTax')}
                {...getInputProps('isWithholdingTax', { type: 'checkbox' })}
              />
            </Group>
          </Input.Wrapper>{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Select
            label="เงื่อนไขการหักภาษี"
            placeholder="เงื่อนไขการหักภาษี"
            data={dropdowns.taxConditions}
            key={key('taxConditionId')}
            {...getInputProps('taxConditionId')}
            withAsterisk
            clearable
            searchable
            nothingFoundMessage="ไม่พบข้อมูล"
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Select
            label="ขั้นภาษี"
            placeholder="ขั้นภาษี"
            data={dropdowns.taxBrackets}
            key={key('taxBracketId')}
            {...getInputProps('taxBracketId')}
            withAsterisk
            clearable
            searchable
            nothingFoundMessage="ไม่พบข้อมูล"
          />{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <NumberInput
            label="เงินเดือนสุทธิ"
            placeholder="เงินเดือนสุทธิ"
            thousandSeparator=","
            decimalScale={2}
            key={key('netSalary')}
            {...getInputProps('netSalary')}
            withAsterisk
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Select
            label="ช่องทางการจ่ายเงินเดือน"
            placeholder="ช่องทางการจ่ายเงินเดือน"
            data={dropdowns.paymentChannels}
            key={key('paymentChannelId')}
            {...getInputProps('paymentChannelId')}
            withAsterisk
            clearable
            searchable
            nothingFoundMessage="ไม่พบข้อมูล"
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Select
            label="ชื่อธนาคาร"
            placeholder="ชื่อธนาคาร"
            data={dropdowns.banks}
            key={key('bankId')}
            {...getInputProps('bankId')}
            withAsterisk
            clearable
            searchable
            nothingFoundMessage="ไม่พบข้อมูล"
          />{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="สาขาธนาคาร"
            placeholder="สาขาธนาคาร"
            key={key('bankBranch')}
            {...getInputProps('bankBranch')}
            withAsterisk
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <NumberInput
            label="เลขที่บัญชี"
            placeholder="เลขที่บัญชี"
            thousandSeparator=","
            decimalScale={0}
            key={key('bankAccountNumber')}
            {...getInputProps('bankAccountNumber')}
            withAsterisk
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Select
            label="ประเภทบัญชี"
            placeholder="ประเภทบัญชี"
            data={dropdowns.bankAccountTypes}
            key={key('bankAccountTypeId')}
            {...getInputProps('bankAccountTypeId')}
            withAsterisk
            clearable
            searchable
            nothingFoundMessage="ไม่พบข้อมูล"
          />{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 12 }}>
          <TextInput
            label="หมายเหตุ"
            placeholder="หมายเหตุ"
            key={key('note')}
            {...getInputProps('note')}
            withAsterisk
          />{' '}
        </Grid.Col>
      </Grid>{' '}
    </Container>
  );
};
