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
interface OrgStructureDetailScreenProps {
  id: string;
  modalId?: string;
}

export const OrgStructureDetailScreen: React.FC<
  OrgStructureDetailScreenProps
> = ({ id, modalId }) => {
  const router = useRouter();
  const { data: orgStructure, isLoading: isOrgStructureLoading } =
    $backofficeApi.useQuery('get', '/api/OrgStructures/{id}', {
      params: {
        path: {
          id,
        },
      },
    });

  const handleUpdate = () => {
    router.push(`/org-structure/update/${id}`);
    if (modalId) {
      modals.close(modalId);
    }
  };

  const isScreenLoading = isOrgStructureLoading;
  if (isScreenLoading) {
    return <LoadingOverlay visible={isScreenLoading} />;
  }

  return (
    <Stack gap="xs">
      <Group gap="xs" align="center">
        <Title order={1} size="h3">
          รายละเอียดข้อมูลโครงสร้างองค์กร{' '}
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
                รหัสของโครงสร้างองค์กร{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                <Code color="primary.1" c="primary.7">
                  {orgStructure?.id ?? '-'}
                </Code>
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                ชนิดของโครงสร้างองค์กร{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {orgStructure?.orgStructureType?.name ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                รหัสขององค์กร{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {orgStructure?.code ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                ชื่อ{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {orgStructure?.name ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                ชื่อ(EN){' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {orgStructure?.nameEn ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                เลขประจำตัวผู้เสียภาษี{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {orgStructure?.taxId ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                เลขประจำตัวผู้เสียภาษี 2 (สำรอง){' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {orgStructure?.taxId2 ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                สิทธิ์ประกันสังคม{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {orgStructure?.socialSecurityType?.name ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                ที่อยู่บริษัท{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {orgStructure?.addressTh ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                ที่อยู่บริษัท (EN){' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {orgStructure?.addressEn ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                จังหวัด{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {orgStructure?.province?.name ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                เขต/อำเภอ{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {orgStructure?.district ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                แขวง/ตำบล{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {orgStructure?.subdistrict ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                รหัสไปรษณีย์{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {orgStructure?.postalCode ? (
                  <NumberFormatter
                    value={Number.parseFloat(String(orgStructure?.postalCode))}
                    thousandSeparator
                    decimalScale={2}
                  />
                ) : (
                  '0'
                )}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                เบอร์โทรศัพท์{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {orgStructure?.phoneNumber ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                เบอร์โทรสาร (Fax){' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {orgStructure?.faxNumber ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                อีเมลบริษัท{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {orgStructure?.emailCompany ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                รูปภาพบริษัท{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                <Paper
                  shadow="xs"
                  p="0"
                  radius="md"
                  className="overflow-hidden"
                  w="fit-content"
                >
                  <Image
                    src={
                      getFileUrl(orgStructure?.logoComppanyPath)?.fullPath ||
                      placeholderImage
                    }
                    alt={orgStructure?.logoComppanyPath || ''}
                    h={200}
                    w="auto"
                    fit="contain"
                    onError={(e) => {
                      e.currentTarget.src = placeholderImage;
                    }}
                  />
                </Paper>{' '}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                คำอธิบาย{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
                  {orgStructure?.description ?? '-'}
                </Spoiler>
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                รหัสต้นสังกัด{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {orgStructure?.parent?.code ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>{' '}
      </Card>
    </Stack>
  );
};
