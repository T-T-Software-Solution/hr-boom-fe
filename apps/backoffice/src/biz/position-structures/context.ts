import { createFormContext } from '@mantine/form';
import type {
  PositionStructureForm,
  PositionStructureSearchForm,
} from './types';

export const [
  PositionStructureFormProvider,
  usePositionStructureFormContext,
  usePositionStructureForm,
] = createFormContext<PositionStructureForm>();
export const [
  PositionStructureSearchFormProvider,
  usePositionStructureSearchFormContext,
  usePositionStructureSearchForm,
] = createFormContext<PositionStructureSearchForm>();
