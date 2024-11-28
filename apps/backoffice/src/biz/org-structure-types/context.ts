import { createFormContext } from '@mantine/form';
import type { OrgStructureTypeForm, OrgStructureTypeSearchForm } from './types';

export const [
  OrgStructureTypeFormProvider,
  useOrgStructureTypeFormContext,
  useOrgStructureTypeForm,
] = createFormContext<OrgStructureTypeForm>();
export const [
  OrgStructureTypeSearchFormProvider,
  useOrgStructureTypeSearchFormContext,
  useOrgStructureTypeSearchForm,
] = createFormContext<OrgStructureTypeSearchForm>();
