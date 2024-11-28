import type { backofficeComponents } from '@tt-ss-hr/api';
import z from 'zod';

export const educationLevelCreateSchema = z.object({
  name: z
    .string({ message: 'ชื่อวุฒิการศึกษา is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อวุฒิการศึกษา ต้องไม่เป็นค่าว่าง',
    }),
});

export const educationLevelUpdateSchema = z.object({
  id: z.string({ message: 'รหัสวุฒิการศึกษา is required' }).nullish(),
  name: z
    .string({ message: 'ชื่อวุฒิการศึกษา is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อวุฒิการศึกษา ต้องไม่เป็นค่าว่าง',
    }),
});

export const educationLevelSearchSchema = z.object({
  name: z.string({ message: 'ชื่อวุฒิการศึกษา is required' }).nullish(),
});

export type EducationLevel =
  backofficeComponents['schemas']['EducationLevelVm'];
export type EducationLevelCreate = z.infer<typeof educationLevelCreateSchema>;
export type EducationLevelUpdate = z.infer<typeof educationLevelUpdateSchema>;
export type EducationLevelForm = EducationLevelCreate & EducationLevelUpdate;
export type EducationLevelSearchForm = z.infer<
  typeof educationLevelSearchSchema
>;
