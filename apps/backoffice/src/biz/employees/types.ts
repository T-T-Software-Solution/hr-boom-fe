import type { backofficeComponents } from '@tt-ss-hr/api';
import z from 'zod';

export const employeeCreateSchema = z.object({
  imagePath: z
    .union([
      z.string({ message: 'รูป is required' }),
      z.instanceof(File),
      z.null(),
    ])
    .nullable(),
  previewImagePath: z.string().nullish(),
  originalImagePath: z.string().nullish(),
  employeeId: z
    .string({ message: 'รหัสพนักงาน is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'รหัสพนักงาน ต้องไม่เป็นค่าว่าง',
    }),
  genderId: z
    .string({ message: 'เพศ is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'เพศ ต้องไม่เป็นค่าว่าง' }),
  prefixId: z
    .string({ message: 'คำนำหน้าชื่อ is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'คำนำหน้าชื่อ ต้องไม่เป็นค่าว่าง',
    }),
  firstName: z
    .string({ message: 'ชื่อ is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'ชื่อ ต้องไม่เป็นค่าว่าง' }),
  lastName: z
    .string({ message: 'นามสกุล is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'นามสกุล ต้องไม่เป็นค่าว่าง' }),
  nickname: z
    .string({ message: 'ชื่อเล่น is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'ชื่อเล่น ต้องไม่เป็นค่าว่าง' }),
  prefixEnId: z
    .string({ message: 'คำนำหน้าชื่อ(EN) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'คำนำหน้าชื่อ(EN) ต้องไม่เป็นค่าว่าง',
    }),
  firstNameEn: z
    .string({ message: 'ชื่อ(EN) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'ชื่อ(EN) ต้องไม่เป็นค่าว่าง' }),
  lastNameEn: z
    .string({ message: 'นามสกุล(EN) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'นามสกุล(EN) ต้องไม่เป็นค่าว่าง',
    }),
  nicknameEn: z
    .string({ message: 'ชื่อเล่น(EN) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อเล่น(EN) ต้องไม่เป็นค่าว่าง',
    }),
  orgStructureId: z
    .string({ message: 'ชื่อหน่วยงาน is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อหน่วยงาน ต้องไม่เป็นค่าว่าง',
    }),
  dateOfBirth: z
    .union([
      z.string({ message: 'วันเดือนปีเกิด is required' }),
      z.date({ message: 'วันเดือนปีเกิด is required' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'วันเดือนปีเกิด ต้องไม่เป็นค่าว่าง',
    }),
  placementDate: z
    .union([
      z.string({ message: 'วันบรรจุ is required' }),
      z.date({ message: 'วันบรรจุ is required' }),
    ])
    .refine((v) => v !== null && v !== '', { message: 'วันบรรจุ ต้องไม่เป็นค่าว่าง' }),
  retirementDate: z
    .union([
      z.string({ message: 'วันครบเกษียณอายุ is required' }),
      z.date({ message: 'วันครบเกษียณอายุ is required' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'วันครบเกษียณอายุ ต้องไม่เป็นค่าว่าง',
    }),
  nationalId: z
    .string({ message: 'เลขบัตรประชาชน is required' })
    .max(13, { message: 'เลขบัตรประชาชน ต้องมีค่าน้อยกว่าหรือเท่ากับ 13' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'เลขบัตรประชาชน ต้องไม่เป็นค่าว่าง',
    }),
  passportNumber: z
    .string({ message: 'เลขหนังสือเดินทาง is required' })
    .max(20, { message: 'เลขหนังสือเดินทาง ต้องมีค่าน้อยกว่าหรือเท่ากับ 20' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'เลขหนังสือเดินทาง ต้องไม่เป็นค่าว่าง',
    }),
  telephone: z
    .string({ message: 'เบอร์โทรศัพท์ is required' })
    .max(10, { message: 'เบอร์โทรศัพท์ ต้องมีค่าน้อยกว่าหรือเท่ากับ 10' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'เบอร์โทรศัพท์ ต้องไม่เป็นค่าว่าง',
    }),
  email: z
    .string({ message: 'อีเมล is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'อีเมล ต้องไม่เป็นค่าว่าง' }),
  lineId: z.string({ message: 'ไลน์ไอดี is required' }).nullable(),
  fatherFullName: z.string({ message: 'ชื่อ-นามสกุล บิดา is required' }).nullable(),
  motherFullName: z
    .string({ message: 'ชื่อ-นามสกุล มารดา is required' })
    .nullable(),
  motherMaidenName: z
    .string({ message: 'นามสกุลเดิม มารดา is required' })
    .nullable(),
  maritalStatus: z.boolean({ message: 'แต่งงานแล้ว is required' }).nullable(),
  spouseFullName: z
    .string({ message: 'ชื่อ-นามสกุล คู่สมรส is required' })
    .nullable(),
  spouseMaidenName: z
    .string({ message: 'นามสกุลเดิม คู่สมรส is required' })
    .nullable(),
  contactPersonName: z
    .string({ message: 'ชื่อผู้ติดต่อฉุกเฉิน is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อผู้ติดต่อฉุกเฉิน ต้องไม่เป็นค่าว่าง',
    }),
  contactPersonTel: z
    .string({ message: 'เบอร์ผู้ติดต่อฉุกเฉิน is required' })
    .max(10, { message: 'เบอร์ผู้ติดต่อฉุกเฉิน ต้องมีค่าน้อยกว่าหรือเท่ากับ 10' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'เบอร์ผู้ติดต่อฉุกเฉิน ต้องไม่เป็นค่าว่าง',
    }),
  currentHouseNumber: z
    .string({ message: 'เลขที่บ้าน(ปัจจุบัน) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'เลขที่บ้าน(ปัจจุบัน) ต้องไม่เป็นค่าว่าง',
    }),
  currentMoo: z
    .string({ message: 'หมู่(ปัจจุบัน) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'หมู่(ปัจจุบัน) ต้องไม่เป็นค่าว่าง',
    }),
  currentSoi: z
    .string({ message: 'ซอย(ปัจจุบัน) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ซอย(ปัจจุบัน) ต้องไม่เป็นค่าว่าง',
    }),
  currectYak: z
    .string({ message: 'แยก(ปัจจุบัน) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'แยก(ปัจจุบัน) ต้องไม่เป็นค่าว่าง',
    }),
  currentRoad: z
    .string({ message: 'ถนน(ปัจจุบัน) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ถนน(ปัจจุบัน) ต้องไม่เป็นค่าว่าง',
    }),
  currentSubdistrict: z
    .string({ message: 'ตำบล(ปัจจุบัน) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ตำบล(ปัจจุบัน) ต้องไม่เป็นค่าว่าง',
    }),
  currentDistrict: z
    .string({ message: 'อำเภอ(ปัจจุบัน) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'อำเภอ(ปัจจุบัน) ต้องไม่เป็นค่าว่าง',
    }),
  currentProvinceId: z
    .string({ message: 'จังหวัด(ปัจจุบัน) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'จังหวัด(ปัจจุบัน) ต้องไม่เป็นค่าว่าง',
    }),
  currentPostcode: z
    .union([
      z.number({ message: 'รหัสไปรษณีย์(ปัจจุบัน) is required' }).int(),
      z.string({ message: 'รหัสไปรษณีย์(ปัจจุบัน) is required' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'รหัสไปรษณีย์(ปัจจุบัน) ต้องไม่เป็นค่าว่าง',
    }),
  permanentHouseNumber: z
    .string({ message: 'เลขที่บ้าน(ตามทะเบียนบ้าน) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'เลขที่บ้าน(ตามทะเบียนบ้าน) ต้องไม่เป็นค่าว่าง',
    }),
  permanentMoo: z
    .string({ message: 'หมู่(ตามทะเบียนบ้าน) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'หมู่(ตามทะเบียนบ้าน) ต้องไม่เป็นค่าว่าง',
    }),
  permanentSoi: z
    .string({ message: 'ซอย(ตามทะเบียนบ้าน) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ซอย(ตามทะเบียนบ้าน) ต้องไม่เป็นค่าว่าง',
    }),
  permanentYak: z
    .string({ message: 'แยก(ตามทะเบียนบ้าน) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'แยก(ตามทะเบียนบ้าน) ต้องไม่เป็นค่าว่าง',
    }),
  permanentRoad: z
    .string({ message: 'ถนน(ตามทะเบียนบ้าน) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ถนน(ตามทะเบียนบ้าน) ต้องไม่เป็นค่าว่าง',
    }),
  permanentSubdistrict: z
    .string({ message: 'ตำบล(ตามทะเบียนบ้าน) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ตำบล(ตามทะเบียนบ้าน) ต้องไม่เป็นค่าว่าง',
    }),
  permanentDistrict: z
    .string({ message: 'อำเภอ(ตามทะเบียนบ้าน) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'อำเภอ(ตามทะเบียนบ้าน) ต้องไม่เป็นค่าว่าง',
    }),
  permanentProvinceId: z
    .string({ message: 'จังหวัด(ตามทะเบียนบ้าน) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'จังหวัด(ตามทะเบียนบ้าน) ต้องไม่เป็นค่าว่าง',
    }),
  permanentPostcode: z
    .union([
      z.number({ message: 'รหัสไปรษณีย์(ตามทะเบียนบ้าน) is required' }).int(),
      z.string({ message: 'รหัสไปรษณีย์(ตามทะเบียนบ้าน) is required' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'รหัสไปรษณีย์(ตามทะเบียนบ้าน) ต้องไม่เป็นค่าว่าง',
    }),
  note: z.string({ message: 'หมายเหตุ is required' }).nullable(),
});

export const employeeUpdateSchema = z.object({
  id: z.string({ message: 'รหัสของข้อมูลบุคลากร is required' }).nullish(),
  imagePath: z
    .union([
      z.string({ message: 'รูป is required' }),
      z.instanceof(File),
      z.null(),
    ])
    .nullable(),
  previewImagePath: z.string().nullish(),
  originalImagePath: z.string().nullish(),
  employeeId: z
    .string({ message: 'รหัสพนักงาน is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'รหัสพนักงาน ต้องไม่เป็นค่าว่าง',
    }),
  genderId: z
    .string({ message: 'เพศ is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'เพศ ต้องไม่เป็นค่าว่าง' }),
  prefixId: z
    .string({ message: 'คำนำหน้าชื่อ is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'คำนำหน้าชื่อ ต้องไม่เป็นค่าว่าง',
    }),
  firstName: z
    .string({ message: 'ชื่อ is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'ชื่อ ต้องไม่เป็นค่าว่าง' }),
  lastName: z
    .string({ message: 'นามสกุล is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'นามสกุล ต้องไม่เป็นค่าว่าง' }),
  nickname: z
    .string({ message: 'ชื่อเล่น is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'ชื่อเล่น ต้องไม่เป็นค่าว่าง' }),
  prefixEnId: z
    .string({ message: 'คำนำหน้าชื่อ(EN) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'คำนำหน้าชื่อ(EN) ต้องไม่เป็นค่าว่าง',
    }),
  firstNameEn: z
    .string({ message: 'ชื่อ(EN) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'ชื่อ(EN) ต้องไม่เป็นค่าว่าง' }),
  lastNameEn: z
    .string({ message: 'นามสกุล(EN) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'นามสกุล(EN) ต้องไม่เป็นค่าว่าง',
    }),
  nicknameEn: z
    .string({ message: 'ชื่อเล่น(EN) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อเล่น(EN) ต้องไม่เป็นค่าว่าง',
    }),
  orgStructureId: z
    .string({ message: 'ชื่อหน่วยงาน is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อหน่วยงาน ต้องไม่เป็นค่าว่าง',
    }),
  dateOfBirth: z
    .union([
      z.string({ message: 'วันเดือนปีเกิด is required' }),
      z.date({ message: 'วันเดือนปีเกิด is required' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'วันเดือนปีเกิด ต้องไม่เป็นค่าว่าง',
    }),
  placementDate: z
    .union([
      z.string({ message: 'วันบรรจุ is required' }),
      z.date({ message: 'วันบรรจุ is required' }),
    ])
    .refine((v) => v !== null && v !== '', { message: 'วันบรรจุ ต้องไม่เป็นค่าว่าง' }),
  retirementDate: z
    .union([
      z.string({ message: 'วันครบเกษียณอายุ is required' }),
      z.date({ message: 'วันครบเกษียณอายุ is required' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'วันครบเกษียณอายุ ต้องไม่เป็นค่าว่าง',
    }),
  nationalId: z
    .string({ message: 'เลขบัตรประชาชน is required' })
    .max(13, { message: 'เลขบัตรประชาชน ต้องมีค่าน้อยกว่าหรือเท่ากับ 13' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'เลขบัตรประชาชน ต้องไม่เป็นค่าว่าง',
    }),
  passportNumber: z
    .string({ message: 'เลขหนังสือเดินทาง is required' })
    .max(20, { message: 'เลขหนังสือเดินทาง ต้องมีค่าน้อยกว่าหรือเท่ากับ 20' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'เลขหนังสือเดินทาง ต้องไม่เป็นค่าว่าง',
    }),
  telephone: z
    .string({ message: 'เบอร์โทรศัพท์ is required' })
    .max(10, { message: 'เบอร์โทรศัพท์ ต้องมีค่าน้อยกว่าหรือเท่ากับ 10' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'เบอร์โทรศัพท์ ต้องไม่เป็นค่าว่าง',
    }),
  email: z
    .string({ message: 'อีเมล is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'อีเมล ต้องไม่เป็นค่าว่าง' }),
  lineId: z.string({ message: 'ไลน์ไอดี is required' }).nullable(),
  fatherFullName: z.string({ message: 'ชื่อ-นามสกุล บิดา is required' }).nullable(),
  motherFullName: z
    .string({ message: 'ชื่อ-นามสกุล มารดา is required' })
    .nullable(),
  motherMaidenName: z
    .string({ message: 'นามสกุลเดิม มารดา is required' })
    .nullable(),
  maritalStatus: z.boolean({ message: 'แต่งงานแล้ว is required' }).nullable(),
  spouseFullName: z
    .string({ message: 'ชื่อ-นามสกุล คู่สมรส is required' })
    .nullable(),
  spouseMaidenName: z
    .string({ message: 'นามสกุลเดิม คู่สมรส is required' })
    .nullable(),
  contactPersonName: z
    .string({ message: 'ชื่อผู้ติดต่อฉุกเฉิน is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อผู้ติดต่อฉุกเฉิน ต้องไม่เป็นค่าว่าง',
    }),
  contactPersonTel: z
    .string({ message: 'เบอร์ผู้ติดต่อฉุกเฉิน is required' })
    .max(10, { message: 'เบอร์ผู้ติดต่อฉุกเฉิน ต้องมีค่าน้อยกว่าหรือเท่ากับ 10' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'เบอร์ผู้ติดต่อฉุกเฉิน ต้องไม่เป็นค่าว่าง',
    }),
  currentHouseNumber: z
    .string({ message: 'เลขที่บ้าน(ปัจจุบัน) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'เลขที่บ้าน(ปัจจุบัน) ต้องไม่เป็นค่าว่าง',
    }),
  currentMoo: z
    .string({ message: 'หมู่(ปัจจุบัน) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'หมู่(ปัจจุบัน) ต้องไม่เป็นค่าว่าง',
    }),
  currentSoi: z
    .string({ message: 'ซอย(ปัจจุบัน) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ซอย(ปัจจุบัน) ต้องไม่เป็นค่าว่าง',
    }),
  currectYak: z
    .string({ message: 'แยก(ปัจจุบัน) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'แยก(ปัจจุบัน) ต้องไม่เป็นค่าว่าง',
    }),
  currentRoad: z
    .string({ message: 'ถนน(ปัจจุบัน) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ถนน(ปัจจุบัน) ต้องไม่เป็นค่าว่าง',
    }),
  currentSubdistrict: z
    .string({ message: 'ตำบล(ปัจจุบัน) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ตำบล(ปัจจุบัน) ต้องไม่เป็นค่าว่าง',
    }),
  currentDistrict: z
    .string({ message: 'อำเภอ(ปัจจุบัน) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'อำเภอ(ปัจจุบัน) ต้องไม่เป็นค่าว่าง',
    }),
  currentProvinceId: z
    .string({ message: 'จังหวัด(ปัจจุบัน) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'จังหวัด(ปัจจุบัน) ต้องไม่เป็นค่าว่าง',
    }),
  currentPostcode: z
    .union([
      z.number({ message: 'รหัสไปรษณีย์(ปัจจุบัน) is required' }).int(),
      z.string({ message: 'รหัสไปรษณีย์(ปัจจุบัน) is required' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'รหัสไปรษณีย์(ปัจจุบัน) ต้องไม่เป็นค่าว่าง',
    }),
  permanentHouseNumber: z
    .string({ message: 'เลขที่บ้าน(ตามทะเบียนบ้าน) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'เลขที่บ้าน(ตามทะเบียนบ้าน) ต้องไม่เป็นค่าว่าง',
    }),
  permanentMoo: z
    .string({ message: 'หมู่(ตามทะเบียนบ้าน) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'หมู่(ตามทะเบียนบ้าน) ต้องไม่เป็นค่าว่าง',
    }),
  permanentSoi: z
    .string({ message: 'ซอย(ตามทะเบียนบ้าน) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ซอย(ตามทะเบียนบ้าน) ต้องไม่เป็นค่าว่าง',
    }),
  permanentYak: z
    .string({ message: 'แยก(ตามทะเบียนบ้าน) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'แยก(ตามทะเบียนบ้าน) ต้องไม่เป็นค่าว่าง',
    }),
  permanentRoad: z
    .string({ message: 'ถนน(ตามทะเบียนบ้าน) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ถนน(ตามทะเบียนบ้าน) ต้องไม่เป็นค่าว่าง',
    }),
  permanentSubdistrict: z
    .string({ message: 'ตำบล(ตามทะเบียนบ้าน) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ตำบล(ตามทะเบียนบ้าน) ต้องไม่เป็นค่าว่าง',
    }),
  permanentDistrict: z
    .string({ message: 'อำเภอ(ตามทะเบียนบ้าน) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'อำเภอ(ตามทะเบียนบ้าน) ต้องไม่เป็นค่าว่าง',
    }),
  permanentProvinceId: z
    .string({ message: 'จังหวัด(ตามทะเบียนบ้าน) is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'จังหวัด(ตามทะเบียนบ้าน) ต้องไม่เป็นค่าว่าง',
    }),
  permanentPostcode: z
    .union([
      z.number({ message: 'รหัสไปรษณีย์(ตามทะเบียนบ้าน) is required' }).int(),
      z.string({ message: 'รหัสไปรษณีย์(ตามทะเบียนบ้าน) is required' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'รหัสไปรษณีย์(ตามทะเบียนบ้าน) ต้องไม่เป็นค่าว่าง',
    }),
  note: z.string({ message: 'หมายเหตุ is required' }).nullable(),
});

export const employeeSearchSchema = z.object({
  employeeId: z.string({ message: 'รหัสพนักงาน is required' }).nullish(),
  genderId: z.string({ message: 'เพศ is required' }).nullish(),
  firstName: z.string({ message: 'ชื่อ is required' }).nullish(),
  lastName: z.string({ message: 'นามสกุล is required' }).nullish(),
  nickname: z.string({ message: 'ชื่อเล่น is required' }).nullish(),
  firstNameEn: z.string({ message: 'ชื่อ(EN) is required' }).nullish(),
  lastNameEn: z.string({ message: 'นามสกุล(EN) is required' }).nullish(),
  nicknameEn: z.string({ message: 'ชื่อเล่น(EN) is required' }).nullish(),
  email: z.string({ message: 'อีเมล is required' }).nullish(),
  lineId: z.string({ message: 'ไลน์ไอดี is required' }).nullish(),
});

export type Employee = backofficeComponents['schemas']['EmployeeVm'];
export type EmployeeCreate = z.infer<typeof employeeCreateSchema>;
export type EmployeeUpdate = z.infer<typeof employeeUpdateSchema>;
export type EmployeeForm = EmployeeCreate & EmployeeUpdate;
export type EmployeeSearchForm = z.infer<typeof employeeSearchSchema>;
