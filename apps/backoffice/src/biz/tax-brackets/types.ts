import type { backofficeComponents } from '@tt-ss-hr/api';
import z from 'zod';

export const taxBracketCreateSchema = z.object({
  name: z
    .string({ message: 'กรุณาระบุ อัตราภาษี' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'อัตราภาษี ต้องไม่เป็นค่าว่าง',
    }),
  maxIncome: z
    .union([
      z
        .number({ message: 'กรุณาระบุ รายได้สูงสุดที่อยู่ในระดับภาษีนั้น' })
        .int()
        .min(0, { message: 'รายได้สูงสุดที่อยู่ในระดับภาษีนั้น ต้องมีค่ามากกว่าหรือเท่ากับ 0' }),
      z.string({ message: 'กรุณาระบุ รายได้สูงสุดที่อยู่ในระดับภาษีนั้น' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'รายได้สูงสุดที่อยู่ในระดับภาษีนั้น ต้องไม่เป็นค่าว่าง',
    }),
});

export const taxBracketUpdateSchema = z.object({
  id: z.string({ message: 'กรุณาระบุ รหัสระดับภาษี' }).nullish(),
  name: z
    .string({ message: 'กรุณาระบุ อัตราภาษี' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'อัตราภาษี ต้องไม่เป็นค่าว่าง',
    }),
  maxIncome: z
    .union([
      z
        .number({ message: 'กรุณาระบุ รายได้สูงสุดที่อยู่ในระดับภาษีนั้น' })
        .int()
        .min(0, { message: 'รายได้สูงสุดที่อยู่ในระดับภาษีนั้น ต้องมีค่ามากกว่าหรือเท่ากับ 0' }),
      z.string({ message: 'กรุณาระบุ รายได้สูงสุดที่อยู่ในระดับภาษีนั้น' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'รายได้สูงสุดที่อยู่ในระดับภาษีนั้น ต้องไม่เป็นค่าว่าง',
    }),
});

export const taxBracketSearchSchema = z.object({
  name: z.string({ message: 'กรุณาระบุ อัตราภาษี' }).nullish(),
});

export type TaxBracket = backofficeComponents['schemas']['TaxBracketVm'];
export type TaxBracketCreate = z.infer<typeof taxBracketCreateSchema>;
export type TaxBracketUpdate = z.infer<typeof taxBracketUpdateSchema>;
export type TaxBracketForm = TaxBracketCreate & TaxBracketUpdate;
export type TaxBracketSearchForm = z.infer<typeof taxBracketSearchSchema>;
