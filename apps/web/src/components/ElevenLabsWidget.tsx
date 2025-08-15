'use client';

import { useEffect, useRef } from 'react';

// Regex for validating agent ID format
const AGENT_ID_PATTERN = /^agent_[a-zA-Z0-9_]+$/;

type ElevenLabsWidgetProps = {
  agentId: string;
  className?: string;
};

export default function ElevenLabsWidget({
  agentId,
  className,
}: ElevenLabsWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!(container && agentId)) {
      return;
    }

    // Validate agent ID format for security
    if (!AGENT_ID_PATTERN.test(agentId)) {
      console.warn('Invalid agent ID format:', agentId);
      return;
    }

    // Create the custom element safely
    const widget = document.createElement('elevenlabs-convai');
    widget.setAttribute('agent-id', agentId);

    // Add error handling
    widget.addEventListener('error', (event) => {
      console.error('ElevenLabs widget error:', event);
    });

    container.appendChild(widget);

    // Cleanup function
    return () => {
      if (container.contains(widget)) {
        container.removeChild(widget);
      }
    };
  }, [agentId]);

  return (
    <div
      className={className}
      data-testid="elevenlabs-widget"
      ref={containerRef}
    />
  );
}
