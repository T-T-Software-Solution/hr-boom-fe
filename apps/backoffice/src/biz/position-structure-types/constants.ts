import dayjs from 'dayjs';
import type {
  PositionStructureTypeForm,
  PositionStructureTypeSearchForm,
} from './types';

export const positionStructureTypeFormDefaultValues: PositionStructureTypeForm =
  {
    name: '',
    id: '',
  };

export const positionStructureTypeSearchFormDefaultValues: PositionStructureTypeSearchForm =
  {
    name: null,
  };

export const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};
