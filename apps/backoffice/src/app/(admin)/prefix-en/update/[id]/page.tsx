import { PrefixEnUpdateScreen } from '@backoffice/biz/prefix-ens/screens/update';

const PrefixEnUpdatePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <PrefixEnUpdateScreen id={id} />;
};

export default PrefixEnUpdatePage;
