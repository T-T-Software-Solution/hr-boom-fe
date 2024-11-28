import type { backofficeComponents } from '@tt-ss-hr/api';
import z from 'zod';

export const orgStructureTypeCreateSchema = z.object({
  name: z
    .string({ message: 'ชื่อชนิดขององค์กร is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อชนิดขององค์กร ต้องไม่เป็นค่าว่าง',
    }),
});

export const orgStructureTypeUpdateSchema = z.object({
  id: z.string({ message: 'รหัสชนิดขององค์กร is required' }).nullish(),
  name: z
    .string({ message: 'ชื่อชนิดขององค์กร is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อชนิดขององค์กร ต้องไม่เป็นค่าว่าง',
    }),
});

export const orgStructureTypeSearchSchema = z.object({
  name: z.string({ message: 'ชื่อชนิดขององค์กร is required' }).nullish(),
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
