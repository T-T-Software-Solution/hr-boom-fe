import dayjs from 'dayjs';
import type { PaymentChannelForm, PaymentChannelSearchForm } from './types';

export const paymentChannelFormDefaultValues: PaymentChannelForm = {
  name: '',
  id: '',
};

export const paymentChannelSearchFormDefaultValues: PaymentChannelSearchForm = {
  name: null,
};

export const defaultPagination = {
  pageIndex: 1,
  pageSize: 10,
};
