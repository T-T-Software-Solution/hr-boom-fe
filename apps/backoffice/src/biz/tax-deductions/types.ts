import type { backofficeComponents } from '@tt-ss-hr/api';
import z from 'zod';

export const taxDeductionCreateSchema = z.object({
  name: z
    .string({ message: 'กรุณาระบุ ชื่อรายการลดหย่อนภาษี' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อรายการลดหย่อนภาษี ต้องไม่เป็นค่าว่าง',
    }),
  value: z
    .union([
      z
        .number({ message: 'กรุณาระบุ มูลค่าการลดหย่อนภาษี' })
        .int()
        .min(0, { message: 'มูลค่าการลดหย่อนภาษี ต้องมีค่ามากกว่าหรือเท่ากับ 0' }),
      z.string({ message: 'กรุณาระบุ มูลค่าการลดหย่อนภาษี' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'มูลค่าการลดหย่อนภาษี ต้องไม่เป็นค่าว่าง',
    }),
});

export const taxDeductionUpdateSchema = z.object({
  id: z.string({ message: 'กรุณาระบุ รหัสลดหย่อนภาษี' }).nullish(),
  name: z
    .string({ message: 'กรุณาระบุ ชื่อรายการลดหย่อนภาษี' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อรายการลดหย่อนภาษี ต้องไม่เป็นค่าว่าง',
    }),
  value: z
    .union([
      z
        .number({ message: 'กรุณาระบุ มูลค่าการลดหย่อนภาษี' })
        .int()
        .min(0, { message: 'มูลค่าการลดหย่อนภาษี ต้องมีค่ามากกว่าหรือเท่ากับ 0' }),
      z.string({ message: 'กรุณาระบุ มูลค่าการลดหย่อนภาษี' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'มูลค่าการลดหย่อนภาษี ต้องไม่เป็นค่าว่าง',
    }),
});

export const taxDeductionSearchSchema = z.object({
  name: z.string({ message: 'กรุณาระบุ ชื่อรายการลดหย่อนภาษี' }).nullish(),
  value: z
    .union([
      z.number({ message: 'กรุณาระบุ มูลค่าการลดหย่อนภาษี' }).int(),
      z.string({ message: 'กรุณาระบุ มูลค่าการลดหย่อนภาษี' }),
    ])
    .nullish(),
});

export type TaxDeduction = backofficeComponents['schemas']['TaxDeductionVm'];
export type TaxDeductionCreate = z.infer<typeof taxDeductionCreateSchema>;
export type TaxDeductionUpdate = z.infer<typeof taxDeductionUpdateSchema>;
export type TaxDeductionForm = TaxDeductionCreate & TaxDeductionUpdate;
export type TaxDeductionSearchForm = z.infer<typeof taxDeductionSearchSchema>;
