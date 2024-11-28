'use client';
import {
  ActionIcon,
  Card,
  Flex,
  Group,
  Loader,
  Pagination,
  Paper,
  Tooltip,
  rem,
} from '@mantine/core';
import { useResizeObserver } from '@mantine/hooks';
import {
  IconArrowBarToLeft,
  IconArrowBarToRight,
  IconArrowLeft,
  IconArrowRight,
  IconDownload,
  IconGripHorizontal,
  IconMaximize,
} from '@tabler/icons-react';
import {
  base64PdfToDataUrl,
  isValidBase64Pdf,
  isValidPdfFileName,
} from '@tt-ss-hr/shared-utils';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import type { PdfReportProps } from './PdfReport.types';

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const PdfReport: React.FC<PdfReportProps> = ({
  pdfFilePath,
  loading: loadingProps,
}) => {
  const [pdfDataUrl, setPdfDataUrl] = useState<string | null | undefined>(null);
  const [pageSize, setPageSize] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [ref, rect] = useResizeObserver();

  useEffect(() => {
    const loadPdfDataUrl = () => {
      setLoading(true);
      try {
        if (
          typeof pdfFilePath === 'string' &&
          pdfFilePath.startsWith('blob:')
        ) {
          setPdfDataUrl(pdfFilePath);
        } else if (!isValidPdfFileName(pdfFilePath)) {
          setPdfDataUrl(base64PdfToDataUrl(pdfFilePath));
        }
      } catch (error) {
        console.error('Error loading PDF data URL:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPdfDataUrl();
  }, [pdfFilePath]);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: PDFDocumentProxy): void => {
      setPageSize(numPages);
    },
    [],
  );

  const handlePageChange = useCallback(
    (page: number) => setPageIndex(page),
    [],
  );

  const handleViewPdf = useCallback(() => {
    if (!pdfDataUrl) return;
    // try {
    //   const isBlobUrl = pdfDataUrl.startsWith('blob:');
    //   const isBase64 = isValidBase64Pdf(pdfDataUrl);
    //   const isUrl = !isBlobUrl && !isBase64;

    //   // if (isUrl) {
    //   //   window.open(pdfDataUrl, '_blank');
    //   // } else {
    //     const newTab = window.open();
    //     if (newTab) {
    //       const src = isBase64
    //         ? `data:application/pdf;base64,${pdfDataUrl}`
    //         : pdfDataUrl;
    //       if (isBlobUrl) {
    //         fetch(pdfDataUrl)
    //           .then((response) => response.blob())
    //           .then((blob) => {
    //             const blobUrl = URL.createObjectURL(blob);
    //             newTab.document.body.innerHTML = `<iframe src="${blobUrl}" style="width:100%; height:100%;" frameborder="0"></iframe>`;
    //           })
    //           .catch((error) => console.error('Error fetching blob:', error));
    //       } else {
    //         newTab.document.body.innerHTML = `<iframe src="${src}" style="width:100%; height:100%;" frameborder="0"></iframe>`;
    //       }
    //     }
    //   // }
    // } catch (error) {
    //   console.error('Error viewing PDF:', error);
    // }

    if (!pdfDataUrl) return;
    try {
      if (!isValidBase64Pdf(pdfDataUrl)) {
        window.open(pdfDataUrl, '_blank');
        return;
      }
      const newTab = window.open();
      if (newTab) {
        newTab.document.body.innerHTML = `<iframe src="${pdfDataUrl}" style="width:100%; height:100%;" frameborder="0"></iframe>`;
      }
    } catch (error) {
      console.error('Error viewing PDF:', error);
    }
  }, [pdfDataUrl]);

  const handleDownloadPdf = useCallback(() => {
    if (pdfDataUrl) {
      try {
        const link = document.createElement('a');
        link.href = pdfDataUrl;
        link.download = 'report.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error downloading PDF:', error);
      }
    }
  }, [pdfDataUrl]);

  const isEventLoading = loadingProps || loading;

  const Tools = useCallback(
    () =>
      pageSize > 0 && (
        <Group
          gap="apart"
          justify="space-between"
          align="center"
          className="w-full"
        >
          <Group my="md" align="center" justify="center">
            <Pagination
              total={pageSize}
              value={pageIndex}
              onChange={handlePageChange}
              withEdges
              nextIcon={IconArrowRight}
              previousIcon={IconArrowLeft}
              firstIcon={IconArrowBarToLeft}
              lastIcon={IconArrowBarToRight}
              dotsIcon={IconGripHorizontal}
              size="md"
              disabled={isEventLoading}
            />
          </Group>
          <Group gap="apart">
            <Tooltip label="View PDF" position="bottom">
              <ActionIcon
                aria-label="View PDF"
                variant="outline"
                size="md"
                radius="md"
                onClick={handleViewPdf}
                loading={isEventLoading}
              >
                <IconMaximize
                  stroke={1.5}
                  style={{ width: rem(18), height: rem(18) }}
                />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Download PDF" position="bottom">
              <ActionIcon
                aria-label="Download PDF"
                variant="outline"
                size="md"
                radius="md"
                onClick={handleDownloadPdf}
                loading={isEventLoading}
              >
                <IconDownload
                  stroke={1.5}
                  style={{ width: rem(18), height: rem(18) }}
                />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
      ),
    [
      pageSize,
      pageIndex,
      handlePageChange,
      handleViewPdf,
      handleDownloadPdf,
      isEventLoading,
    ],
  );

  const Loading = () => (
    <Flex justify="center" align="center" w="100%">
      <Loader size="md" />
    </Flex>
  );

  if (isEventLoading) {
    return <Loading />;
  }

  if (!pdfDataUrl) {
    return (
      <Flex justify="center" align="center" w="100%" h="100%">
        <div style={{ color: 'red', textAlign: 'center', fontSize: 'large' }}>
          PDF not found
        </div>
      </Flex>
    );
  }

  return (
    <Card
      ref={ref}
      withBorder
      shadow="sm"
      radius="md"
      padding="lg"
      className="overflow-hidden"
    >
      <Flex justify="center" align="center" direction="column" w="100%" p="sm">
        <Tools />
        <Document
          file={pdfDataUrl}
          loading={<Loading />}
          options={options}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Paper p="0" radius="md" withBorder className="overflow-hidden">
            <Page pageNumber={pageIndex} width={rect.width} />
          </Paper>
        </Document>
        <Tools />
      </Flex>
    </Card>
  );
};

export { PdfReport };
