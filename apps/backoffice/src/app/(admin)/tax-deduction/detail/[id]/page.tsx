import { TaxDeductionDetailScreen } from '@backoffice/biz/tax-deductions/screens/detail';

const TaxDeductionDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <TaxDeductionDetailScreen id={id} />;
};

export default TaxDeductionDetailPage;
