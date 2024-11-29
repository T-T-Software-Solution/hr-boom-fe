import type { backofficeComponents } from '@tt-ss-hr/api';
import z from 'zod';

export const bankAccountTypeCreateSchema = z.object({
  name: z
    .string({ message: 'กรุณาระบุ ชื่อประเภทบัญชีธนาคาร' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อประเภทบัญชีธนาคาร ต้องไม่เป็นค่าว่าง',
    }),
});

export const bankAccountTypeUpdateSchema = z.object({
  id: z.string({ message: 'กรุณาระบุ รหัสประเภทบัญชีธนาคาร' }).nullish(),
  name: z
    .string({ message: 'กรุณาระบุ ชื่อประเภทบัญชีธนาคาร' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อประเภทบัญชีธนาคาร ต้องไม่เป็นค่าว่าง',
    }),
});

export const bankAccountTypeSearchSchema = z.object({
  name: z.string({ message: 'กรุณาระบุ ชื่อประเภทบัญชีธนาคาร' }).nullish(),
});

export type BankAccountType =
  backofficeComponents['schemas']['BankAccountTypeVm'];
export type BankAccountTypeCreate = z.infer<typeof bankAccountTypeCreateSchema>;
export type BankAccountTypeUpdate = z.infer<typeof bankAccountTypeUpdateSchema>;
export type BankAccountTypeForm = BankAccountTypeCreate & BankAccountTypeUpdate;
export type BankAccountTypeSearchForm = z.infer<
  typeof bankAccountTypeSearchSchema
>;
