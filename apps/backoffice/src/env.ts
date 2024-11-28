import { createEnv } from '@t3-oss/env-nextjs';
import { env as runtimeEnv } from 'next-runtime-env';
import { z } from 'zod';

export const env = createEnv({
  shared: {
    NODE_ENV: z.enum(['development', 'production']),
  },
  server: {
    UPLOAD_DIR: z.string().min(1).default('/uploads'),
  },
  client: {
    NEXT_PUBLIC_MAX_UPLOAD_SIZE_MB: z.coerce.number().default(15),
    NEXT_PUBLIC_API_BASE_URL: z.string().url().min(1),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  // runtimeEnv: {
  //     DATABASE_URL: process.env.DATABASE_URL,
  //     OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY,
  //     NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  // },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_MAX_UPLOAD_SIZE_MB: runtimeEnv(
      'NEXT_PUBLIC_MAX_UPLOAD_SIZE_MB',
    ),
    NEXT_PUBLIC_API_BASE_URL: runtimeEnv('NEXT_PUBLIC_API_BASE_URL'),
  },
  emptyStringAsUndefined: true,
  skipValidation: false,
});
