import { mkConfig } from 'export-to-csv';
import {
  base64PdfToDataUrl,
  csvConfig,
  isValidBase64Pdf,
  isValidPdfFileName,
} from './report'; // Ensure this path is correct

describe('csvConfig', () => {
  it('should create a CSV config with the correct settings', () => {
    // Expected configuration
    const expectedConfig = mkConfig({
      fieldSeparator: ',',
      decimalSeparator: '.',
      useKeysAsHeaders: true,
    });

    // Verify that the csvConfig matches the expected config
    expect(csvConfig).toEqual(expectedConfig);
  });
});

describe('base64PdfToDataUrl', () => {
  it('should convert a base64 string to a data URL for a PDF', () => {
    const base64String =
      'JVBERi0xLjEKJcKlwrHDqwoKMSAwIG9iagogIDw8IC9UeXBlIC9DYXRhbG9nCiAgICAgL1BhZ2VzIDIgMCBSCiAgPj4KZW5kb2JqCgoyIDAgb2JqCiAgPDwgL1R5cGUgL1BhZ2VzCiAgICAgL0tpZHMgWzMgMCBSXQogICAgIC9Db3VudCAxCiAgICAgL01lZGlhQm94IFswIDAgMzAwIDE0NF0KICA+PgplbmRvYmoKCjMgMCBvYmoKICA8PCAgL1R5cGUgL1BhZ2UKICAgICAgL1BhcmVudCAyIDAgUgogICAgICAvUmVzb3VyY2VzCiAgICAgICA8PCAvRm9udAogICAgICAgICAgIDw8IC9GMQogICAgICAgICAgICAgICA8PCAvVHlwZSAvRm9udAogICAgICAgICAgICAgICAgICAvU3VidHlwZSAvVHlwZTEKICAgICAgICAgICAgICAgICAgL0Jhc2VGb250IC9UaW1lcy1Sb21hbgogICAgICAgICAgICAgICA+PgogICAgICAgICAgID4+CiAgICAgICA+PgogICAgICAvQ29udGVudHMgNCAwIFIKICA+PgplbmRvYmoKCjQgMCBvYmoKICA8PCAvTGVuZ3RoIDU1ID4+CnN0cmVhbQogIEJUCiAgICAvRjEgMTggVGYKICAgIDAgMCBUZAogICAgKEhlbGxvIFdvcmxkKSBUagogIEVUCmVuZHN0cmVhbQplbmRvYmoKCnhyZWYKMCA1CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAxOCAwMDAwMCBuIAowMDAwMDAwMDc3IDAwMDAwIG4gCjAwMDAwMDAxNzggMDAwMDAgbiAKMDAwMDAwMDQ1NyAwMDAwMCBuIAp0cmFpbGVyCiAgPDwgIC9Sb290IDEgMCBSCiAgICAgIC9TaXplIDUKICA+PgpzdGFydHhyZWYKNTY1CiUlRU9GCg==';
    const expectedDataUrl = `data:application/pdf;base64,${base64String}`;

    const result = base64PdfToDataUrl(base64String);

    expect(result).toBe(expectedDataUrl);
  });
});

describe('PDF Utility Functions', () => {
  describe('isValidBase64Pdf', () => {
    it('should return false for undefined input', () => {
      expect(isValidBase64Pdf(undefined)).toBe(false);
    });

    it('should return false for null input', () => {
      expect(isValidBase64Pdf(null)).toBe(false);
    });

    it('should return false for an empty string', () => {
      expect(isValidBase64Pdf('')).toBe(false);
    });

    it('should return false for invalid base64 PDF string', () => {
      expect(
        isValidBase64Pdf('data:application/pdf;base64,invalidBase64'),
      ).toBe(false);
    });

    it('should return true for valid base64 PDF string', () => {
      const validBase64Pdf = `data:application/pdf;base64,${Buffer.from(
        'JVBERi0xLjEKJcKlwrHDqwoKMSAwIG9iagogIDw8IC9UeXBlIC9DYXRhbG9nCiAgICAgL1BhZ2VzIDIgMCBSCiAgPj4KZW5kb2JqCgoyIDAgb2JqCiAgPDwgL1R5cGUgL1BhZ2VzCiAgICAgL0tpZHMgWzMgMCBSXQogICAgIC9Db3VudCAxCiAgICAgL01lZGlhQm94IFswIDAgMzAwIDE0NF0KICA+PgplbmRvYmoKCjMgMCBvYmoKICA8PCAgL1R5cGUgL1BhZ2UKICAgICAgL1BhcmVudCAyIDAgUgogICAgICAvUmVzb3VyY2VzCiAgICAgICA8PCAvRm9udAogICAgICAgICAgIDw8IC9GMQogICAgICAgICAgICAgICA8PCAvVHlwZSAvRm9udAogICAgICAgICAgICAgICAgICAvU3VidHlwZSAvVHlwZTEKICAgICAgICAgICAgICAgICAgL0Jhc2VGb250IC9UaW1lcy1Sb21hbgogICAgICAgICAgICAgICA+PgogICAgICAgICAgID4+CiAgICAgICA+PgogICAgICAvQ29udGVudHMgNCAwIFIKICA+PgplbmRvYmoKCjQgMCBvYmoKICA8PCAvTGVuZ3RoIDU1ID4+CnN0cmVhbQogIEJUCiAgICAvRjEgMTggVGYKICAgIDAgMCBUZAogICAgKEhlbGxvIFdvcmxkKSBUagogIEVUCmVuZHN0cmVhbQplbmRvYmoKCnhyZWYKMCA1CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAxOCAwMDAwMCBuIAowMDAwMDAwMDc3IDAwMDAwIG4gCjAwMDAwMDAxNzggMDAwMDAgbiAKMDAwMDAwMDQ1NyAwMDAwMCBuIAp0cmFpbGVyCiAgPDwgIC9Sb290IDEgMCBSCiAgICAgIC9TaXplIDUKICA+PgpzdGFydHhyZWYKNTY1CiUlRU9GCg==',
      ).toString('base64')}`;
      expect(isValidBase64Pdf(validBase64Pdf)).toBe(true);
    });

    it('should return false for incorrect MIME type', () => {
      expect(
        isValidBase64Pdf(
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...',
        ),
      ).toBe(false);
    });
  });

  describe('isValidPdfFileName', () => {
    it('should return false for undefined input', () => {
      expect(isValidPdfFileName(undefined)).toBe(false);
    });

    it('should return false for null input', () => {
      expect(isValidPdfFileName(null)).toBe(false);
    });

    it('should return false for an empty string', () => {
      expect(isValidPdfFileName('')).toBe(false);
    });

    it('should return true for valid PDF file name', () => {
      expect(isValidPdfFileName('document.pdf')).toBe(true);
    });

    it('should return false for file names without .pdf extension', () => {
      expect(isValidPdfFileName('document.txt')).toBe(false);
    });

    it('should return true for PDF file names with upper-case extension', () => {
      expect(isValidPdfFileName('document.PDF')).toBe(true);
    });

    it('should return true for PDF file names with spaces', () => {
      expect(isValidPdfFileName('my document.pdf')).toBe(true);
    });
  });
});
