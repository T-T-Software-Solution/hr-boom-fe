import { PaymentChannelUpdateScreen } from '@backoffice/biz/payment-channels/screens/update';

const PaymentChannelUpdatePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <PaymentChannelUpdateScreen id={id} />;
};

export default PaymentChannelUpdatePage;
