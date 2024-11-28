export const placeholderImage = 'https://placehold.co/600x400.png?text=Image'; // Replace with local placeholder image

export const getFileUrl = (fileName?: string | null) => {
  // If fileName is not provided, return the placeholder
  if (!fileName) {
    return {
      fullPath: placeholderImage,
      fileName: placeholderImage,
      originalFileName: fileName,
    };
  }

  // Validate if the fileName is a well-formed external URL
  try {
    const url = new URL(fileName);
    if (url.protocol === 'https:' || url.protocol === 'http:') {
      return {
        fullPath: url.href,
        fileName: url.pathname.split('/').pop() || '',
        originalFileName: fileName,
      };
    }
  } catch {
    // If it's not a valid URL, proceed as if it's a local file
  }

  const splitFileName = fileName.split('/');

  // Return the local API file URL without encoding
  return {
    fullPath: `/api/file/${splitFileName.join('/')}`,
    fileName:
      splitFileName.length > 1
        ? splitFileName[splitFileName.length - 1]
        : splitFileName[0],
    originalFileName: fileName,
  };
};

type UploadFileResult =
  | {
      message: string;
      file: string;
      fileName: string;
      error?: undefined;
    }
  | {
      error: unknown;
      message?: undefined;
      file?: undefined;
      fileName?: undefined;
    };

interface UploadFileIfNeededParams {
  file: File | string;
  previewFile?: string | null;
  uploadFile: (formData: FormData) => Promise<UploadFileResult>;
}

export const uploadFileIfNeeded = async ({
  file,
  previewFile,
  uploadFile,
}: UploadFileIfNeededParams): Promise<string | null | undefined> => {
  if (file instanceof File) {
    const formData = new FormData();
    formData.append('file', file);
    const result = await uploadFile(formData);

    if (!result?.file) {
      throw new Error('File upload failed');
    }
    return result.file;
  }
  return previewFile;
};

export const viewFileInNewTabOrDownload = ({
  uploadFile,
  previewFile,
}: { uploadFile?: File | string | null; previewFile?: string | null }) => {
  const isExcelOrCsv = (fileName: string) =>
    /\.(xlsx|xls|csv)$/.test(fileName.toLowerCase());

  if (uploadFile && uploadFile instanceof File) {
    const fileUrl = URL.createObjectURL(uploadFile);

    if (isExcelOrCsv(uploadFile.name)) {
      // Download Excel or CSV files
      const a = document.createElement('a');
      a.href = fileUrl;
      a.download = uploadFile.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      // Open other files (like PDFs) in a new tab
      window.open(fileUrl, '_blank');
    }
  }

  if (
    uploadFile &&
    typeof uploadFile === 'string' &&
    previewFile &&
    typeof previewFile === 'string'
  ) {
    if (isExcelOrCsv(uploadFile)) {
      // Download Excel or CSV files
      const a = document.createElement('a');
      a.href = previewFile;
      a.download = uploadFile.split('/').pop() || 'download';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      // Open other files (like PDFs) in a new tab
      window.open(previewFile, '_blank');
    }
  }
};

export const checkFileUrl = ({
  uploadFile,
  previewFile,
}: { uploadFile?: File | string | null; previewFile?: string | null }) => {
  if (uploadFile && uploadFile instanceof File) {
    return false;
  }

  if (
    uploadFile &&
    typeof uploadFile === 'string' &&
    previewFile &&
    typeof previewFile === 'string'
  ) {
    return false;
  }

  return true;
};
