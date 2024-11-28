import type { backofficeComponents } from '@tt-ss-hr/api';
import z from 'zod';

export const criminalHistoryCreateSchema = z.object({
  employeeId: z
    .string({ message: 'ชื่อพนักงาน is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อพนักงาน ต้องไม่เป็นค่าว่าง',
    }),
  dateOfPunishment: z
    .union([
      z.string({ message: 'วันที่ทำผิด is required' }),
      z.date({ message: 'วันที่ทำผิด is required' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'วันที่ทำผิด ต้องไม่เป็นค่าว่าง',
    }),
  listPunishment: z
    .string({ message: 'รายการที่ถูกลงโทษ is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'รายการที่ถูกลงโทษ ต้องไม่เป็นค่าว่าง',
    }),
  note: z
    .string({ message: 'เอกสารอ้างอิง is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'เอกสารอ้างอิง ต้องไม่เป็นค่าว่าง',
    }),
});

export const criminalHistoryUpdateSchema = z.object({
  id: z
    .string({ message: 'รหัสของประวัติโทษทางวินัยและการนิรโทษกรรม is required' })
    .nullish(),
  employeeId: z
    .string({ message: 'ชื่อพนักงาน is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อพนักงาน ต้องไม่เป็นค่าว่าง',
    }),
  dateOfPunishment: z
    .union([
      z.string({ message: 'วันที่ทำผิด is required' }),
      z.date({ message: 'วันที่ทำผิด is required' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'วันที่ทำผิด ต้องไม่เป็นค่าว่าง',
    }),
  listPunishment: z
    .string({ message: 'รายการที่ถูกลงโทษ is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'รายการที่ถูกลงโทษ ต้องไม่เป็นค่าว่าง',
    }),
  note: z
    .string({ message: 'เอกสารอ้างอิง is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'เอกสารอ้างอิง ต้องไม่เป็นค่าว่าง',
    }),
});

export const criminalHistorySearchSchema = z.object({
  employeeId: z.string({ message: 'ชื่อพนักงาน is required' }).nullish(),
});

export type CriminalHistory =
  backofficeComponents['schemas']['CriminalHistoryVm'];
export type CriminalHistoryCreate = z.infer<typeof criminalHistoryCreateSchema>;
export type CriminalHistoryUpdate = z.infer<typeof criminalHistoryUpdateSchema>;
export type CriminalHistoryForm = CriminalHistoryCreate & CriminalHistoryUpdate;
export type CriminalHistorySearchForm = z.infer<
  typeof criminalHistorySearchSchema
>;
