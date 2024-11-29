import type { backofficeComponents } from '@tt-ss-hr/api';
import z from 'zod';

export const documentFileCreateSchema = z.object({
  employeeId: z
    .string({ message: 'กรุณาระบุ ชื่อพนักงาน' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อพนักงาน ต้องไม่เป็นค่าว่าง',
    }),
  filePath: z
    .union([
      z.string({ message: 'กรุณาระบุ ไฟล์เอกสาร' }),
      z.instanceof(File),
      z.null(),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'ไฟล์เอกสาร ต้องไม่เป็นค่าว่าง',
    }),
  previewFilePath: z.string().nullish(),
  originalFilePath: z.string().nullish(),
  fileType: z
    .string({ message: 'กรุณาระบุ ชื่อเอกสาร' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อเอกสาร ต้องไม่เป็นค่าว่าง',
    }),
  note: z
    .string({ message: 'กรุณาระบุ หมายเหตุเอกสาร' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'หมายเหตุเอกสาร ต้องไม่เป็นค่าว่าง',
    }),
});

export const documentFileUpdateSchema = z.object({
  id: z.string({ message: 'กรุณาระบุ รหัสของเอกสารอื่นๆ' }).nullish(),
  employeeId: z
    .string({ message: 'กรุณาระบุ ชื่อพนักงาน' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อพนักงาน ต้องไม่เป็นค่าว่าง',
    }),
  filePath: z
    .union([
      z.string({ message: 'กรุณาระบุ ไฟล์เอกสาร' }),
      z.instanceof(File),
      z.null(),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'ไฟล์เอกสาร ต้องไม่เป็นค่าว่าง',
    }),
  previewFilePath: z.string().nullish(),
  originalFilePath: z.string().nullish(),
  fileType: z
    .string({ message: 'กรุณาระบุ ชื่อเอกสาร' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อเอกสาร ต้องไม่เป็นค่าว่าง',
    }),
  note: z
    .string({ message: 'กรุณาระบุ หมายเหตุเอกสาร' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'หมายเหตุเอกสาร ต้องไม่เป็นค่าว่าง',
    }),
});

export const documentFileSearchSchema = z.object({
  employeeId: z.string({ message: 'กรุณาระบุ ชื่อพนักงาน' }).nullish(),
});

export type DocumentFile = backofficeComponents['schemas']['DocumentFileVm'];
export type DocumentFileCreate = z.infer<typeof documentFileCreateSchema>;
export type DocumentFileUpdate = z.infer<typeof documentFileUpdateSchema>;
export type DocumentFileForm = DocumentFileCreate & DocumentFileUpdate;
export type DocumentFileSearchForm = z.infer<typeof documentFileSearchSchema>;
