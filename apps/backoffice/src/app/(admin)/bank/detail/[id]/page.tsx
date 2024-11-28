import { BankDetailScreen } from '@backoffice/biz/banks/screens/detail';

const BankDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <BankDetailScreen id={id} />;
};

export default BankDetailPage;
