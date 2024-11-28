import { EducationLevelUpdateScreen } from '@backoffice/biz/education-levels/screens/update';

const EducationLevelUpdatePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <EducationLevelUpdateScreen id={id} />;
};

export default EducationLevelUpdatePage;
