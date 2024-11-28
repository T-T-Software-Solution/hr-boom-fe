import { EducationDetailScreen } from '@backoffice/biz/educations/screens/detail';

const EducationDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <EducationDetailScreen id={id} />;
};

export default EducationDetailPage;
