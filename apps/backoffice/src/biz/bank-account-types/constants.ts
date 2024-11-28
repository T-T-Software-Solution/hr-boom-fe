import dayjs from 'dayjs';
import type { BankAccountTypeForm, BankAccountTypeSearchForm } from './types';

export const bankAccountTypeFormDefaultValues: BankAccountTypeForm = {
  name: '',
  id: '',
};

export const bankAccountTypeSearchFormDefaultValues: BankAccountTypeSearchForm =
  {
    name: null,
  };

export const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};
