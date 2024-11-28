import { TaxConditionUpdateScreen } from '@backoffice/biz/tax-conditions/screens/update';

const TaxConditionUpdatePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <TaxConditionUpdateScreen id={id} />;
};

export default TaxConditionUpdatePage;
