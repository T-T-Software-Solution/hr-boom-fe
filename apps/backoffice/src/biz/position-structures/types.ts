import type { backofficeComponents } from '@tt-ss-hr/api';
import z from 'zod';

export const positionStructureCreateSchema = z.object({
  positionStructureTypeId: z
    .string({ message: 'กรุณาระบุ ชนิดของตำแหน่ง' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชนิดของตำแหน่ง ต้องไม่เป็นค่าว่าง',
    }),
  code: z
    .string({ message: 'กรุณาระบุ รหัสของตำแหน่ง' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'รหัสของตำแหน่ง ต้องไม่เป็นค่าว่าง',
    }),
  name: z
    .string({ message: 'กรุณาระบุ ชื่อตำแหน่ง' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อตำแหน่ง ต้องไม่เป็นค่าว่าง',
    }),
  nameEn: z.string({ message: 'กรุณาระบุ ชื่อตำแหน่งงาน (EN)' }).nullable(),
  level: z.string({ message: 'กรุณาระบุ ระดับตำแหน่ง' }).nullable(),
  salary: z
    .union([
      z.number({ message: 'กรุณาระบุ เงินเดือนประจำตำแหน่ง' }),
      z.string({ message: 'กรุณาระบุ เงินเดือนประจำตำแหน่ง' }),
    ])
    .nullable(),
  description: z
    .string({ message: 'กรุณาระบุ คำอธิบายโครงสร้างตำแหน่ง' })
    .nullable(),
  descriptionEn: z
    .string({ message: 'กรุณาระบุ คำอธิบายของตำแหน่งงาน (EN)' })
    .nullable(),
  parentId: z.string({ message: 'กรุณาระบุ รหัสหัวหน้าโดยตำแหน่ง' }).nullable(),
});

export const positionStructureUpdateSchema = z.object({
  id: z.string({ message: 'กรุณาระบุ รหัสของตำแหน่ง' }).nullish(),
  positionStructureTypeId: z
    .string({ message: 'กรุณาระบุ ชนิดของตำแหน่ง' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชนิดของตำแหน่ง ต้องไม่เป็นค่าว่าง',
    }),
  code: z
    .string({ message: 'กรุณาระบุ รหัสของตำแหน่ง' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'รหัสของตำแหน่ง ต้องไม่เป็นค่าว่าง',
    }),
  name: z
    .string({ message: 'กรุณาระบุ ชื่อตำแหน่ง' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อตำแหน่ง ต้องไม่เป็นค่าว่าง',
    }),
  nameEn: z.string({ message: 'กรุณาระบุ ชื่อตำแหน่งงาน (EN)' }).nullable(),
  level: z.string({ message: 'กรุณาระบุ ระดับตำแหน่ง' }).nullable(),
  salary: z
    .union([
      z.number({ message: 'กรุณาระบุ เงินเดือนประจำตำแหน่ง' }),
      z.string({ message: 'กรุณาระบุ เงินเดือนประจำตำแหน่ง' }),
    ])
    .nullable(),
  description: z
    .string({ message: 'กรุณาระบุ คำอธิบายโครงสร้างตำแหน่ง' })
    .nullable(),
  descriptionEn: z
    .string({ message: 'กรุณาระบุ คำอธิบายของตำแหน่งงาน (EN)' })
    .nullable(),
  parentId: z.string({ message: 'กรุณาระบุ รหัสหัวหน้าโดยตำแหน่ง' }).nullable(),
});

export const positionStructureSearchSchema = z.object({
  name: z.string({ message: 'กรุณาระบุ ชื่อตำแหน่ง' }).nullish(),
  level: z.string({ message: 'กรุณาระบุ ระดับตำแหน่ง' }).nullish(),
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
