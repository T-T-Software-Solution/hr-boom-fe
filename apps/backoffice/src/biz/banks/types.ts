import type { backofficeComponents } from '@tt-ss-hr/api';
import z from 'zod';

export const bankCreateSchema = z.object({
  name: z
    .string({ message: 'ชื่อธนาคาร is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อธนาคาร ต้องไม่เป็นค่าว่าง',
    }),
});

export const bankUpdateSchema = z.object({
  id: z.string({ message: 'รหัสธนาคาร is required' }).nullish(),
  name: z
    .string({ message: 'ชื่อธนาคาร is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อธนาคาร ต้องไม่เป็นค่าว่าง',
    }),
});

export const bankSearchSchema = z.object({
  name: z.string({ message: 'ชื่อธนาคาร is required' }).nullish(),
});

export type Bank = backofficeComponents['schemas']['BankVm'];
export type BankCreate = z.infer<typeof bankCreateSchema>;
export type BankUpdate = z.infer<typeof bankUpdateSchema>;
export type BankForm = BankCreate & BankUpdate;
export type BankSearchForm = z.infer<typeof bankSearchSchema>;
