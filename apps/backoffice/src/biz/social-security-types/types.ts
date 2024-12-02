import type { backofficeComponents } from '@tt-ss-hr/api';
import z from 'zod';

export const socialSecurityTypeCreateSchema = z.object({
  name: z
    .string({ message: 'กรุณาระบุ ชื่อสิทธิ์ประกันสังคม' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อสิทธิ์ประกันสังคม ต้องไม่เป็นค่าว่าง',
    }),
});

export const socialSecurityTypeUpdateSchema = z.object({
  id: z.string({ message: 'กรุณาระบุ รหัสสิทธิ์ประกันสังคม' }).nullish(),
  name: z
    .string({ message: 'กรุณาระบุ ชื่อสิทธิ์ประกันสังคม' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อสิทธิ์ประกันสังคม ต้องไม่เป็นค่าว่าง',
    }),
});

export const socialSecurityTypeSearchSchema = z.object({
  name: z.string({ message: 'กรุณาระบุ ชื่อสิทธิ์ประกันสังคม' }).nullish(),
});

export type SocialSecurityType =
  backofficeComponents['schemas']['SocialSecurityTypeVm'];
export type SocialSecurityTypeCreate = z.infer<
  typeof socialSecurityTypeCreateSchema
>;
export type SocialSecurityTypeUpdate = z.infer<
  typeof socialSecurityTypeUpdateSchema
>;
export type SocialSecurityTypeForm = SocialSecurityTypeCreate &
  SocialSecurityTypeUpdate;
export type SocialSecurityTypeSearchForm = z.infer<
  typeof socialSecurityTypeSearchSchema
>;
