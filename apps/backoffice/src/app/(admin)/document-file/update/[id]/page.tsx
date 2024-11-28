import { DocumentFileUpdateScreen } from '@backoffice/biz/document-files/screens/update';

const DocumentFileUpdatePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <DocumentFileUpdateScreen id={id} />;
};

export default DocumentFileUpdatePage;
