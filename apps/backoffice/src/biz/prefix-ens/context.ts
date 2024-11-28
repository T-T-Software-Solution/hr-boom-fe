import { createFormContext } from '@mantine/form';
import type { PrefixEnForm, PrefixEnSearchForm } from './types';

export const [PrefixEnFormProvider, usePrefixEnFormContext, usePrefixEnForm] =
  createFormContext<PrefixEnForm>();
export const [
  PrefixEnSearchFormProvider,
  usePrefixEnSearchFormContext,
  usePrefixEnSearchForm,
] = createFormContext<PrefixEnSearchForm>();
