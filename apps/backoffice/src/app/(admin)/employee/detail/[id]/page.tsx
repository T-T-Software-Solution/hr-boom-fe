import { EmployeeDetailScreen } from '@backoffice/biz/employees/screens/detail';

const EmployeeDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <EmployeeDetailScreen id={id} />;
};

export default EmployeeDetailPage;
