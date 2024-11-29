import type { backofficeComponents } from '@tt-ss-hr/api';
import z from 'zod';

export const prefixEnCreateSchema = z.object({
  name: z
    .string({ message: 'กรุณาระบุ คำนำหน้าชื่อ' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'คำนำหน้าชื่อ ต้องไม่เป็นค่าว่าง',
    }),
});

export const prefixEnUpdateSchema = z.object({
  id: z.string({ message: 'กรุณาระบุ รหัสคำนำหน้าชื่อ (EN)' }).nullish(),
  name: z
    .string({ message: 'กรุณาระบุ คำนำหน้าชื่อ' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'คำนำหน้าชื่อ ต้องไม่เป็นค่าว่าง',
    }),
});

export const prefixEnSearchSchema = z.object({
  name: z.string({ message: 'กรุณาระบุ คำนำหน้าชื่อ' }).nullish(),
});

export type PrefixEn = backofficeComponents['schemas']['PrefixEnVm'];
export type PrefixEnCreate = z.infer<typeof prefixEnCreateSchema>;
export type PrefixEnUpdate = z.infer<typeof prefixEnUpdateSchema>;
export type PrefixEnForm = PrefixEnCreate & PrefixEnUpdate;
export type PrefixEnSearchForm = z.infer<typeof prefixEnSearchSchema>;
