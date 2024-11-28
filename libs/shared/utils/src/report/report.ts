import { mkConfig } from 'export-to-csv';

export const csvConfig = mkConfig({
  fieldSeparator: ',',
  decimalSeparator: '.',
  useKeysAsHeaders: true,
});

export const base64PdfToDataUrl = (base64?: string | null) => {
  if (!base64) {
    return null;
  }

  return `data:application/pdf;base64,${base64}`;
};

export const isValidBase64Pdf = (str?: string | null): boolean => {
  if (!str) {
    return false;
  }

  const regex = /^data:application\/pdf;base64,([A-Za-z0-9+/]+={0,2})$/;

  // Check if the string matches the regex
  const match = regex.exec(str);
  if (!match) {
    return false;
  }

  const base64Part = match[1];

  try {
    // Decode the base64 part
    const decoded = Buffer.from(base64Part, 'base64').toString('base64');

    // Compare the original base64 part with the re-encoded result
    return base64Part === decoded;
  } catch (e) {
    return false; // If decoding fails, the base64 is invalid
  }
};

export const isValidPdfFileName = (str?: string | null): boolean => {
  if (!str) {
    return false;
  }

  return str.toLowerCase().includes('.pdf');
};
