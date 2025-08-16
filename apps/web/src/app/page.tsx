import DecryptedText from '@/components/bits/DecryptedText';
import Waves from '@/components/bits/Waves/Waves';
import FeatureFlaggedContent from '@/components/FeatureFlaggedContent';

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr_auto]">
      {/* Main content */}
      <header className="p-6">
        <DecryptedText
          animateOn="view"
          className="font-mono uppercase"
          encryptedClassName="font-mono font-medium text-gray-400"
          parentClassName="cursor-pointer transition-transform duration-300"
          revealDirection="center"
          sequential={true}
          speed={80}
          text="South Outer Space"
        />
      </header>

      <div className="relative h-[calc(100vh-theme(spacing.6)-theme(spacing.6))] w-full">
        {/* Waves background animation */}
        <Waves
          backgroundColor="transparent"
          className="pointer-events-none"
          friction={0.93}
          lineColor="oklch(0.708 0 0)"
          maxCursorMove={80}
          tension={0.004}
          waveAmpX={24}
          waveAmpY={12}
          waveSpeedX={0.008}
          waveSpeedY={0.004}
          xGap={12}
          yGap={28}
        />

        {/* Feature flagged content */}
        <FeatureFlaggedContent />
      </div>
    </div>
  );
}
