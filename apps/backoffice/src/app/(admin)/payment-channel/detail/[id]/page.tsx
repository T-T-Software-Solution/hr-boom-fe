import { PaymentChannelDetailScreen } from '@backoffice/biz/payment-channels/screens/detail';

const PaymentChannelDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <PaymentChannelDetailScreen id={id} />;
};

export default PaymentChannelDetailPage;
