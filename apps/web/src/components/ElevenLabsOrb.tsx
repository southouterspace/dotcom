'use client';

import { useEffect, useState } from 'react';

interface ElevenLabsOrbProps {
  size?: number;
  isActive?: boolean;
  color1?: string;
  color2?: string;
}

export default function ElevenLabsOrb({
  size = 72,
  isActive = false,
  color1 = '#d426ef',  // ElevenLabs purple/magenta
  color2 = '#8ddff6',  // ElevenLabs light blue/cyan
}: ElevenLabsOrbProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="rounded-full" style={{ width: size, height: size }} />;
  }

  const animationSpeed = isActive ? '2s' : '4s';

  return (
    <div
      className="rounded-full overflow-hidden relative"
      style={{
        width: size,
        height: size,
      }}
    >
      {/* Main rotating gradient orb */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(from 0deg, ${color1} 0%, ${color2} 25%, ${color1} 50%, ${color2} 75%, ${color1} 100%)`,
          animation: `spin ${animationSpeed} linear infinite`,
        }}
      />
      
      {/* Overlay gradient for depth */}
      <div
        className="absolute inset-0 rounded-full opacity-60"
        style={{
          background: `conic-gradient(from 90deg, ${color2} 0%, transparent 25%, ${color1} 50%, transparent 75%, ${color2} 100%)`,
          animation: `spin ${animationSpeed} linear infinite reverse`,
        }}
      />
      
      {/* Center highlight for 3D effect */}
      <div
        className="absolute inset-0 rounded-full opacity-30"
        style={{
          background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.2) 40%, transparent 70%)`,
        }}
      />
      
      {/* Active pulse effect */}
      {isActive && (
        <div
          className="absolute inset-0 rounded-full animate-pulse"
          style={{
            background: `radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)`,
            animation: `pulse 1s ease-in-out infinite`,
          }}
        />
      )}

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
}