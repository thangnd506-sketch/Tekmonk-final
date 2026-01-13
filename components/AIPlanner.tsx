
import React, { useState } from 'react';
import { generateTripPlan } from '../services/geminiService';
import { TripPlan, Language } from '../types';
import { translations } from '../locales';

interface Props {
  lang: Language;
  onOpenDirections?: (name: string, address: string) => void;
}

const AIPlanner: React.FC<Props> = ({ lang, onOpenDirections }) => {
  const t = translations[lang];
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TripPlan | null>(null);
  const [formData, setFormData] = useState({
    days: 5,
    adults: 2,
    children: 0,
    currentLocation: '', 
    destinations: ['Hà Nội'] as string[],
    minBudget: 20000000,
    maxBudget: 100000000,
    interests: ['culture', 'food'] as string[],
    specificInterests: '', 
    transport: 'Máy bay',
    accommodation: 'hotel'
  });

  const destinationOptions = [
    'Hà Nội', 'Sa Pa', 'Hà Giang', 'Vịnh Hạ Long', 'Ninh Bình', 
    'Huế', 'Đà Nẵng & Hội An', 'Quy Nhơn', 'Nha Trang', 'Đà Lạt', 
    'TP. Hồ Chí Minh', 'Vũng Tàu', 'Cần Thơ', 'Phú Quốc'
  ];

  const accommodationOptions = [
    { id: 'hotel', icon: '🏨', label: t.accommodationTypes.hotel },
    { id: 'homestay', icon: '🏠', label: t.accommodationTypes.homestay },
    { id: 'resort', icon: '🏖️', label: t.accommodationTypes.resort },
    { id: 'hostel', icon: '🛌', label: t.accommodationTypes.hostel }
  ];

  const interestOptions = [
    { id: 'culture', icon: '🏛️', label: t.interestTypes.culture },
    { id: 'nature', icon: '🌿', label: t.interestTypes.nature },
    { id: 'food', icon: '🍲', label: t.interestTypes.food },
    { id: 'adventure', icon: '🎒', label: t.interestTypes.adventure },
    { id: 'relax', icon: '🧖‍♀️', label: t.interestTypes.relax }
  ];

  const formatCurrency = (val: number) => {
    if (val >= 500000000) return "> 500 Triệu";
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)} Triệu`;
    return `${val.toLocaleString()}đ`;
  };

  const toggleInterest = (id: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(id) 
        ? prev.interests.filter(i => i !== id) 
        : [...prev.interests, id]
    }));
  };

  const toggleDestination = (dest: string) => {
    setFormData(prev => ({
      ...prev,
      destinations: prev.destinations.includes(dest)
        ? prev.destinations.filter(d => d !== dest)
        : [...prev.destinations, dest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const submissionData = {
      days: formData.days,
      adults: formData.adults,
      children: formData.children,
      destination: formData.destinations.join(', '),
      currentLocation: formData.currentLocation || (lang === 'en' ? 'Unknown Origin' : 'Chưa xác định điểm khởi hành'),
      budget: `${formatCurrency(formData.minBudget)} - ${formatCurrency(formData.maxBudget)}`,
      interests: formData.interests.map(id => (t.interestTypes as any)[id]),
      specificInterests: formData.specificInterests,
      accommodation: (t.accommodationTypes as any)[formData.accommodation],
      transport: formData.transport
    };
    
    const plan = await generateTripPlan(submissionData, lang);
    setResult(plan);
    setLoading(false);
  };

  const activityTotal = result ? result.itinerary.reduce((sum, day) => 
    sum + day.activities.reduce((dSum, act) => dSum + act.cost, 0), 0
  ) : 0;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 pb-32">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2 leading-tight">{t.plannerTitle}</h2>
        <p className="text-slate-600 text-sm">{t.plannerSubtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 h-fit">
          <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-[3rem] shadow-2xl border border-slate-50">
            
            {/* International Origin */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">{t.currentLoc}</label>
              <input 
                type="text"
                placeholder={lang === 'en' ? "Paris, Tokyo, Bangkok..." : "Nhập thành phố/quốc gia bạn khởi hành..."}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-red-500/20 shadow-inner placeholder:text-slate-300"
                value={formData.currentLocation}
                onChange={(e) => setFormData({...formData, currentLocation: e.target.value})}
                required
              />
            </div>

            {/* Destination Selection */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">{t.whereToGo}</label>
              <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto no-scrollbar p-1">
                {destinationOptions.map(opt => (
                  <button 
                    key={opt}
                    type="button"
                    onClick={() => toggleDestination(opt)}
                    className={`flex items-center justify-between px-5 py-3 rounded-xl border-2 transition-all ${formData.destinations.includes(opt) ? 'bg-red-50 border-red-500' : 'bg-white border-slate-100'}`}
                  >
                    <span className={`text-xs font-bold ${formData.destinations.includes(opt) ? 'text-red-700' : 'text-slate-500'}`}>{opt}</span>
                    {formData.destinations.includes(opt) && <span className="text-red-600 font-black">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Members: Adults & Children */}
            <div className="space-y-6">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{t.members}</label>
              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[11px] font-black text-slate-500 uppercase tracking-tighter">{t.adults}</span>
                  <span className="text-sm font-black text-slate-900 bg-slate-50 px-3 py-1 rounded-lg">{formData.adults}</span>
                </div>
                <input 
                  type="range" min="1" max="10" 
                  value={formData.adults} 
                  onChange={(e) => setFormData({...formData, adults: parseInt(e.target.value)})} 
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-800" 
                />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[11px] font-black text-slate-500 uppercase tracking-tighter">{t.children}</span>
                  <span className="text-sm font-black text-slate-900 bg-slate-50 px-3 py-1 rounded-lg">{formData.children}</span>
                </div>
                <input 
                  type="range" min="0" max="10" 
                  value={formData.children} 
                  onChange={(e) => setFormData({...formData, children: parseInt(e.target.value)})} 
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-red-600" 
                />
              </div>
            </div>

            {/* Days Slider */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{t.howManyDays}</label>
                <span className="text-sm font-black text-red-600 bg-red-50 px-3 py-1 rounded-lg">{formData.days} {t.days}</span>
              </div>
              <input type="range" min="1" max="30" value={formData.days} onChange={(e) => setFormData({...formData, days: parseInt(e.target.value)})} className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-red-600" />
            </div>

            {/* Budget Range (10M - 500M+) */}
            <div className="space-y-6">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{t.budget}</label>
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                  <span>{lang === 'en' ? 'Min' : 'Tối thiểu'}</span>
                  <span className="text-red-600 font-black">{formatCurrency(formData.minBudget)}</span>
                </div>
                <input 
                  type="range" 
                  min="10000000" 
                  max="500000000" 
                  step="5000000"
                  value={formData.minBudget} 
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setFormData({...formData, minBudget: val, maxBudget: Math.max(val, formData.maxBudget)});
                  }} 
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-red-600" 
                />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                  <span>{lang === 'en' ? 'Max' : 'Tối đa'}</span>
                  <span className="text-red-600 font-black">{formatCurrency(formData.maxBudget)}</span>
                </div>
                <input 
                  type="range" 
                  min="10000000" 
                  max="505000000" 
                  step="5000000"
                  value={formData.maxBudget} 
                  onChange={(e) => setFormData({...formData, maxBudget: parseInt(e.target.value)})} 
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-red-600" 
                />
              </div>
            </div>

            {/* Experience / Requests */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">{t.interests}</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {interestOptions.map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggleInterest(opt.id)}
                    className={`px-4 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest border-2 transition-all flex items-center gap-2 ${formData.interests.includes(opt.id) ? 'bg-yellow-400 border-yellow-400 text-slate-900' : 'bg-slate-50 border-transparent text-slate-400'}`}
                  >
                    <span>{opt.icon}</span>
                    {opt.label}
                  </button>
                ))}
              </div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">{t.specificInterests}</label>
              <textarea 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-xs font-bold outline-none focus:ring-2 focus:ring-yellow-500/20 shadow-inner placeholder:text-slate-300 min-h-[100px] resize-none"
                placeholder={t.specificInterestsPlaceholder}
                value={formData.specificInterests}
                onChange={(e) => setFormData({...formData, specificInterests: e.target.value})}
              />
            </div>

            {/* Accommodation */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">{t.accommodation}</label>
              <div className="grid grid-cols-2 gap-2">
                {accommodationOptions.map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFormData({...formData, accommodation: opt.id})}
                    className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${formData.accommodation === opt.id ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-50 text-slate-400 hover:border-slate-100'}`}
                  >
                    <span className="text-lg">{opt.icon}</span>
                    <span className="text-[9px] font-black uppercase tracking-tight">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-red-600 text-white py-5 rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-red-200 active:scale-95 disabled:opacity-50 transition-all">
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                   {t.analyzing}
                </div>
              ) : t.createPlan}
            </button>
          </form>
        </div>

        <div className="lg:col-span-2">
          {result ? (
            <div className="bg-white rounded-[3.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-right duration-700">
              <div className="bg-slate-900 p-10 text-white relative overflow-hidden">
                <div className="relative z-10">
                   <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 mb-2">Vietnam Journey</p>
                   <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="text-[10px] font-black bg-white/10 px-3 py-1 rounded-full">{formData.currentLocation}</span>
                      <span className="text-slate-500">→</span>
                      <h3 className="text-2xl font-serif font-bold leading-tight">{formData.destinations.join(' & ')}</h3>
                   </div>
                   
                   <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white/5 backdrop-blur-md p-4 rounded-3xl border border-white/10">
                        <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">{t.flightCostLabel}</p>
                        <p className="text-sm font-black text-yellow-400">{(result.flightCost).toLocaleString()}đ</p>
                      </div>
                      <div className="bg-white/5 backdrop-blur-md p-4 rounded-3xl border border-white/10">
                        <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">{t.hotelCostLabel}</p>
                        <p className="text-sm font-black text-yellow-400">{(result.hotelCost).toLocaleString()}đ</p>
                      </div>
                      <div className="bg-white/5 backdrop-blur-md p-4 rounded-3xl border border-white/10">
                        <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">{t.activityCostLabel}</p>
                        <p className="text-sm font-black text-yellow-400">{activityTotal.toLocaleString()}đ</p>
                      </div>
                      <div className="bg-white/5 backdrop-blur-md p-4 rounded-3xl border border-white/10">
                        <p className="text-[8px] font-black text-red-400 uppercase tracking-widest mb-1">{t.totalCostLabel}</p>
                        <p className="text-sm font-black text-white">{result.totalBudget.toLocaleString()}đ</p>
                      </div>
                   </div>
                </div>
              </div>
              
              <div className="p-10 space-y-12 bg-slate-50/30">
                {result.itinerary.map((day) => (
                  <div key={day.day} className="relative pl-12 border-l-2 border-red-100">
                    <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-red-600 border-4 border-white shadow-lg"></div>
                    <div className="flex items-center gap-4 mb-8">
                       <h4 className="font-black text-2xl text-slate-900">{t.days} {day.day}</h4>
                    </div>
                    <div className="grid gap-6">
                      {day.activities.map((act, i) => (
                        <div key={i} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-50 flex flex-col md:flex-row md:items-center gap-6 group hover:shadow-md transition-shadow relative">
                          <div className="shrink-0 w-20 flex flex-col items-center justify-center bg-slate-50 py-3 rounded-2xl group-hover:bg-red-50 transition-colors">
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">Time</span>
                             <span className="text-xs font-black text-slate-900">{act.time}</span>
                          </div>
                          <div className="flex-grow pr-10">
                            <p className="font-black text-base text-slate-800 mb-1">{act.location}</p>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed mb-2">{act.description}</p>
                            
                            {/* Public Transport Info */}
                            {act.publicTransport && (
                              <div className="flex items-center gap-2 mb-3 bg-blue-50/50 px-3 py-1.5 rounded-xl border border-blue-100 w-fit">
                                <span className="text-sm">🚌</span>
                                <span className="text-[10px] font-black text-blue-700 uppercase tracking-tight">{t.transportRouteLabel}: {act.publicTransport}</span>
                              </div>
                            )}

                            <button 
                              onClick={() => onOpenDirections && onOpenDirections(act.location, act.location)}
                              className="flex items-center gap-2 text-[9px] font-black text-red-600 uppercase tracking-widest hover:underline"
                            >
                               <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                               {t.viewOnMap}
                            </button>
                          </div>
                          {act.cost > 0 && (
                            <div className="shrink-0 text-right">
                               <p className="text-[10px] font-black text-red-600 bg-red-50 px-3 py-1.5 rounded-xl inline-block">{act.cost.toLocaleString()} VND</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="mt-16 bg-red-600 rounded-[3rem] p-8 text-white">
                   <h4 className="text-lg font-black uppercase tracking-widest mb-6 flex items-center gap-3">
                      <span className="text-2xl">💡</span> {t.expertTips}
                   </h4>
                   <div className="space-y-4">
                      {result.tips.map((tip, i) => (
                        <div key={i} className="flex gap-4 items-start bg-white/10 p-4 rounded-2xl border border-white/5">
                           <span className="font-black text-red-200">{i + 1}.</span>
                           <p className="text-sm font-medium text-white/90 leading-relaxed">{tip}</p>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          ) : (
             <div className="h-full min-h-[600px] flex flex-col items-center justify-center bg-slate-50/50 rounded-[3.5rem] border-4 border-dashed border-slate-200">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-xl mb-6 relative">
                   <span className="text-5xl">✈️</span>
                   <div className="absolute inset-0 bg-red-600/5 rounded-full animate-ping"></div>
                </div>
                <p className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">{t.analyzing.replace('...', '')}</p>
                <p className="text-xs text-slate-300 mt-2 font-medium">{lang === 'en' ? 'Click create to start planning' : 'Bấm tạo để bắt đầu lập lịch'}</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIPlanner;
