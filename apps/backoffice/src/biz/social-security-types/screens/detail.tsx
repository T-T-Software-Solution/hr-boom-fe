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
interface SocialSecurityTypeDetailScreenProps {
  id: string;
  modalId?: string;
}

export const SocialSecurityTypeDetailScreen: React.FC<
  SocialSecurityTypeDetailScreenProps
> = ({ id, modalId }) => {
  const router = useRouter();
  const { data: socialSecurityType, isLoading: isSocialSecurityTypeLoading } =
    $backofficeApi.useQuery('get', '/api/SocialSecurityTypes/{id}', {
      params: {
        path: {
          id,
        },
      },
    });

  const handleUpdate = () => {
    router.push(`/social-security-type/update/${id}`);
    if (modalId) {
      modals.close(modalId);
    }
  };

  const isScreenLoading = isSocialSecurityTypeLoading;
  if (isScreenLoading) {
    return <LoadingOverlay visible={isScreenLoading} />;
  }

  return (
    <Stack gap="xs">
      <Group gap="xs" align="center">
        <Title order={1} size="h3">
          รายละเอียดตั้งค่าสิทธิ์ประกันสังคม{' '}
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
                รหัสสิทธิ์ประกันสังคม{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                <Code color="primary.1" c="primary.7">
                  {socialSecurityType?.id ?? '-'}
                </Code>
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                ชื่อสิทธิ์ประกันสังคม{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {socialSecurityType?.name ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>{' '}
      </Card>
    </Stack>
  );
};
