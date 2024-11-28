import { TaxBracketDetailScreen } from '@backoffice/biz/tax-brackets/screens/detail';

const TaxBracketDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <TaxBracketDetailScreen id={id} />;
};

export default TaxBracketDetailPage;
