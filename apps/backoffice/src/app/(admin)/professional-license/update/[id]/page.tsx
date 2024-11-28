import { ProfessionalLicenseUpdateScreen } from '@backoffice/biz/professional-licenses/screens/update';

const ProfessionalLicenseUpdatePage = ({
  params,
}: { params: { id: string } }) => {
  const { id } = params;
  return <ProfessionalLicenseUpdateScreen id={id} />;
};

export default ProfessionalLicenseUpdatePage;
