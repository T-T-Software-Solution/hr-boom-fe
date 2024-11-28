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
interface TrainingHistoryDetailScreenProps {
  id: string;
  modalId?: string;
}

export const TrainingHistoryDetailScreen: React.FC<
  TrainingHistoryDetailScreenProps
> = ({ id, modalId }) => {
  const router = useRouter();
  const { data: trainingHistory, isLoading: isTrainingHistoryLoading } =
    $backofficeApi.useQuery('get', '/api/TrainingHistories/{id}', {
      params: {
        path: {
          id,
        },
      },
    });

  const handleUpdate = () => {
    router.push(`/training-history/update/${id}`);
    if (modalId) {
      modals.close(modalId);
    }
  };

  const isScreenLoading = isTrainingHistoryLoading;
  if (isScreenLoading) {
    return <LoadingOverlay visible={isScreenLoading} />;
  }

  return (
    <Stack gap="xs">
      <Group gap="xs" align="center">
        <Title order={1} size="h3">
          รายละเอียดประวัติการฝึกอบรม{' '}
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
                รหัสของประวัติการฝึกอบรม{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                <Code color="primary.1" c="primary.7">
                  {trainingHistory?.id ?? '-'}
                </Code>
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                ชื่อพนักงาน{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {trainingHistory?.employee?.firstName ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                หลักสูตรอบรม{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {trainingHistory?.name ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                วันที่เริ่มต้น{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {trainingHistory?.startDate &&
                dayjs(trainingHistory?.startDate).isValid()
                  ? dayjs(trainingHistory?.startDate).format('DD/MM/BBBB')
                  : '-'}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                วันที่สิ้นสุด{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {trainingHistory?.endDate &&
                dayjs(trainingHistory?.endDate).isValid()
                  ? dayjs(trainingHistory?.endDate).format('DD/MM/BBBB')
                  : '-'}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 12 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                หน่วยงานที่จัดฝึกอบรม{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {trainingHistory?.trainingOrganization ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>{' '}
      </Card>
    </Stack>
  );
};
