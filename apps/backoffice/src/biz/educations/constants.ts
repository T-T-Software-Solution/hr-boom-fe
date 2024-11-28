import dayjs from 'dayjs';
import type { EducationForm, EducationSearchForm } from './types';

export const educationFormDefaultValues: EducationForm = {
  employeeId: '',
  educationLevelId: '',
  institutionGraduated: '',
  dateStart: dayjs().toDate(),
  dateGraduation: dayjs().toDate(),
  faculty: '',
  major: '',
  id: '',
};

export const educationSearchFormDefaultValues: EducationSearchForm = {
  employeeId: null,
  educationLevelId: null,
  institutionGraduated: null,
};

export const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};
