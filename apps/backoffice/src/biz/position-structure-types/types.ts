import type { backofficeComponents } from '@tt-ss-hr/api';
import z from 'zod';

export const positionStructureTypeCreateSchema = z.object({
  name: z
    .string({ message: 'กรุณาระบุ ชื่อชนิดของตำแหน่ง' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อชนิดของตำแหน่ง ต้องไม่เป็นค่าว่าง',
    }),
  code: z
    .string({ message: 'กรุณาระบุ โค้ดชนิดของตำแหน่ง' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'โค้ดชนิดของตำแหน่ง ต้องไม่เป็นค่าว่าง',
    }),
});

export const positionStructureTypeUpdateSchema = z.object({
  id: z.string({ message: 'กรุณาระบุ รหัสชนิดของตำแหน่ง' }).nullish(),
  name: z
    .string({ message: 'กรุณาระบุ ชื่อชนิดของตำแหน่ง' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อชนิดของตำแหน่ง ต้องไม่เป็นค่าว่าง',
    }),
  code: z
    .string({ message: 'กรุณาระบุ โค้ดชนิดของตำแหน่ง' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'โค้ดชนิดของตำแหน่ง ต้องไม่เป็นค่าว่าง',
    }),
});

export const positionStructureTypeSearchSchema = z.object({
  name: z.string({ message: 'กรุณาระบุ ชื่อชนิดของตำแหน่ง' }).nullish(),
  code: z.string({ message: 'กรุณาระบุ โค้ดชนิดของตำแหน่ง' }).nullish(),
});

export type PositionStructureType =
  backofficeComponents['schemas']['PositionStructureTypeVm'];
export type PositionStructureTypeCreate = z.infer<
  typeof positionStructureTypeCreateSchema
>;
export type PositionStructureTypeUpdate = z.infer<
  typeof positionStructureTypeUpdateSchema
>;
export type PositionStructureTypeForm = PositionStructureTypeCreate &
  PositionStructureTypeUpdate;
export type PositionStructureTypeSearchForm = z.infer<
  typeof positionStructureTypeSearchSchema
>;
