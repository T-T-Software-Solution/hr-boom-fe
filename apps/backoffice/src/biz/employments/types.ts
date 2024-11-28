import type { backofficeComponents } from '@tt-ss-hr/api';
import z from 'zod';

export const employmentCreateSchema = z.object({
  employeeId: z
    .string({ message: 'ชื่อพนักงาน is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อพนักงาน ต้องไม่เป็นค่าว่าง',
    }),
  employmentStartDate: z
    .union([
      z.string({ message: 'วันที่เริ่มงาน is required' }),
      z.date({ message: 'วันที่เริ่มงาน is required' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'วันที่เริ่มงาน ต้องไม่เป็นค่าว่าง',
    }),
  yearsOfWork: z
    .union([
      z
        .number({ message: 'อายุงาน/ปี is required' })
        .int()
        .min(0, { message: 'อายุงาน/ปี ต้องมีค่ามากกว่าหรือเท่ากับ 0' }),
      z.string({ message: 'อายุงาน/ปี is required' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'อายุงาน/ปี ต้องไม่เป็นค่าว่าง',
    }),
  monthsOfWork: z
    .union([
      z
        .number({ message: 'อายุงาน/เดือน is required' })
        .int()
        .min(0, { message: 'อายุงาน/เดือน ต้องมีค่ามากกว่าหรือเท่ากับ 0' })
        .max(12, { message: 'อายุงาน/เดือน ต้องมีค่าน้อยกว่าหรือเท่ากับ 12' }),
      z.string({ message: 'อายุงาน/เดือน is required' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'อายุงาน/เดือน ต้องไม่เป็นค่าว่าง',
    }),
  daysOfWork: z
    .union([
      z
        .number({ message: 'อายุงาน/วัน is required' })
        .int()
        .min(0, { message: 'อายุงาน/วัน ต้องมีค่ามากกว่าหรือเท่ากับ 0' })
        .max(31, { message: 'อายุงาน/วัน ต้องมีค่าน้อยกว่าหรือเท่ากับ 31' }),
      z.string({ message: 'อายุงาน/วัน is required' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'อายุงาน/วัน ต้องไม่เป็นค่าว่าง',
    }),
  orgStructureId: z
    .string({ message: 'แผนก is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'แผนก ต้องไม่เป็นค่าว่าง' }),
  positionStructureId: z
    .string({ message: 'ตำแหน่งงาน is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ตำแหน่งงาน ต้องไม่เป็นค่าว่าง',
    }),
  employeeTypeId: z
    .string({ message: 'ประเภทพนักงาน is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ประเภทพนักงาน ต้องไม่เป็นค่าว่าง',
    }),
  socialSecurityTypeId: z
    .string({ message: 'สิทธิ์ประกันสังคม is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'สิทธิ์ประกันสังคม ต้องไม่เป็นค่าว่าง',
    }),
  salary: z
    .union([
      z.number({ message: 'เงินเดือน is required' }),
      z.string({ message: 'เงินเดือน is required' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'เงินเดือน ต้องไม่เป็นค่าว่าง',
    }),
  withholdingTax: z
    .union([
      z.number({ message: 'จำนวนหักภาษีต่อเดือน is required' }),
      z.string({ message: 'จำนวนหักภาษีต่อเดือน is required' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'จำนวนหักภาษีต่อเดือน ต้องไม่เป็นค่าว่าง',
    }),
  isWithholdingTax: z.boolean({ message: 'หักภาษี is required' }),
  taxConditionId: z
    .string({ message: 'เงื่อนไขการหักภาษี is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'เงื่อนไขการหักภาษี ต้องไม่เป็นค่าว่าง',
    }),
  taxBracketId: z
    .string({ message: 'ขั้นภาษี is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'ขั้นภาษี ต้องไม่เป็นค่าว่าง' }),
  netSalary: z
    .union([
      z.number({ message: 'เงินเดือนสุทธิ is required' }),
      z.string({ message: 'เงินเดือนสุทธิ is required' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'เงินเดือนสุทธิ ต้องไม่เป็นค่าว่าง',
    }),
  paymentChannelId: z
    .string({ message: 'ช่องทางการจ่ายเงินเดือน is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ช่องทางการจ่ายเงินเดือน ต้องไม่เป็นค่าว่าง',
    }),
  bankId: z
    .string({ message: 'ชื่อธนาคาร is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อธนาคาร ต้องไม่เป็นค่าว่าง',
    }),
  bankBranch: z
    .string({ message: 'สาขาธนาคาร is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'สาขาธนาคาร ต้องไม่เป็นค่าว่าง',
    }),
  bankAccountNumber: z
    .union([
      z.number({ message: 'เลขที่บัญชี is required' }).int(),
      z.string({ message: 'เลขที่บัญชี is required' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'เลขที่บัญชี ต้องไม่เป็นค่าว่าง',
    }),
  bankAccountTypeId: z
    .string({ message: 'ประเภทบัญชี is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ประเภทบัญชี ต้องไม่เป็นค่าว่าง',
    }),
  note: z
    .string({ message: 'หมายเหตุ is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'หมายเหตุ ต้องไม่เป็นค่าว่าง',
    }),
});

export const employmentUpdateSchema = z.object({
  id: z.string({ message: 'รหัสของการจ้างงาน is required' }).nullish(),
  employeeId: z
    .string({ message: 'ชื่อพนักงาน is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อพนักงาน ต้องไม่เป็นค่าว่าง',
    }),
  employmentStartDate: z
    .union([
      z.string({ message: 'วันที่เริ่มงาน is required' }),
      z.date({ message: 'วันที่เริ่มงาน is required' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'วันที่เริ่มงาน ต้องไม่เป็นค่าว่าง',
    }),
  yearsOfWork: z
    .union([
      z
        .number({ message: 'อายุงาน/ปี is required' })
        .int()
        .min(0, { message: 'อายุงาน/ปี ต้องมีค่ามากกว่าหรือเท่ากับ 0' }),
      z.string({ message: 'อายุงาน/ปี is required' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'อายุงาน/ปี ต้องไม่เป็นค่าว่าง',
    }),
  monthsOfWork: z
    .union([
      z
        .number({ message: 'อายุงาน/เดือน is required' })
        .int()
        .min(0, { message: 'อายุงาน/เดือน ต้องมีค่ามากกว่าหรือเท่ากับ 0' })
        .max(12, { message: 'อายุงาน/เดือน ต้องมีค่าน้อยกว่าหรือเท่ากับ 12' }),
      z.string({ message: 'อายุงาน/เดือน is required' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'อายุงาน/เดือน ต้องไม่เป็นค่าว่าง',
    }),
  daysOfWork: z
    .union([
      z
        .number({ message: 'อายุงาน/วัน is required' })
        .int()
        .min(0, { message: 'อายุงาน/วัน ต้องมีค่ามากกว่าหรือเท่ากับ 0' })
        .max(31, { message: 'อายุงาน/วัน ต้องมีค่าน้อยกว่าหรือเท่ากับ 31' }),
      z.string({ message: 'อายุงาน/วัน is required' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'อายุงาน/วัน ต้องไม่เป็นค่าว่าง',
    }),
  orgStructureId: z
    .string({ message: 'แผนก is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'แผนก ต้องไม่เป็นค่าว่าง' }),
  positionStructureId: z
    .string({ message: 'ตำแหน่งงาน is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ตำแหน่งงาน ต้องไม่เป็นค่าว่าง',
    }),
  employeeTypeId: z
    .string({ message: 'ประเภทพนักงาน is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ประเภทพนักงาน ต้องไม่เป็นค่าว่าง',
    }),
  socialSecurityTypeId: z
    .string({ message: 'สิทธิ์ประกันสังคม is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'สิทธิ์ประกันสังคม ต้องไม่เป็นค่าว่าง',
    }),
  salary: z
    .union([
      z.number({ message: 'เงินเดือน is required' }),
      z.string({ message: 'เงินเดือน is required' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'เงินเดือน ต้องไม่เป็นค่าว่าง',
    }),
  withholdingTax: z
    .union([
      z.number({ message: 'จำนวนหักภาษีต่อเดือน is required' }),
      z.string({ message: 'จำนวนหักภาษีต่อเดือน is required' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'จำนวนหักภาษีต่อเดือน ต้องไม่เป็นค่าว่าง',
    }),
  isWithholdingTax: z.boolean({ message: 'หักภาษี is required' }),
  taxConditionId: z
    .string({ message: 'เงื่อนไขการหักภาษี is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'เงื่อนไขการหักภาษี ต้องไม่เป็นค่าว่าง',
    }),
  taxBracketId: z
    .string({ message: 'ขั้นภาษี is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'ขั้นภาษี ต้องไม่เป็นค่าว่าง' }),
  netSalary: z
    .union([
      z.number({ message: 'เงินเดือนสุทธิ is required' }),
      z.string({ message: 'เงินเดือนสุทธิ is required' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'เงินเดือนสุทธิ ต้องไม่เป็นค่าว่าง',
    }),
  paymentChannelId: z
    .string({ message: 'ช่องทางการจ่ายเงินเดือน is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ช่องทางการจ่ายเงินเดือน ต้องไม่เป็นค่าว่าง',
    }),
  bankId: z
    .string({ message: 'ชื่อธนาคาร is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อธนาคาร ต้องไม่เป็นค่าว่าง',
    }),
  bankBranch: z
    .string({ message: 'สาขาธนาคาร is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'สาขาธนาคาร ต้องไม่เป็นค่าว่าง',
    }),
  bankAccountNumber: z
    .union([
      z.number({ message: 'เลขที่บัญชี is required' }).int(),
      z.string({ message: 'เลขที่บัญชี is required' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'เลขที่บัญชี ต้องไม่เป็นค่าว่าง',
    }),
  bankAccountTypeId: z
    .string({ message: 'ประเภทบัญชี is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ประเภทบัญชี ต้องไม่เป็นค่าว่าง',
    }),
  note: z
    .string({ message: 'หมายเหตุ is required' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'หมายเหตุ ต้องไม่เป็นค่าว่าง',
    }),
});

export const employmentSearchSchema = z.object({
  employeeId: z.string({ message: 'ชื่อพนักงาน is required' }).nullish(),
  employmentStartDate: z
    .union([
      z.string({ message: 'วันที่เริ่มงาน is required' }),
      z.date({ message: 'วันที่เริ่มงาน is required' }),
    ])
    .nullish(),
  orgStructureId: z.string({ message: 'แผนก is required' }).nullish(),
  positionStructureId: z.string({ message: 'ตำแหน่งงาน is required' }).nullish(),
  employeeTypeId: z.string({ message: 'ประเภทพนักงาน is required' }).nullish(),
  socialSecurityTypeId: z
    .string({ message: 'สิทธิ์ประกันสังคม is required' })
    .nullish(),
});

export type Employment = backofficeComponents['schemas']['EmploymentVm'];
export type EmploymentCreate = z.infer<typeof employmentCreateSchema>;
export type EmploymentUpdate = z.infer<typeof employmentUpdateSchema>;
export type EmploymentForm = EmploymentCreate & EmploymentUpdate;
export type EmploymentSearchForm = z.infer<typeof employmentSearchSchema>;
