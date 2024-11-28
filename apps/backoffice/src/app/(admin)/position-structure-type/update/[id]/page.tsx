import { PositionStructureTypeUpdateScreen } from '@backoffice/biz/position-structure-types/screens/update';

const PositionStructureTypeUpdatePage = ({
  params,
}: { params: { id: string } }) => {
  const { id } = params;
  return <PositionStructureTypeUpdateScreen id={id} />;
};

export default PositionStructureTypeUpdatePage;
