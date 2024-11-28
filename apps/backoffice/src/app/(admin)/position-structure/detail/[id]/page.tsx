import { PositionStructureDetailScreen } from '@backoffice/biz/position-structures/screens/detail';

const PositionStructureDetailPage = ({
  params,
}: { params: { id: string } }) => {
  const { id } = params;
  return <PositionStructureDetailScreen id={id} />;
};

export default PositionStructureDetailPage;
