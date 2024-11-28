import { TrainingHistoryUpdateScreen } from '@backoffice/biz/training-histories/screens/update';

const TrainingHistoryUpdatePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <TrainingHistoryUpdateScreen id={id} />;
};

export default TrainingHistoryUpdatePage;
