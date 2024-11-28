import dayjs from 'dayjs';
import type { TaxBracketForm, TaxBracketSearchForm } from './types';

export const taxBracketFormDefaultValues: TaxBracketForm = {
  name: '',
  maxIncome: '',
  id: '',
};

export const taxBracketSearchFormDefaultValues: TaxBracketSearchForm = {
  name: null,
};

export const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};
