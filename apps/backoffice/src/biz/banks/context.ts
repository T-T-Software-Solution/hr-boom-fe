import { createFormContext } from '@mantine/form';
import type { BankForm, BankSearchForm } from './types';

export const [BankFormProvider, useBankFormContext, useBankForm] =
  createFormContext<BankForm>();
export const [
  BankSearchFormProvider,
  useBankSearchFormContext,
  useBankSearchForm,
] = createFormContext<BankSearchForm>();
