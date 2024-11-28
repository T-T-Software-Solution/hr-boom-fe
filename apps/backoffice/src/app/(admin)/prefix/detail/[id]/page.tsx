import { PrefixDetailScreen } from '@backoffice/biz/prefixes/screens/detail';

const PrefixDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <PrefixDetailScreen id={id} />;
};

export default PrefixDetailPage;
