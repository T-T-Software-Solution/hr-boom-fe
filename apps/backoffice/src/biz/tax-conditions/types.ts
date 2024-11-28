import type { backofficeComponents } from '@tt-ss-hr/api';
import z from 'zod';

export const taxConditionCreateSchema = z.object({
  name: z
    .string({ message: 'ชื่อเงื่อนไขการหักภาษี is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อเงื่อนไขการหักภาษี ต้องไม่เป็นค่าว่าง',
    }),
});

export const taxConditionUpdateSchema = z.object({
  id: z.string({ message: 'รหัสเงื่อนไขการหักภาษี is required' }).nullish(),
  name: z
    .string({ message: 'ชื่อเงื่อนไขการหักภาษี is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อเงื่อนไขการหักภาษี ต้องไม่เป็นค่าว่าง',
    }),
});

export const taxConditionSearchSchema = z.object({
  name: z.string({ message: 'ชื่อเงื่อนไขการหักภาษี is required' }).nullish(),
});

export type TaxCondition = backofficeComponents['schemas']['TaxConditionVm'];
export type TaxConditionCreate = z.infer<typeof taxConditionCreateSchema>;
export type TaxConditionUpdate = z.infer<typeof taxConditionUpdateSchema>;
export type TaxConditionForm = TaxConditionCreate & TaxConditionUpdate;
export type TaxConditionSearchForm = z.infer<typeof taxConditionSearchSchema>;
