import dayjs from 'dayjs';
import type { TaxDeductionForm, TaxDeductionSearchForm } from './types';

export const taxDeductionFormDefaultValues: TaxDeductionForm = {
  name: '',
  value: '',
  id: '',
};

export const taxDeductionSearchFormDefaultValues: TaxDeductionSearchForm = {
  name: null,
  value: null,
};

export const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};
