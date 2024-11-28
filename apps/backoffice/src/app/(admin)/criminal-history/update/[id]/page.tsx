import { CriminalHistoryUpdateScreen } from '@backoffice/biz/criminal-histories/screens/update';

const CriminalHistoryUpdatePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <CriminalHistoryUpdateScreen id={id} />;
};

export default CriminalHistoryUpdatePage;
