import type { backofficeComponents } from '@tt-ss-hr/api';
import z from 'zod';

export const prefixEnCreateSchema = z.object({
  name: z
    .string({ message: 'คำนำหน้าชื่อ is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'คำนำหน้าชื่อ ต้องไม่เป็นค่าว่าง',
    }),
});

export const prefixEnUpdateSchema = z.object({
  id: z.string({ message: 'รหัสคำนำหน้าชื่อ (EN) is required' }).nullish(),
  name: z
    .string({ message: 'คำนำหน้าชื่อ is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'คำนำหน้าชื่อ ต้องไม่เป็นค่าว่าง',
    }),
});

export const prefixEnSearchSchema = z.object({
  name: z.string({ message: 'คำนำหน้าชื่อ is required' }).nullish(),
});

export type PrefixEn = backofficeComponents['schemas']['PrefixEnVm'];
export type PrefixEnCreate = z.infer<typeof prefixEnCreateSchema>;
export type PrefixEnUpdate = z.infer<typeof prefixEnUpdateSchema>;
export type PrefixEnForm = PrefixEnCreate & PrefixEnUpdate;
export type PrefixEnSearchForm = z.infer<typeof prefixEnSearchSchema>;
