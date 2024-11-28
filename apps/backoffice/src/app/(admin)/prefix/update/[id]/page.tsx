import { PrefixUpdateScreen } from '@backoffice/biz/prefixes/screens/update';

const PrefixUpdatePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <PrefixUpdateScreen id={id} />;
};

export default PrefixUpdatePage;
