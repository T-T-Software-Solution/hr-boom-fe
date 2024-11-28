import { createFormContext } from '@mantine/form';
import type { TaxDeductionForm, TaxDeductionSearchForm } from './types';

export const [
  TaxDeductionFormProvider,
  useTaxDeductionFormContext,
  useTaxDeductionForm,
] = createFormContext<TaxDeductionForm>();
export const [
  TaxDeductionSearchFormProvider,
  useTaxDeductionSearchFormContext,
  useTaxDeductionSearchForm,
] = createFormContext<TaxDeductionSearchForm>();
