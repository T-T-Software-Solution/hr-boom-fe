import { createFormContext } from '@mantine/form';
import type { ProvinceForm, ProvinceSearchForm } from './types';

export const [ProvinceFormProvider, useProvinceFormContext, useProvinceForm] =
  createFormContext<ProvinceForm>();
export const [
  ProvinceSearchFormProvider,
  useProvinceSearchFormContext,
  useProvinceSearchForm,
] = createFormContext<ProvinceSearchForm>();
