import { OrgStructureTypeUpdateScreen } from '@backoffice/biz/org-structure-types/screens/update';

const OrgStructureTypeUpdatePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <OrgStructureTypeUpdateScreen id={id} />;
};

export default OrgStructureTypeUpdatePage;
