import { EmployeeTypeUpdateScreen } from '@backoffice/biz/employee-types/screens/update';

const EmployeeTypeUpdatePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <EmployeeTypeUpdateScreen id={id} />;
};

export default EmployeeTypeUpdatePage;
