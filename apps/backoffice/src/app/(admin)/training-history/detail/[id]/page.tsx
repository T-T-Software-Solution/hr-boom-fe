import { TrainingHistoryDetailScreen } from '@backoffice/biz/training-histories/screens/detail';

const TrainingHistoryDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <TrainingHistoryDetailScreen id={id} />;
};

export default TrainingHistoryDetailPage;
