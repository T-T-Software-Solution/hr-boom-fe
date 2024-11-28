import dayjs from 'dayjs';
import type { ProvinceForm, ProvinceSearchForm } from './types';

export const provinceFormDefaultValues: ProvinceForm = {
  name: '',
  id: '',
};

export const provinceSearchFormDefaultValues: ProvinceSearchForm = {
  name: null,
};

export const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};
