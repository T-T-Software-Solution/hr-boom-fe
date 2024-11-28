import { BankAccountTypeDetailScreen } from '@backoffice/biz/bank-account-types/screens/detail';

const BankAccountTypeDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <BankAccountTypeDetailScreen id={id} />;
};

export default BankAccountTypeDetailPage;
