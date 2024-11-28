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
interface EmploymentDetailScreenProps {
  id: string;
  modalId?: string;
}

export const EmploymentDetailScreen: React.FC<EmploymentDetailScreenProps> = ({
  id,
  modalId,
}) => {
  const router = useRouter();
  const { data: employment, isLoading: isEmploymentLoading } =
    $backofficeApi.useQuery('get', '/api/Employments/{id}', {
      params: {
        path: {
          id,
        },
      },
    });

  const handleUpdate = () => {
    router.push(`/employment/update/${id}`);
    if (modalId) {
      modals.close(modalId);
    }
  };

  const isScreenLoading = isEmploymentLoading;
  if (isScreenLoading) {
    return <LoadingOverlay visible={isScreenLoading} />;
  }

  return (
    <Stack gap="xs">
      <Group gap="xs" align="center">
        <Title order={1} size="h3">
          รายละเอียดการจ้างงาน{' '}
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
                รหัสของการจ้างงาน{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                <Code color="primary.1" c="primary.7">
                  {employment?.id ?? '-'}
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
                {employment?.employee?.firstName ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                วันที่เริ่มงาน{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employment?.employmentStartDate &&
                dayjs(employment?.employmentStartDate).isValid()
                  ? dayjs(employment?.employmentStartDate).format('DD/MM/BBBB')
                  : '-'}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                อายุงาน/ปี{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employment?.yearsOfWork ? (
                  <NumberFormatter
                    value={Number.parseFloat(String(employment?.yearsOfWork))}
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
                อายุงาน/เดือน{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employment?.monthsOfWork ? (
                  <NumberFormatter
                    value={Number.parseFloat(String(employment?.monthsOfWork))}
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
                อายุงาน/วัน{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employment?.daysOfWork ? (
                  <NumberFormatter
                    value={Number.parseFloat(String(employment?.daysOfWork))}
                    thousandSeparator
                    decimalScale={2}
                  />
                ) : (
                  '0'
                )}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                แผนก{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employment?.orgStructure?.name ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                ตำแหน่งงาน{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employment?.positionStructure?.name ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                ประเภทพนักงาน{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employment?.employeeType?.name ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                สิทธิ์ประกันสังคม{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employment?.socialSecurityType?.name ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                เงินเดือน{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employment?.salary ? (
                  <NumberFormatter
                    value={Number.parseFloat(String(employment?.salary))}
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
                จำนวนหักภาษีต่อเดือน{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employment?.withholdingTax ? (
                  <NumberFormatter
                    value={Number.parseFloat(
                      String(employment?.withholdingTax),
                    )}
                    thousandSeparator
                    decimalScale={2}
                  />
                ) : (
                  '0'
                )}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                หักภาษี{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                <Flex align="center">
                  {employment?.isWithholdingTax ? (
                    <IconCheck color="green" size={20} />
                  ) : (
                    <IconX color="red" size={21} />
                  )}
                </Flex>{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                เงื่อนไขการหักภาษี{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employment?.taxCondition?.name ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                ขั้นภาษี{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employment?.taxBracket?.name ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                เงินเดือนสุทธิ{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employment?.netSalary ? (
                  <NumberFormatter
                    value={Number.parseFloat(String(employment?.netSalary))}
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
                ช่องทางการจ่ายเงินเดือน{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employment?.paymentChannel?.name ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                ชื่อธนาคาร{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employment?.bank?.name ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                สาขาธนาคาร{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employment?.bankBranch ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                เลขที่บัญชี{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employment?.bankAccountNumber ? (
                  <NumberFormatter
                    value={Number.parseFloat(
                      String(employment?.bankAccountNumber),
                    )}
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
                ประเภทบัญชี{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employment?.bankAccountType?.name ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 12 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                หมายเหตุ{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
                  {employment?.note ?? '-'}
                </Spoiler>
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>{' '}
      </Card>
    </Stack>
  );
};
