import type { backofficeComponents } from '@tt-ss-hr/api';
import z from 'zod';

export const educationCreateSchema = z.object({
  employeeId: z
    .string({ message: 'ชื่อพนักงาน is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อพนักงาน ต้องไม่เป็นค่าว่าง',
    }),
  educationLevelId: z
    .string({ message: 'ระดับการศึกษา is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ระดับการศึกษา ต้องไม่เป็นค่าว่าง',
    }),
  institutionGraduated: z
    .string({ message: 'สถานศึกษาที่จบการศึกษา is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'สถานศึกษาที่จบการศึกษา ต้องไม่เป็นค่าว่าง',
    }),
  dateStart: z
    .union([
      z.string({ message: 'วันที่เริ่มการศึกษา is required' }),
      z.date({ message: 'วันที่เริ่มการศึกษา is required' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'วันที่เริ่มการศึกษา ต้องไม่เป็นค่าว่าง',
    }),
  dateGraduation: z
    .union([
      z.string({ message: 'วันที่จบการศึกษา is required' }),
      z.date({ message: 'วันที่จบการศึกษา is required' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'วันที่จบการศึกษา ต้องไม่เป็นค่าว่าง',
    }),
  faculty: z
    .string({ message: 'คณะที่จบการศึกษา is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'คณะที่จบการศึกษา ต้องไม่เป็นค่าว่าง',
    }),
  major: z
    .string({ message: 'สาขาวิชาที่จบการศึกษา is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'สาขาวิชาที่จบการศึกษา ต้องไม่เป็นค่าว่าง',
    }),
});

export const educationUpdateSchema = z.object({
  id: z.string({ message: 'รหัสของประวัติการศึกษา is required' }).nullish(),
  employeeId: z
    .string({ message: 'ชื่อพนักงาน is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อพนักงาน ต้องไม่เป็นค่าว่าง',
    }),
  educationLevelId: z
    .string({ message: 'ระดับการศึกษา is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ระดับการศึกษา ต้องไม่เป็นค่าว่าง',
    }),
  institutionGraduated: z
    .string({ message: 'สถานศึกษาที่จบการศึกษา is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'สถานศึกษาที่จบการศึกษา ต้องไม่เป็นค่าว่าง',
    }),
  dateStart: z
    .union([
      z.string({ message: 'วันที่เริ่มการศึกษา is required' }),
      z.date({ message: 'วันที่เริ่มการศึกษา is required' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'วันที่เริ่มการศึกษา ต้องไม่เป็นค่าว่าง',
    }),
  dateGraduation: z
    .union([
      z.string({ message: 'วันที่จบการศึกษา is required' }),
      z.date({ message: 'วันที่จบการศึกษา is required' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'วันที่จบการศึกษา ต้องไม่เป็นค่าว่าง',
    }),
  faculty: z
    .string({ message: 'คณะที่จบการศึกษา is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'คณะที่จบการศึกษา ต้องไม่เป็นค่าว่าง',
    }),
  major: z
    .string({ message: 'สาขาวิชาที่จบการศึกษา is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'สาขาวิชาที่จบการศึกษา ต้องไม่เป็นค่าว่าง',
    }),
});

export const educationSearchSchema = z.object({
  employeeId: z.string({ message: 'ชื่อพนักงาน is required' }).nullish(),
  educationLevelId: z.string({ message: 'ระดับการศึกษา is required' }).nullish(),
  institutionGraduated: z
    .string({ message: 'สถานศึกษาที่จบการศึกษา is required' })
    .nullish(),
});

export type Education = backofficeComponents['schemas']['EducationVm'];
export type EducationCreate = z.infer<typeof educationCreateSchema>;
export type EducationUpdate = z.infer<typeof educationUpdateSchema>;
export type EducationForm = EducationCreate & EducationUpdate;
export type EducationSearchForm = z.infer<typeof educationSearchSchema>;
