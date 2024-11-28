import { createFormContext } from '@mantine/form';
import type { GenderForm, GenderSearchForm } from './types';

export const [GenderFormProvider, useGenderFormContext, useGenderForm] =
  createFormContext<GenderForm>();
export const [
  GenderSearchFormProvider,
  useGenderSearchFormContext,
  useGenderSearchForm,
] = createFormContext<GenderSearchForm>();
