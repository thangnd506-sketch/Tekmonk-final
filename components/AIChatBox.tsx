
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ChatMessage, Language } from '../types';
import { translations } from '../locales';

interface Props {
  lang: Language;
}

const AIChatBox: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatInstance = useRef<any>(null);

  useEffect(() => {
    setMessages([{ role: 'model', text: t.chatGreeting }]);
    chatInstance.current = null;
  }, [lang, t.chatGreeting]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const initChat = () => {
    if (!chatInstance.current) {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const systemInstruction = lang === 'en' 
        ? `You are a practical Vietnam Travel Expert for first-time international visitors.
           - User doesn't know Vietnamese.
           - User is unfamiliar with local apps.
           - GOAL: Help them move around, order food, and use public transport.
           - APPS TO SUGGEST: Grab (ride-hailing/food), Xanh SM (electric taxi), BusMap (bus routes), ShopeeFood.
           - RULES: Be concise, use bullet points, use emojis. Explain things step-by-step as if they know nothing about Vietnam.`
        : `Bạn là chuyên gia du lịch thực tế tại Việt Nam cho du khách quốc tế lần đầu ghé thăm.
           - Người dùng không biết tiếng Việt và lạ lẫm với các ứng dụng địa phương.
           - MỤC TIÊU: Hướng dẫn họ di chuyển, đặt đồ ăn và dùng xe buýt.
           - ỨNG DỤNG GỢI Ý: Grab, Xanh SM, BusMap, ShopeeFood.
           - QUY TẮC: Ngắn gọn, dùng gạch đầu dòng, icon. Hướng dẫn từng bước cụ thể.`;
      
      chatInstance.current = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: { systemInstruction },
      });
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);
    initChat();

    try {
      const responseStream = await chatInstance.current.sendMessageStream({ message: userMessage });
      let fullResponse = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of responseStream) {
        fullResponse += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: 'model', text: fullResponse };
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Chat Error:", error);
      const errorMsg = lang === 'en' ? 'Sorry, an error occurred.' : 'Lỗi rồi, thử lại nhé!';
      setMessages(prev => [...prev, { role: 'model', text: errorMsg }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`absolute bottom-24 right-5 z-[7000] w-14 h-14 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-300 active:scale-90 ${
          isOpen ? 'bg-slate-800 scale-0' : 'bg-red-600 hover:bg-red-700 opacity-100 scale-100'
        }`}
      >
        <div className="relative">
           <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
           <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute inset-x-3 bottom-24 top-20 z-[7500] bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col animate-in slide-in-from-bottom-4">
          <div className="bg-slate-900 p-5 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center font-black text-sm shadow-lg shadow-red-900/20">V</div>
              <div>
                <h4 className="font-black text-[10px] uppercase tracking-widest text-red-500">Expert Assistant</h4>
                <p className="font-bold text-xs">Vietnam Travel AI</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-grow p-5 space-y-5 overflow-y-auto no-scrollbar bg-slate-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-3xl text-[13px] leading-relaxed shadow-sm ${
                  msg.role === 'user' ? 'bg-red-600 text-white rounded-br-none' : 'bg-white text-slate-800 rounded-bl-none border border-slate-100'
                }`}>
                  {msg.text || '...'}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-1.5 p-2">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce delay-75"></span>
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce delay-150"></span>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-slate-50">
            <div className="relative flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 focus-within:border-red-500/30 focus-within:bg-white transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t.chatPlaceholder}
                className="flex-grow bg-transparent border-none rounded-xl px-3 py-2.5 text-xs font-bold focus:ring-0 outline-none placeholder:text-slate-400"
              />
              <button 
                onClick={handleSend} 
                disabled={!input.trim() || isTyping} 
                className="bg-slate-900 text-white p-3 rounded-xl disabled:opacity-20 active:scale-95 transition-all shadow-lg shadow-slate-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatBox;
