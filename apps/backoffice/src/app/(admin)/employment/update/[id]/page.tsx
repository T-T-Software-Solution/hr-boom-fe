import { EmploymentUpdateScreen } from '@backoffice/biz/employments/screens/update';

const EmploymentUpdatePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <EmploymentUpdateScreen id={id} />;
};

export default EmploymentUpdatePage;
