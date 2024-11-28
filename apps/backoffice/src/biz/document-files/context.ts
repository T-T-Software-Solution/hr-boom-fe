import { createFormContext } from '@mantine/form';
import type { DocumentFileForm, DocumentFileSearchForm } from './types';

export const [
  DocumentFileFormProvider,
  useDocumentFileFormContext,
  useDocumentFileForm,
] = createFormContext<DocumentFileForm>();
export const [
  DocumentFileSearchFormProvider,
  useDocumentFileSearchFormContext,
  useDocumentFileSearchForm,
] = createFormContext<DocumentFileSearchForm>();
