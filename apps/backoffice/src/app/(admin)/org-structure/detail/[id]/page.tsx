import { OrgStructureDetailScreen } from '@backoffice/biz/org-structures/screens/detail';

const OrgStructureDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <OrgStructureDetailScreen id={id} />;
};

export default OrgStructureDetailPage;
