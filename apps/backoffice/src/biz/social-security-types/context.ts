import { createFormContext } from '@mantine/form';
import type {
  SocialSecurityTypeForm,
  SocialSecurityTypeSearchForm,
} from './types';

export const [
  SocialSecurityTypeFormProvider,
  useSocialSecurityTypeFormContext,
  useSocialSecurityTypeForm,
] = createFormContext<SocialSecurityTypeForm>();
export const [
  SocialSecurityTypeSearchFormProvider,
  useSocialSecurityTypeSearchFormContext,
  useSocialSecurityTypeSearchForm,
] = createFormContext<SocialSecurityTypeSearchForm>();
