import { ProvinceUpdateScreen } from '@backoffice/biz/provinces/screens/update';

const ProvinceUpdatePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <ProvinceUpdateScreen id={id} />;
};

export default ProvinceUpdatePage;
