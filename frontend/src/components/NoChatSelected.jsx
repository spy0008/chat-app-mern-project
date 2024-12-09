import React from 'react'
import { MessageSquareDashed } from 'lucide-react';

const NoChatSelected = () => {
  return (
    <div className='w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50'>
      <div className="max-w-md text-center space-y-6">
        {/* icon display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce">
              <MessageSquareDashed className='w-8 h-8 text-primary' />
            </div>
          </div>
        </div>

        {/* welcome text */}
        <h2 className="text-2xl font-bold">Welcome to Chat-Hub!</h2>
        <p className="text-base-content/60">
          Select a conversation from the Sidebar to start chatting
        </p>
      </div>
    </div>
  )
}

export default NoChatSelected