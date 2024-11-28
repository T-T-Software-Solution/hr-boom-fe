import { env } from '@backoffice/env';
import { fileTypeFromBuffer } from 'file-type';
import fsPromises from 'fs/promises';
import path from 'path';
import sanitize from 'sanitize-filename';

if (!env.UPLOAD_DIR) {
  throw new Error('UPLOAD_DIR is required in production environment');
}
const uploadDirectory = env.UPLOAD_DIR;

const handler = async (
  req: Request,
  { params }: { params: { id: string; fileName: string } },
) => {
  try {
    const { id, fileName } = params;
    if (!id || !fileName) {
      return new Response('Invalid request', { status: 400 });
    }

    const sanitizedId = sanitize(id);
    const sanitizedFileName = sanitize(fileName);
    const fullPath = path.join(uploadDirectory, sanitizedId, sanitizedFileName);
    const stats = await fsPromises.stat(fullPath);
    if (!stats.isFile()) {
      return new Response('File not found', { status: 404 });
    }

    const fileContent = await fsPromises.readFile(fullPath);
    const fileType = await fileTypeFromBuffer(fileContent);

    // Fallback in case fileType cannot detect specific MIME types
    let contentType = fileType?.mime || 'application/octet-stream';

    // Handle known types not explicitly supported by file-type
    if (sanitizedFileName.endsWith('.csv')) {
      contentType = 'text/csv';
    } else if (sanitizedFileName.endsWith('.xls')) {
      contentType = 'application/vnd.ms-excel';
    } else if (sanitizedFileName.endsWith('.xlsx')) {
      contentType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    }

    const dispositionType =
      contentType.startsWith('image/') ||
      contentType === 'application/pdf' ||
      contentType === 'text/csv' ||
      contentType ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      contentType === 'application/vnd.ms-excel'
        ? 'inline'
        : 'attachment';

    return new Response(fileContent, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `${dispositionType}; filename="${encodeURIComponent(fileName)}"`,
        'Content-Length': stats.size.toString(),
      },
    });
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      return new Response('File not found', { status: 404 });
    }
    console.error(err);
    return new Response('Cannot load file', { status: 500 });
  }
};

export { handler as GET };
