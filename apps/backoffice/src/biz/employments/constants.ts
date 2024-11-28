import dayjs from 'dayjs';
import type { EmploymentForm, EmploymentSearchForm } from './types';

export const employmentFormDefaultValues: EmploymentForm = {
  employeeId: '',
  employmentStartDate: dayjs().toDate(),
  yearsOfWork: '',
  monthsOfWork: '',
  daysOfWork: '',
  orgStructureId: '',
  positionStructureId: '',
  employeeTypeId: '',
  socialSecurityTypeId: '',
  salary: '',
  withholdingTax: '',
  isWithholdingTax: false,
  taxConditionId: '',
  taxBracketId: '',
  netSalary: '',
  paymentChannelId: '',
  bankId: '',
  bankBranch: '',
  bankAccountNumber: '',
  bankAccountTypeId: '',
  note: '',
  id: '',
};

export const employmentSearchFormDefaultValues: EmploymentSearchForm = {
  employeeId: null,
  employmentStartDate: null,
  orgStructureId: null,
  positionStructureId: null,
  employeeTypeId: null,
  socialSecurityTypeId: null,
};

export const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};
