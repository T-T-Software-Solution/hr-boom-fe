import type { backofficeComponents } from '@tt-ss-hr/api';
import z from 'zod';

export const professionalLicenseCreateSchema = z.object({
  employeeId: z
    .string({ message: 'กรุณาระบุ ชื่อพนักงาน' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อพนักงาน ต้องไม่เป็นค่าว่าง',
    }),
  name: z
    .string({ message: 'กรุณาระบุ ชื่อใบอนุญาต' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อใบอนุญาต ต้องไม่เป็นค่าว่าง',
    }),
  agency: z
    .string({ message: 'กรุณาระบุ หน่วยงาน' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'หน่วยงาน ต้องไม่เป็นค่าว่าง',
    }),
  numberLicense: z
    .string({ message: 'กรุณาระบุ เลขที่ใบอนุญาต' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'เลขที่ใบอนุญาต ต้องไม่เป็นค่าว่าง',
    }),
  effectiveDate: z
    .union([
      z.string({ message: 'กรุณาระบุ วันที่มีผลบังคับใช้' }),
      z.date({ message: 'กรุณาระบุ วันที่มีผลบังคับใช้' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'วันที่มีผลบังคับใช้ ต้องไม่เป็นค่าว่าง',
    }),
});

export const professionalLicenseUpdateSchema = z.object({
  id: z.string({ message: 'กรุณาระบุ รหัสของใบอนุญาตประกอบวิชาชีพ' }).nullish(),
  employeeId: z
    .string({ message: 'กรุณาระบุ ชื่อพนักงาน' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อพนักงาน ต้องไม่เป็นค่าว่าง',
    }),
  name: z
    .string({ message: 'กรุณาระบุ ชื่อใบอนุญาต' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อใบอนุญาต ต้องไม่เป็นค่าว่าง',
    }),
  agency: z
    .string({ message: 'กรุณาระบุ หน่วยงาน' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'หน่วยงาน ต้องไม่เป็นค่าว่าง',
    }),
  numberLicense: z
    .string({ message: 'กรุณาระบุ เลขที่ใบอนุญาต' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'เลขที่ใบอนุญาต ต้องไม่เป็นค่าว่าง',
    }),
  effectiveDate: z
    .union([
      z.string({ message: 'กรุณาระบุ วันที่มีผลบังคับใช้' }),
      z.date({ message: 'กรุณาระบุ วันที่มีผลบังคับใช้' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'วันที่มีผลบังคับใช้ ต้องไม่เป็นค่าว่าง',
    }),
});

export const professionalLicenseSearchSchema = z.object({
  employeeId: z.string({ message: 'กรุณาระบุ ชื่อพนักงาน' }).nullish(),
});

export type ProfessionalLicense =
  backofficeComponents['schemas']['ProfessionalLicenseVm'];
export type ProfessionalLicenseCreate = z.infer<
  typeof professionalLicenseCreateSchema
>;
export type ProfessionalLicenseUpdate = z.infer<
  typeof professionalLicenseUpdateSchema
>;
export type ProfessionalLicenseForm = ProfessionalLicenseCreate &
  ProfessionalLicenseUpdate;
export type ProfessionalLicenseSearchForm = z.infer<
  typeof professionalLicenseSearchSchema
>;
