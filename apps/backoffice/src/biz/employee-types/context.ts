import { createFormContext } from '@mantine/form';
import type { EmployeeTypeForm, EmployeeTypeSearchForm } from './types';

export const [
  EmployeeTypeFormProvider,
  useEmployeeTypeFormContext,
  useEmployeeTypeForm,
] = createFormContext<EmployeeTypeForm>();
export const [
  EmployeeTypeSearchFormProvider,
  useEmployeeTypeSearchFormContext,
  useEmployeeTypeSearchForm,
] = createFormContext<EmployeeTypeSearchForm>();
