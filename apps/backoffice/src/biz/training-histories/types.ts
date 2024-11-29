import type { backofficeComponents } from '@tt-ss-hr/api';
import z from 'zod';

export const trainingHistoryCreateSchema = z.object({
  employeeId: z
    .string({ message: 'กรุณาระบุ ชื่อพนักงาน' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อพนักงาน ต้องไม่เป็นค่าว่าง',
    }),
  name: z
    .string({ message: 'กรุณาระบุ หลักสูตรอบรม' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'หลักสูตรอบรม ต้องไม่เป็นค่าว่าง',
    }),
  startDate: z
    .union([
      z.string({ message: 'กรุณาระบุ วันที่เริ่มต้น' }),
      z.date({ message: 'กรุณาระบุ วันที่เริ่มต้น' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'วันที่เริ่มต้น ต้องไม่เป็นค่าว่าง',
    }),
  endDate: z
    .union([
      z.string({ message: 'กรุณาระบุ วันที่สิ้นสุด' }),
      z.date({ message: 'กรุณาระบุ วันที่สิ้นสุด' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'วันที่สิ้นสุด ต้องไม่เป็นค่าว่าง',
    }),
  trainingOrganization: z
    .string({ message: 'กรุณาระบุ หน่วยงานที่จัดฝึกอบรม' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'หน่วยงานที่จัดฝึกอบรม ต้องไม่เป็นค่าว่าง',
    }),
});

export const trainingHistoryUpdateSchema = z.object({
  id: z.string({ message: 'กรุณาระบุ รหัสของประวัติการฝึกอบรม' }).nullish(),
  employeeId: z
    .string({ message: 'กรุณาระบุ ชื่อพนักงาน' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อพนักงาน ต้องไม่เป็นค่าว่าง',
    }),
  name: z
    .string({ message: 'กรุณาระบุ หลักสูตรอบรม' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'หลักสูตรอบรม ต้องไม่เป็นค่าว่าง',
    }),
  startDate: z
    .union([
      z.string({ message: 'กรุณาระบุ วันที่เริ่มต้น' }),
      z.date({ message: 'กรุณาระบุ วันที่เริ่มต้น' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'วันที่เริ่มต้น ต้องไม่เป็นค่าว่าง',
    }),
  endDate: z
    .union([
      z.string({ message: 'กรุณาระบุ วันที่สิ้นสุด' }),
      z.date({ message: 'กรุณาระบุ วันที่สิ้นสุด' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'วันที่สิ้นสุด ต้องไม่เป็นค่าว่าง',
    }),
  trainingOrganization: z
    .string({ message: 'กรุณาระบุ หน่วยงานที่จัดฝึกอบรม' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'หน่วยงานที่จัดฝึกอบรม ต้องไม่เป็นค่าว่าง',
    }),
});

export const trainingHistorySearchSchema = z.object({
  employeeId: z.string({ message: 'กรุณาระบุ ชื่อพนักงาน' }).nullish(),
});

export type TrainingHistory =
  backofficeComponents['schemas']['TrainingHistoryVm'];
export type TrainingHistoryCreate = z.infer<typeof trainingHistoryCreateSchema>;
export type TrainingHistoryUpdate = z.infer<typeof trainingHistoryUpdateSchema>;
export type TrainingHistoryForm = TrainingHistoryCreate & TrainingHistoryUpdate;
export type TrainingHistorySearchForm = z.infer<
  typeof trainingHistorySearchSchema
>;
