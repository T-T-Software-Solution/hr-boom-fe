import dayjs from 'dayjs';
import type { DocumentFileForm, DocumentFileSearchForm } from './types';

export const documentFileFormDefaultValues: DocumentFileForm = {
  employeeId: '',
  filePath: null,
  fileType: '',
  note: '',
  id: '',
};

export const documentFileSearchFormDefaultValues: DocumentFileSearchForm = {
  employeeId: null,
};

export const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};
