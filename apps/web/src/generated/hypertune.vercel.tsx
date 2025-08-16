/* eslint-disable */

import { decryptOverrides, encryptFlagValues } from 'flags';
import { flag } from 'flags/next';
import { FlagValues } from 'flags/react';
import {
  type DeepPartial,
  getOverrideFromOverridesList,
  type ObjectValue,
  type Value,
} from 'hypertune';
import { cookies } from 'next/headers';
import getHypertune from '@/lib/getHypertune';
import type * as hypertuneTypes from './hypertune';

export async function getVercelOverride(): Promise<DeepPartial<hypertuneTypes.Source> | null> {
  const overridesCookieValue = (await cookies()).get(
    'vercel-flag-overrides'
  )?.value;

  if (!overridesCookieValue) {
    return null;
  }

  const decryptedOverrides = await decryptOverrides(overridesCookieValue);
  if (!decryptedOverrides) {
    return null;
  }

  return getOverrideFromOverridesList(
    Object.entries(decryptedOverrides) as [
      flagPath: string,
      value: Value | null,
    ][]
  );
}

export async function VercelFlagValues({
  flagValues,
}: {
  flagValues: hypertuneTypes.Root;
}): Promise<React.ReactElement> {
  const flattenedFlagValues = Object.fromEntries(
    getVercelFlagValuesEntries('', flagValues)
  );

  const encryptedFlagValues = await encryptFlagValues(flattenedFlagValues);
  return <FlagValues values={encryptedFlagValues} />;
}

function getVercelFlagValuesEntries(
  keyPrefix: string,
  sourceObject: ObjectValue
): [string, Value][] {
  return Object.entries(sourceObject).flatMap(([flagKey, flagValue]) => {
    if (flagKey.startsWith('__') || Array.isArray(flagValue)) {
      return [];
    }

    if (typeof flagValue !== 'object') {
      return [[`${keyPrefix}${flagKey}`, flagValue]];
    }
    return getVercelFlagValuesEntries(`${keyPrefix}${flagKey}.`, flagValue);
  });
}

export const showElevenlabsWidgetFlag = flag<boolean>({
  key: 'showElevenlabsWidget',
  defaultValue: false,
  origin:
    'https://app.hypertune.com/projects/6170/main/draft/logic?selected_field_path=root%3EshowElevenlabsWidget',
  options: [
    { label: 'Off', value: false },
    { label: 'On', value: true },
  ],

  async decide(params) {
    const hypertune = await getHypertune(params);
    return hypertune.showElevenlabsWidget({ fallback: false });
  },
});

export const exampleFlagFlag = flag<boolean>({
  key: 'exampleFlag',
  defaultValue: false,
  origin:
    'https://app.hypertune.com/projects/6170/main/draft/logic?selected_field_path=root%3EexampleFlag',
  options: [
    { label: 'Off', value: false },
    { label: 'On', value: true },
  ],

  async decide(params) {
    const hypertune = await getHypertune(params);
    return hypertune.exampleFlag({ fallback: false });
  },
});
