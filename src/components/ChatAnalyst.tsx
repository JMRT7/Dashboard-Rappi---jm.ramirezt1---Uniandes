/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, memo } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { askAnalyst } from '../services/geminiService.ts';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  role: 'user' | 'model';
  parts: [{ text: string }];
}

interface ChatAnalystProps {
  t: Record<string, string>;
  lang: string;
}

export default memo(function ChatAnalyst({ t, lang }: ChatAnalystProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (forcedText?: string) => {
    const text = forcedText || input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: 'user', parts: [{ text }] };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const response = await askAnalyst(text, lang, messages);
    
    const botMsg: Message = { role: 'model', parts: [{ text: response }] };
    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  const suggestions = [
    t['chip-1'],
    t['chip-2'],
    t['chip-3'],
    t['chip-4']
  ];

  return (
    <div className="flex flex-col bg-[var(--surface)] border-l border-[var(--border)] h-full overflow-hidden">
      {/* Chat Header */}
      <div className="p-5 border-b border-[var(--border)] bg-[var(--surface)]/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rappi-orange/10 border border-rappi-orange/30 flex items-center justify-center text-rappi-orange">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold">{t['chat-title']}</h3>
            <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest">{t['chat-subtitle']}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
        {messages.length === 0 && (
          <div className="space-y-4 py-8">
            <div className="bg-[var(--surface2)] border border-[var(--border)] p-4 rounded-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-2 opacity-5 text-rappi-orange">
                 <Sparkles size={40} />
               </div>
               <p className="text-sm leading-relaxed text-[var(--text)]">
                 {t['chat-welcome'].replace('<br><br>', ' ').replace('👇', '')}
               </p>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              {suggestions.map((s) => (
                <button 
                  key={s}
                  onClick={() => handleSend(s)}
                  className="text-left text-xs font-mono p-3 rounded-xl border border-[var(--border)] bg-[var(--surface2)]/30 hover:border-rappi-orange/50 hover:bg-rappi-orange/5 transition-all text-[var(--text-muted)] hover:text-rappi-orange"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence>
          {messages.map((m, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[90%] p-3.5 rounded-2xl flex gap-3 ${
                m.role === 'user' 
                  ? 'bg-rappi-orange text-white rounded-br-none font-medium' 
                  : 'bg-[var(--surface2)] border border-[var(--border)] rounded-bl-none'
              }`}>
                {m.role === 'model' && <Bot size={16} className="mt-1 flex-shrink-0 text-rappi-orange" />}
                <div className="text-sm space-y-2 markdown-body overflow-x-auto overflow-y-hidden">
                   <ReactMarkdown>{m.parts[0].text}</ReactMarkdown>
                </div>
                {m.role === 'user' && <User size={16} className="mt-1 flex-shrink-0 text-white/50" />}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <div className="flex justify-start">
            <div className="bg-[var(--surface2)] border border-[var(--border)] p-3.5 rounded-2xl rounded-bl-none flex gap-2 items-center">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-rappi-orange animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-rappi-orange animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-rappi-orange animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-[10px] font-mono text-[var(--text-muted)] ml-2 uppercase tracking-widest">Analyzing...</span>
            </div>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-[var(--border)] bg-[var(--surface)]">
        <form 
          className="relative"
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={t['chat-ph']}
            className="w-full bg-[var(--surface2)] border border-[var(--border)] rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-rappi-orange/50 transition-colors resize-none custom-scrollbar min-h-[46px] max-h-[120px]"
            rows={1}
          />
          <button 
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-2 bottom-2 p-1.5 bg-rappi-orange text-white rounded-lg disabled:opacity-30 transition-opacity hover:opacity-90"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
});
