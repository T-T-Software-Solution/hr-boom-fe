import dayjs from 'dayjs';
import type { EducationLevelForm, EducationLevelSearchForm } from './types';

export const educationLevelFormDefaultValues: EducationLevelForm = {
  name: '',
  id: '',
};

export const educationLevelSearchFormDefaultValues: EducationLevelSearchForm = {
  name: null,
};

export const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};
