import { SocialSecurityTypeUpdateScreen } from '@backoffice/biz/social-security-types/screens/update';

const SocialSecurityTypeUpdatePage = ({
  params,
}: { params: { id: string } }) => {
  const { id } = params;
  return <SocialSecurityTypeUpdateScreen id={id} />;
};

export default SocialSecurityTypeUpdatePage;
