import type { backofficeComponents } from '@tt-ss-hr/api';
import z from 'zod';

export const paymentChannelCreateSchema = z.object({
  name: z
    .string({ message: 'กรุณาระบุ ชื่อช่องทางจ่ายเงินเดือน' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อช่องทางจ่ายเงินเดือน ต้องไม่เป็นค่าว่าง',
    }),
});

export const paymentChannelUpdateSchema = z.object({
  id: z.string({ message: 'กรุณาระบุ รหัสช่องทางจ่ายเงินเดือน' }).nullish(),
  name: z
    .string({ message: 'กรุณาระบุ ชื่อช่องทางจ่ายเงินเดือน' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'ชื่อช่องทางจ่ายเงินเดือน ต้องไม่เป็นค่าว่าง',
    }),
});

export const paymentChannelSearchSchema = z.object({
  name: z.string({ message: 'กรุณาระบุ ชื่อช่องทางจ่ายเงินเดือน' }).nullish(),
});

export type PaymentChannel =
  backofficeComponents['schemas']['PaymentChannelVm'];
export type PaymentChannelCreate = z.infer<typeof paymentChannelCreateSchema>;
export type PaymentChannelUpdate = z.infer<typeof paymentChannelUpdateSchema>;
export type PaymentChannelForm = PaymentChannelCreate & PaymentChannelUpdate;
export type PaymentChannelSearchForm = z.infer<
  typeof paymentChannelSearchSchema
>;
