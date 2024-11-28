'use client';

import { $backofficeApi } from '@backoffice/services/api';
import {
  ActionIcon,
  Anchor,
  Box,
  Card,
  Code,
  Flex,
  Grid,
  Group,
  Image,
  LoadingOverlay,
  NumberFormatter,
  Paper,
  rem,
  Stack,
  Spoiler,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconCheck, IconEdit, IconX } from '@tabler/icons-react';
import {
  getFileUrl,
  placeholderImage,
  formatCurrency,
} from '@tt-ss-hr/shared-utils';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import type React from 'react';
interface ProfessionalLicenseDetailScreenProps {
  id: string;
  modalId?: string;
}

export const ProfessionalLicenseDetailScreen: React.FC<
  ProfessionalLicenseDetailScreenProps
> = ({ id, modalId }) => {
  const router = useRouter();
  const { data: professionalLicense, isLoading: isProfessionalLicenseLoading } =
    $backofficeApi.useQuery('get', '/api/ProfessionalLicenses/{id}', {
      params: {
        path: {
          id,
        },
      },
    });

  const handleUpdate = () => {
    router.push(`/professional-license/update/${id}`);
    if (modalId) {
      modals.close(modalId);
    }
  };

  const isScreenLoading = isProfessionalLicenseLoading;
  if (isScreenLoading) {
    return <LoadingOverlay visible={isScreenLoading} />;
  }

  return (
    <Stack gap="xs">
      <Group gap="xs" align="center">
        <Title order={1} size="h3">
          รายละเอียดใบอนุญาตประกอบวิชาชีพ{' '}
        </Title>
        <Tooltip label="แก้ไข" position="bottom">
          <ActionIcon
            aria-label="แก้ไข"
            color="primary"
            variant="transparent"
            size="lg"
            onClick={handleUpdate}
          >
            <IconEdit
              stroke={1.5}
              style={{ width: rem(18), height: rem(18) }}
            />
          </ActionIcon>
        </Tooltip>
      </Group>
      <Card
        withBorder
        shadow="sm"
        radius="md"
        padding="lg"
        className="flex flex-col gap-4 w-full"
      >
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                รหัสของใบอนุญาตประกอบวิชาชีพ{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                <Code color="primary.1" c="primary.7">
                  {professionalLicense?.id ?? '-'}
                </Code>
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                ชื่อพนักงาน{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {professionalLicense?.employee?.firstName ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                ชื่อใบอนุญาต{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {professionalLicense?.name ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                หน่วยงาน{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {professionalLicense?.agency ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                เลขที่ใบอนุญาต{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {professionalLicense?.numberLicense ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                วันที่มีผลบังคับใช้{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {professionalLicense?.effectiveDate &&
                dayjs(professionalLicense?.effectiveDate).isValid()
                  ? dayjs(professionalLicense?.effectiveDate).format(
                      'DD/MM/BBBB',
                    )
                  : '-'}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>{' '}
      </Card>
    </Stack>
  );
};
