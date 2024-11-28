'use client';

import { $backofficeApi, ApiError } from '@backoffice/services/api';
import { getErrorMessage } from '@backoffice/utils/error';
import {
  Button,
  Card,
  Grid,
  Group,
  Stack,
  Text,
  Title,
  Tree,
  TreeNodeData
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  parseAsInteger,
  useQueryStates
} from 'nuqs';
import { Leaf } from '../components/leaf';
import {
  defaultPagination
} from '../constants';
import { OrgStructure } from '../types';
import { OrgStructureCreateScreen } from './create';
import { OrgStructureUpdateScreen } from './update';

export const OrgStructureMainScreen = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useQueryStates({
    pageIndex: parseAsInteger.withDefault(defaultPagination.pageIndex),
    pageSize: parseAsInteger.withDefault(defaultPagination.pageSize),
  });

  const {
    data: orgStructures,
    isLoading: isOrgStructuresLoading,
    isError: isOrgStructuresError,
  } = $backofficeApi.useQuery('get', '/api/OrgStructures', {
    params: {
      query: {
        pageNo: pagination.pageIndex,
        pageSize: pagination.pageSize,
      },
    },
  });

  const { mutate: deleteOrgStructure, isPending: isDeleteOrgStructurePending } =
    $backofficeApi.useMutation('delete', '/api/OrgStructures/{id}', {
      onSuccess: () => {
        notifications.show({
          color: 'green',
          message: 'ลบข้อมูลสำเร็จ',
        });
      },
      onError: (error: ApiError) => {
        notifications.show({
          color: 'red',
          message: getErrorMessage(error),
        });
      },
      onSettled: async () => {
        await queryClient.invalidateQueries({
          queryKey: ['get', '/api/OrgStructures'],
        });
      },
    });

  const handleDelete = (id?: string | null) => {
    if (!id) {
      notifications.show({
        color: 'red',
        message: 'Unknown ID',
      });
      return;
    }

    modals.openConfirmModal({
      title: 'ลบ ข้อมูลโครงสร้างองค์กร',
      centered: true,
      children: (
        <Text size="sm">
          คุณต้องการลบ ข้อมูลโครงสร้างองค์กร ใช่หรือไม่?
          <br />
          การดำเนินการนี้จะทำให้ข้อมูลนี้ถูกลบอย่างถาวร
        </Text>
      ),
      labels: { confirm: 'ใช่, ฉันยืนยันการลบข้อมูลนี้', cancel: 'ยกเลิก' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        deleteOrgStructure({
          params: { path: { id: id } },
        });
      },
    });
  };

  const handleUpdate = (id: string) => {
    const modalId = 'org-structure-update-modal';
    modals.open({
      modalId,
      title: 'แก้ไข ข้อมูลโครงสร้างองค์กร',
      children: <OrgStructureUpdateScreen id={id} modalId={modalId} />,
      size: 'xl',
    });
  };

  const handleCreate = (parentId?: string) => {
    const modalId = 'org-structure-create-modal';
    modals.open({
      modalId,
      title: 'เพิ่ม ข้อมูลโครงสร้างองค์กร',
      children: <OrgStructureCreateScreen modalId={modalId} parentId={parentId ?? undefined} />,
      size: 'xl',
    });
  };
  

  function transformData(apiData?: OrgStructure[] | null): TreeNodeData[] {
    const map: { [key: string]: TreeNodeData } = {};
    if (!apiData) return [];

    apiData.forEach(item => {
      map[String(item.id)] = {
        label: item.name,
        value: String(item.id),
        nodeProps: {
          typeName: item.orgStructureType?.name || '',
          orgCode: item.code,
          handleCreate,
          handleUpdate,
          handleDelete,
        },
        children: [],
      };
    });

    const result: TreeNodeData[] = [];
    apiData.forEach(item => {
      if (item.parent && map[String(item.parent.id)]) {
        map[String(item.parent.id)].children?.push(map[String(item.id)]);
      } else {
        result.push(map[String(item.id)]);
      }
    });

    return result;
  }

  const treeData = transformData(orgStructures?.contents);

  const isEventLoading = isOrgStructuresLoading || isDeleteOrgStructurePending;

  return (
    <Stack gap="xs">
      <Group gap="xs" justify="space-between">
        <Title order={1} size="h3">
          ข้อมูลโครงสร้างองค์กร{' '}
        </Title>
      </Group>
      <Card
        withBorder
        shadow="sm"
        radius="md"
        padding="lg"
        className="flex flex-col gap-2 w-full overflow-hidden"
      >
        <Grid justify="flex-start" align="flex-start">
          <Grid.Col span={{ base: 12, md: 2 }}>
            <Button
              color="primary"
              size="xs"
              variant="outline"
              onClick={() => handleCreate()}
            >
              เพิ่ม โครงสร้างองค์กร{' '}
            </Button>
          </Grid.Col>
        </Grid>
        <Tree
          selectOnClick
          clearSelectionOnOutsideClick
          data={treeData}
          levelOffset={100}
          renderNode={(payload) => <Leaf {...payload} />}
        />
      </Card>
    </Stack>
  );
};
