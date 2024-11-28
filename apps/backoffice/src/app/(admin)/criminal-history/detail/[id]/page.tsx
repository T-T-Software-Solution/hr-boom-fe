import { CriminalHistoryDetailScreen } from '@backoffice/biz/criminal-histories/screens/detail';

const CriminalHistoryDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <CriminalHistoryDetailScreen id={id} />;
};

export default CriminalHistoryDetailPage;
