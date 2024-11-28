import dayjs from 'dayjs';
import type { GenderForm, GenderSearchForm } from './types';

export const genderFormDefaultValues: GenderForm = {
  name: '',
  id: '',
};

export const genderSearchFormDefaultValues: GenderSearchForm = {
  name: null,
};

export const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};
