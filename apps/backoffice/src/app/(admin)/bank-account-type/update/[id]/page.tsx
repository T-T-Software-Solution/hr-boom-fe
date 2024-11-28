import { BankAccountTypeUpdateScreen } from '@backoffice/biz/bank-account-types/screens/update';

const BankAccountTypeUpdatePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <BankAccountTypeUpdateScreen id={id} />;
};

export default BankAccountTypeUpdatePage;
