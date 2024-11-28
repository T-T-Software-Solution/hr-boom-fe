import { createFormContext } from '@mantine/form';
import type { OrgStructureForm, OrgStructureSearchForm } from './types';

export const [
  OrgStructureFormProvider,
  useOrgStructureFormContext,
  useOrgStructureForm,
] = createFormContext<OrgStructureForm>();
export const [
  OrgStructureSearchFormProvider,
  useOrgStructureSearchFormContext,
  useOrgStructureSearchForm,
] = createFormContext<OrgStructureSearchForm>();
