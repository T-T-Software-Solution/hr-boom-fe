'use server';
import path from 'path';
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import { env } from '@backoffice/env';
// ## fix: Import fs-extra instead of fs
import fs from 'fs-extra';
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import fsPromises from 'fs/promises';
import sanitize from 'sanitize-filename';
import { uuidv7 } from 'uuidv7';
import { z } from 'zod';
const MAX_UPLOAD_SIZE_MB = env.NEXT_PUBLIC_MAX_UPLOAD_SIZE_MB;
const MAX_UPLOAD_SIZE = 1024 * 1024 * MAX_UPLOAD_SIZE_MB;

const uploadFileSchema = z.object({
  file: z.instanceof(File).refine((file) => {
    return !file || file.size <= MAX_UPLOAD_SIZE;
  }, `File size must be less than ${MAX_UPLOAD_SIZE_MB}MB`),
});

if (!env.UPLOAD_DIR) {
  throw new Error('UPLOAD_DIR is required in production environment');
}

const tempDirectory = env.UPLOAD_DIR;

export const uploadFile = async (formData: FormData) => {
  try {
    const validatedFields = uploadFileSchema.safeParse({
      file: formData.get('file'),
    });
    if (!validatedFields.success) {
      const errorMessages = Object.values(
        validatedFields.error.flatten().fieldErrors,
      )
        .flat()
        .join(', ');
      return {
        error: errorMessages,
      };
    }

    const fileObj = validatedFields.data.file;
    const arrayBuffer = await fileObj.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const fileWithExtensionPattern = /([^\/]+)\.([^\/]+)$/i;
    const match = fileObj.name.match(fileWithExtensionPattern);
    if (!match) {
      return { error: 'Invalid file name' };
    }
    const fileName = sanitize(match[1]).replace(/ /g, '_');
    const fileNameWithTimestamp = `${fileName}_${Date.now()}`;
    const fileNameWithExtension = `${fileNameWithTimestamp}.${match[2]}`;
    const filePath = path.join(`TMP_${uuidv7()}`, fileNameWithExtension);
    const fullPath = path.join(tempDirectory, filePath);
    await fs.outputFile(fullPath, buffer);
    await fs.readFile(fullPath, 'utf8');
    return {
      message: 'File uploaded successfully',
      file: filePath,
      fileName: fileName,
    };
  } catch (err) {
    return { error: err };
  }
};

export async function deleteFile(filePath?: string) {
  try {
    if (!filePath) {
      return { error: 'File name is required' };
    }
    if (!filePath.startsWith('TMP_')) {
      return { error: 'Invalid file name' };
    }

    const [id, fileName] = filePath.split('/');
    const sanitizedId = sanitize(id);
    const sanitizedFileName = sanitize(fileName).replace(/ /g, '_');

    // not use fileName because we want to delete the whole directory
    const fullPath = path.join(tempDirectory, sanitizedId);

    await fsPromises.rm(fullPath, { recursive: true });

    return { message: 'File deleted successfully' };
  } catch (err) {
    return { error: err };
  }
}

// export const tempDir = path.join(__dirname, './tmp');
// export const ensureDirExists = async (dir: string) => {
//   if (!existsSync(dir)) {
//     await mkdir(dir, { recursive: true });
//   }
// };

// export const uploadImage = async (file: File) => {
//   const maxFileSize = 20 * 1024 * 1024; // 20MB

//   // Check the file size
//   if (file.size > maxFileSize) {
//     throw new Error('File size exceeds the 20MB limit');
//   }

//   // Ensure the temp directory exists
//   await ensureDirExists(tempDir);

//   // Generate a unique file name for the upload
//   const fileNameWithoutExt = path.basename(file.name, path.extname(file.name)); // Get file name without extension
//   const outputFileName = `${fileNameWithoutExt}-${uuidv7()}.webp`; // Convert to .webp with UUID to ensure unique naming
//   const outputPath = path.join(tempDir, outputFileName); // Save the file in the custom temp directory

//   // Convert the file into a Buffer to pass it to Sharp
//   const buffer = Buffer.from(await file.arrayBuffer());

//   // Use Sharp to resize and compress the image
//   await sharp(buffer)
//     .resize(800, 800, {
//       fit: 'inside',
//     })
//     .webp({ quality: 80 })
//     .toFile(outputPath);

//   return {
//     filePath: outputPath,
//     message: 'Image uploaded and processed successfully',
//   };
// };
