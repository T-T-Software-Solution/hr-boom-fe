import type { backofficeComponents } from '@tt-ss-hr/api';
import z from 'zod';

export const orgStructureCreateSchema = z.object({
  orgStructureTypeId: z
    .string({ message: 'ชนิดของโครงสร้างองค์กร is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชนิดของโครงสร้างองค์กร ต้องไม่เป็นค่าว่าง',
    }),
  code: z
    .string({ message: 'รหัสขององค์กร is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'รหัสขององค์กร ต้องไม่เป็นค่าว่าง',
    }),
  name: z
    .string({ message: 'ชื่อ is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'ชื่อ ต้องไม่เป็นค่าว่าง' }),
  nameEn: z.string({ message: 'ชื่อ(EN) is required' }).nullable(),
  taxId: z.string({ message: 'เลขประจำตัวผู้เสียภาษี is required' }).nullable(),
  taxId2: z
    .string({ message: 'เลขประจำตัวผู้เสียภาษี 2 (สำรอง) is required' })
    .nullable(),
  socialSecurityTypeId: z
    .string({ message: 'สิทธิ์ประกันสังคม is required' })
    .nullable(),
  addressTh: z.string({ message: 'ที่อยู่บริษัท is required' }).nullable(),
  addressEn: z.string({ message: 'ที่อยู่บริษัท (EN) is required' }).nullable(),
  provinceId: z.string({ message: 'จังหวัด is required' }).nullable(),
  district: z.string({ message: 'เขต/อำเภอ is required' }).nullable(),
  subdistrict: z.string({ message: 'แขวง/ตำบล is required' }).nullable(),
  postalCode: z
    .union([
      z.number({ message: 'รหัสไปรษณีย์ is required' }).int(),
      z.string({ message: 'รหัสไปรษณีย์ is required' }),
    ])
    .nullable(),
  phoneNumber: z.string({ message: 'เบอร์โทรศัพท์ is required' }).nullable(),
  faxNumber: z.string({ message: 'เบอร์โทรสาร (Fax) is required' }).nullable(),
  emailCompany: z.string({ message: 'อีเมลบริษัท is required' }).nullable(),
  logoComppanyPath: z
    .union([
      z.string({ message: 'รูปภาพบริษัท is required' }),
      z.instanceof(File),
      z.null(),
    ])
    .nullable(),
  previewLogoComppanyPath: z.string().nullish(),
  originalLogoComppanyPath: z.string().nullish(),
  description: z.string({ message: 'คำอธิบาย is required' }).nullable(),
  parentId: z.string({ message: 'รหัสต้นสังกัด is required' }).nullable(),
});

export const orgStructureUpdateSchema = z.object({
  id: z.string({ message: 'รหัสของโครงสร้างองค์กร is required' }).nullish(),
  orgStructureTypeId: z
    .string({ message: 'ชนิดของโครงสร้างองค์กร is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชนิดของโครงสร้างองค์กร ต้องไม่เป็นค่าว่าง',
    }),
  code: z
    .string({ message: 'รหัสขององค์กร is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'รหัสขององค์กร ต้องไม่เป็นค่าว่าง',
    }),
  name: z
    .string({ message: 'ชื่อ is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'ชื่อ ต้องไม่เป็นค่าว่าง' }),
  nameEn: z.string({ message: 'ชื่อ(EN) is required' }).nullable(),
  taxId: z.string({ message: 'เลขประจำตัวผู้เสียภาษี is required' }).nullable(),
  taxId2: z
    .string({ message: 'เลขประจำตัวผู้เสียภาษี 2 (สำรอง) is required' })
    .nullable(),
  socialSecurityTypeId: z
    .string({ message: 'สิทธิ์ประกันสังคม is required' })
    .nullable(),
  addressTh: z.string({ message: 'ที่อยู่บริษัท is required' }).nullable(),
  addressEn: z.string({ message: 'ที่อยู่บริษัท (EN) is required' }).nullable(),
  provinceId: z.string({ message: 'จังหวัด is required' }).nullable(),
  district: z.string({ message: 'เขต/อำเภอ is required' }).nullable(),
  subdistrict: z.string({ message: 'แขวง/ตำบล is required' }).nullable(),
  postalCode: z
    .union([
      z.number({ message: 'รหัสไปรษณีย์ is required' }).int(),
      z.string({ message: 'รหัสไปรษณีย์ is required' }),
    ])
    .nullable(),
  phoneNumber: z.string({ message: 'เบอร์โทรศัพท์ is required' }).nullable(),
  faxNumber: z.string({ message: 'เบอร์โทรสาร (Fax) is required' }).nullable(),
  emailCompany: z.string({ message: 'อีเมลบริษัท is required' }).nullable(),
  logoComppanyPath: z
    .union([
      z.string({ message: 'รูปภาพบริษัท is required' }),
      z.instanceof(File),
      z.null(),
    ])
    .nullable(),
  previewLogoComppanyPath: z.string().nullish(),
  originalLogoComppanyPath: z.string().nullish(),
  description: z.string({ message: 'คำอธิบาย is required' }).nullable(),
  parentId: z.string({ message: 'รหัสต้นสังกัด is required' }).nullable(),
});

export const orgStructureSearchSchema = z.object({
  code: z.string({ message: 'รหัสขององค์กร is required' }).nullish(),
  name: z.string({ message: 'ชื่อ is required' }).nullish(),
  nameEn: z.string({ message: 'ชื่อ(EN) is required' }).nullish(),
});

export type OrgStructure = backofficeComponents['schemas']['OrgStructureVm'];
export type OrgStructureCreate = z.infer<typeof orgStructureCreateSchema>;
export type OrgStructureUpdate = z.infer<typeof orgStructureUpdateSchema>;
export type OrgStructureForm = OrgStructureCreate & OrgStructureUpdate;
export type OrgStructureSearchForm = z.infer<typeof orgStructureSearchSchema>;
