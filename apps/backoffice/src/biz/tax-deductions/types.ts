import type { backofficeComponents } from '@tt-ss-hr/api';
import z from 'zod';

export const taxDeductionCreateSchema = z.object({
  name: z
    .string({ message: 'ชื่อรายการลดหย่อนภาษี is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อรายการลดหย่อนภาษี ต้องไม่เป็นค่าว่าง',
    }),
  value: z
    .union([
      z
        .number({ message: 'มูลค่าการลดหย่อนภาษี is required' })
        .int()
        .min(0, { message: 'มูลค่าการลดหย่อนภาษี ต้องมีค่ามากกว่าหรือเท่ากับ 0' }),
      z.string({ message: 'มูลค่าการลดหย่อนภาษี is required' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'มูลค่าการลดหย่อนภาษี ต้องไม่เป็นค่าว่าง',
    }),
});

export const taxDeductionUpdateSchema = z.object({
  id: z.string({ message: 'รหัสลดหย่อนภาษี is required' }).nullish(),
  name: z
    .string({ message: 'ชื่อรายการลดหย่อนภาษี is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อรายการลดหย่อนภาษี ต้องไม่เป็นค่าว่าง',
    }),
  value: z
    .union([
      z
        .number({ message: 'มูลค่าการลดหย่อนภาษี is required' })
        .int()
        .min(0, { message: 'มูลค่าการลดหย่อนภาษี ต้องมีค่ามากกว่าหรือเท่ากับ 0' }),
      z.string({ message: 'มูลค่าการลดหย่อนภาษี is required' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'มูลค่าการลดหย่อนภาษี ต้องไม่เป็นค่าว่าง',
    }),
});

export const taxDeductionSearchSchema = z.object({
  name: z.string({ message: 'ชื่อรายการลดหย่อนภาษี is required' }).nullish(),
  value: z
    .union([
      z.number({ message: 'มูลค่าการลดหย่อนภาษี is required' }).int(),
      z.string({ message: 'มูลค่าการลดหย่อนภาษี is required' }),
    ])
    .nullish(),
});

export type TaxDeduction = backofficeComponents['schemas']['TaxDeductionVm'];
export type TaxDeductionCreate = z.infer<typeof taxDeductionCreateSchema>;
export type TaxDeductionUpdate = z.infer<typeof taxDeductionUpdateSchema>;
export type TaxDeductionForm = TaxDeductionCreate & TaxDeductionUpdate;
export type TaxDeductionSearchForm = z.infer<typeof taxDeductionSearchSchema>;
