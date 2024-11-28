import type { backofficeComponents } from '@tt-ss-hr/api';
import z from 'zod';

export const trainingHistoryCreateSchema = z.object({
  employeeId: z
    .string({ message: 'ชื่อพนักงาน is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อพนักงาน ต้องไม่เป็นค่าว่าง',
    }),
  name: z
    .string({ message: 'หลักสูตรอบรม is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'หลักสูตรอบรม ต้องไม่เป็นค่าว่าง',
    }),
  startDate: z
    .union([
      z.string({ message: 'วันที่เริ่มต้น is required' }),
      z.date({ message: 'วันที่เริ่มต้น is required' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'วันที่เริ่มต้น ต้องไม่เป็นค่าว่าง',
    }),
  endDate: z
    .union([
      z.string({ message: 'วันที่สิ้นสุด is required' }),
      z.date({ message: 'วันที่สิ้นสุด is required' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'วันที่สิ้นสุด ต้องไม่เป็นค่าว่าง',
    }),
  trainingOrganization: z
    .string({ message: 'หน่วยงานที่จัดฝึกอบรม is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'หน่วยงานที่จัดฝึกอบรม ต้องไม่เป็นค่าว่าง',
    }),
});

export const trainingHistoryUpdateSchema = z.object({
  id: z.string({ message: 'รหัสของประวัติการฝึกอบรม is required' }).nullish(),
  employeeId: z
    .string({ message: 'ชื่อพนักงาน is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อพนักงาน ต้องไม่เป็นค่าว่าง',
    }),
  name: z
    .string({ message: 'หลักสูตรอบรม is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'หลักสูตรอบรม ต้องไม่เป็นค่าว่าง',
    }),
  startDate: z
    .union([
      z.string({ message: 'วันที่เริ่มต้น is required' }),
      z.date({ message: 'วันที่เริ่มต้น is required' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'วันที่เริ่มต้น ต้องไม่เป็นค่าว่าง',
    }),
  endDate: z
    .union([
      z.string({ message: 'วันที่สิ้นสุด is required' }),
      z.date({ message: 'วันที่สิ้นสุด is required' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'วันที่สิ้นสุด ต้องไม่เป็นค่าว่าง',
    }),
  trainingOrganization: z
    .string({ message: 'หน่วยงานที่จัดฝึกอบรม is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'หน่วยงานที่จัดฝึกอบรม ต้องไม่เป็นค่าว่าง',
    }),
});

export const trainingHistorySearchSchema = z.object({
  employeeId: z.string({ message: 'ชื่อพนักงาน is required' }).nullish(),
});

export type TrainingHistory =
  backofficeComponents['schemas']['TrainingHistoryVm'];
export type TrainingHistoryCreate = z.infer<typeof trainingHistoryCreateSchema>;
export type TrainingHistoryUpdate = z.infer<typeof trainingHistoryUpdateSchema>;
export type TrainingHistoryForm = TrainingHistoryCreate & TrainingHistoryUpdate;
export type TrainingHistorySearchForm = z.infer<
  typeof trainingHistorySearchSchema
>;
