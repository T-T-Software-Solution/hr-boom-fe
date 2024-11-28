import { createFormContext } from '@mantine/form';
import type {
  ProfessionalLicenseForm,
  ProfessionalLicenseSearchForm,
} from './types';

export const [
  ProfessionalLicenseFormProvider,
  useProfessionalLicenseFormContext,
  useProfessionalLicenseForm,
] = createFormContext<ProfessionalLicenseForm>();
export const [
  ProfessionalLicenseSearchFormProvider,
  useProfessionalLicenseSearchFormContext,
  useProfessionalLicenseSearchForm,
] = createFormContext<ProfessionalLicenseSearchForm>();
