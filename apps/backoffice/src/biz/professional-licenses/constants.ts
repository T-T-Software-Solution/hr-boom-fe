import dayjs from 'dayjs';
import type {
  ProfessionalLicenseForm,
  ProfessionalLicenseSearchForm,
} from './types';

export const professionalLicenseFormDefaultValues: ProfessionalLicenseForm = {
  employeeId: '',
  name: '',
  agency: '',
  numberLicense: '',
  effectiveDate: dayjs().toDate(),
  id: '',
};

export const professionalLicenseSearchFormDefaultValues: ProfessionalLicenseSearchForm =
  {
    employeeId: null,
  };

export const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};
