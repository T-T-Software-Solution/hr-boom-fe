import { createFormContext } from '@mantine/form';
import type { EmployeeForm, EmployeeSearchForm } from './types';

export const [EmployeeFormProvider, useEmployeeFormContext, useEmployeeForm] =
  createFormContext<EmployeeForm>();
export const [
  EmployeeSearchFormProvider,
  useEmployeeSearchFormContext,
  useEmployeeSearchForm,
] = createFormContext<EmployeeSearchForm>();
