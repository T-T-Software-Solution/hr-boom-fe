import { EmploymentDetailScreen } from '@backoffice/biz/employments/screens/detail';

const EmploymentDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <EmploymentDetailScreen id={id} />;
};

export default EmploymentDetailPage;
