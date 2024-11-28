import type { backofficeComponents } from '@tt-ss-hr/api';
import z from 'zod';

export const documentFileCreateSchema = z.object({
  employeeId: z
    .string({ message: 'ชื่อพนักงาน is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อพนักงาน ต้องไม่เป็นค่าว่าง',
    }),
  filePath: z
    .union([
      z.string({ message: 'ไฟล์เอกสาร is required' }),
      z.instanceof(File),
      z.null(),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'ไฟล์เอกสาร ต้องไม่เป็นค่าว่าง',
    }),
  previewFilePath: z.string().nullish(),
  originalFilePath: z.string().nullish(),
  fileType: z
    .string({ message: 'ชื่อเอกสาร is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อเอกสาร ต้องไม่เป็นค่าว่าง',
    }),
  note: z
    .string({ message: 'หมายเหตุเอกสาร is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'หมายเหตุเอกสาร ต้องไม่เป็นค่าว่าง',
    }),
});

export const documentFileUpdateSchema = z.object({
  id: z.string({ message: 'รหัสของเอกสารอื่นๆ is required' }).nullish(),
  employeeId: z
    .string({ message: 'ชื่อพนักงาน is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อพนักงาน ต้องไม่เป็นค่าว่าง',
    }),
  filePath: z
    .union([
      z.string({ message: 'ไฟล์เอกสาร is required' }),
      z.instanceof(File),
      z.null(),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'ไฟล์เอกสาร ต้องไม่เป็นค่าว่าง',
    }),
  previewFilePath: z.string().nullish(),
  originalFilePath: z.string().nullish(),
  fileType: z
    .string({ message: 'ชื่อเอกสาร is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อเอกสาร ต้องไม่เป็นค่าว่าง',
    }),
  note: z
    .string({ message: 'หมายเหตุเอกสาร is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'หมายเหตุเอกสาร ต้องไม่เป็นค่าว่าง',
    }),
});

export const documentFileSearchSchema = z.object({
  employeeId: z.string({ message: 'ชื่อพนักงาน is required' }).nullish(),
});

export type DocumentFile = backofficeComponents['schemas']['DocumentFileVm'];
export type DocumentFileCreate = z.infer<typeof documentFileCreateSchema>;
export type DocumentFileUpdate = z.infer<typeof documentFileUpdateSchema>;
export type DocumentFileForm = DocumentFileCreate & DocumentFileUpdate;
export type DocumentFileSearchForm = z.infer<typeof documentFileSearchSchema>;
