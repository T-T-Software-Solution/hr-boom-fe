'use client';
import {
  type ComboboxData,
  Container,
  Grid,
  NumberInput,
  Select,
  TextInput,
  rem
} from '@mantine/core';
import 'dayjs/locale/th';
import { usePositionStructureFormContext } from '../context';
interface PositionStructureFormProps {
  isUpdate?: boolean;
  dropdowns: {
    positionStructureTypes: ComboboxData;
    positionStructures: ComboboxData;
  };
  parentId?: string;
}

export const PositionStructureForm: React.FC<PositionStructureFormProps> = ({
  isUpdate,
  dropdowns,
  parentId
}) => {
  const { getInputProps, key, getValues } = usePositionStructureFormContext();

  return (
    <Container p={rem(16)}>
      <Grid gutter="md">
        {isUpdate && (
          <Grid.Col span={{ base: 12, md: 4 }}>
            <TextInput
              label="รหัสของตำแหน่ง"
              value={getValues().id ?? ''}
              disabled
            />{' '}
          </Grid.Col>
        )}
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Select
            label="ชนิดของตำแหน่ง"
            placeholder="ชนิดของตำแหน่ง"
            data={dropdowns.positionStructureTypes}
            key={key('positionStructureTypeId')}
            {...getInputProps('positionStructureTypeId')}
            withAsterisk
            clearable
            searchable
            nothingFoundMessage="ไม่พบข้อมูล"
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="รหัสของตำแหน่ง"
            placeholder="รหัสของตำแหน่ง"
            key={key('code')}
            {...getInputProps('code')}
            withAsterisk
          />{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="ชื่อตำแหน่ง"
            placeholder="ชื่อตำแหน่ง"
            key={key('name')}
            {...getInputProps('name')}
            withAsterisk
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="ชื่อตำแหน่งงาน (EN)"
            placeholder="ชื่อตำแหน่งงาน (EN)"
            key={key('nameEn')}
            {...getInputProps('nameEn')}
          />{' '}
        </Grid.Col>
      </Grid>
      {isUpdate && (
        <>
          <Grid gutter="md">
            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput
                label="ระดับตำแหน่ง"
                placeholder="ระดับตำแหน่ง"
                key={key('level')}
                {...getInputProps('level')}
              />{' '}
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <NumberInput
                label="เงินเดือนประจำตำแหน่ง"
                placeholder="เงินเดือนประจำตำแหน่ง"
                thousandSeparator=","
                decimalScale={2}
                key={key('salary')}
                {...getInputProps('salary')}
              />{' '}
            </Grid.Col>
          </Grid>
          <Grid gutter="md">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                label="คำอธิบายโครงสร้างตำแหน่ง"
                placeholder="คำอธิบายโครงสร้างตำแหน่ง"
                key={key('description')}
                {...getInputProps('description')}
              />{' '}
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                label="คำอธิบายของตำแหน่งงาน (EN)"
                placeholder="คำอธิบายของตำแหน่งงาน (EN)"
                key={key('descriptionEn')}
                {...getInputProps('descriptionEn')}
              />{' '}
            </Grid.Col>
          </Grid>
        </>
      )}
      {parentId && (
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Select
              label="รหัสหัวหน้าโดยตำแหน่ง"
              placeholder="รหัสหัวหน้าโดยตำแหน่ง"
              data={dropdowns.positionStructures}
              key={key('parentId')}
              {...getInputProps('parentId')}
              disabled
              nothingFoundMessage="ไม่พบข้อมูล"
            />{' '}
          </Grid.Col>
        </Grid>
      )}
    </Container>
  );
};
