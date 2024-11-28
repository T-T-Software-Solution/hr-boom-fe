import { BankUpdateScreen } from '@backoffice/biz/banks/screens/update';

const BankUpdatePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <BankUpdateScreen id={id} />;
};

export default BankUpdatePage;
