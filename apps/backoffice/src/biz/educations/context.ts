import { createFormContext } from '@mantine/form';
import type { EducationForm, EducationSearchForm } from './types';

export const [
  EducationFormProvider,
  useEducationFormContext,
  useEducationForm,
] = createFormContext<EducationForm>();
export const [
  EducationSearchFormProvider,
  useEducationSearchFormContext,
  useEducationSearchForm,
] = createFormContext<EducationSearchForm>();
