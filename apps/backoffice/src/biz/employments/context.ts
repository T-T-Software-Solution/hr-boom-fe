import { createFormContext } from '@mantine/form';
import type { EmploymentForm, EmploymentSearchForm } from './types';

export const [
  EmploymentFormProvider,
  useEmploymentFormContext,
  useEmploymentForm,
] = createFormContext<EmploymentForm>();
export const [
  EmploymentSearchFormProvider,
  useEmploymentSearchFormContext,
  useEmploymentSearchForm,
] = createFormContext<EmploymentSearchForm>();
