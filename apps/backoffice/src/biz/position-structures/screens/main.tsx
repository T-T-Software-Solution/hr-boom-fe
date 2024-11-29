'use client';

import { Leaf } from '@backoffice/components/leaf/leaf';
import { $backofficeApi, ApiError } from '@backoffice/services/api';
import { getErrorMessage } from '@backoffice/utils/error';
import {
  Button,
  Card,
  getTreeExpandedState,
  Grid,
  Group,
  LoadingOverlay,
  Stack,
  Text,
  Title,
  Tree,
  TreeNodeData,
  useTree
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { useQueryClient } from '@tanstack/react-query';
import {
  parseAsInteger,
  useQueryStates
} from 'nuqs';
import { useEffect, useState } from 'react';
import {
  defaultPagination
} from '../constants';
import { PositionStructure } from '../types';
import { PositionStructureCreateScreen } from './create';
import { PositionStructureUpdateScreen } from './update';

export const PositionStructureMainScreen = () => {
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useQueryStates({
    pageIndex: parseAsInteger.withDefault(defaultPagination.pageIndex),
    pageSize: parseAsInteger.withDefault(defaultPagination.pageSize),
  });
  const [treeData, setTreeData] = useState<TreeNodeData[]>([]);
  const tree = useTree({
    initialExpandedState: getTreeExpandedState(treeData, '*'),
  });

  const {
    data: positionStructures,
    isLoading: isPositionStructuresLoading,
    isError: isPositionStructuresError,
  } = $backofficeApi.useQuery('get', '/api/PositionStructures', {
    params: {
      query: {
        pageNo: pagination.pageIndex,
        pageSize: pagination.pageSize,
        sort:["CreatedDate"]
      },
    },
  });

  const {
    mutate: deletePositionStructure,
    isPending: isDeletePositionStructurePending,
  } = $backofficeApi.useMutation('delete', '/api/PositionStructures/{id}', {
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
        queryKey: ['get', '/api/PositionStructures'],
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
      title: 'ลบ โครงสร้างตำแหน่ง',
      centered: true,
      children: (
        <Text size="sm">
          คุณต้องการลบ โครงสร้างตำแหน่ง ใช่หรือไม่?
          <br />
          การดำเนินการนี้จะทำให้ข้อมูลนี้ถูกลบอย่างถาวร
        </Text>
      ),
      labels: { confirm: 'ใช่, ฉันยืนยันการลบข้อมูลนี้', cancel: 'ยกเลิก' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        deletePositionStructure({
          params: { path: { id: id } },
        });
      },
    });
  };

  const handleUpdate = (id: string) => {
    const modalId = 'position-structure-update-modal';
    modals.open({
      modalId,
      title: 'แก้ไข โครงสร้างตำแหน่ง',
      children: <PositionStructureUpdateScreen id={id} modalId={modalId} />,
      size: 'xl',
    });
  };

  const handleCreate = (parentId?: string) => {
    const modalId = 'position-structure-create-modal';
    modals.open({
      modalId,
      title: 'เพิ่ม โครงสร้างตำแหน่ง',
      children: <PositionStructureCreateScreen
        modalId={modalId}
        parentId={parentId} />,
      size: 'xl',
    });
  };

  function transformData(apiData?: PositionStructure[] | null): TreeNodeData[] {
    const map: { [key: string]: TreeNodeData } = {};
    if (!apiData) return [];

    apiData.forEach((item) => {
      map[String(item.id)] = {
        label: item.name,
        value: String(item.id),
        nodeProps: {
          typeName: item.positionStructureType?.name || '',
          code: item.code,
          handleCreate,
          handleUpdate,
          handleDelete,
        },
        children: [],
      };
    });

    const result: TreeNodeData[] = [];
    apiData.forEach((item) => {
      if (item.parent && map[String(item.parent.id)]) {
        map[String(item.parent.id)].children?.push(map[String(item.id)]);
      } else {
        result.push(map[String(item.id)]);
      }
    });

    return result;
  }

  useEffect(() => {
    if (positionStructures?.contents) {
      setTreeData(transformData(positionStructures?.contents));
    }
  }, [positionStructures])

  useEffect(() => {
    if (treeData.length > 0) {
      tree.expandAllNodes();
    }
  }, [treeData])


  const isEventLoading = isPositionStructuresLoading || isDeletePositionStructurePending;

  return (
    <Stack gap="xs">
      <Group gap="xs" justify="space-between">
        <Title order={1} size="h3">
          ข้อมูลโครงสร้างตำแหน่ง{' '}
        </Title>
      </Group>
      <Card
        withBorder
        shadow="sm"
        radius="md"
        padding="lg"
        className="flex flex-col gap-2 w-full overflow-hidden"
      >
        <LoadingOverlay visible={isEventLoading} />
        <Grid justify="flex-start" align="flex-start">
          <Grid.Col span={{ base: 12, md: 2 }}>
            <Button
              color="primary"
              size="xs"
              variant="outline"
              onClick={() => handleCreate()}
            >
              เพิ่ม โครงสร้างตำแหน่ง{' '}
            </Button>
          </Grid.Col>
        </Grid>
        <Tree
          data={treeData}
          tree={tree}
          levelOffset={100}
          renderNode={(payload) => <Leaf {...payload} />}
        />
      </Card>
    </Stack>
  );
};
