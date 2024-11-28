import dayjs from 'dayjs';
import type { BankForm, BankSearchForm } from './types';

export const bankFormDefaultValues: BankForm = {
  name: '',
  id: '',
};

export const bankSearchFormDefaultValues: BankSearchForm = {
  name: null,
};

export const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};
