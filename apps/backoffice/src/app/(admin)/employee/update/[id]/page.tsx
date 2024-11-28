import { EmployeeUpdateScreen } from '@backoffice/biz/employees/screens/update';

const EmployeeUpdatePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <EmployeeUpdateScreen id={id} />;
};

export default EmployeeUpdatePage;
