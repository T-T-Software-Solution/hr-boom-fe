import { TaxConditionDetailScreen } from '@backoffice/biz/tax-conditions/screens/detail';

const TaxConditionDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <TaxConditionDetailScreen id={id} />;
};

export default TaxConditionDetailPage;
