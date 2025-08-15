'use client';

import { useEffect, useRef } from 'react';

interface AnimatedDiscAvatarProps {
  size?: number;
  isActive?: boolean;
  color1?: string;
  color2?: string;
}

export default function AnimatedDiscAvatar({
  size = 72,
  isActive = false,
  color1 = '#d426ef',  // ElevenLabs purple/magenta
  color2 = '#8ddff6',  // ElevenLabs light blue/cyan
}: AnimatedDiscAvatarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  // Helper function to interpolate between hex colors
  const interpolateColor = (color1: string, color2: string, factor: number): string => {
    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
    if (!c1 || !c2) return color1;
    
    const r = Math.round(c1.r + factor * (c2.r - c1.r));
    const g = Math.round(c1.g + factor * (c2.g - c1.g));
    const b = Math.round(c1.b + factor * (c2.b - c1.b));
    
    return `rgb(${r},${g},${b})`;
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rotation = 0;
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = (size / 2) - 4;

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, size, size);

      // Update rotation
      rotation += isActive ? 0.03 : 0.015;

      // Create smooth flowing gradient using many segments without borders
      const segments = 64; // Many more segments for ultra-smooth appearance
      const segmentAngle = (2 * Math.PI) / segments;
      
      for (let i = 0; i < segments; i++) {
        const angle = (i * segmentAngle) + rotation;
        const nextAngle = ((i + 1) * segmentAngle) + rotation;
        
        // Create smooth flowing gradient
        const t = (i / segments) * 2; // Less multiplication for smoother flow
        const colorFactor = Math.sin(t * Math.PI + rotation * 2) * 0.5 + 0.5;
        
        const segmentColor = interpolateColor(color1, color2, colorFactor);
        
        // Draw segment WITHOUT borders for smooth flow
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, angle, nextAngle);
        ctx.closePath();
        ctx.fillStyle = segmentColor;
        ctx.fill();
      }

      // Skip the circular rings for smoother appearance

      // Add center highlight
      const centerHighlight = ctx.createRadialGradient(
        centerX - 8, centerY - 8, 0,
        centerX, centerY, radius * 0.4
      );
      centerHighlight.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
      centerHighlight.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.4, 0, 2 * Math.PI);
      ctx.fillStyle = centerHighlight;
      ctx.fill();

      // Add outer rim shadow
      const rimShadow = ctx.createRadialGradient(
        centerX, centerY, radius * 0.85,
        centerX, centerY, radius
      );
      rimShadow.addColorStop(0, 'rgba(0, 0, 0, 0)');
      rimShadow.addColorStop(1, 'rgba(0, 0, 0, 0.3)');

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = rimShadow;
      ctx.fill();

      // Add pulse effect when active
      if (isActive) {
        const pulseIntensity = Math.sin(Date.now() * 0.008) * 0.3 + 0.7;
        const pulseGradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, radius * 1.2
        );
        pulseGradient.addColorStop(0, `rgba(255, 255, 255, ${pulseIntensity * 0.1})`);
        pulseGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 1.2, 0, 2 * Math.PI);
        ctx.fillStyle = pulseGradient;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [size, isActive, color1, color2]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className="w-full h-full"
      style={{ width: size, height: size }}
    />
  );
}