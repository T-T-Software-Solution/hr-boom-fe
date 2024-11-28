import dayjs from 'dayjs';
import type {
  SocialSecurityTypeForm,
  SocialSecurityTypeSearchForm,
} from './types';

export const socialSecurityTypeFormDefaultValues: SocialSecurityTypeForm = {
  name: '',
  id: '',
};

export const socialSecurityTypeSearchFormDefaultValues: SocialSecurityTypeSearchForm =
  {
    name: null,
  };

export const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};
