import dayjs from 'dayjs';
import type { OrgStructureForm, OrgStructureSearchForm } from './types';

export const orgStructureFormDefaultValues: OrgStructureForm = {
  orgStructureTypeId: '',
  code: '',
  name: '',
  nameEn: null,
  taxId: null,
  taxId2: null,
  socialSecurityTypeId: null,
  addressTh: null,
  addressEn: null,
  provinceId: null,
  district: null,
  subdistrict: null,
  postalCode: null,
  phoneNumber: null,
  faxNumber: null,
  emailCompany: null,
  logoCompanyPath: null,
  description: null,
  parentId: null,
  id: '',
};

export const orgStructureSearchFormDefaultValues: OrgStructureSearchForm = {
  code: null,
  name: null,
  nameEn: null,
};

export const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};
