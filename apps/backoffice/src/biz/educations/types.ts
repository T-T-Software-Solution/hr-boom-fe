import type { backofficeComponents } from '@tt-ss-hr/api';
import z from 'zod';

export const educationCreateSchema = z.object({
  employeeId: z
    .string({ message: 'กรุณาระบุ ชื่อพนักงาน' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อพนักงาน ต้องไม่เป็นค่าว่าง',
    }),
  educationLevelId: z
    .string({ message: 'กรุณาระบุ ระดับการศึกษา' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ระดับการศึกษา ต้องไม่เป็นค่าว่าง',
    }),
  institutionGraduated: z
    .string({ message: 'กรุณาระบุ สถานศึกษาที่จบการศึกษา' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'สถานศึกษาที่จบการศึกษา ต้องไม่เป็นค่าว่าง',
    }),
  dateStart: z
    .union([
      z.string({ message: 'กรุณาระบุ วันที่เริ่มการศึกษา' }),
      z.date({ message: 'กรุณาระบุ วันที่เริ่มการศึกษา' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'วันที่เริ่มการศึกษา ต้องไม่เป็นค่าว่าง',
    }),
  dateGraduation: z
    .union([
      z.string({ message: 'กรุณาระบุ วันที่จบการศึกษา' }),
      z.date({ message: 'กรุณาระบุ วันที่จบการศึกษา' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'วันที่จบการศึกษา ต้องไม่เป็นค่าว่าง',
    }),
  faculty: z
    .string({ message: 'กรุณาระบุ คณะที่จบการศึกษา' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'คณะที่จบการศึกษา ต้องไม่เป็นค่าว่าง',
    }),
  major: z
    .string({ message: 'กรุณาระบุ สาขาวิชาที่จบการศึกษา' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'สาขาวิชาที่จบการศึกษา ต้องไม่เป็นค่าว่าง',
    }),
});

export const educationUpdateSchema = z.object({
  id: z.string({ message: 'กรุณาระบุ รหัสของประวัติการศึกษา' }).nullish(),
  employeeId: z
    .string({ message: 'กรุณาระบุ ชื่อพนักงาน' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อพนักงาน ต้องไม่เป็นค่าว่าง',
    }),
  educationLevelId: z
    .string({ message: 'กรุณาระบุ ระดับการศึกษา' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ระดับการศึกษา ต้องไม่เป็นค่าว่าง',
    }),
  institutionGraduated: z
    .string({ message: 'กรุณาระบุ สถานศึกษาที่จบการศึกษา' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'สถานศึกษาที่จบการศึกษา ต้องไม่เป็นค่าว่าง',
    }),
  dateStart: z
    .union([
      z.string({ message: 'กรุณาระบุ วันที่เริ่มการศึกษา' }),
      z.date({ message: 'กรุณาระบุ วันที่เริ่มการศึกษา' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'วันที่เริ่มการศึกษา ต้องไม่เป็นค่าว่าง',
    }),
  dateGraduation: z
    .union([
      z.string({ message: 'กรุณาระบุ วันที่จบการศึกษา' }),
      z.date({ message: 'กรุณาระบุ วันที่จบการศึกษา' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'วันที่จบการศึกษา ต้องไม่เป็นค่าว่าง',
    }),
  faculty: z
    .string({ message: 'กรุณาระบุ คณะที่จบการศึกษา' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'คณะที่จบการศึกษา ต้องไม่เป็นค่าว่าง',
    }),
  major: z
    .string({ message: 'กรุณาระบุ สาขาวิชาที่จบการศึกษา' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'สาขาวิชาที่จบการศึกษา ต้องไม่เป็นค่าว่าง',
    }),
});

export const educationSearchSchema = z.object({
  employeeId: z.string({ message: 'กรุณาระบุ ชื่อพนักงาน' }).nullish(),
  educationLevelId: z.string({ message: 'กรุณาระบุ ระดับการศึกษา' }).nullish(),
  institutionGraduated: z
    .string({ message: 'กรุณาระบุ สถานศึกษาที่จบการศึกษา' })
    .nullish(),
});

export type Education = backofficeComponents['schemas']['EducationVm'];
export type EducationCreate = z.infer<typeof educationCreateSchema>;
export type EducationUpdate = z.infer<typeof educationUpdateSchema>;
export type EducationForm = EducationCreate & EducationUpdate;
export type EducationSearchForm = z.infer<typeof educationSearchSchema>;
