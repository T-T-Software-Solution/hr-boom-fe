import { EmployeeTypeDetailScreen } from '@backoffice/biz/employee-types/screens/detail';

const EmployeeTypeDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <EmployeeTypeDetailScreen id={id} />;
};

export default EmployeeTypeDetailPage;
