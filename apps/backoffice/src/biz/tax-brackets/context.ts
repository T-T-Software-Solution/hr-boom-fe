import { createFormContext } from '@mantine/form';
import type { TaxBracketForm, TaxBracketSearchForm } from './types';

export const [
  TaxBracketFormProvider,
  useTaxBracketFormContext,
  useTaxBracketForm,
] = createFormContext<TaxBracketForm>();
export const [
  TaxBracketSearchFormProvider,
  useTaxBracketSearchFormContext,
  useTaxBracketSearchForm,
] = createFormContext<TaxBracketSearchForm>();
