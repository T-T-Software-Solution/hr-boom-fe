import { EducationLevelDetailScreen } from '@backoffice/biz/education-levels/screens/detail';

const EducationLevelDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <EducationLevelDetailScreen id={id} />;
};

export default EducationLevelDetailPage;
