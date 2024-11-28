import type { backofficeComponents } from '@tt-ss-hr/api';
import z from 'zod';

export const positionStructureCreateSchema = z.object({
  positionStructureTypeId: z
    .string({ message: 'ชนิดของตำแหน่ง is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชนิดของตำแหน่ง ต้องไม่เป็นค่าว่าง',
    }),
  code: z
    .string({ message: 'รหัสของตำแหน่ง is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'รหัสของตำแหน่ง ต้องไม่เป็นค่าว่าง',
    }),
  name: z
    .string({ message: 'ชื่อตำแหน่ง is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อตำแหน่ง ต้องไม่เป็นค่าว่าง',
    }),
  nameEn: z.string({ message: 'ชื่อตำแหน่งงาน (EN) is required' }).nullable(),
  level: z.string({ message: 'ระดับตำแหน่ง is required' }).nullable(),
  salary: z
    .union([
      z.number({ message: 'เงินเดือนประจำตำแหน่ง is required' }),
      z.string({ message: 'เงินเดือนประจำตำแหน่ง is required' }),
    ])
    .nullable(),
  description: z
    .string({ message: 'คำอธิบายโครงสร้างตำแหน่ง is required' })
    .nullable(),
  descriptionEn: z
    .string({ message: 'คำอธิบายของตำแหน่งงาน (EN) is required' })
    .nullable(),
  parentId: z.string({ message: 'รหัสหัวหน้าโดยตำแหน่ง is required' }).nullable(),
});

export const positionStructureUpdateSchema = z.object({
  id: z.string({ message: 'รหัสของตำแหน่ง is required' }).nullish(),
  positionStructureTypeId: z
    .string({ message: 'ชนิดของตำแหน่ง is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชนิดของตำแหน่ง ต้องไม่เป็นค่าว่าง',
    }),
  code: z
    .string({ message: 'รหัสของตำแหน่ง is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'รหัสของตำแหน่ง ต้องไม่เป็นค่าว่าง',
    }),
  name: z
    .string({ message: 'ชื่อตำแหน่ง is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อตำแหน่ง ต้องไม่เป็นค่าว่าง',
    }),
  nameEn: z.string({ message: 'ชื่อตำแหน่งงาน (EN) is required' }).nullable(),
  level: z.string({ message: 'ระดับตำแหน่ง is required' }).nullable(),
  salary: z
    .union([
      z.number({ message: 'เงินเดือนประจำตำแหน่ง is required' }),
      z.string({ message: 'เงินเดือนประจำตำแหน่ง is required' }),
    ])
    .nullable(),
  description: z
    .string({ message: 'คำอธิบายโครงสร้างตำแหน่ง is required' })
    .nullable(),
  descriptionEn: z
    .string({ message: 'คำอธิบายของตำแหน่งงาน (EN) is required' })
    .nullable(),
  parentId: z.string({ message: 'รหัสหัวหน้าโดยตำแหน่ง is required' }).nullable(),
});

export const positionStructureSearchSchema = z.object({
  name: z.string({ message: 'ชื่อตำแหน่ง is required' }).nullish(),
  level: z.string({ message: 'ระดับตำแหน่ง is required' }).nullish(),
});

export type PositionStructure =
  backofficeComponents['schemas']['PositionStructureVm'];
export type PositionStructureCreate = z.infer<
  typeof positionStructureCreateSchema
>;
export type PositionStructureUpdate = z.infer<
  typeof positionStructureUpdateSchema
>;
export type PositionStructureForm = PositionStructureCreate &
  PositionStructureUpdate;
export type PositionStructureSearchForm = z.infer<
  typeof positionStructureSearchSchema
>;
