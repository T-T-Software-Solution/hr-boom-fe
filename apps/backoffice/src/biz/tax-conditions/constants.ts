import dayjs from 'dayjs';
import type { TaxConditionForm, TaxConditionSearchForm } from './types';

export const taxConditionFormDefaultValues: TaxConditionForm = {
  name: '',
  id: '',
};

export const taxConditionSearchFormDefaultValues: TaxConditionSearchForm = {
  name: null,
};

export const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};
