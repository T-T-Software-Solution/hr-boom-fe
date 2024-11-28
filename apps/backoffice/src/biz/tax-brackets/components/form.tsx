'use client';
import { useTaxBracketFormContext } from '../context';
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
interface TaxBracketFormProps {
  isUpdate?: boolean;
}

export const TaxBracketForm: React.FC<TaxBracketFormProps> = ({ isUpdate }) => {
  const { getInputProps, key, getValues } = useTaxBracketFormContext();

  return (
    <Container p={rem(16)}>
      <Grid gutter="md">
        {isUpdate && (
          <Grid.Col span={{ base: 12, md: 4 }}>
            <TextInput
              label="รหัสระดับภาษี"
              value={getValues().id ?? ''}
              disabled
            />{' '}
          </Grid.Col>
        )}
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="อัตราภาษี"
            placeholder="อัตราภาษี"
            key={key('name')}
            {...getInputProps('name')}
            withAsterisk
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <NumberInput
            label="รายได้สูงสุดที่อยู่ในระดับภาษีนั้น"
            placeholder="รายได้สูงสุดที่อยู่ในระดับภาษีนั้น"
            thousandSeparator=","
            decimalScale={0}
            key={key('maxIncome')}
            {...getInputProps('maxIncome')}
            withAsterisk
          />{' '}
        </Grid.Col>
      </Grid>{' '}
    </Container>
  );
};
