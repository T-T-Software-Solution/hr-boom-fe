import dayjs from 'dayjs';
import type { EmployeeTypeForm, EmployeeTypeSearchForm } from './types';

export const employeeTypeFormDefaultValues: EmployeeTypeForm = {
  name: '',
  id: '',
};

export const employeeTypeSearchFormDefaultValues: EmployeeTypeSearchForm = {
  name: null,
};

export const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};
