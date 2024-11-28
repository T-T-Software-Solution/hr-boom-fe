import type { backofficeComponents } from '@tt-ss-hr/api';
import z from 'zod';

export const positionStructureTypeCreateSchema = z.object({
  name: z
    .string({ message: 'ชื่อชนิดของตำแหน่ง is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อชนิดของตำแหน่ง ต้องไม่เป็นค่าว่าง',
    }),
  code: z
    .string({ message: 'โค้ดชนิดของตำแหน่ง is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'โค้ดชนิดของตำแหน่ง ต้องไม่เป็นค่าว่าง',
    }),
});

export const positionStructureTypeUpdateSchema = z.object({
  id: z.string({ message: 'รหัสชนิดของตำแหน่ง is required' }).nullish(),
  name: z
    .string({ message: 'ชื่อชนิดของตำแหน่ง is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อชนิดของตำแหน่ง ต้องไม่เป็นค่าว่าง',
    }),
  code: z
    .string({ message: 'โค้ดชนิดของตำแหน่ง is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'โค้ดชนิดของตำแหน่ง ต้องไม่เป็นค่าว่าง',
    }),
});

export const positionStructureTypeSearchSchema = z.object({
  name: z.string({ message: 'ชื่อชนิดของตำแหน่ง is required' }).nullish(),
  code: z.string({ message: 'โค้ดชนิดของตำแหน่ง is required' }).nullish(),
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
