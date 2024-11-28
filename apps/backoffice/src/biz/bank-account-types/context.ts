import { createFormContext } from '@mantine/form';
import type { BankAccountTypeForm, BankAccountTypeSearchForm } from './types';

export const [
  BankAccountTypeFormProvider,
  useBankAccountTypeFormContext,
  useBankAccountTypeForm,
] = createFormContext<BankAccountTypeForm>();
export const [
  BankAccountTypeSearchFormProvider,
  useBankAccountTypeSearchFormContext,
  useBankAccountTypeSearchForm,
] = createFormContext<BankAccountTypeSearchForm>();
