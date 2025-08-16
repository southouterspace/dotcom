import { getProviderData } from '@flags-sdk/hypertune';
import { type ApiData, verifyAccess, version } from 'flags';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const access = await verifyAccess(request.headers.get('Authorization'));
  if (!access) {
    return NextResponse.json(null, { status: 401 });
  }

  const token = process.env.HYPERTUNE_ADMIN_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'Missing admin token' }, { status: 500 });
  }

  const data = await getProviderData({
    token,
  });

  return NextResponse.json<ApiData>(data, {
    headers: { 'x-flags-sdk-version': version },
  });
}
