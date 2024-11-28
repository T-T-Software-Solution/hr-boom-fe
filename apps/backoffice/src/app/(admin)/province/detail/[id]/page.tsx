import { ProvinceDetailScreen } from '@backoffice/biz/provinces/screens/detail';

const ProvinceDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <ProvinceDetailScreen id={id} />;
};

export default ProvinceDetailPage;
