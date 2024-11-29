import type { backofficeComponents } from '@tt-ss-hr/api';
import z from 'zod';

export const prefixCreateSchema = z.object({
  name: z
    .string({ message: 'กรุณาระบุ คำนำหน้าชื่อ' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'คำนำหน้าชื่อ ต้องไม่เป็นค่าว่าง',
    }),
});

export const prefixUpdateSchema = z.object({
  id: z.string({ message: 'กรุณาระบุ รหัสคำนำหน้าชื่อ' }).nullish(),
  name: z
    .string({ message: 'กรุณาระบุ คำนำหน้าชื่อ' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'คำนำหน้าชื่อ ต้องไม่เป็นค่าว่าง',
    }),
});

export const prefixSearchSchema = z.object({
  name: z.string({ message: 'กรุณาระบุ คำนำหน้าชื่อ' }).nullish(),
});

export type Prefix = backofficeComponents['schemas']['PrefixVm'];
export type PrefixCreate = z.infer<typeof prefixCreateSchema>;
export type PrefixUpdate = z.infer<typeof prefixUpdateSchema>;
export type PrefixForm = PrefixCreate & PrefixUpdate;
export type PrefixSearchForm = z.infer<typeof prefixSearchSchema>;
