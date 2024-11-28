import { PrefixEnDetailScreen } from '@backoffice/biz/prefix-ens/screens/detail';

const PrefixEnDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <PrefixEnDetailScreen id={id} />;
};

export default PrefixEnDetailPage;
