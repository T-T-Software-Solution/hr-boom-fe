import { PositionStructureUpdateScreen } from '@backoffice/biz/position-structures/screens/update';

const PositionStructureUpdatePage = ({
  params,
}: { params: { id: string } }) => {
  const { id } = params;
  return <PositionStructureUpdateScreen id={id} />;
};

export default PositionStructureUpdatePage;
