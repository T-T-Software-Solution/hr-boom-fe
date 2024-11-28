import { EducationUpdateScreen } from '@backoffice/biz/educations/screens/update';

const EducationUpdatePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <EducationUpdateScreen id={id} />;
};

export default EducationUpdatePage;
