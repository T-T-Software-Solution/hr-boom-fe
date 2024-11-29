import type { backofficeComponents } from '@tt-ss-hr/api';
import z from 'zod';

export const employeeCreateSchema = z.object({
  imagePath: z
    .union([z.string({ message: 'กรุณาระบุ รูป' }), z.instanceof(File), z.null()])
    .nullable(),
  previewImagePath: z.string().nullish(),
  originalImagePath: z.string().nullish(),
  employeeId: z
    .string({ message: 'กรุณาระบุ รหัสพนักงาน' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'รหัสพนักงาน ต้องไม่เป็นค่าว่าง',
    }),
  genderId: z
    .string({ message: 'กรุณาระบุ เพศ' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'เพศ ต้องไม่เป็นค่าว่าง' }),
  prefixId: z
    .string({ message: 'กรุณาระบุ คำนำหน้าชื่อ' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'คำนำหน้าชื่อ ต้องไม่เป็นค่าว่าง',
    }),
  firstName: z
    .string({ message: 'กรุณาระบุ ชื่อ' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'ชื่อ ต้องไม่เป็นค่าว่าง' }),
  lastName: z
    .string({ message: 'กรุณาระบุ นามสกุล' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'นามสกุล ต้องไม่เป็นค่าว่าง' }),
  nickname: z
    .string({ message: 'กรุณาระบุ ชื่อเล่น' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'ชื่อเล่น ต้องไม่เป็นค่าว่าง' }),
  prefixEnId: z
    .string({ message: 'กรุณาระบุ คำนำหน้าชื่อ(EN)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'คำนำหน้าชื่อ(EN) ต้องไม่เป็นค่าว่าง',
    }),
  firstNameEn: z
    .string({ message: 'กรุณาระบุ ชื่อ(EN)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'ชื่อ(EN) ต้องไม่เป็นค่าว่าง' }),
  lastNameEn: z
    .string({ message: 'กรุณาระบุ นามสกุล(EN)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'นามสกุล(EN) ต้องไม่เป็นค่าว่าง',
    }),
  nicknameEn: z
    .string({ message: 'กรุณาระบุ ชื่อเล่น(EN)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อเล่น(EN) ต้องไม่เป็นค่าว่าง',
    }),
  orgStructureId: z
    .string({ message: 'กรุณาระบุ ชื่อหน่วยงาน' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อหน่วยงาน ต้องไม่เป็นค่าว่าง',
    }),
  dateOfBirth: z
    .union([
      z.string({ message: 'กรุณาระบุ วันเดือนปีเกิด' }),
      z.date({ message: 'กรุณาระบุ วันเดือนปีเกิด' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'วันเดือนปีเกิด ต้องไม่เป็นค่าว่าง',
    }),
  placementDate: z
    .union([
      z.string({ message: 'กรุณาระบุ วันบรรจุ' }),
      z.date({ message: 'กรุณาระบุ วันบรรจุ' }),
    ])
    .refine((v) => v !== null && v !== '', { message: 'วันบรรจุ ต้องไม่เป็นค่าว่าง' }),
  retirementDate: z
    .union([
      z.string({ message: 'กรุณาระบุ วันครบเกษียณอายุ' }),
      z.date({ message: 'กรุณาระบุ วันครบเกษียณอายุ' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'วันครบเกษียณอายุ ต้องไม่เป็นค่าว่าง',
    }),
  nationalId: z
    .string({ message: 'กรุณาระบุ เลขบัตรประชาชน' })
    .max(13, { message: 'เลขบัตรประชาชน ต้องมีค่าน้อยกว่าหรือเท่ากับ 13' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'เลขบัตรประชาชน ต้องไม่เป็นค่าว่าง',
    }),
  passportNumber: z
    .string({ message: 'กรุณาระบุ เลขหนังสือเดินทาง' })
    .max(20, { message: 'เลขหนังสือเดินทาง ต้องมีค่าน้อยกว่าหรือเท่ากับ 20' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'เลขหนังสือเดินทาง ต้องไม่เป็นค่าว่าง',
    }),
  telephone: z
    .string({ message: 'กรุณาระบุ เบอร์โทรศัพท์' })
    .max(10, { message: 'เบอร์โทรศัพท์ ต้องมีค่าน้อยกว่าหรือเท่ากับ 10' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'เบอร์โทรศัพท์ ต้องไม่เป็นค่าว่าง',
    }),
  email: z
    .string({ message: 'กรุณาระบุ อีเมล' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'อีเมล ต้องไม่เป็นค่าว่าง' }),
  lineId: z.string({ message: 'กรุณาระบุ ไลน์ไอดี' }).nullable(),
  fatherFullName: z.string({ message: 'กรุณาระบุ ชื่อ-นามสกุล บิดา' }).nullable(),
  motherFullName: z.string({ message: 'กรุณาระบุ ชื่อ-นามสกุล มารดา' }).nullable(),
  motherMaidenName: z.string({ message: 'กรุณาระบุ นามสกุลเดิม มารดา' }).nullable(),
  maritalStatus: z.boolean({ message: 'กรุณาระบุ แต่งงานแล้ว' }).nullable(),
  spouseFullName: z.string({ message: 'กรุณาระบุ ชื่อ-นามสกุล คู่สมรส' }).nullable(),
  spouseMaidenName: z.string({ message: 'กรุณาระบุ นามสกุลเดิม คู่สมรส' }).nullable(),
  contactPersonName: z
    .string({ message: 'กรุณาระบุ ชื่อผู้ติดต่อฉุกเฉิน' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อผู้ติดต่อฉุกเฉิน ต้องไม่เป็นค่าว่าง',
    }),
  contactPersonTel: z
    .string({ message: 'กรุณาระบุ เบอร์ผู้ติดต่อฉุกเฉิน' })
    .max(10, { message: 'เบอร์ผู้ติดต่อฉุกเฉิน ต้องมีค่าน้อยกว่าหรือเท่ากับ 10' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'เบอร์ผู้ติดต่อฉุกเฉิน ต้องไม่เป็นค่าว่าง',
    }),
  currentHouseNumber: z
    .string({ message: 'กรุณาระบุ เลขที่บ้าน(ปัจจุบัน)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'เลขที่บ้าน(ปัจจุบัน) ต้องไม่เป็นค่าว่าง',
    }),
  currentMoo: z
    .string({ message: 'กรุณาระบุ หมู่(ปัจจุบัน)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'หมู่(ปัจจุบัน) ต้องไม่เป็นค่าว่าง',
    }),
  currentSoi: z
    .string({ message: 'กรุณาระบุ ซอย(ปัจจุบัน)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ซอย(ปัจจุบัน) ต้องไม่เป็นค่าว่าง',
    }),
  currectYak: z
    .string({ message: 'กรุณาระบุ แยก(ปัจจุบัน)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'แยก(ปัจจุบัน) ต้องไม่เป็นค่าว่าง',
    }),
  currentRoad: z
    .string({ message: 'กรุณาระบุ ถนน(ปัจจุบัน)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ถนน(ปัจจุบัน) ต้องไม่เป็นค่าว่าง',
    }),
  currentSubdistrict: z
    .string({ message: 'กรุณาระบุ ตำบล(ปัจจุบัน)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ตำบล(ปัจจุบัน) ต้องไม่เป็นค่าว่าง',
    }),
  currentDistrict: z
    .string({ message: 'กรุณาระบุ อำเภอ(ปัจจุบัน)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'อำเภอ(ปัจจุบัน) ต้องไม่เป็นค่าว่าง',
    }),
  currentProvinceId: z
    .string({ message: 'กรุณาระบุ จังหวัด(ปัจจุบัน)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'จังหวัด(ปัจจุบัน) ต้องไม่เป็นค่าว่าง',
    }),
  currentPostcode: z
    .union([
      z.number({ message: 'กรุณาระบุ รหัสไปรษณีย์(ปัจจุบัน)' }).int(),
      z.string({ message: 'กรุณาระบุ รหัสไปรษณีย์(ปัจจุบัน)' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'รหัสไปรษณีย์(ปัจจุบัน) ต้องไม่เป็นค่าว่าง',
    }),
  permanentHouseNumber: z
    .string({ message: 'กรุณาระบุ เลขที่บ้าน(ตามทะเบียนบ้าน)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'เลขที่บ้าน(ตามทะเบียนบ้าน) ต้องไม่เป็นค่าว่าง',
    }),
  permanentMoo: z
    .string({ message: 'กรุณาระบุ หมู่(ตามทะเบียนบ้าน)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'หมู่(ตามทะเบียนบ้าน) ต้องไม่เป็นค่าว่าง',
    }),
  permanentSoi: z
    .string({ message: 'กรุณาระบุ ซอย(ตามทะเบียนบ้าน)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ซอย(ตามทะเบียนบ้าน) ต้องไม่เป็นค่าว่าง',
    }),
  permanentYak: z
    .string({ message: 'กรุณาระบุ แยก(ตามทะเบียนบ้าน)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'แยก(ตามทะเบียนบ้าน) ต้องไม่เป็นค่าว่าง',
    }),
  permanentRoad: z
    .string({ message: 'กรุณาระบุ ถนน(ตามทะเบียนบ้าน)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ถนน(ตามทะเบียนบ้าน) ต้องไม่เป็นค่าว่าง',
    }),
  permanentSubdistrict: z
    .string({ message: 'กรุณาระบุ ตำบล(ตามทะเบียนบ้าน)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ตำบล(ตามทะเบียนบ้าน) ต้องไม่เป็นค่าว่าง',
    }),
  permanentDistrict: z
    .string({ message: 'กรุณาระบุ อำเภอ(ตามทะเบียนบ้าน)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'อำเภอ(ตามทะเบียนบ้าน) ต้องไม่เป็นค่าว่าง',
    }),
  permanentProvinceId: z
    .string({ message: 'กรุณาระบุ จังหวัด(ตามทะเบียนบ้าน)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'จังหวัด(ตามทะเบียนบ้าน) ต้องไม่เป็นค่าว่าง',
    }),
  permanentPostcode: z
    .union([
      z.number({ message: 'กรุณาระบุ รหัสไปรษณีย์(ตามทะเบียนบ้าน)' }).int(),
      z.string({ message: 'กรุณาระบุ รหัสไปรษณีย์(ตามทะเบียนบ้าน)' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'รหัสไปรษณีย์(ตามทะเบียนบ้าน) ต้องไม่เป็นค่าว่าง',
    }),
  note: z.string({ message: 'กรุณาระบุ หมายเหตุ' }).nullable(),
});

export const employeeUpdateSchema = z.object({
  id: z.string({ message: 'กรุณาระบุ รหัสของข้อมูลบุคลากร' }).nullish(),
  imagePath: z
    .union([z.string({ message: 'กรุณาระบุ รูป' }), z.instanceof(File), z.null()])
    .nullable(),
  previewImagePath: z.string().nullish(),
  originalImagePath: z.string().nullish(),
  employeeId: z
    .string({ message: 'กรุณาระบุ รหัสพนักงาน' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'รหัสพนักงาน ต้องไม่เป็นค่าว่าง',
    }),
  genderId: z
    .string({ message: 'กรุณาระบุ เพศ' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'เพศ ต้องไม่เป็นค่าว่าง' }),
  prefixId: z
    .string({ message: 'กรุณาระบุ คำนำหน้าชื่อ' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'คำนำหน้าชื่อ ต้องไม่เป็นค่าว่าง',
    }),
  firstName: z
    .string({ message: 'กรุณาระบุ ชื่อ' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'ชื่อ ต้องไม่เป็นค่าว่าง' }),
  lastName: z
    .string({ message: 'กรุณาระบุ นามสกุล' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'นามสกุล ต้องไม่เป็นค่าว่าง' }),
  nickname: z
    .string({ message: 'กรุณาระบุ ชื่อเล่น' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'ชื่อเล่น ต้องไม่เป็นค่าว่าง' }),
  prefixEnId: z
    .string({ message: 'กรุณาระบุ คำนำหน้าชื่อ(EN)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'คำนำหน้าชื่อ(EN) ต้องไม่เป็นค่าว่าง',
    }),
  firstNameEn: z
    .string({ message: 'กรุณาระบุ ชื่อ(EN)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'ชื่อ(EN) ต้องไม่เป็นค่าว่าง' }),
  lastNameEn: z
    .string({ message: 'กรุณาระบุ นามสกุล(EN)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'นามสกุล(EN) ต้องไม่เป็นค่าว่าง',
    }),
  nicknameEn: z
    .string({ message: 'กรุณาระบุ ชื่อเล่น(EN)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อเล่น(EN) ต้องไม่เป็นค่าว่าง',
    }),
  orgStructureId: z
    .string({ message: 'กรุณาระบุ ชื่อหน่วยงาน' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อหน่วยงาน ต้องไม่เป็นค่าว่าง',
    }),
  dateOfBirth: z
    .union([
      z.string({ message: 'กรุณาระบุ วันเดือนปีเกิด' }),
      z.date({ message: 'กรุณาระบุ วันเดือนปีเกิด' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'วันเดือนปีเกิด ต้องไม่เป็นค่าว่าง',
    }),
  placementDate: z
    .union([
      z.string({ message: 'กรุณาระบุ วันบรรจุ' }),
      z.date({ message: 'กรุณาระบุ วันบรรจุ' }),
    ])
    .refine((v) => v !== null && v !== '', { message: 'วันบรรจุ ต้องไม่เป็นค่าว่าง' }),
  retirementDate: z
    .union([
      z.string({ message: 'กรุณาระบุ วันครบเกษียณอายุ' }),
      z.date({ message: 'กรุณาระบุ วันครบเกษียณอายุ' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'วันครบเกษียณอายุ ต้องไม่เป็นค่าว่าง',
    }),
  nationalId: z
    .string({ message: 'กรุณาระบุ เลขบัตรประชาชน' })
    .max(13, { message: 'เลขบัตรประชาชน ต้องมีค่าน้อยกว่าหรือเท่ากับ 13' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'เลขบัตรประชาชน ต้องไม่เป็นค่าว่าง',
    }),
  passportNumber: z
    .string({ message: 'กรุณาระบุ เลขหนังสือเดินทาง' })
    .max(20, { message: 'เลขหนังสือเดินทาง ต้องมีค่าน้อยกว่าหรือเท่ากับ 20' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'เลขหนังสือเดินทาง ต้องไม่เป็นค่าว่าง',
    }),
  telephone: z
    .string({ message: 'กรุณาระบุ เบอร์โทรศัพท์' })
    .max(10, { message: 'เบอร์โทรศัพท์ ต้องมีค่าน้อยกว่าหรือเท่ากับ 10' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'เบอร์โทรศัพท์ ต้องไม่เป็นค่าว่าง',
    }),
  email: z
    .string({ message: 'กรุณาระบุ อีเมล' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'อีเมล ต้องไม่เป็นค่าว่าง' }),
  lineId: z.string({ message: 'กรุณาระบุ ไลน์ไอดี' }).nullable(),
  fatherFullName: z.string({ message: 'กรุณาระบุ ชื่อ-นามสกุล บิดา' }).nullable(),
  motherFullName: z.string({ message: 'กรุณาระบุ ชื่อ-นามสกุล มารดา' }).nullable(),
  motherMaidenName: z.string({ message: 'กรุณาระบุ นามสกุลเดิม มารดา' }).nullable(),
  maritalStatus: z.boolean({ message: 'กรุณาระบุ แต่งงานแล้ว' }).nullable(),
  spouseFullName: z.string({ message: 'กรุณาระบุ ชื่อ-นามสกุล คู่สมรส' }).nullable(),
  spouseMaidenName: z.string({ message: 'กรุณาระบุ นามสกุลเดิม คู่สมรส' }).nullable(),
  contactPersonName: z
    .string({ message: 'กรุณาระบุ ชื่อผู้ติดต่อฉุกเฉิน' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อผู้ติดต่อฉุกเฉิน ต้องไม่เป็นค่าว่าง',
    }),
  contactPersonTel: z
    .string({ message: 'กรุณาระบุ เบอร์ผู้ติดต่อฉุกเฉิน' })
    .max(10, { message: 'เบอร์ผู้ติดต่อฉุกเฉิน ต้องมีค่าน้อยกว่าหรือเท่ากับ 10' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'เบอร์ผู้ติดต่อฉุกเฉิน ต้องไม่เป็นค่าว่าง',
    }),
  currentHouseNumber: z
    .string({ message: 'กรุณาระบุ เลขที่บ้าน(ปัจจุบัน)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'เลขที่บ้าน(ปัจจุบัน) ต้องไม่เป็นค่าว่าง',
    }),
  currentMoo: z
    .string({ message: 'กรุณาระบุ หมู่(ปัจจุบัน)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'หมู่(ปัจจุบัน) ต้องไม่เป็นค่าว่าง',
    }),
  currentSoi: z
    .string({ message: 'กรุณาระบุ ซอย(ปัจจุบัน)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ซอย(ปัจจุบัน) ต้องไม่เป็นค่าว่าง',
    }),
  currectYak: z
    .string({ message: 'กรุณาระบุ แยก(ปัจจุบัน)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'แยก(ปัจจุบัน) ต้องไม่เป็นค่าว่าง',
    }),
  currentRoad: z
    .string({ message: 'กรุณาระบุ ถนน(ปัจจุบัน)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ถนน(ปัจจุบัน) ต้องไม่เป็นค่าว่าง',
    }),
  currentSubdistrict: z
    .string({ message: 'กรุณาระบุ ตำบล(ปัจจุบัน)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ตำบล(ปัจจุบัน) ต้องไม่เป็นค่าว่าง',
    }),
  currentDistrict: z
    .string({ message: 'กรุณาระบุ อำเภอ(ปัจจุบัน)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'อำเภอ(ปัจจุบัน) ต้องไม่เป็นค่าว่าง',
    }),
  currentProvinceId: z
    .string({ message: 'กรุณาระบุ จังหวัด(ปัจจุบัน)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'จังหวัด(ปัจจุบัน) ต้องไม่เป็นค่าว่าง',
    }),
  currentPostcode: z
    .union([
      z.number({ message: 'กรุณาระบุ รหัสไปรษณีย์(ปัจจุบัน)' }).int(),
      z.string({ message: 'กรุณาระบุ รหัสไปรษณีย์(ปัจจุบัน)' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'รหัสไปรษณีย์(ปัจจุบัน) ต้องไม่เป็นค่าว่าง',
    }),
  permanentHouseNumber: z
    .string({ message: 'กรุณาระบุ เลขที่บ้าน(ตามทะเบียนบ้าน)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'เลขที่บ้าน(ตามทะเบียนบ้าน) ต้องไม่เป็นค่าว่าง',
    }),
  permanentMoo: z
    .string({ message: 'กรุณาระบุ หมู่(ตามทะเบียนบ้าน)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'หมู่(ตามทะเบียนบ้าน) ต้องไม่เป็นค่าว่าง',
    }),
  permanentSoi: z
    .string({ message: 'กรุณาระบุ ซอย(ตามทะเบียนบ้าน)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ซอย(ตามทะเบียนบ้าน) ต้องไม่เป็นค่าว่าง',
    }),
  permanentYak: z
    .string({ message: 'กรุณาระบุ แยก(ตามทะเบียนบ้าน)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'แยก(ตามทะเบียนบ้าน) ต้องไม่เป็นค่าว่าง',
    }),
  permanentRoad: z
    .string({ message: 'กรุณาระบุ ถนน(ตามทะเบียนบ้าน)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ถนน(ตามทะเบียนบ้าน) ต้องไม่เป็นค่าว่าง',
    }),
  permanentSubdistrict: z
    .string({ message: 'กรุณาระบุ ตำบล(ตามทะเบียนบ้าน)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ตำบล(ตามทะเบียนบ้าน) ต้องไม่เป็นค่าว่าง',
    }),
  permanentDistrict: z
    .string({ message: 'กรุณาระบุ อำเภอ(ตามทะเบียนบ้าน)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'อำเภอ(ตามทะเบียนบ้าน) ต้องไม่เป็นค่าว่าง',
    }),
  permanentProvinceId: z
    .string({ message: 'กรุณาระบุ จังหวัด(ตามทะเบียนบ้าน)' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'จังหวัด(ตามทะเบียนบ้าน) ต้องไม่เป็นค่าว่าง',
    }),
  permanentPostcode: z
    .union([
      z.number({ message: 'กรุณาระบุ รหัสไปรษณีย์(ตามทะเบียนบ้าน)' }).int(),
      z.string({ message: 'กรุณาระบุ รหัสไปรษณีย์(ตามทะเบียนบ้าน)' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'รหัสไปรษณีย์(ตามทะเบียนบ้าน) ต้องไม่เป็นค่าว่าง',
    }),
  note: z.string({ message: 'กรุณาระบุ หมายเหตุ' }).nullable(),
});

export const employeeSearchSchema = z.object({
  employeeId: z.string({ message: 'กรุณาระบุ รหัสพนักงาน' }).nullish(),
  genderId: z.string({ message: 'กรุณาระบุ เพศ' }).nullish(),
  firstName: z.string({ message: 'กรุณาระบุ ชื่อ' }).nullish(),
  lastName: z.string({ message: 'กรุณาระบุ นามสกุล' }).nullish(),
  nickname: z.string({ message: 'กรุณาระบุ ชื่อเล่น' }).nullish(),
  firstNameEn: z.string({ message: 'กรุณาระบุ ชื่อ(EN)' }).nullish(),
  lastNameEn: z.string({ message: 'กรุณาระบุ นามสกุล(EN)' }).nullish(),
  nicknameEn: z.string({ message: 'กรุณาระบุ ชื่อเล่น(EN)' }).nullish(),
  email: z.string({ message: 'กรุณาระบุ อีเมล' }).nullish(),
  lineId: z.string({ message: 'กรุณาระบุ ไลน์ไอดี' }).nullish(),
});

export type Employee = backofficeComponents['schemas']['EmployeeVm'];
export type EmployeeCreate = z.infer<typeof employeeCreateSchema>;
export type EmployeeUpdate = z.infer<typeof employeeUpdateSchema>;
export type EmployeeForm = EmployeeCreate & EmployeeUpdate;
export type EmployeeSearchForm = z.infer<typeof employeeSearchSchema>;
