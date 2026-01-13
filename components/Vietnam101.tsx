
import React, { useState, useRef } from 'react';
import { Language } from '../types';
import { translations } from '../locales';
import { speakVietnamese, evaluatePronunciation } from '../services/geminiService';

interface Props {
  lang: Language;
}

const decode = (base64: string) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const Vietnam101: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];
  const [selectedDetail, setSelectedDetail] = useState<any>(null);
  
  // Practice States
  const [isPracticing, setIsPracticing] = useState(false);
  const [practicePhrase, setPracticePhrase] = useState<any>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalResult, setEvalResult] = useState<{score: number, feedback: string} | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);

  const groups = [
    {
      title: t.guideCategories.apps,
      items: [
        { id: 'visa', icon: '🚕', ...t.guides.visa },
        { id: 'weather', icon: '🍱', ...t.guides.weather }
      ]
    },
    {
      title: t.guideCategories.money,
      items: [
        { id: 'money', icon: '💳', ...t.guides.money },
        { id: 'shopping', icon: '🚌', ...t.guides.shopping }
      ]
    },
    {
      title: t.guideCategories.life,
      items: [
        { id: 'sim', icon: '📶', ...t.guides.sim },
        { id: 'transport', icon: '💬', ...t.guides.transport }
      ]
    },
    {
      title: t.guideCategories.culture,
      items: [
        { id: 'health', icon: '🆘', ...t.guides.health },
        { id: 'etiquette', icon: '🏮', ...t.guides.etiquette }
      ]
    }
  ];

  const phrases = [
    { vi: 'Xin chào', en: 'Hello', pr: 'Sin chow' },
    { vi: 'Cảm ơn', en: 'Thank you', pr: 'Gam ern' },
    { vi: 'Bao nhiêu?', en: 'How much?', pr: 'Bow nyew' },
    { vi: 'Ngon lắm!', en: 'Delicious!', pr: 'Ngon lum' },
    { vi: 'Tính tiền', en: 'Check please', pr: 'Tinh tyen' },
    { vi: 'Xin lỗi', en: 'Sorry / Excuse me', pr: 'Sin loy' }
  ];

  const handlePlayTTS = async (text: string) => {
    if (isPlaying) return;
    setIsPlaying(true);
    const base64Audio = await speakVietnamese(text);
    if (base64Audio) {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      const ctx = audioContextRef.current;
      const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      source.onended = () => setIsPlaying(false);
      source.start();
    } else {
      setIsPlaying(false);
    }
  };

  const startPractice = (phrase: any) => {
    setPracticePhrase(phrase);
    setEvalResult(null);
    setIsPracticing(true);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const base64 = await blobToBase64(audioBlob);
        evaluateUserPronunciation(base64);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Recording error:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsEvaluating(true);
    }
  };

  const evaluateUserPronunciation = async (audioBase64: string) => {
    const result = await evaluatePronunciation(practicePhrase.vi, audioBase64, lang);
    setEvalResult(result);
    setIsEvaluating(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 animate-in fade-in duration-500 pb-32">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">{t.guideHeader}</h2>
        <p className="text-slate-600 text-sm">{t.guideSubtitle}</p>
      </div>

      <div className="space-y-12">
        {groups.map((group, idx) => (
          <div key={idx} className="space-y-4">
            <h3 className="px-2 text-[10px] font-black uppercase tracking-[0.2em] text-red-600 border-l-4 border-red-600 ml-1">
              {group.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.items.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => setSelectedDetail(item)}
                  className="bg-white p-6 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex items-center gap-5 text-left active:scale-[0.98]"
                >
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-grow overflow-hidden">
                    <h4 className="text-base font-black text-slate-900 truncate">{item.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-1">{item.content}</p>
                  </div>
                  <div className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Basic Phrases Section - Keep as is but refine header */}
      <div className="mt-16 bg-slate-900 rounded-[3.5rem] p-8 md:p-14 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.3em] mb-3 block">Language Coach</span>
              <h3 className="text-3xl font-serif font-bold">{t.basicPhrases}</h3>
              <p className="text-slate-400 text-sm mt-2">{t.phrasesSub}</p>
            </div>
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl">🇻🇳</div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {phrases.map(phrase => (
              <div key={phrase.vi} className="bg-white/5 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all group">
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-3">
                    <p className="font-black text-2xl group-hover:text-red-400 transition-colors">{phrase.vi}</p>
                    <button 
                      onClick={() => handlePlayTTS(phrase.vi)} 
                      disabled={isPlaying}
                      className={`w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-red-600 transition-all ${isPlaying ? 'opacity-20' : ''}`}
                    >
                      <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
                    </button>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 bg-white/5 px-2 py-0.5 rounded-lg">VN</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-3">
                    <p className="text-sm text-slate-300 font-medium">{phrase.en}</p>
                    <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                    <p className="text-[10px] italic text-slate-500 font-bold uppercase tracking-widest">{phrase.pr}</p>
                  </div>
                  <button 
                    onClick={() => startPractice(phrase)}
                    className="text-[9px] font-black uppercase text-red-500 tracking-wider hover:underline"
                  >
                    {lang === 'en' ? 'Practice' : 'Luyện tập'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Modal / Bottom Sheet */}
      {selectedDetail && (
        <div className="fixed inset-0 z-[10000] flex items-end justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="absolute inset-0" onClick={() => setSelectedDetail(null)}></div>
          <div className="w-full max-w-md bg-white rounded-t-[3rem] p-8 shadow-2xl relative animate-in slide-in-from-bottom duration-500 max-h-[90vh] flex flex-col">
            <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-6 shrink-0"></div>
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl">
                  {selectedDetail.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900">{selectedDetail.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedDetail(null)}
                className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="space-y-4 mb-8 overflow-y-auto pr-2 no-scrollbar">
              {selectedDetail.detailed.map((line: string, idx: number) => (
                <div key={idx} className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-red-600 font-bold">•</span>
                  <p className="text-sm font-medium text-slate-700 leading-relaxed">{line}</p>
                </div>
              ))}

              {/* Suggested Apps Section */}
              {selectedDetail.apps && selectedDetail.apps.length > 0 && (
                <div className="mt-6 space-y-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                    {t.recommendedAppsTitle}
                  </p>
                  <div className="grid grid-cols-1 gap-3">
                    {selectedDetail.apps.map((app: any) => (
                      <a 
                        key={app.name}
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${app.color} p-4 rounded-3xl flex items-center justify-between shadow-lg active:scale-95 transition-all group`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
                            {app.icon}
                          </div>
                          <div>
                            <p className="text-white font-black text-sm">{app.name}</p>
                            <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest group-hover:text-white transition-colors">{t.launchApp.replace(' 🚀', '')}</p>
                          </div>
                        </div>
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-auto pt-4">
              <button 
                onClick={() => setSelectedDetail(null)}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Practice Modal - Keep same */}
      {isPracticing && practicePhrase && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-white rounded-[3rem] p-8 shadow-2xl relative overflow-hidden">
            <button 
              onClick={() => setIsPracticing(false)}
              className="absolute top-6 right-6 w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="text-center mt-4">
              <span className="text-red-600 text-[10px] font-black uppercase tracking-widest mb-2 block">{lang === 'en' ? 'Practice Pronunciation' : 'Luyện phát âm'}</span>
              <h3 className="text-4xl font-black text-slate-900 mb-1">{practicePhrase.vi}</h3>
              <p className="text-slate-400 font-medium italic">{practicePhrase.en} ({practicePhrase.pr})</p>
            </div>

            <div className="my-10 flex flex-col items-center">
              {!evalResult && !isEvaluating ? (
                <button 
                  onMouseDown={startRecording}
                  onMouseUp={stopRecording}
                  onTouchStart={startRecording}
                  onTouchEnd={stopRecording}
                  className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${isRecording ? 'bg-red-600 scale-125 shadow-[0_0_40px_rgba(220,38,38,0.5)]' : 'bg-slate-100 hover:bg-slate-200'}`}
                >
                  <div className={isRecording ? 'animate-pulse' : ''}>
                    <svg className={`w-10 h-10 ${isRecording ? 'fill-white' : 'fill-slate-400'}`} viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
                  </div>
                </button>
              ) : isEvaluating ? (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 border-4 border-red-100 border-t-red-600 rounded-full animate-spin mb-4"></div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'AI Analyzing...' : 'AI đang phân tích...'}</p>
                </div>
              ) : (
                <div className="w-full text-center space-y-6">
                  <div className="relative inline-block">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                      <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                        strokeDasharray={364} 
                        strokeDashoffset={364 - (364 * evalResult.score) / 100} 
                        className="text-red-600 transition-all duration-1000"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-black text-slate-900">{evalResult.score}%</span>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'Accuracy' : 'Độ chuẩn'}</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-sm font-bold text-slate-700 leading-relaxed">"{evalResult.feedback}"</p>
                  </div>
                  <button 
                    onClick={() => setEvalResult(null)}
                    className="text-red-600 font-black text-[10px] uppercase tracking-widest hover:underline"
                  >
                    {lang === 'en' ? 'Try Again' : 'Thử lại'}
                  </button>
                </div>
              )}
              
              {!isRecording && !evalResult && !isEvaluating && (
                <p className="mt-6 text-[10px] font-black text-slate-400 uppercase tracking-widest animate-bounce">
                  {lang === 'en' ? 'Hold to Record' : 'Nhấn giữ để thu âm'}
                </p>
              )}
            </div>

            <button 
              onClick={() => handlePlayTTS(practicePhrase.vi)}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all"
            >
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
              {lang === 'en' ? 'Hear Standard Pronunciation' : 'Nghe phát âm mẫu'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vietnam101;
