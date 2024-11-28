import { FileInput, MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';
import { FileDisplay } from './FileDisplay';

// Mock window.matchMedia before the tests run
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {}, // Deprecated
      removeListener: () => {}, // Deprecated
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

describe('FileInput with FileDisplay', () => {
  const renderWithMantineProvider = (ui: React.ReactNode) => {
    return render(<MantineProvider>{ui}</MantineProvider>);
  };

  it('should render FileInput with no files uploaded', () => {
    renderWithMantineProvider(
      <FileInput
        label="Upload files"
        placeholder="Upload files"
        multiple
        clearable
        value={[]} // No files uploaded
        valueComponent={FileDisplay}
      />,
    );

    // Check that the label renders correctly
    expect(screen.getByLabelText(/Upload files/i)).toBeInTheDocument();

    // Check for the presence of the button element (which allows file uploads)
    const inputButton = screen.getByRole('button'); // Get the input button by role
    expect(inputButton).toBeInTheDocument();

    // Check that the input element has the correct placeholder attribute
    // const inputElement = screen.getByPlaceholderText('Upload files');
    // expect(inputElement).toBeInTheDocument();
  });

  it('should display a single uploaded file', () => {
    const file = new File([''], 'example.txt');
    renderWithMantineProvider(
      <FileInput
        label="Upload files"
        placeholder="Upload files"
        multiple
        clearable
        value={[file]} // Pass the file to the FileInput's value
        valueComponent={FileDisplay}
      />,
    );

    // Check that the file name is rendered inside the FileDisplay
    const pill = screen.getByText(/example\.txt/i);
    expect(pill).toBeInTheDocument();
  });

  it('should display multiple uploaded files', () => {
    const files = [new File([''], 'file1.txt'), new File([''], 'file2.txt')];
    renderWithMantineProvider(
      <FileInput
        label="Upload files"
        placeholder="Upload files"
        multiple
        clearable
        value={files} // Pass the files to the FileInput's value
        valueComponent={FileDisplay}
      />,
    );

    // Iterate over files and check that each file name is rendered inside the FileDisplay
    for (const file of files) {
      const pill = screen.getByText(file.name);
      expect(pill).toBeInTheDocument();
    }
  });
});
