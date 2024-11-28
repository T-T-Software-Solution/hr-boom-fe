'use client';
import { useProvinceFormContext } from '../context';
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
interface ProvinceFormProps {
  isUpdate?: boolean;
}

export const ProvinceForm: React.FC<ProvinceFormProps> = ({ isUpdate }) => {
  const { getInputProps, key, getValues } = useProvinceFormContext();

  return (
    <Container p={rem(16)}>
      <Grid gutter="md">
        {isUpdate && (
          <Grid.Col span={{ base: 12, md: 4 }}>
            <TextInput
              label="รหัสจังหวัด"
              value={getValues().id ?? ''}
              disabled
            />{' '}
          </Grid.Col>
        )}
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="ชื่อจังหวัด"
            placeholder="ชื่อจังหวัด"
            key={key('name')}
            {...getInputProps('name')}
            withAsterisk
          />{' '}
        </Grid.Col>
      </Grid>{' '}
    </Container>
  );
};
