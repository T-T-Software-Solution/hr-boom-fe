'use client';
import { $backofficeApi } from '@backoffice/services/api';
import { getErrorMessage } from '@backoffice/utils/error';
import { Button, Card, Fieldset, Grid, Select, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import dynamic from 'next/dynamic';
import { useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';

const PdfReport = dynamic(
  () => import('@tt-ss-hr/shared-ui').then((mod) => mod.PdfReport),
  { ssr: false },
);

const EmployeeReportScreen = () => {
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [reportId, setReportId] = useQueryState('reportId', {
    defaultValue: '',
    parse: (value) => value,
    serialize: (value) => value,
  });

  const [loadingPdf, setLoadingPdf] = useState<boolean>(false);
  const [loadingExcel, setLoadingExcel] = useState<boolean>(false);

  useEffect(() => {
    if (reportId) {
      handleFetchPdf(reportId);
    }
  }, [reportId]);

  const handleFetchPdf = async (id?: string | null): Promise<void> => {
    setLoadingPdf(true);
    try {
      if (!id) {
        setPdfBlobUrl(null);
        return;
      }

      const response = await $backofficeApi.GET('/api/Employees/report', {
        params: {
          query: {
            Id: id,
          },
        },
        parseAs: 'blob',
      });

      const blob = response?.data;

      if (!blob) {
        notifications.show({
          color: 'red',
          message: getErrorMessage(
            'Oops! It seems like we didn’t receive any data from the server. This might happen if the server sent back nothing. Please try again or contact support if the issue persists.',
          ),
        });
        return;
      }
      const pdfBlob = new Blob([blob], { type: 'application/pdf' });
      const pdfDataUrl = URL.createObjectURL(pdfBlob);
      setPdfBlobUrl(pdfDataUrl);
    } catch (error) {
      notifications.show({
        color: 'red',
        message: getErrorMessage(error),
      });
    } finally {
      setLoadingPdf(false);
    }
  };

  const handleFetchExcel = async (id?: string | null): Promise<void> => {
    setLoadingExcel(true);
    try {
      if (!id) {
        setPdfBlobUrl(null);
        return;
      }

      const response = await $backofficeApi.GET('/api/Employees/report', {
        params: {
          query: {
            ReportFormat: 'xlsx',
            Id: id,
          },
        },
        parseAs: 'blob',
      });

      const blob = response?.data;

      if (!blob) {
        notifications.show({
          color: 'red',
          message: getErrorMessage(
            'Oops! It seems like we didn’t receive any data from the server. This might happen if the server sent back nothing. Please try again or contact support if the issue persists.',
          ),
        });
        return;
      }

      const excelDataUrl = URL.createObjectURL(blob);

      // Automatically download the Excel file without interaction
      const link = document.createElement('a');
      link.href = excelDataUrl;
      link.download = 'report.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      notifications.show({
        color: 'red',
        message: getErrorMessage(error),
      });
    } finally {
      setLoadingExcel(false);
    }
  };
  return (
    <Stack>
      <Card
        withBorder
        shadow="sm"
        radius="md"
        padding="lg"
        className="flex flex-col gap-2 w-full overflow-hidden"
      >
        <Fieldset variant="unstyled" disabled={false}>
          <Grid justify="flex-start">
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Select
                label="Select Report"
                placeholder="Pick report"
                data={[
                  {
                    value: '78718dc1-0ca9-4d86-acee-e23dc73d050b',
                    label: 'เด็กน้อย',
                  },
                  {
                    value: '094e8589-9e5d-4af1-a824-3b4415af9967',
                    label: 'แมน',
                  },
                ]}
                defaultValue={reportId}
                clearable
                onChange={(data) => {
                  setReportId(data ?? null);
                }}
              />
            </Grid.Col>
          </Grid>
        </Fieldset>
      </Card>
      <Card
        withBorder
        shadow="sm"
        radius="md"
        padding="lg"
        className="flex flex-col gap-2 w-full overflow-hidden"
      >
        <Grid align="flex-end" justify="flex-end">
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Button
              type="button"
              color="primary"
              w="100%"
              onClick={() => handleFetchExcel(reportId)}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
              loading={loadingExcel}
            >
              Download Excel
            </Button>
          </Grid.Col>
        </Grid>
      </Card>

      {pdfBlobUrl && (
        <PdfReport pdfFilePath={pdfBlobUrl} loading={loadingPdf} />
      )}
    </Stack>
  );
};

export { EmployeeReportScreen };
