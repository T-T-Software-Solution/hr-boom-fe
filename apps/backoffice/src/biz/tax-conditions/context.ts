import { createFormContext } from '@mantine/form';
import type { TaxConditionForm, TaxConditionSearchForm } from './types';

export const [
  TaxConditionFormProvider,
  useTaxConditionFormContext,
  useTaxConditionForm,
] = createFormContext<TaxConditionForm>();
export const [
  TaxConditionSearchFormProvider,
  useTaxConditionSearchFormContext,
  useTaxConditionSearchForm,
] = createFormContext<TaxConditionSearchForm>();
