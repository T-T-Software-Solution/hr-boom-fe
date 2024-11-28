import { SocialSecurityTypeDetailScreen } from '@backoffice/biz/social-security-types/screens/detail';

const SocialSecurityTypeDetailPage = ({
  params,
}: { params: { id: string } }) => {
  const { id } = params;
  return <SocialSecurityTypeDetailScreen id={id} />;
};

export default SocialSecurityTypeDetailPage;
