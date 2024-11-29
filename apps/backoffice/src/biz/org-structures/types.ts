import type { backofficeComponents } from '@tt-ss-hr/api';
import z from 'zod';

export const orgStructureCreateSchema = z.object({
  orgStructureTypeId: z
    .string({ message: 'กรุณาระบุ ชนิดของโครงสร้างองค์กร' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชนิดของโครงสร้างองค์กร ต้องไม่เป็นค่าว่าง',
    }),
  code: z
    .string({ message: 'กรุณาระบุ รหัสขององค์กร' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'รหัสขององค์กร ต้องไม่เป็นค่าว่าง',
    }),
  name: z
    .string({ message: 'กรุณาระบุ ชื่อ' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'ชื่อ ต้องไม่เป็นค่าว่าง' }),
  nameEn: z.string({ message: 'กรุณาระบุ ชื่อ(EN)' }).nullable(),
  taxId: z.string({ message: 'กรุณาระบุ เลขประจำตัวผู้เสียภาษี' }).nullable(),
  taxId2: z
    .string({ message: 'กรุณาระบุ เลขประจำตัวผู้เสียภาษี 2 (สำรอง)' })
    .nullable(),
  socialSecurityTypeId: z
    .string({ message: 'กรุณาระบุ สิทธิ์ประกันสังคม' })
    .nullable(),
  addressTh: z.string({ message: 'กรุณาระบุ ที่อยู่บริษัท' }).nullable(),
  addressEn: z.string({ message: 'กรุณาระบุ ที่อยู่บริษัท (EN)' }).nullable(),
  provinceId: z.string({ message: 'กรุณาระบุ จังหวัด' }).nullable(),
  district: z.string({ message: 'กรุณาระบุ เขต/อำเภอ' }).nullable(),
  subdistrict: z.string({ message: 'กรุณาระบุ แขวง/ตำบล' }).nullable(),
  postalCode: z
    .union([
      z.number({ message: 'กรุณาระบุ รหัสไปรษณีย์' }).int(),
      z.string({ message: 'กรุณาระบุ รหัสไปรษณีย์' }),
    ])
    .nullable(),
  phoneNumber: z.string({ message: 'กรุณาระบุ เบอร์โทรศัพท์' }).nullable(),
  faxNumber: z.string({ message: 'กรุณาระบุ เบอร์โทรสาร (Fax)' }).nullable(),
  emailCompany: z.string({ message: 'กรุณาระบุ อีเมลบริษัท' }).nullable(),
  logoCompanyPath: z
    .union([
      z.string({ message: 'กรุณาระบุ รูปภาพบริษัท' }),
      z.instanceof(File),
      z.null(),
    ])
    .nullable(),
  previewLogoCompanyPath: z.string().nullish(),
  originalLogoCompanyPath: z.string().nullish(),
  description: z.string({ message: 'กรุณาระบุ คำอธิบาย' }).nullable(),
  parentId: z.string({ message: 'กรุณาระบุ รหัสต้นสังกัด' }).nullable(),
});

export const orgStructureUpdateSchema = z.object({
  id: z.string({ message: 'กรุณาระบุ รหัสของโครงสร้างองค์กร' }).nullish(),
  orgStructureTypeId: z
    .string({ message: 'กรุณาระบุ ชนิดของโครงสร้างองค์กร' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชนิดของโครงสร้างองค์กร ต้องไม่เป็นค่าว่าง',
    }),
  code: z
    .string({ message: 'กรุณาระบุ รหัสขององค์กร' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'รหัสขององค์กร ต้องไม่เป็นค่าว่าง',
    }),
  name: z
    .string({ message: 'กรุณาระบุ ชื่อ' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'ชื่อ ต้องไม่เป็นค่าว่าง' }),
  nameEn: z.string({ message: 'กรุณาระบุ ชื่อ(EN)' }).nullable(),
  taxId: z.string({ message: 'กรุณาระบุ เลขประจำตัวผู้เสียภาษี' }).nullable(),
  taxId2: z
    .string({ message: 'กรุณาระบุ เลขประจำตัวผู้เสียภาษี 2 (สำรอง)' })
    .nullable(),
  socialSecurityTypeId: z
    .string({ message: 'กรุณาระบุ สิทธิ์ประกันสังคม' })
    .nullable(),
  addressTh: z.string({ message: 'กรุณาระบุ ที่อยู่บริษัท' }).nullable(),
  addressEn: z.string({ message: 'กรุณาระบุ ที่อยู่บริษัท (EN)' }).nullable(),
  provinceId: z.string({ message: 'กรุณาระบุ จังหวัด' }).nullable(),
  district: z.string({ message: 'กรุณาระบุ เขต/อำเภอ' }).nullable(),
  subdistrict: z.string({ message: 'กรุณาระบุ แขวง/ตำบล' }).nullable(),
  postalCode: z
    .union([
      z.number({ message: 'กรุณาระบุ รหัสไปรษณีย์' }).int(),
      z.string({ message: 'กรุณาระบุ รหัสไปรษณีย์' }),
    ])
    .nullable(),
  phoneNumber: z.string({ message: 'กรุณาระบุ เบอร์โทรศัพท์' }).nullable(),
  faxNumber: z.string({ message: 'กรุณาระบุ เบอร์โทรสาร (Fax)' }).nullable(),
  emailCompany: z.string({ message: 'กรุณาระบุ อีเมลบริษัท' }).nullable(),
  logoCompanyPath: z
    .union([
      z.string({ message: 'กรุณาระบุ รูปภาพบริษัท' }),
      z.instanceof(File),
      z.null(),
    ])
    .nullable(),
  previewLogoCompanyPath: z.string().nullish(),
  originalLogoCompanyPath: z.string().nullish(),
  description: z.string({ message: 'กรุณาระบุ คำอธิบาย' }).nullable(),
  parentId: z.string({ message: 'กรุณาระบุ รหัสต้นสังกัด' }).nullable(),
});

export const orgStructureSearchSchema = z.object({
  code: z.string({ message: 'กรุณาระบุ รหัสขององค์กร' }).nullish(),
  name: z.string({ message: 'กรุณาระบุ ชื่อ' }).nullish(),
  nameEn: z.string({ message: 'กรุณาระบุ ชื่อ(EN)' }).nullish(),
});

export type OrgStructure = backofficeComponents['schemas']['OrgStructureVm'];
export type OrgStructureCreate = z.infer<typeof orgStructureCreateSchema>;
export type OrgStructureUpdate = z.infer<typeof orgStructureUpdateSchema>;
export type OrgStructureForm = OrgStructureCreate & OrgStructureUpdate;
export type OrgStructureSearchForm = z.infer<typeof orgStructureSearchSchema>;
