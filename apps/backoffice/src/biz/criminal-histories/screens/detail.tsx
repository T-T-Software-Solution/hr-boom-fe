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
interface CriminalHistoryDetailScreenProps {
  id: string;
  modalId?: string;
}

export const CriminalHistoryDetailScreen: React.FC<
  CriminalHistoryDetailScreenProps
> = ({ id, modalId }) => {
  const router = useRouter();
  const { data: criminalHistory, isLoading: isCriminalHistoryLoading } =
    $backofficeApi.useQuery('get', '/api/CriminalHistories/{id}', {
      params: {
        path: {
          id,
        },
      },
    });

  const handleUpdate = () => {
    router.push(`/criminal-history/update/${id}`);
    if (modalId) {
      modals.close(modalId);
    }
  };

  const isScreenLoading = isCriminalHistoryLoading;
  if (isScreenLoading) {
    return <LoadingOverlay visible={isScreenLoading} />;
  }

  return (
    <Stack gap="xs">
      <Group gap="xs" align="center">
        <Title order={1} size="h3">
          รายละเอียดประวัติการได้รับโทษทางวินัยและการนิรโทษกรรม{' '}
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
                รหัสของประวัติโทษทางวินัยและการนิรโทษกรรม{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                <Code color="primary.1" c="primary.7">
                  {criminalHistory?.id ?? '-'}
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
                {criminalHistory?.employee?.firstName ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                วันที่ทำผิด{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {criminalHistory?.dateOfPunishment &&
                dayjs(criminalHistory?.dateOfPunishment).isValid()
                  ? dayjs(criminalHistory?.dateOfPunishment).format(
                      'DD/MM/BBBB',
                    )
                  : '-'}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                รายการที่ถูกลงโทษ{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {criminalHistory?.listPunishment ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 12 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                เอกสารอ้างอิง{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {criminalHistory?.note ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>{' '}
      </Card>
    </Stack>
  );
};
