import { createFormContext } from '@mantine/form';
import type { EducationLevelForm, EducationLevelSearchForm } from './types';

export const [
  EducationLevelFormProvider,
  useEducationLevelFormContext,
  useEducationLevelForm,
] = createFormContext<EducationLevelForm>();
export const [
  EducationLevelSearchFormProvider,
  useEducationLevelSearchFormContext,
  useEducationLevelSearchForm,
] = createFormContext<EducationLevelSearchForm>();
