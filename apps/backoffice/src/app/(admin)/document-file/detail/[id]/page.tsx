import { DocumentFileDetailScreen } from '@backoffice/biz/document-files/screens/detail';

const DocumentFileDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <DocumentFileDetailScreen id={id} />;
};

export default DocumentFileDetailPage;
