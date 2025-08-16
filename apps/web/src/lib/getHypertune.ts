import 'server-only';
import { unstable_noStore as noStore } from 'next/cache';
import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { createSource } from '@/generated/hypertune';
import { getVercelOverride } from '@/generated/hypertune.vercel';

const token = process.env.NEXT_PUBLIC_HYPERTUNE_TOKEN;
if (!token) {
  throw new Error('Missing NEXT_PUBLIC_HYPERTUNE_TOKEN environment variable');
}

const hypertuneSource = createSource({
  token,
});

export default async function getHypertune(_params?: {
  headers?: ReadonlyHeaders;
  cookies?: ReadonlyRequestCookies;
}) {
  noStore();
  await hypertuneSource.initIfNeeded(); // Check for flag updates

  // Respect flag overrides set by the Vercel Toolbar
  hypertuneSource.setOverride(await getVercelOverride());

  return hypertuneSource.root({
    args: {
      context: {
        environment: process.env.NODE_ENV,
        user: { id: '1', name: 'Test', email: 'hi@test.com' },
      },
    },
  });
}
