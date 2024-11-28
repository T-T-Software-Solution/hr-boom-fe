'use client';
import { useDocumentFileFormContext } from '../context';
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
interface DocumentFileFormProps {
  isUpdate?: boolean;
  dropdowns: {
    employees: ComboboxData;
  };
}

export const DocumentFileForm: React.FC<DocumentFileFormProps> = ({
  isUpdate,
  dropdowns,
}) => {
  const { getInputProps, key, getValues } = useDocumentFileFormContext();
  const { filePath, previewFilePath } = getValues();

  return (
    <Container p={rem(16)}>
      <Grid gutter="md">
        {isUpdate && (
          <Grid.Col span={{ base: 12, md: 4 }}>
            <TextInput
              label="รหัสของเอกสารอื่นๆ"
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
            withAsterisk
            clearable
            searchable
            nothingFoundMessage="ไม่พบข้อมูล"
          />{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Grid justify="flex-start" align="flex-end" gutter="sm">
            <Grid.Col span={{ base: 12, md: 8 }}>
              <FileInput
                leftSection={
                  <IconFileTypeDoc
                    style={{ width: rem(18), height: rem(18) }}
                    stroke={1.5}
                  />
                }
                label="ไฟล์เอกสาร"
                placeholder="ไฟล์เอกสาร"
                clearable
                accept="application/pdf, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, text/csv"
                description="รองรับไฟล์ในรูปแบบ PDF, Excel หรือ CSV เท่านั้น"
                valueComponent={FileDisplay}
                key={key('filePath')}
                {...getInputProps('filePath')}
                withAsterisk
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Button
                fullWidth
                leftSection={
                  <IconEye
                    style={{ width: rem(18), height: rem(18) }}
                    stroke={1.5}
                  />
                }
                onClick={() =>
                  viewFileInNewTabOrDownload({
                    uploadFile: filePath,
                    previewFile: previewFilePath,
                  })
                }
                disabled={checkFileUrl({
                  uploadFile: filePath,
                  previewFile: previewFilePath,
                })}
              >
                ดูข้อมูล
              </Button>
            </Grid.Col>
          </Grid>{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="ชื่อเอกสาร"
            placeholder="ชื่อเอกสาร"
            key={key('fileType')}
            {...getInputProps('fileType')}
            withAsterisk
          />{' '}
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 12 }}>
          <TextInput
            label="หมายเหตุเอกสาร"
            placeholder="หมายเหตุเอกสาร"
            key={key('note')}
            {...getInputProps('note')}
            withAsterisk
          />{' '}
        </Grid.Col>
      </Grid>{' '}
    </Container>
  );
};
