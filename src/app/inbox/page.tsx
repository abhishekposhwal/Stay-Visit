
'use client';

import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Send, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';

const mockConversations = [
  {
    id: '1',
    name: 'Priya (Sea-facing Apartment)',
    avatar: 'https://picsum.photos/seed/p1/100/100',
    lastMessage: 'Your booking is confirmed! Let me know if you have questions.',
    timestamp: '10:42 AM',
    unread: 2,
    messages: [
      { id: 'm1', sender: 'Priya', text: 'Hi there! Thanks for booking my apartment.', time: '10:40 AM' },
      { id: 'm2', sender: 'Priya', text: 'Your booking is confirmed! Let me know if you have questions.', time: '10:42 AM' },
      { id: 'm3', sender: 'You', text: 'Great, thanks Priya! Looking forward to it.', time: '11:15 AM' },
    ],
  },
  {
    id: '2',
    name: 'Amit (Heritage Haveli)',
    avatar: 'https://picsum.photos/seed/p2/100/100',
    lastMessage: 'Yes, breakfast is included from 8 AM to 10 AM.',
    timestamp: 'Yesterday',
    unread: 0,
    messages: [
       { id: 'm1', sender: 'You', text: 'Is breakfast included?', time: 'Yesterday' },
       { id: 'm2', sender: 'Amit', text: 'Yes, breakfast is included from 8 AM to 10 AM.', time: 'Yesterday' },
    ]
  },
  {
    id: '3',
    name: 'Sunita (Portuguese Villa)',
    avatar: 'https://picsum.photos/seed/p3/100/100',
    lastMessage: 'The pool is private and available 24/7.',
    timestamp: '2 days ago',
    unread: 0,
     messages: [
       { id: 'm1', sender: 'Sunita', text: 'The pool is private and available 24/7.', time: '2 days ago' },
    ]
  },
  {
    id: '4',
    name: 'Vikram (Modern Tech Hub Penthouse)',
    avatar: 'https://picsum.photos/seed/p4/100/100',
    lastMessage: 'Can you please confirm your check-in time?',
    timestamp: '3 days ago',
    unread: 1,
     messages: [
       { id: 'm1', sender: 'Vikram', text: 'Can you please confirm your check-in time?', time: '3 days ago' },
    ]
  },
  {
    id: '5',
    name: 'Neha (Yoga Retreat)',
    avatar: 'https://picsum.photos/seed/p5/100/100',
    lastMessage: 'The yoga session starts at 7 AM tomorrow.',
    timestamp: '4 days ago',
    unread: 0,
     messages: [
       { id: 'm1', sender: 'Neha', text: 'The yoga session starts at 7 AM tomorrow.', time: '4 days ago' },
    ]
  },
  {
    id: '6',
    name: 'Karan (Culinary Masterclass)',
    avatar: 'https://picsum.photos/seed/p6/100/100',
    lastMessage: 'Looking forward to our cooking session!',
    timestamp: '5 days ago',
    unread: 0,
     messages: [
       { id: 'm1', sender: 'Karan', text: 'Looking forward to our cooking session!', time: '5 days ago' },
    ]
  },
];

function InboxPageContent() {
  const searchParams = useSearchParams();
  const conversationId = searchParams.get('conversationId');

  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(conversationId || mockConversations[0].id);
  const [view, setView] = useState<'list' | 'chat'>(conversationId ? 'chat' : 'list');

  useEffect(() => {
    if (conversationId) {
      const conversationExists = mockConversations.some(c => c.id === conversationId);
      if (conversationExists) {
        setSelectedConversationId(conversationId);
        setView('chat');
      }
    }
  }, [conversationId]);
  
  const selectedConversation = mockConversations.find(c => c.id === selectedConversationId);
  
  const handleConversationSelect = (id: string) => {
    setSelectedConversationId(id);
    setView('chat');
  }

  return (
    <div className="container mx-auto h-[calc(100vh-140px)] pt-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 h-full border rounded-lg overflow-hidden">
        {/* Left Sidebar: Conversations List */}
        <aside className={cn(
            "lg:col-span-1 border-r flex-col min-h-0",
            view === 'list' ? 'flex' : 'hidden lg:flex'
        )}>
          <div className="p-4 border-b">
            <h1 className="text-lg font-bold">Inbox</h1>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search inbox" className="pl-10" />
            </div>
          </div>
          <div className="flex-grow overflow-y-auto">
            <nav className="p-2 space-y-1">
              {mockConversations.map(conv => (
                <button
                  key={conv.id}
                  onClick={() => handleConversationSelect(conv.id)}
                  className={cn(
                    "w-full text-left p-3 rounded-lg transition-colors flex items-start gap-4",
                    selectedConversationId === conv.id ? 'bg-muted' : 'hover:bg-muted/50'
                  )}
                >
                  <Avatar className="h-12 w-12 border">
                    <AvatarImage src={conv.avatar} alt={conv.name} />
                    <AvatarFallback>{conv.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow truncate">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold truncate text-xs">{conv.name}</h3>
                      <span className="text-xs text-muted-foreground">{conv.timestamp}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <span className="bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0">
                      {conv.unread}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Right Content: Messages */}
        <main className={cn(
            "lg:col-span-3 flex-col h-full bg-muted/20",
            view === 'chat' ? 'flex' : 'hidden lg:flex'
        )}>
          {selectedConversation ? (
            <>
              <div className="p-4 border-b bg-background flex items-center gap-4">
                <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setView('list')}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
                  <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-sm font-semibold">{selectedConversation.name}</h2>
              </div>
              <div className="flex-grow p-6 overflow-y-auto space-y-6">
                {selectedConversation.messages.map(msg => (
                  <div key={msg.id} className={cn("flex items-end gap-2", msg.sender === 'You' ? 'justify-end' : 'justify-start')}>
                    {msg.sender !== 'You' && <Avatar className="h-8 w-8"><AvatarImage src={selectedConversation.avatar} /></Avatar>}
                    <div className={cn(
                      "rounded-2xl px-4 py-2 max-w-sm",
                      msg.sender === 'You' ? 'bg-primary-gradient text-white rounded-br-none' : 'bg-background rounded-bl-none border'
                    )}>
                      <p className="text-sm">{msg.text}</p>
                      <p className={cn("text-xs mt-1", msg.sender === 'You' ? 'text-white/70' : 'text-muted-foreground')}>{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-background border-t">
                <div className="relative">
                  <Input placeholder="Type a message..." className="pr-12" />
                  <Button size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-xl font-bold">Select a conversation</h2>
                <p className="text-muted-foreground">Choose a conversation from the left to see messages.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function InboxPage() {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <InboxPageContent />
        </React.Suspense>
    )
}
