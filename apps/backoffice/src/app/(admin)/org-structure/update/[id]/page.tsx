import { OrgStructureUpdateScreen } from '@backoffice/biz/org-structures/screens/update';

const OrgStructureUpdatePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <OrgStructureUpdateScreen id={id} />;
};

export default OrgStructureUpdatePage;
