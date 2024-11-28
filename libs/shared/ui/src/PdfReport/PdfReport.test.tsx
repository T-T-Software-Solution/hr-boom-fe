import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { PdfReport } from './PdfReport';

// Mocking ResizeObserver globally
global.ResizeObserver = class {
  callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }
  observe() {
    // No-op for now
  }
  unobserve() {
    // No-op for now
  }
  disconnect() {
    // No-op for now
  }
};

// Mocking matchMedia
global.matchMedia = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(), // Deprecated, but still commonly used
  removeListener: vi.fn(), // Deprecated, but still commonly used
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

// Mocking the required dependencies
vi.mock('react-pdf', () => {
  return {
    Document: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    Page: ({ pageNumber }: { pageNumber: number }) => (
      <div data-testid={`page-${pageNumber}`}>Page {pageNumber}</div>
    ),
  };
});

describe('PdfReport Component', () => {
  const mockPdfFilePath =
    'data:application/pdf;base64,JVBERi0xLjEKJcKlwrHDqwoKMSAwIG9iagogIDw8IC9UeXBlIC9DYXRhbG9nCiAgICAgL1BhZ2VzIDIgMCBSCiAgPj4KZW5kb2JqCgoyIDAgb2JqCiAgPDwgL1R5cGUgL1BhZ2VzCiAgICAgL0tpZHMgWzMgMCBSXQogICAgIC9Db3VudCAxCiAgICAgL01lZGlhQm94IFswIDAgMzAwIDE0NF0KICA+PgplbmRvYmoKCjMgMCBvYmoKICA8PCAgL1R5cGUgL1BhZ2UKICAgICAgL1BhcmVudCAyIDAgUgogICAgICAvUmVzb3VyY2VzCiAgICAgICA8PCAvRm9udAogICAgICAgICAgIDw8IC9GMQogICAgICAgICAgICAgICA8PCAvVHlwZSAvRm9udAogICAgICAgICAgICAgICAgICAvU3VidHlwZSAvVHlwZTEKICAgICAgICAgICAgICAgICAgL0Jhc2VGb250IC9UaW1lcy1Sb21hbgogICAgICAgICAgICAgICA+PgogICAgICAgICAgID4+CiAgICAgICA+PgogICAgICAvQ29udGVudHMgNCAwIFIKICA+PgplbmRvYmoKCjQgMCBvYmoKICA8PCAvTGVuZ3RoIDU1ID4+CnN0cmVhbQogIEJUCiAgICAvRjEgMTggVGYKICAgIDAgMCBUZAogICAgKEhlbGxvIFdvcmxkKSBUagogIEVUCmVuZHN0cmVhbQplbmRvYmoKCnhyZWYKMCA1CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAxOCAwMDAwMCBuIAowMDAwMDAwMDc3IDAwMDAwIG4gCjAwMDAwMDAxNzggMDAwMDAgbiAKMDAwMDAwMDQ1NyAwMDAwMCBuIAp0cmFpbGVyCiAgPDwgIC9Sb290IDEgMCBSCiAgICAgIC9TaXplIDUKICA+PgpzdGFydHhyZWYKNTY1CiUlRU9GCg=='; // Shortened base64 string for testing

  // Utility function to render with MantineProvider
  const renderWithMantineProvider = (ui: React.ReactNode) => {
    return render(<MantineProvider>{ui}</MantineProvider>);
  };

  it('renders the PDF document when a valid pdfFilePath is provided', async () => {
    renderWithMantineProvider(<PdfReport pdfFilePath={mockPdfFilePath} />);

    // Check if the PDF is being loaded
    expect(await screen.findByText(/page 1/i)).toBeInTheDocument();
  });
});
