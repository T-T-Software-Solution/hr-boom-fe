import dayjs from 'dayjs';
import type { TrainingHistoryForm, TrainingHistorySearchForm } from './types';

export const trainingHistoryFormDefaultValues: TrainingHistoryForm = {
  employeeId: '',
  name: '',
  startDate: dayjs().toDate(),
  endDate: dayjs().toDate(),
  trainingOrganization: '',
  id: '',
};

export const trainingHistorySearchFormDefaultValues: TrainingHistorySearchForm =
  {
    employeeId: null,
  };

export const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};
