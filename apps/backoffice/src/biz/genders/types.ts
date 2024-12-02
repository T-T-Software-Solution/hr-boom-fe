import type { backofficeComponents } from '@tt-ss-hr/api';
import z from 'zod';

export const genderCreateSchema = z.object({
  name: z
    .string({ message: 'กรุณาระบุ เพศ' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'เพศ ต้องไม่เป็นค่าว่าง' }),
});

export const genderUpdateSchema = z.object({
  id: z.string({ message: 'กรุณาระบุ รหัสเพศ' }).nullish(),
  name: z
    .string({ message: 'กรุณาระบุ เพศ' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'เพศ ต้องไม่เป็นค่าว่าง' }),
});

export const genderSearchSchema = z.object({
  name: z.string({ message: 'กรุณาระบุ เพศ' }).nullish(),
});

export type Gender = backofficeComponents['schemas']['GenderVm'];
export type GenderCreate = z.infer<typeof genderCreateSchema>;
export type GenderUpdate = z.infer<typeof genderUpdateSchema>;
export type GenderForm = GenderCreate & GenderUpdate;
export type GenderSearchForm = z.infer<typeof genderSearchSchema>;
