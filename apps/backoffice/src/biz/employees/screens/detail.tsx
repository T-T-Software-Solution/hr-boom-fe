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
interface EmployeeDetailScreenProps {
  id: string;
  modalId?: string;
}

export const EmployeeDetailScreen: React.FC<EmployeeDetailScreenProps> = ({
  id,
  modalId,
}) => {
  const router = useRouter();
  const { data: employee, isLoading: isEmployeeLoading } =
    $backofficeApi.useQuery('get', '/api/Employees/{id}', {
      params: {
        path: {
          id,
        },
      },
    });

  const handleUpdate = () => {
    router.push(`/employee/update/${id}`);
    if (modalId) {
      modals.close(modalId);
    }
  };

  const isScreenLoading = isEmployeeLoading;
  if (isScreenLoading) {
    return <LoadingOverlay visible={isScreenLoading} />;
  }

  return (
    <Stack gap="xs">
      <Group gap="xs" align="center">
        <Title order={1} size="h3">
          รายละเอียดข้อมูลบุคลากร{' '}
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
                รหัสของข้อมูลบุคลากร{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                <Code color="primary.1" c="primary.7">
                  {employee?.id ?? '-'}
                </Code>
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                รูป{' '}
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
                      getFileUrl(employee?.imagePath)?.fullPath ||
                      placeholderImage
                    }
                    alt={employee?.imagePath || ''}
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

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                รหัสพนักงาน{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.employeeId ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                เพศ{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.gender?.name ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                คำนำหน้าชื่อ{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.prefix?.name ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                ชื่อ{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.firstName ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                นามสกุล{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.lastName ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                ชื่อเล่น{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.nickname ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                คำนำหน้าชื่อ(EN){' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.prefixEn?.name ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                ชื่อ(EN){' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.firstNameEn ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                นามสกุล(EN){' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.lastNameEn ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                ชื่อเล่น(EN){' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.nicknameEn ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                ชื่อหน่วยงาน{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.orgStructure?.name ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                วันเดือนปีเกิด{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.dateOfBirth && dayjs(employee?.dateOfBirth).isValid()
                  ? dayjs(employee?.dateOfBirth).format('DD/MM/BBBB')
                  : '-'}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                วันบรรจุ{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.placementDate &&
                dayjs(employee?.placementDate).isValid()
                  ? dayjs(employee?.placementDate).format('DD/MM/BBBB')
                  : '-'}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                วันครบเกษียณอายุ{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.retirementDate &&
                dayjs(employee?.retirementDate).isValid()
                  ? dayjs(employee?.retirementDate).format('DD/MM/BBBB')
                  : '-'}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                เลขบัตรประชาชน{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.nationalId ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                เลขหนังสือเดินทาง{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.passportNumber ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                เบอร์โทรศัพท์{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.telephone ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                อีเมล{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.email ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                ไลน์ไอดี{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.lineId ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                ชื่อ-นามสกุล บิดา{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.fatherFullName ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                ชื่อ-นามสกุล มารดา{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.motherFullName ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                นามสกุลเดิม มารดา{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.motherMaidenName ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                แต่งงานแล้ว{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                <Flex align="center">
                  {employee?.maritalStatus ? (
                    <IconCheck color="green" size={20} />
                  ) : (
                    <IconX color="red" size={21} />
                  )}
                </Flex>{' '}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                ชื่อ-นามสกุล คู่สมรส{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.spouseFullName ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                นามสกุลเดิม คู่สมรส{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.spouseMaidenName ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                ชื่อผู้ติดต่อฉุกเฉิน{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.contactPersonName ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                เบอร์ผู้ติดต่อฉุกเฉิน{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.contactPersonTel ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                เลขที่บ้าน(ปัจจุบัน){' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.currentHouseNumber ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                หมู่(ปัจจุบัน){' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.currentMoo ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                ซอย(ปัจจุบัน){' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.currentSoi ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                แยก(ปัจจุบัน){' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.currectYak ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                ถนน(ปัจจุบัน){' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.currentRoad ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                ตำบล(ปัจจุบัน){' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.currentSubdistrict ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                อำเภอ(ปัจจุบัน){' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.currentDistrict ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                จังหวัด(ปัจจุบัน){' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.currentProvince?.name ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                รหัสไปรษณีย์(ปัจจุบัน){' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.currentPostcode ? (
                  <NumberFormatter
                    value={Number.parseFloat(String(employee?.currentPostcode))}
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
                เลขที่บ้าน(ตามทะเบียนบ้าน){' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.permanentHouseNumber ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                หมู่(ตามทะเบียนบ้าน){' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.permanentMoo ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                ซอย(ตามทะเบียนบ้าน){' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.permanentSoi ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                แยก(ตามทะเบียนบ้าน){' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.permanentYak ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                ถนน(ตามทะเบียนบ้าน){' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.permanentRoad ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                ตำบล(ตามทะเบียนบ้าน){' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.permanentSubdistrict ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                อำเภอ(ตามทะเบียนบ้าน){' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.permanentDistrict ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                จังหวัด(ตามทะเบียนบ้าน){' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.permanentProvince?.name ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                รหัสไปรษณีย์(ตามทะเบียนบ้าน){' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.permanentPostcode ? (
                  <NumberFormatter
                    value={Number.parseFloat(
                      String(employee?.permanentPostcode),
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
          <Grid.Col span={{ base: 12, md: 12 }}>
            <Stack align="stretch" justify="center" gap="xs">
              <Text size="sm" fw={900} c="dimmed">
                หมายเหตุ{' '}
              </Text>
              <Box component="div" w="fit-content" className="flex-1">
                {employee?.note ?? '-'}{' '}
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>{' '}
      </Card>
    </Stack>
  );
};
