import { OrgStructureTypeDetailScreen } from '@backoffice/biz/org-structure-types/screens/detail';

const OrgStructureTypeDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <OrgStructureTypeDetailScreen id={id} />;
};

export default OrgStructureTypeDetailPage;
