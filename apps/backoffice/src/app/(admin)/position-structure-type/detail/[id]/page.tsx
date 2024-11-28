import { PositionStructureTypeDetailScreen } from '@backoffice/biz/position-structure-types/screens/detail';

const PositionStructureTypeDetailPage = ({
  params,
}: { params: { id: string } }) => {
  const { id } = params;
  return <PositionStructureTypeDetailScreen id={id} />;
};

export default PositionStructureTypeDetailPage;
