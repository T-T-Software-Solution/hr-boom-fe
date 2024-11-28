import dayjs from 'dayjs';
import type { PrefixForm, PrefixSearchForm } from './types';

export const prefixFormDefaultValues: PrefixForm = {
  name: '',
  id: '',
};

export const prefixSearchFormDefaultValues: PrefixSearchForm = {
  name: null,
};

export const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};
