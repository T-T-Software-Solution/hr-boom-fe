import { ProfessionalLicenseDetailScreen } from '@backoffice/biz/professional-licenses/screens/detail';

const ProfessionalLicenseDetailPage = ({
  params,
}: { params: { id: string } }) => {
  const { id } = params;
  return <ProfessionalLicenseDetailScreen id={id} />;
};

export default ProfessionalLicenseDetailPage;
