import dayjs from 'dayjs';
import type { CriminalHistoryForm, CriminalHistorySearchForm } from './types';

export const criminalHistoryFormDefaultValues: CriminalHistoryForm = {
  employeeId: '',
  dateOfPunishment: dayjs().toDate(),
  listPunishment: '',
  note: '',
  id: '',
};

export const criminalHistorySearchFormDefaultValues: CriminalHistorySearchForm =
  {
    employeeId: null,
  };

export const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};
