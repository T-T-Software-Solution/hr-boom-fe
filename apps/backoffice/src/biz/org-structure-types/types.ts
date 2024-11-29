import type { backofficeComponents } from '@tt-ss-hr/api';
import z from 'zod';

export const orgStructureTypeCreateSchema = z.object({
  name: z
    .string({ message: 'กรุณาระบุ ชื่อชนิดขององค์กร' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อชนิดขององค์กร ต้องไม่เป็นค่าว่าง',
    }),
  code: z
    .string({ message: 'กรุณาระบุ โค้ดของชนิดองค์กร' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'โค้ดของชนิดองค์กร ต้องไม่เป็นค่าว่าง',
    }),
});

export const orgStructureTypeUpdateSchema = z.object({
  id: z.string({ message: 'กรุณาระบุ รหัสชนิดขององค์กร' }).nullish(),
  name: z
    .string({ message: 'กรุณาระบุ ชื่อชนิดขององค์กร' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อชนิดขององค์กร ต้องไม่เป็นค่าว่าง',
    }),
  code: z
    .string({ message: 'กรุณาระบุ โค้ดของชนิดองค์กร' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'โค้ดของชนิดองค์กร ต้องไม่เป็นค่าว่าง',
    }),
});

export const orgStructureTypeSearchSchema = z.object({
  name: z.string({ message: 'กรุณาระบุ ชื่อชนิดขององค์กร' }).nullish(),
  code: z.string({ message: 'กรุณาระบุ โค้ดของชนิดองค์กร' }).nullish(),
});

export type OrgStructureType =
  backofficeComponents['schemas']['OrgStructureTypeVm'];
export type OrgStructureTypeCreate = z.infer<
  typeof orgStructureTypeCreateSchema
>;
export type OrgStructureTypeUpdate = z.infer<
  typeof orgStructureTypeUpdateSchema
>;
export type OrgStructureTypeForm = OrgStructureTypeCreate &
  OrgStructureTypeUpdate;
export type OrgStructureTypeSearchForm = z.infer<
  typeof orgStructureTypeSearchSchema
>;
