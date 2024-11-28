import dayjs from 'dayjs';
import type {
  PositionStructureForm,
  PositionStructureSearchForm,
} from './types';

export const positionStructureFormDefaultValues: PositionStructureForm = {
  positionStructureTypeId: '',
  code: '',
  name: '',
  nameEn: null,
  level: null,
  salary: null,
  description: null,
  descriptionEn: null,
  parentId: null,
  id: '',
};

export const positionStructureSearchFormDefaultValues: PositionStructureSearchForm =
  {
    name: null,
    level: null,
  };

export const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};
