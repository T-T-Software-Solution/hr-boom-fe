import dayjs from 'dayjs';
import type {
  PositionStructureTypeForm,
  PositionStructureTypeSearchForm,
} from './types';

export const positionStructureTypeFormDefaultValues: PositionStructureTypeForm =
  {
    name: '',
    code: '',
    id: '',
  };

export const positionStructureTypeSearchFormDefaultValues: PositionStructureTypeSearchForm =
  {
    name: null,
    code: null,
  };

export const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};
