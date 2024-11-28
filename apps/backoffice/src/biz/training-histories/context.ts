import { createFormContext } from '@mantine/form';
import type { TrainingHistoryForm, TrainingHistorySearchForm } from './types';

export const [
  TrainingHistoryFormProvider,
  useTrainingHistoryFormContext,
  useTrainingHistoryForm,
] = createFormContext<TrainingHistoryForm>();
export const [
  TrainingHistorySearchFormProvider,
  useTrainingHistorySearchFormContext,
  useTrainingHistorySearchForm,
] = createFormContext<TrainingHistorySearchForm>();
