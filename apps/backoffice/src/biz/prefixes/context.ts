import { createFormContext } from '@mantine/form';
import type { PrefixForm, PrefixSearchForm } from './types';

export const [PrefixFormProvider, usePrefixFormContext, usePrefixForm] =
  createFormContext<PrefixForm>();
export const [
  PrefixSearchFormProvider,
  usePrefixSearchFormContext,
  usePrefixSearchForm,
] = createFormContext<PrefixSearchForm>();
