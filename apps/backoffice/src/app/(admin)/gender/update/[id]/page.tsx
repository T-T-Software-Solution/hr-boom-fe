import { GenderUpdateScreen } from '@backoffice/biz/genders/screens/update';

const GenderUpdatePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <GenderUpdateScreen id={id} />;
};

export default GenderUpdatePage;
