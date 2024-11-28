import dayjs from 'dayjs';
import type { PrefixEnForm, PrefixEnSearchForm } from './types';

export const prefixEnFormDefaultValues: PrefixEnForm = {
  name: '',
  id: '',
};

export const prefixEnSearchFormDefaultValues: PrefixEnSearchForm = {
  name: null,
};

export const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};
