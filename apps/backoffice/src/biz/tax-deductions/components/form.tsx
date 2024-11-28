'use client';
import { useTaxDeductionFormContext } from '../context';
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
interface TaxDeductionFormProps {
  isUpdate?: boolean;
}

export const TaxDeductionForm: React.FC<TaxDeductionFormProps> = ({
  isUpdate,
}) => {
  const { getInputProps, key, getValues } = useTaxDeductionFormContext();

  return (
    <Container p={rem(16)}>
      <Grid gutter="md">
        {isUpdate && (
          <Grid.Col span={{ base: 12, md: 4 }}>
            <TextInput
              label="รหัสลดหย่อนภาษี"
              value={getValues().id ?? ''}
              disabled
            />{' '}
          </Grid.Col>
        )}
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="ชื่อรายการลดหย่อนภาษี"
            placeholder="ชื่อรายการลดหย่อนภาษี"
            key={key('name')}
            {...getInputProps('name')}
            withAsterisk
          />{' '}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <NumberInput
            label="มูลค่าการลดหย่อนภาษี"
            placeholder="มูลค่าการลดหย่อนภาษี"
            thousandSeparator=","
            decimalScale={0}
            key={key('value')}
            {...getInputProps('value')}
            withAsterisk
          />{' '}
        </Grid.Col>
      </Grid>{' '}
    </Container>
  );
};
