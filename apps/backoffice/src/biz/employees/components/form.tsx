'use client';
import { useEmployeeFormContext } from '../context';
import {
  Button,
  Checkbox,
  type ComboboxData,
  Container,
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
import {
  IconCalendar,
  IconEye,
  IconFileTypeDoc,
  IconPhotoScan,
} from '@tabler/icons-react';
import { FileDisplay } from '@tt-ss-hr/shared-ui';
import {
  checkFileUrl,
  placeholderImage,
  viewFileInNewTabOrDownload,
} from '@tt-ss-hr/shared-utils';
import 'dayjs/locale/th';
interface EmployeeFormProps {
  isUpdate?: boolean;
  dropdowns: {
    genders: ComboboxData;
    prefixes: ComboboxData;
    prefixEns: ComboboxData;
    orgStructures: ComboboxData;
    provinces: ComboboxData;
  };
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  isUpdate,
  dropdowns,
}) => {
  const { getInputProps, key, getValues } = useEmployeeFormContext();
  const { imagePath, previewImagePath } = getValues();

  return (
    <Container p={rem(16)}>
      <Grid gutter="md">
        {isUpdate && (
          <Grid.Col span={{ base: 12, md: 4 }}>
            <TextInput
              label="รหัสของข้อมูลบุคลากร"
              value={getValues().id ?? ''}
              disabled
            />{' '}
          </Grid.Col>
        )}
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <>
            <FileInput
              leftSection={
                <IconPhotoScan
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
              }
              label="รูป"
              placeholder="รูป"
              clearable
              accept="image/png,image/jpeg,image/webp"
              description="รองรับไฟล์ในรูปแบบ PNG, JPEG หรือ WEBP เท่านั้น"
              valueComponent={FileDisplay}
              key={key('imagePath')}
              {...getInputProps('imagePath')}
            />
            <Group mt="md">
              {imagePath && (
                <Paper
                  shadow="xs"
                  p="0"
                  radius="md"
                  className="overflow-hidden"
                >
                  <Image
                    src={
                      imagePath instanceof File
                        ? URL.createObjectURL(imagePath)
                        : previewImagePath
                    }
                    alt={imagePath instanceof File ? imagePath.name : imagePath}
                    maw="100px"
                    mah="100px"
                    onError={(e) => {
                      e.currentTarget.src = placeholderImage;
                    }}
                  />
                </Paper>
              )}
            </Group>
          </>{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="รหัสพนักงาน"
            placeholder="รหัสพนักงาน"
            key={key('employeeId')}
            {...getInputProps('employeeId')}
            withAsterisk
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Select
            label="เพศ"
            placeholder="เพศ"
            data={dropdowns.genders}
            key={key('genderId')}
            {...getInputProps('genderId')}
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
            label="คำนำหน้าชื่อ"
            placeholder="คำนำหน้าชื่อ"
            data={dropdowns.prefixes}
            key={key('prefixId')}
            {...getInputProps('prefixId')}
            withAsterisk
            clearable
            searchable
            nothingFoundMessage="ไม่พบข้อมูล"
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="ชื่อ"
            placeholder="ชื่อ"
            key={key('firstName')}
            {...getInputProps('firstName')}
            withAsterisk
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="นามสกุล"
            placeholder="นามสกุล"
            key={key('lastName')}
            {...getInputProps('lastName')}
            withAsterisk
          />{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="ชื่อเล่น"
            placeholder="ชื่อเล่น"
            key={key('nickname')}
            {...getInputProps('nickname')}
            withAsterisk
          />{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Select
            label="คำนำหน้าชื่อ(EN)"
            placeholder="คำนำหน้าชื่อ(EN)"
            data={dropdowns.prefixEns}
            key={key('prefixEnId')}
            {...getInputProps('prefixEnId')}
            withAsterisk
            clearable
            searchable
            nothingFoundMessage="ไม่พบข้อมูล"
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="ชื่อ(EN)"
            placeholder="ชื่อ(EN)"
            key={key('firstNameEn')}
            {...getInputProps('firstNameEn')}
            withAsterisk
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="นามสกุล(EN)"
            placeholder="นามสกุล(EN)"
            key={key('lastNameEn')}
            {...getInputProps('lastNameEn')}
            withAsterisk
          />{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="ชื่อเล่น(EN)"
            placeholder="ชื่อเล่น(EN)"
            key={key('nicknameEn')}
            {...getInputProps('nicknameEn')}
            withAsterisk
          />{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Select
            label="ชื่อหน่วยงาน"
            placeholder="ชื่อหน่วยงาน"
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
          <DatePickerInput
            leftSection={
              <IconCalendar
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            }
            clearable
            leftSectionPointerEvents="none"
            label="วันเดือนปีเกิด"
            placeholder="วันเดือนปีเกิด"
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
            key={key('dateOfBirth')}
            {...getInputProps('dateOfBirth')}
            withAsterisk
          />{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
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
            label="วันบรรจุ"
            placeholder="วันบรรจุ"
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
            key={key('placementDate')}
            {...getInputProps('placementDate')}
            withAsterisk
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
            label="วันครบเกษียณอายุ"
            placeholder="วันครบเกษียณอายุ"
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
            key={key('retirementDate')}
            {...getInputProps('retirementDate')}
            withAsterisk
          />{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="เลขบัตรประชาชน"
            placeholder="เลขบัตรประชาชน"
            key={key('nationalId')}
            {...getInputProps('nationalId')}
            withAsterisk
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="เลขหนังสือเดินทาง"
            placeholder="เลขหนังสือเดินทาง"
            key={key('passportNumber')}
            {...getInputProps('passportNumber')}
            withAsterisk
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="เบอร์โทรศัพท์"
            placeholder="เบอร์โทรศัพท์"
            key={key('telephone')}
            {...getInputProps('telephone')}
            withAsterisk
          />{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="อีเมล"
            placeholder="อีเมล"
            key={key('email')}
            {...getInputProps('email')}
            withAsterisk
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="ไลน์ไอดี"
            placeholder="ไลน์ไอดี"
            key={key('lineId')}
            {...getInputProps('lineId')}
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="ชื่อ-นามสกุล บิดา"
            placeholder="ชื่อ-นามสกุล บิดา"
            key={key('fatherFullName')}
            {...getInputProps('fatherFullName')}
          />{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="ชื่อ-นามสกุล มารดา"
            placeholder="ชื่อ-นามสกุล มารดา"
            key={key('motherFullName')}
            {...getInputProps('motherFullName')}
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="นามสกุลเดิม มารดา"
            placeholder="นามสกุลเดิม มารดา"
            key={key('motherMaidenName')}
            {...getInputProps('motherMaidenName')}
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Input.Wrapper label="แต่งงานแล้ว">
            <Group mt="xs">
              <Checkbox
                label="ใช่"
                key={key('maritalStatus')}
                {...getInputProps('maritalStatus', { type: 'checkbox' })}
              />
            </Group>
          </Input.Wrapper>{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="ชื่อ-นามสกุล คู่สมรส"
            placeholder="ชื่อ-นามสกุล คู่สมรส"
            key={key('spouseFullName')}
            {...getInputProps('spouseFullName')}
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="นามสกุลเดิม คู่สมรส"
            placeholder="นามสกุลเดิม คู่สมรส"
            key={key('spouseMaidenName')}
            {...getInputProps('spouseMaidenName')}
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="ชื่อผู้ติดต่อฉุกเฉิน"
            placeholder="ชื่อผู้ติดต่อฉุกเฉิน"
            key={key('contactPersonName')}
            {...getInputProps('contactPersonName')}
            withAsterisk
          />{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="เบอร์ผู้ติดต่อฉุกเฉิน"
            placeholder="เบอร์ผู้ติดต่อฉุกเฉิน"
            key={key('contactPersonTel')}
            {...getInputProps('contactPersonTel')}
            withAsterisk
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="เลขที่บ้าน(ปัจจุบัน)"
            placeholder="เลขที่บ้าน(ปัจจุบัน)"
            key={key('currentHouseNumber')}
            {...getInputProps('currentHouseNumber')}
            withAsterisk
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="หมู่(ปัจจุบัน)"
            placeholder="หมู่(ปัจจุบัน)"
            key={key('currentMoo')}
            {...getInputProps('currentMoo')}
            withAsterisk
          />{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="ซอย(ปัจจุบัน)"
            placeholder="ซอย(ปัจจุบัน)"
            key={key('currentSoi')}
            {...getInputProps('currentSoi')}
            withAsterisk
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="แยก(ปัจจุบัน)"
            placeholder="แยก(ปัจจุบัน)"
            key={key('currectYak')}
            {...getInputProps('currectYak')}
            withAsterisk
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="ถนน(ปัจจุบัน)"
            placeholder="ถนน(ปัจจุบัน)"
            key={key('currentRoad')}
            {...getInputProps('currentRoad')}
            withAsterisk
          />{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="ตำบล(ปัจจุบัน)"
            placeholder="ตำบล(ปัจจุบัน)"
            key={key('currentSubdistrict')}
            {...getInputProps('currentSubdistrict')}
            withAsterisk
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="อำเภอ(ปัจจุบัน)"
            placeholder="อำเภอ(ปัจจุบัน)"
            key={key('currentDistrict')}
            {...getInputProps('currentDistrict')}
            withAsterisk
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Select
            label="จังหวัด(ปัจจุบัน)"
            placeholder="จังหวัด(ปัจจุบัน)"
            data={dropdowns.provinces}
            key={key('currentProvinceId')}
            {...getInputProps('currentProvinceId')}
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
            label="รหัสไปรษณีย์(ปัจจุบัน)"
            placeholder="รหัสไปรษณีย์(ปัจจุบัน)"
            thousandSeparator=","
            decimalScale={0}
            key={key('currentPostcode')}
            {...getInputProps('currentPostcode')}
            withAsterisk
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="เลขที่บ้าน(ตามทะเบียนบ้าน)"
            placeholder="เลขที่บ้าน(ตามทะเบียนบ้าน)"
            key={key('permanentHouseNumber')}
            {...getInputProps('permanentHouseNumber')}
            withAsterisk
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="หมู่(ตามทะเบียนบ้าน)"
            placeholder="หมู่(ตามทะเบียนบ้าน)"
            key={key('permanentMoo')}
            {...getInputProps('permanentMoo')}
            withAsterisk
          />{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="ซอย(ตามทะเบียนบ้าน)"
            placeholder="ซอย(ตามทะเบียนบ้าน)"
            key={key('permanentSoi')}
            {...getInputProps('permanentSoi')}
            withAsterisk
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="แยก(ตามทะเบียนบ้าน)"
            placeholder="แยก(ตามทะเบียนบ้าน)"
            key={key('permanentYak')}
            {...getInputProps('permanentYak')}
            withAsterisk
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="ถนน(ตามทะเบียนบ้าน)"
            placeholder="ถนน(ตามทะเบียนบ้าน)"
            key={key('permanentRoad')}
            {...getInputProps('permanentRoad')}
            withAsterisk
          />{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="ตำบล(ตามทะเบียนบ้าน)"
            placeholder="ตำบล(ตามทะเบียนบ้าน)"
            key={key('permanentSubdistrict')}
            {...getInputProps('permanentSubdistrict')}
            withAsterisk
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="อำเภอ(ตามทะเบียนบ้าน)"
            placeholder="อำเภอ(ตามทะเบียนบ้าน)"
            key={key('permanentDistrict')}
            {...getInputProps('permanentDistrict')}
            withAsterisk
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Select
            label="จังหวัด(ตามทะเบียนบ้าน)"
            placeholder="จังหวัด(ตามทะเบียนบ้าน)"
            data={dropdowns.provinces}
            key={key('permanentProvinceId')}
            {...getInputProps('permanentProvinceId')}
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
            label="รหัสไปรษณีย์(ตามทะเบียนบ้าน)"
            placeholder="รหัสไปรษณีย์(ตามทะเบียนบ้าน)"
            thousandSeparator=","
            decimalScale={0}
            key={key('permanentPostcode')}
            {...getInputProps('permanentPostcode')}
            withAsterisk
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
          />{' '}
        </Grid.Col>
      </Grid>{' '}
    </Container>
  );
};
