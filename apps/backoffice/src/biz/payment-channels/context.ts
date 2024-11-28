import { createFormContext } from '@mantine/form';
import type { PaymentChannelForm, PaymentChannelSearchForm } from './types';

export const [
  PaymentChannelFormProvider,
  usePaymentChannelFormContext,
  usePaymentChannelForm,
] = createFormContext<PaymentChannelForm>();
export const [
  PaymentChannelSearchFormProvider,
  usePaymentChannelSearchFormContext,
  usePaymentChannelSearchForm,
] = createFormContext<PaymentChannelSearchForm>();
