import type { backofficeComponents } from '@tt-ss-hr/api';
import z from 'zod';

export const employmentCreateSchema = z.object({
  employeeId: z
    .string({ message: 'กรุณาระบุ ชื่อพนักงาน' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อพนักงาน ต้องไม่เป็นค่าว่าง',
    }),
  employmentStartDate: z
    .union([
      z.string({ message: 'กรุณาระบุ วันที่เริ่มงาน' }),
      z.date({ message: 'กรุณาระบุ วันที่เริ่มงาน' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'วันที่เริ่มงาน ต้องไม่เป็นค่าว่าง',
    }),
  yearsOfWork: z
    .union([
      z
        .number({ message: 'กรุณาระบุ อายุงาน/ปี' })
        .int()
        .min(0, { message: 'อายุงาน/ปี ต้องมีค่ามากกว่าหรือเท่ากับ 0' }),
      z.string({ message: 'กรุณาระบุ อายุงาน/ปี' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'อายุงาน/ปี ต้องไม่เป็นค่าว่าง',
    }),
  monthsOfWork: z
    .union([
      z
        .number({ message: 'กรุณาระบุ อายุงาน/เดือน' })
        .int()
        .min(0, { message: 'อายุงาน/เดือน ต้องมีค่ามากกว่าหรือเท่ากับ 0' })
        .max(12, { message: 'อายุงาน/เดือน ต้องมีค่าน้อยกว่าหรือเท่ากับ 12' }),
      z.string({ message: 'กรุณาระบุ อายุงาน/เดือน' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'อายุงาน/เดือน ต้องไม่เป็นค่าว่าง',
    }),
  daysOfWork: z
    .union([
      z
        .number({ message: 'กรุณาระบุ อายุงาน/วัน' })
        .int()
        .min(0, { message: 'อายุงาน/วัน ต้องมีค่ามากกว่าหรือเท่ากับ 0' })
        .max(31, { message: 'อายุงาน/วัน ต้องมีค่าน้อยกว่าหรือเท่ากับ 31' }),
      z.string({ message: 'กรุณาระบุ อายุงาน/วัน' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'อายุงาน/วัน ต้องไม่เป็นค่าว่าง',
    }),
  orgStructureId: z
    .string({ message: 'กรุณาระบุ แผนก' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'แผนก ต้องไม่เป็นค่าว่าง' }),
  positionStructureId: z
    .string({ message: 'กรุณาระบุ ตำแหน่งงาน' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ตำแหน่งงาน ต้องไม่เป็นค่าว่าง',
    }),
  employeeTypeId: z
    .string({ message: 'กรุณาระบุ ประเภทพนักงาน' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ประเภทพนักงาน ต้องไม่เป็นค่าว่าง',
    }),
  socialSecurityTypeId: z
    .string({ message: 'กรุณาระบุ สิทธิ์ประกันสังคม' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'สิทธิ์ประกันสังคม ต้องไม่เป็นค่าว่าง',
    }),
  salary: z
    .union([
      z.number({ message: 'กรุณาระบุ เงินเดือน' }),
      z.string({ message: 'กรุณาระบุ เงินเดือน' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'เงินเดือน ต้องไม่เป็นค่าว่าง',
    }),
  withholdingTax: z
    .union([
      z.number({ message: 'กรุณาระบุ จำนวนหักภาษีต่อเดือน' }),
      z.string({ message: 'กรุณาระบุ จำนวนหักภาษีต่อเดือน' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'จำนวนหักภาษีต่อเดือน ต้องไม่เป็นค่าว่าง',
    }),
  isWithholdingTax: z.boolean({ message: 'กรุณาระบุ หักภาษี' }),
  taxConditionId: z
    .string({ message: 'กรุณาระบุ เงื่อนไขการหักภาษี' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'เงื่อนไขการหักภาษี ต้องไม่เป็นค่าว่าง',
    }),
  taxBracketId: z
    .string({ message: 'กรุณาระบุ ขั้นภาษี' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'ขั้นภาษี ต้องไม่เป็นค่าว่าง' }),
  netSalary: z
    .union([
      z.number({ message: 'กรุณาระบุ เงินเดือนสุทธิ' }),
      z.string({ message: 'กรุณาระบุ เงินเดือนสุทธิ' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'เงินเดือนสุทธิ ต้องไม่เป็นค่าว่าง',
    }),
  paymentChannelId: z
    .string({ message: 'กรุณาระบุ ช่องทางการจ่ายเงินเดือน' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ช่องทางการจ่ายเงินเดือน ต้องไม่เป็นค่าว่าง',
    }),
  bankId: z
    .string({ message: 'กรุณาระบุ ชื่อธนาคาร' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อธนาคาร ต้องไม่เป็นค่าว่าง',
    }),
  bankBranch: z
    .string({ message: 'กรุณาระบุ สาขาธนาคาร' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'สาขาธนาคาร ต้องไม่เป็นค่าว่าง',
    }),
  bankAccountNumber: z
    .union([
      z.number({ message: 'กรุณาระบุ เลขที่บัญชี' }).int(),
      z.string({ message: 'กรุณาระบุ เลขที่บัญชี' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'เลขที่บัญชี ต้องไม่เป็นค่าว่าง',
    }),
  bankAccountTypeId: z
    .string({ message: 'กรุณาระบุ ประเภทบัญชี' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ประเภทบัญชี ต้องไม่เป็นค่าว่าง',
    }),
  note: z
    .string({ message: 'กรุณาระบุ หมายเหตุ' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'หมายเหตุ ต้องไม่เป็นค่าว่าง',
    }),
});

export const employmentUpdateSchema = z.object({
  id: z.string({ message: 'กรุณาระบุ รหัสของการจ้างงาน' }).nullish(),
  employeeId: z
    .string({ message: 'กรุณาระบุ ชื่อพนักงาน' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อพนักงาน ต้องไม่เป็นค่าว่าง',
    }),
  employmentStartDate: z
    .union([
      z.string({ message: 'กรุณาระบุ วันที่เริ่มงาน' }),
      z.date({ message: 'กรุณาระบุ วันที่เริ่มงาน' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'วันที่เริ่มงาน ต้องไม่เป็นค่าว่าง',
    }),
  yearsOfWork: z
    .union([
      z
        .number({ message: 'กรุณาระบุ อายุงาน/ปี' })
        .int()
        .min(0, { message: 'อายุงาน/ปี ต้องมีค่ามากกว่าหรือเท่ากับ 0' }),
      z.string({ message: 'กรุณาระบุ อายุงาน/ปี' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'อายุงาน/ปี ต้องไม่เป็นค่าว่าง',
    }),
  monthsOfWork: z
    .union([
      z
        .number({ message: 'กรุณาระบุ อายุงาน/เดือน' })
        .int()
        .min(0, { message: 'อายุงาน/เดือน ต้องมีค่ามากกว่าหรือเท่ากับ 0' })
        .max(12, { message: 'อายุงาน/เดือน ต้องมีค่าน้อยกว่าหรือเท่ากับ 12' }),
      z.string({ message: 'กรุณาระบุ อายุงาน/เดือน' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'อายุงาน/เดือน ต้องไม่เป็นค่าว่าง',
    }),
  daysOfWork: z
    .union([
      z
        .number({ message: 'กรุณาระบุ อายุงาน/วัน' })
        .int()
        .min(0, { message: 'อายุงาน/วัน ต้องมีค่ามากกว่าหรือเท่ากับ 0' })
        .max(31, { message: 'อายุงาน/วัน ต้องมีค่าน้อยกว่าหรือเท่ากับ 31' }),
      z.string({ message: 'กรุณาระบุ อายุงาน/วัน' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'อายุงาน/วัน ต้องไม่เป็นค่าว่าง',
    }),
  orgStructureId: z
    .string({ message: 'กรุณาระบุ แผนก' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'แผนก ต้องไม่เป็นค่าว่าง' }),
  positionStructureId: z
    .string({ message: 'กรุณาระบุ ตำแหน่งงาน' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ตำแหน่งงาน ต้องไม่เป็นค่าว่าง',
    }),
  employeeTypeId: z
    .string({ message: 'กรุณาระบุ ประเภทพนักงาน' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ประเภทพนักงาน ต้องไม่เป็นค่าว่าง',
    }),
  socialSecurityTypeId: z
    .string({ message: 'กรุณาระบุ สิทธิ์ประกันสังคม' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'สิทธิ์ประกันสังคม ต้องไม่เป็นค่าว่าง',
    }),
  salary: z
    .union([
      z.number({ message: 'กรุณาระบุ เงินเดือน' }),
      z.string({ message: 'กรุณาระบุ เงินเดือน' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'เงินเดือน ต้องไม่เป็นค่าว่าง',
    }),
  withholdingTax: z
    .union([
      z.number({ message: 'กรุณาระบุ จำนวนหักภาษีต่อเดือน' }),
      z.string({ message: 'กรุณาระบุ จำนวนหักภาษีต่อเดือน' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'จำนวนหักภาษีต่อเดือน ต้องไม่เป็นค่าว่าง',
    }),
  isWithholdingTax: z.boolean({ message: 'กรุณาระบุ หักภาษี' }),
  taxConditionId: z
    .string({ message: 'กรุณาระบุ เงื่อนไขการหักภาษี' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'เงื่อนไขการหักภาษี ต้องไม่เป็นค่าว่าง',
    }),
  taxBracketId: z
    .string({ message: 'กรุณาระบุ ขั้นภาษี' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', { message: 'ขั้นภาษี ต้องไม่เป็นค่าว่าง' }),
  netSalary: z
    .union([
      z.number({ message: 'กรุณาระบุ เงินเดือนสุทธิ' }),
      z.string({ message: 'กรุณาระบุ เงินเดือนสุทธิ' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'เงินเดือนสุทธิ ต้องไม่เป็นค่าว่าง',
    }),
  paymentChannelId: z
    .string({ message: 'กรุณาระบุ ช่องทางการจ่ายเงินเดือน' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ช่องทางการจ่ายเงินเดือน ต้องไม่เป็นค่าว่าง',
    }),
  bankId: z
    .string({ message: 'กรุณาระบุ ชื่อธนาคาร' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อธนาคาร ต้องไม่เป็นค่าว่าง',
    }),
  bankBranch: z
    .string({ message: 'กรุณาระบุ สาขาธนาคาร' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'สาขาธนาคาร ต้องไม่เป็นค่าว่าง',
    }),
  bankAccountNumber: z
    .union([
      z.number({ message: 'กรุณาระบุ เลขที่บัญชี' }).int(),
      z.string({ message: 'กรุณาระบุ เลขที่บัญชี' }),
    ])
    .refine((v) => v !== null && v !== '', {
      message: 'เลขที่บัญชี ต้องไม่เป็นค่าว่าง',
    }),
  bankAccountTypeId: z
    .string({ message: 'กรุณาระบุ ประเภทบัญชี' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ประเภทบัญชี ต้องไม่เป็นค่าว่าง',
    }),
  note: z
    .string({ message: 'กรุณาระบุ หมายเหตุ' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'หมายเหตุ ต้องไม่เป็นค่าว่าง',
    }),
});

export const employmentSearchSchema = z.object({
  employeeId: z.string({ message: 'กรุณาระบุ ชื่อพนักงาน' }).nullish(),
  employmentStartDate: z
    .union([
      z.string({ message: 'กรุณาระบุ วันที่เริ่มงาน' }),
      z.date({ message: 'กรุณาระบุ วันที่เริ่มงาน' }),
    ])
    .nullish(),
  orgStructureId: z.string({ message: 'กรุณาระบุ แผนก' }).nullish(),
  positionStructureId: z.string({ message: 'กรุณาระบุ ตำแหน่งงาน' }).nullish(),
  employeeTypeId: z.string({ message: 'กรุณาระบุ ประเภทพนักงาน' }).nullish(),
  socialSecurityTypeId: z.string({ message: 'กรุณาระบุ สิทธิ์ประกันสังคม' }).nullish(),
});

export type Employment = backofficeComponents['schemas']['EmploymentVm'];
export type EmploymentCreate = z.infer<typeof employmentCreateSchema>;
export type EmploymentUpdate = z.infer<typeof employmentUpdateSchema>;
export type EmploymentForm = EmploymentCreate & EmploymentUpdate;
export type EmploymentSearchForm = z.infer<typeof employmentSearchSchema>;
