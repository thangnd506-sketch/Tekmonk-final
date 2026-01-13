
import React, { useState } from 'react';
import Navigation from './components/Navigation';
import VietnamMap from './components/VietnamMap';
import AIPlanner from './components/AIPlanner';
import FoodExplorer from './components/FoodExplorer';
import Vietnam101 from './components/Vietnam101';
import AIChatBox from './components/AIChatBox';
import { Language } from './types';
import { translations } from './locales';
import { getTransportAdvice } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [lang, setLang] = useState<Language>('vi');
  const [mapFocusId, setMapFocusId] = useState<string | undefined>(undefined);
  
  // App-wide Directions state
  const [appDirections, setAppDirections] = useState<{name: string, address: string} | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [aiAdvice, setAiAdvice] = useState<string>('');
  const [loadingAdvice, setLoadingAdvice] = useState(false);
  
  // Transport Sub-states
  const [vehicleType, setVehicleType] = useState<'bike' | 'car'>('car');
  const [showInstallGuide, setShowInstallGuide] = useState<string | null>(null);

  // Get user location on mount for directions
  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.debug("Geolocation error:", err)
      );
    }
  }, []);
  
  const t = translations[lang];

  const toggleLanguage = () => {
    setLang(prev => prev === 'vi' ? 'en' : 'vi');
  };

  const handleOpenMap = async (name: string, address: string) => {
    setAppDirections({ name, address });
    setAiAdvice('');
    setLoadingAdvice(true);
    const origin = userLocation ? `${userLocation.lat},${userLocation.lng}` : (lang === 'en' ? 'Current City' : 'Thành phố hiện tại');
    const advice = await getTransportAdvice(origin, name, 0, lang);
    setAiAdvice(advice);
    setLoadingAdvice(false);
  };

  const handleGoToLocation = (id: string) => {
    setMapFocusId(id);
    setActiveTab('home');
    setTimeout(() => {
      document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return (
          <div className="space-y-8 pb-32 animate-in fade-in duration-500 overflow-y-auto h-full no-scrollbar">
            {/* Hero Section */}
            <div className="px-6 pt-6 pb-2">
              <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em] mb-1">Vietnam Explorer</p>
              <h1 className="text-3xl font-serif font-bold text-slate-900 leading-tight">
                {t.heroTitle.split('<br/>').map((line, i) => (
                  <React.Fragment key={i}>{line}{i === 0 && <br/>}</React.Fragment>
                ))}
              </h1>
            </div>

            {/* AI Call-to-action Card */}
            <div className="px-6">
              <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-[2.5rem] p-6 text-white shadow-xl shadow-red-100 relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-1">{t.aiAssistant}</h3>
                  <p className="text-xs text-red-100 mb-4 opacity-80 leading-relaxed">{t.aiSubtitle}</p>
                  <button 
                    onClick={() => setActiveTab('planner')}
                    className="bg-white text-red-600 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg active:scale-95 transition-transform"
                  >
                    {t.startButton}
                  </button>
                </div>
                <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform"></div>
              </div>
            </div>

            {/* Smart Interactive Map Section */}
            <section id="map-section" className="px-4">
              <div className="flex items-center justify-between mb-4 px-2">
                <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">{t.smartMap}</h2>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                </div>
              </div>
              <VietnamMap lang={lang} focusId={mapFocusId} />
            </section>

            {/* Quick Destinations Scroll */}
            <section className="space-y-4">
              <div className="flex items-center justify-between px-6">
                <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">{t.topDestinations}</h2>
                <span className="text-[10px] font-black text-red-600 uppercase tracking-widest cursor-pointer">{t.seeAll}</span>
              </div>
              <div className="flex overflow-x-auto px-6 space-x-4 no-scrollbar pb-4">
                {[
                  { id: 'halong', name: lang === 'vi' ? 'Vịnh Hạ Long' : 'Ha Long Bay', tag: lang === 'vi' ? 'Kỳ quan' : 'Wonder', img: 'https://images.unsplash.com/photo-1552596880-9758d095906b?q=80&w=800' },
                  { id: 'nhatrang', name: 'Nha Trang', tag: lang === 'vi' ? 'Biển đảo' : 'Beaches', img: 'https://images.unsplash.com/photo-1596395817188-511f07578746?q=80&w=800' },
                  { id: 'hoian', name: lang === 'vi' ? 'Phố cổ Hội An' : 'Hoi An Ancient Town', tag: lang === 'vi' ? 'Văn hóa' : 'Culture', img: 'https://images.unsplash.com/photo-1588014023410-672535032e4d?q=80&w=800' },
                ].map(item => (
                  <div 
                    key={item.id} 
                    onClick={() => handleGoToLocation(item.id)}
                    className="flex-shrink-0 w-60 h-72 relative rounded-[2.5rem] overflow-hidden shadow-lg active:scale-95 transition-transform border border-slate-100 cursor-pointer"
                  >
                    <img src={item.img} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-5 left-5 right-5">
                      <span className="bg-red-600 text-[9px] font-black uppercase text-white px-2 py-1 rounded-lg mb-1.5 inline-block">
                        {item.tag}
                      </span>
                      <h4 className="text-lg font-bold text-white leading-tight">{item.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Nearby Food Teaser */}
            <section className="px-6">
               <div className="bg-slate-900 rounded-[2.5rem] p-7 text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-1">{t.hungry}</h3>
                    <p className="text-xs text-slate-400 mb-5 leading-relaxed">{t.foodSubtitle}</p>
                    <button 
                      onClick={() => setActiveTab('food')}
                      className="bg-white text-slate-900 px-7 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest active:scale-95 transition-transform"
                    >
                      {t.findFood}
                    </button>
                  </div>
                  <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/10 blur-[80px] rounded-full"></div>
               </div>
            </section>
          </div>
        );
      case 'planner': return <div className="h-full overflow-y-auto pb-32 no-scrollbar"><AIPlanner lang={lang} onOpenDirections={handleOpenMap} /></div>;
      case 'food': return <div className="h-full overflow-y-auto pb-32 no-scrollbar"><FoodExplorer lang={lang} onOpenMap={handleOpenMap} /></div>;
      case 'guide': return <div className="h-full overflow-y-auto pb-32 no-scrollbar"><Vietnam101 lang={lang} /></div>;
      default: return null;
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-white">
      <header className="shrink-0 z-[5000] bg-white/90 backdrop-blur-xl border-b border-slate-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2" onClick={() => { setActiveTab('home'); setMapFocusId(undefined); }}>
          <div className="w-8 h-8 bg-red-600 rounded-xl flex items-center justify-center font-black text-white text-xs shadow-lg shadow-red-200 cursor-pointer">V</div>
          <span className="font-serif font-bold text-slate-900 text-lg tracking-tight cursor-pointer">Explorer</span>
        </div>
        
        <button 
          onClick={toggleLanguage}
          className="bg-slate-50 border border-slate-200 rounded-xl px-2 py-1 flex items-center gap-1.5 active:scale-95 transition-all"
        >
          <span className={`text-[9px] font-black transition-colors ${lang === 'vi' ? 'text-red-600' : 'text-slate-400'}`}>VI</span>
          <div className="w-[1px] h-2 bg-slate-300"></div>
          <span className={`text-[9px] font-black transition-colors ${lang === 'en' ? 'text-red-600' : 'text-slate-400'}`}>EN</span>
        </button>
      </header>

      <main className="flex-grow overflow-hidden relative">
        {renderContent()}
      </main>
      
      {/* App-Wide Directions Modal */}
      {appDirections && (
        <div className="absolute inset-0 z-[10000] bg-slate-900 flex flex-col animate-in fade-in duration-300 overflow-hidden">
          <header className="shrink-0 bg-slate-900 p-4 pt-8 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{lang === 'en' ? 'Directions to' : 'Chỉ đường tới'}</p>
                <h4 className="text-white font-black truncate text-sm">{appDirections.name}</h4>
              </div>
            </div>
            <button 
              onClick={() => setAppDirections(null)}
              className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-slate-400 active:scale-90 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </header>
          
          <div className="flex-grow relative bg-slate-50 overflow-y-auto no-scrollbar pb-32">
            <div className="w-full h-72 shrink-0">
              <iframe 
                src={`https://www.google.com/maps?saddr=${userLocation ? `${userLocation.lat},${userLocation.lng}` : 'current+location'}&daddr=${encodeURIComponent(appDirections.name + ' ' + appDirections.address)}&output=embed`}
                className="w-full h-full border-none"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>

            <div className="p-6 space-y-8">
              {/* AI Recommendation Section */}
              <div className="bg-gradient-to-br from-indigo-700 to-slate-900 p-7 rounded-[3rem] shadow-2xl relative overflow-hidden">
                 <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">🤖</span>
                      <h4 className="font-black text-sm text-indigo-200 uppercase tracking-widest">{t.transportAdvisory.aiRecommendation}</h4>
                    </div>
                    {loadingAdvice ? (
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 border-2 border-indigo-200 border-t-white rounded-full animate-spin"></div>
                        <p className="text-xs text-indigo-300 font-bold italic">{t.transportAdvisory.calculating}</p>
                      </div>
                    ) : (
                      <p className="text-sm text-white font-bold leading-relaxed">
                        {aiAdvice}
                      </p>
                    )}
                 </div>
              </div>

              {/* Ride Hailing Section with Bike/Car split */}
              <div className="bg-white p-6 rounded-[3rem] shadow-xl border border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🚖</span>
                    <h4 className="font-black text-base text-slate-900">{t.transportAdvisory.rideHailing.label}</h4>
                  </div>
                </div>

                {/* Category Toggle */}
                <div className="flex bg-slate-50 p-1.5 rounded-2xl mb-6">
                  <button 
                    onClick={() => setVehicleType('bike')}
                    className={`flex-grow py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${vehicleType === 'bike' ? 'bg-white text-red-600 shadow-md' : 'text-slate-400'}`}
                  >
                    🏍️ {t.vehicleType.motorbike}
                  </button>
                  <button 
                    onClick={() => setVehicleType('car')}
                    className={`flex-grow py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${vehicleType === 'car' ? 'bg-white text-red-600 shadow-md' : 'text-slate-400'}`}
                  >
                    🚗 {t.vehicleType.car}
                  </button>
                </div>
                
                <div className="space-y-4">
                  {t.transportAdvisory.rideHailing.apps.map((app: any) => {
                    const price = vehicleType === 'bike' ? app.prices.bike : app.prices.car;
                    return (
                      <div key={app.name} className="flex items-center justify-between bg-white border border-slate-100 p-4 rounded-3xl shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center gap-4">
                           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white ${app.color.split(' ')[0]}`}>{app.name[0]}</div>
                           <div>
                              <p className="font-black text-sm text-slate-900">{app.name} <span className="text-[9px] text-slate-400 font-bold ml-1">({app.tag})</span></p>
                              <p className="text-[11px] text-red-600 font-black mt-0.5">{price}</p>
                           </div>
                        </div>
                        <div className="flex gap-2">
                           <button 
                             onClick={() => setShowInstallGuide(app.name)}
                             className="bg-slate-100 text-slate-600 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95"
                           >
                             {t.downloadApp}
                           </button>
                           <a 
                             href={app.url} 
                             target="_blank" 
                             rel="noopener noreferrer" 
                             className="bg-white border-2 border-slate-900 text-slate-900 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 flex items-center justify-center"
                           >
                            {t.openApp}
                           </a>
                        </div>
                      </div>
                    );
                  })}
                  <p className="text-[10px] text-slate-400 italic mt-4 px-2">{t.transportAdvisory.rideHailing.tip}</p>
                </div>
              </div>

              {/* Public Transport Section with detailed Route button */}
              <div className="bg-white p-6 rounded-[3rem] shadow-xl border border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🚌</span>
                    <h4 className="font-black text-base text-slate-900">{t.transportAdvisory.publicTransport.label}</h4>
                  </div>
                  <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl uppercase tracking-widest">{t.transportAdvisory.publicTransport.routeSuggestion}</span>
                </div>
                
                <div className="space-y-4">
                  {Object.entries(t.transportAdvisory.publicTransport.categories).map(([key, cat]: [string, any]) => (
                    <div key={key} className="bg-slate-50 p-5 rounded-[2rem] border border-slate-100">
                      <div className="flex items-center justify-between gap-3">
                         <div className="flex items-center gap-3">
                           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 ${key === 'vinbus' ? 'bg-green-700' : key === 'airport' ? 'bg-orange-500' : 'bg-blue-600'}`}>
                             {key === 'vinbus' ? '⚡' : key === 'airport' ? '✈️' : '🚌'}
                           </div>
                           <div className="overflow-hidden">
                             <h5 className="font-black text-sm text-slate-900 truncate">{cat.name}</h5>
                             <p className="text-[11px] font-black text-blue-600">{cat.price}</p>
                           </div>
                         </div>
                         <a 
                           href={t.transportAdvisory.bus.link} 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           className="bg-blue-600 text-white px-3.5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-tight whitespace-nowrap active:scale-95 shadow-md shadow-blue-200"
                         >
                           {lang === 'en' ? 'Route' : 'Tìm tuyến'}
                         </a>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-3 border-t border-slate-200/50 pt-2">{cat.desc}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
                  <div className="relative z-10">
                    <h5 className="font-black text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                       <span>💡</span> {lang === 'en' ? 'Pro Route Tip' : 'Mẹo tìm tuyến đường'}
                    </h5>
                    <p className="text-[11px] text-blue-50 leading-relaxed mb-5">{t.transportAdvisory.bus.timingTip}</p>
                    <a 
                      href={t.transportAdvisory.bus.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block w-full bg-white text-blue-700 py-3.5 rounded-2xl text-[11px] font-black uppercase text-center active:scale-95 transition-all shadow-lg"
                    >
                      Mở BusMap Ngay
                    </a>
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                </div>
              </div>
            </div>
          </div>
          
          <footer className="shrink-0 p-6 bg-slate-900 border-t border-white/10 flex justify-center">
            <button 
              onClick={() => setAppDirections(null)}
              className="w-full bg-white text-slate-900 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl active:scale-95 transition-all"
            >
              {t.close}
            </button>
          </footer>

          {/* Installation Guide Overlay */}
          {showInstallGuide && (
            <div className="absolute inset-0 z-[11000] bg-black/80 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-300">
              <div className="bg-white w-full max-w-xs rounded-[3.5rem] p-8 shadow-2xl relative animate-in zoom-in duration-300">
                <button onClick={() => setShowInstallGuide(null)} className="absolute top-6 right-6 w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="text-center mb-6">
                  <p className="text-red-600 text-[10px] font-black uppercase tracking-[0.3em] mb-2">{t.howToInstall}</p>
                  <h3 className="text-3xl font-black text-slate-900">{showInstallGuide}</h3>
                </div>
                <div className="space-y-4">
                  {t.installSteps.map((step, i) => (
                    <div key={i} className="flex gap-4 items-start p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="w-6 h-6 bg-slate-900 text-white text-[10px] font-black flex items-center justify-center rounded-lg shrink-0">{i + 1}</span>
                      <p className="text-[11px] font-bold text-slate-700 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setShowInstallGuide(null)}
                  className="w-full mt-8 bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95"
                >
                  {t.close}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <AIChatBox lang={lang} />
      <Navigation lang={lang} activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
