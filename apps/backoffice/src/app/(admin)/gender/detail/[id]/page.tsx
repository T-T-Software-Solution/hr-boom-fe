import { GenderDetailScreen } from '@backoffice/biz/genders/screens/detail';

const GenderDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <GenderDetailScreen id={id} />;
};

export default GenderDetailPage;
