import type { backofficeComponents } from '@tt-ss-hr/api';
import z from 'zod';

export const employeeTypeCreateSchema = z.object({
  name: z
    .string({ message: 'ชื่อประเภทพนักงาน is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อประเภทพนักงาน ต้องไม่เป็นค่าว่าง',
    }),
});

export const employeeTypeUpdateSchema = z.object({
  id: z.string({ message: 'รหัสประเภทพนักงาน is required' }).nullish(),
  name: z
    .string({ message: 'ชื่อประเภทพนักงาน is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อประเภทพนักงาน ต้องไม่เป็นค่าว่าง',
    }),
});

export const employeeTypeSearchSchema = z.object({
  name: z.string({ message: 'ชื่อประเภทพนักงาน is required' }).nullish(),
});

export type EmployeeType = backofficeComponents['schemas']['EmployeeTypeVm'];
export type EmployeeTypeCreate = z.infer<typeof employeeTypeCreateSchema>;
export type EmployeeTypeUpdate = z.infer<typeof employeeTypeUpdateSchema>;
export type EmployeeTypeForm = EmployeeTypeCreate & EmployeeTypeUpdate;
export type EmployeeTypeSearchForm = z.infer<typeof employeeTypeSearchSchema>;
