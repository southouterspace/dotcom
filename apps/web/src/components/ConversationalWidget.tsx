'use client';

import { useConversation } from '@elevenlabs/react';
import { useState } from 'react';
import ElevenLabsOrb from './ElevenLabsOrb';

export default function ConversationalWidget() {
  const conversation = useConversation();
  const [isConnected, setIsConnected] = useState(false);

  const startConversation = async () => {
    try {
      await conversation.startSession({
        agentId: 'agent_7701k2py9twqfw2rxfdt1z3n84m3',
        connectionType: 'webrtc',
        overrides: {
          conversation: {
            textOnly: false, // Ensure voice is enabled
          },
        },
      });
      setIsConnected(true);
    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  };

  const endConversation = () => {
    conversation.endSession();
    setIsConnected(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* ElevenLabs orb */}
        <div className="w-[72px] h-[72px] rounded-full overflow-hidden shadow-lg">
          <ElevenLabsOrb
            size={72}
            isActive={isConnected}
          />
        </div>
        
        {/* Action button overlay */}
        <button
          onClick={isConnected ? endConversation : startConversation}
          className="absolute inset-0 w-full h-full rounded-full hover:bg-black hover:bg-opacity-10 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
          aria-label={isConnected ? 'End conversation' : 'Start conversation'}
        >
          <div className="flex items-center justify-center text-white text-opacity-80">
            {!isConnected && (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            )}
          </div>
        </button>
      </div>
    </div>
  );
}