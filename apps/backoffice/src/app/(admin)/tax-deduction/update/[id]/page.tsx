import { TaxDeductionUpdateScreen } from '@backoffice/biz/tax-deductions/screens/update';

const TaxDeductionUpdatePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <TaxDeductionUpdateScreen id={id} />;
};

export default TaxDeductionUpdatePage;
