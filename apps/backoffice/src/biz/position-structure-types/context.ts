import { createFormContext } from '@mantine/form';
import type {
  PositionStructureTypeForm,
  PositionStructureTypeSearchForm,
} from './types';

export const [
  PositionStructureTypeFormProvider,
  usePositionStructureTypeFormContext,
  usePositionStructureTypeForm,
] = createFormContext<PositionStructureTypeForm>();
export const [
  PositionStructureTypeSearchFormProvider,
  usePositionStructureTypeSearchFormContext,
  usePositionStructureTypeSearchForm,
] = createFormContext<PositionStructureTypeSearchForm>();
