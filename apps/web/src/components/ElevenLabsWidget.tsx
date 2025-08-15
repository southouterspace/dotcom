'use client';

import { useEffect, useRef } from 'react';

// Regex for validating agent ID format - support both formats
const AGENT_ID_PATTERN = /^(agent_[a-zA-Z0-9_]+|[a-zA-Z0-9_]+)$/;

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
    if (!container || !agentId) {
      return;
    }

    // Validate agent ID format for security
    if (!AGENT_ID_PATTERN.test(agentId)) {
      console.warn('Invalid agent ID format:', agentId);
      return;
    }

    // Set the HTML content safely after validation
    container.innerHTML = `<elevenlabs-convai agent-id="${agentId}"></elevenlabs-convai>`;

    // Cleanup function
    return () => {
      container.innerHTML = '';
    };
  }, [agentId]);

  return (
    <div
      className={`w-full h-full ${className || ''}`}
      data-testid="elevenlabs-widget"
      ref={containerRef}
    />
  );
}
