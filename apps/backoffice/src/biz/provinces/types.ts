import type { backofficeComponents } from '@tt-ss-hr/api';
import z from 'zod';

export const provinceCreateSchema = z.object({
  name: z
    .string({ message: 'กรุณาระบุ ชื่อจังหวัด' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อจังหวัด ต้องไม่เป็นค่าว่าง',
    }),
});

export const provinceUpdateSchema = z.object({
  id: z.string({ message: 'กรุณาระบุ รหัสจังหวัด' }).nullish(),
  name: z
    .string({ message: 'กรุณาระบุ ชื่อจังหวัด' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อจังหวัด ต้องไม่เป็นค่าว่าง',
    }),
});

export const provinceSearchSchema = z.object({
  name: z.string({ message: 'กรุณาระบุ ชื่อจังหวัด' }).nullish(),
});

export type Province = backofficeComponents['schemas']['ProvinceVm'];
export type ProvinceCreate = z.infer<typeof provinceCreateSchema>;
export type ProvinceUpdate = z.infer<typeof provinceUpdateSchema>;
export type ProvinceForm = ProvinceCreate & ProvinceUpdate;
export type ProvinceSearchForm = z.infer<typeof provinceSearchSchema>;
