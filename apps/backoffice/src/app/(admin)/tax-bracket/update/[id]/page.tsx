import { TaxBracketUpdateScreen } from '@backoffice/biz/tax-brackets/screens/update';

const TaxBracketUpdatePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <TaxBracketUpdateScreen id={id} />;
};

export default TaxBracketUpdatePage;
