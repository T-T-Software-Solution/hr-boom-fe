import dayjs from 'dayjs';
import type { OrgStructureTypeForm, OrgStructureTypeSearchForm } from './types';

export const orgStructureTypeFormDefaultValues: OrgStructureTypeForm = {
  name: '',
  id: '',
};

export const orgStructureTypeSearchFormDefaultValues: OrgStructureTypeSearchForm =
  {
    name: null,
  };

export const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};
