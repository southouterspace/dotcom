import { VercelFlagValues } from '@/generated/hypertune.vercel';
import getHypertune from '@/lib/getHypertune';
import ElevenLabsWidget from './ElevenLabsWidget';

export default async function FeatureFlaggedContent() {
  const hypertune = await getHypertune();
  const showElevenlabsWidget = hypertune.showElevenlabsWidget({
    fallback: false,
  });

  return (
    <>
      <VercelFlagValues flagValues={hypertune.get()} />
      {showElevenlabsWidget && (
        <ElevenLabsWidget agentId="agent_7701k2py9twqfw2rxfdt1z3n84m3" />
      )}
    </>
  );
}
