import { createFormContext } from '@mantine/form';
import type { CriminalHistoryForm, CriminalHistorySearchForm } from './types';

export const [
  CriminalHistoryFormProvider,
  useCriminalHistoryFormContext,
  useCriminalHistoryForm,
] = createFormContext<CriminalHistoryForm>();
export const [
  CriminalHistorySearchFormProvider,
  useCriminalHistorySearchFormContext,
  useCriminalHistorySearchForm,
] = createFormContext<CriminalHistorySearchForm>();
