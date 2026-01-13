// Add missing React and hook imports
import React, { useState, useEffect, useRef } from 'react';
import { searchVietnamPlaces, MapDiscoveryResult, getTransportAdvice } from '../services/geminiService';
import { VIETNAM_PLACES } from '../constants';
import { Place, Attraction, Language } from '../types';
import { translations } from '../locales';

declare var L: any;

// Helper to calculate distance in KM
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; 
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c;
};

interface MapProps {
  lang?: Language;
  focusId?: string; // placeId or attractionId to autofocus
}

const VietnamMap: React.FC<MapProps> = ({ lang = 'vi', focusId }) => {
  const t = translations[lang];
  const mapRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersLayerRef = useRef<any>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [discoveryResult, setDiscoveryResult] = useState<MapDiscoveryResult | null>(null);
  
  const [viewMode, setViewMode] = useState<'national' | 'province'>('national');
  const [selectedProvince, setSelectedProvince] = useState<Place | null>(null);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  
  const [showDirections, setShowDirections] = useState(false);
  const [directionDest, setDirectionDest] = useState<{name: string, lat?: number, lng?: number} | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [currentDistance, setCurrentDistance] = useState<number | null>(null);
  const [aiAdvice, setAiAdvice] = useState<string>('');
  const [loadingAdvice, setLoadingAdvice] = useState(false);
  
  // States for transport categories
  const [vehicleType, setVehicleType] = useState<'bike' | 'car'>('car');
  const [showInstallGuide, setShowInstallGuide] = useState<string | null>(null);

  const VIETNAM_BOUNDS = [[8.0, 102.0], [24.0, 110.0]];

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapRef.current = L.map(containerRef.current, {
      center: [16.0, 107.5],
      zoom: 6,
      minZoom: 5.5,
      maxBounds: VIETNAM_BOUNDS,
      zoomControl: false, 
      attributionControl: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png').addTo(mapRef.current);
    markersLayerRef.current = L.layerGroup().addTo(mapRef.current);
    renderMarkers();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.debug("Geolocation error:", err)
      );
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!focusId || !mapRef.current) return;
    const province = VIETNAM_PLACES.find(p => p.id === focusId);
    if (province) {
      handleProvinceSelect(province);
      return;
    }
    for (const p of VIETNAM_PLACES) {
      const attr = p.attractions.find(a => a.id === focusId);
      if (attr) {
        setSelectedProvince(p);
        setViewMode('province');
        handleAttractionSelect(attr);
        return;
      }
    }
  }, [focusId]);

  useEffect(() => {
    if (mapRef.current) {
      renderMarkers();
    }
  }, [viewMode, selectedProvince]);

  const renderMarkers = () => {
    if (!markersLayerRef.current) return;
    markersLayerRef.current.clearLayers();

    if (viewMode === 'national') {
      VIETNAM_PLACES.forEach(place => {
        const icon = L.divIcon({
          className: 'custom-div-icon',
          html: `<div class="w-6 h-6 bg-red-600 border-2 border-white rounded-full shadow-[0_5px_15px_rgba(220,38,38,0.4)] pulse-marker flex items-center justify-center"><div class="w-2 h-2 bg-white rounded-full"></div></div>`,
          iconSize: [24, 24]
        });
        const marker = L.marker([place.lat, place.lng], { icon });
        marker.on('click', () => handleProvinceSelect(place));
        marker.bindTooltip(`<b>${place.name}</b>`, { direction: 'top', offset: [0, -10] });
        marker.addTo(markersLayerRef.current);
      });
    } else if (viewMode === 'province' && selectedProvince) {
      selectedProvince.attractions.forEach(attr => {
        const icon = L.divIcon({
          className: 'custom-div-icon',
          html: `<div class="w-8 h-8 bg-yellow-500 border-2 border-white rounded-2xl flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.15)] transform rotate-45 transition-transform hover:scale-110 active:scale-95"><div class="-rotate-45 text-sm">📍</div></div>`,
          iconSize: [32, 32]
        });
        const marker = L.marker([attr.lat, attr.lng], { icon });
        marker.on('click', () => handleAttractionSelect(attr));
        marker.bindTooltip(`<b>${attr.name}</b>`, { direction: 'top', offset: [0, -15] });
        marker.addTo(markersLayerRef.current);
      });
    }
  };

  const handleProvinceSelect = (place: Place) => {
    setSelectedProvince(place);
    setViewMode('province');
    mapRef.current.flyTo([place.lat, place.lng], place.zoom, { duration: 1.5 });
  };

  const handleAttractionSelect = (attr: Attraction) => {
    setSelectedAttraction(attr);
    setShowDetail(true);
    mapRef.current.flyTo([attr.lat, attr.lng], 17, { duration: 1.2 });
  };

  const goBackToNational = () => {
    setViewMode('national');
    setSelectedProvince(null);
    setSelectedAttraction(null);
    setShowDetail(false);
    mapRef.current.flyTo([16.0, 107.5], 6, { duration: 1.5 });
  };

  const handleNextAttraction = () => {
    if (!selectedProvince || !selectedAttraction) return;
    const currentIndex = selectedProvince.attractions.findIndex(a => a.id === selectedAttraction.id);
    const nextIndex = (currentIndex + 1) % selectedProvince.attractions.length;
    handleAttractionSelect(selectedProvince.attractions[nextIndex]);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setLoading(true);
    const location = (viewMode === 'province' && selectedProvince) ? { lat: selectedProvince.lat, lng: selectedProvince.lng } : undefined;
    const result = await searchVietnamPlaces(searchQuery, location, lang as Language);
    setDiscoveryResult(result);
    setLoading(false);
  };

  const handleOpenDirections = async (destName: string, destLat?: number, destLng?: number) => {
    setDirectionDest({ name: destName, lat: destLat, lng: destLng });
    setShowDirections(true);
    setAiAdvice('');
    setLoadingAdvice(true);
    
    let dist = 0;
    if (userLocation && destLat && destLng) {
      dist = calculateDistance(userLocation.lat, userLocation.lng, destLat, destLng);
      setCurrentDistance(dist);
    } else {
      setCurrentDistance(null);
    }
    
    const origin = userLocation ? `${userLocation.lat},${userLocation.lng}` : (lang === 'en' ? 'Current City' : 'Thành phố hiện tại');
    const advice = await getTransportAdvice(origin, destName, dist || 0, lang as Language);
    setAiAdvice(advice);
    setLoadingAdvice(false);
  };

  const getEmbedDirectionsUrl = (destName: string, destLat?: number, destLng?: number) => {
    const origin = userLocation ? `${userLocation.lat},${userLocation.lng}` : 'current+location';
    const destination = (destLat && destLng) ? `${destLat},${destLng}` : encodeURIComponent(destName);
    return `https://www.google.com/maps?saddr=${origin}&daddr=${destination}&output=embed`;
  };

  return (
    <div className="relative w-full h-[85vh] bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl border-2 border-white/50">
      <div ref={containerRef} className="w-full h-full z-0" />

      {/* Back Button */}
      <div className="absolute top-20 left-4 z-[1000] flex flex-col gap-2">
        {viewMode === 'province' && (
          <button 
            onClick={goBackToNational}
            className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-700 active:scale-95 transition-all"
          >
            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
            {lang === 'en' ? 'National Map' : 'Quay lại'}
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="absolute top-4 left-4 right-4 z-[1000]">
        <form onSubmit={handleSearch} className="flex items-center bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-2 border border-white/40">
          <div className="p-2 text-red-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <input 
            type="text" 
            placeholder={viewMode === 'province' ? (lang === 'en' ? `Search in ${selectedProvince?.name}...` : `Tìm tại ${selectedProvince?.name}...`) : (lang === 'en' ? "Explore Vietnam..." : "Khám phá Việt Nam...")} 
            className="flex-grow bg-transparent border-none focus:ring-0 text-xs font-bold py-2 placeholder:text-slate-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="bg-red-600 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-200 active:scale-95 transition-all">
            {loading ? "..." : (lang === 'en' ? "Ask AI" : "Hỏi AI")}
          </button>
        </form>
      </div>

      {/* Attraction Detail View */}
      {showDetail && selectedAttraction && (
        <div className="absolute inset-0 z-[2000] bg-slate-900/60 backdrop-blur-[4px] flex flex-col justify-end">
          <div className="absolute inset-0 -z-10" onClick={() => setShowDetail(false)}></div>
          <div className="w-full bg-white rounded-t-[3.5rem] shadow-[0_-20px_60px_rgba(0,0,0,0.4)] flex flex-col max-h-[90vh]">
            <div className="w-full flex justify-center py-4 shrink-0"><div className="w-12 h-1.5 bg-slate-200 rounded-full"></div></div>
            
            <div className="px-8 pb-4 flex justify-between items-center shrink-0">
              <div className="flex flex-col">
                <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">{selectedAttraction.category}</p>
                <h3 className="text-2xl font-black text-slate-900 leading-tight">{selectedAttraction.name}</h3>
              </div>
              <button onClick={() => setShowDetail(false)} className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            
            <div className="flex-grow overflow-y-auto px-8 pb-32 no-scrollbar space-y-8">
              <div className="relative mb-2">
                <img src={selectedAttraction.image} className="w-full h-56 rounded-[2.5rem] object-cover shadow-xl" />
                <div className="absolute -bottom-4 right-6 bg-yellow-400 text-white px-5 py-2.5 rounded-2xl text-sm font-black shadow-xl border-4 border-white flex items-center gap-1">★ {selectedAttraction.rating}</div>
              </div>
              {selectedAttraction.goldenHours && (
                <div className="p-6 bg-yellow-50 rounded-[2.5rem] border border-yellow-100">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">🌅</span>
                    <h4 className="font-black text-sm text-yellow-800 uppercase tracking-widest">{t.bestTimeTitle}</h4>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white px-4 py-3 rounded-2xl shadow-sm border border-yellow-200 shrink-0">
                      <p className="text-[10px] font-black text-yellow-600 uppercase mb-1">{t.bestDayTime}</p>
                      <p className="text-sm font-black text-yellow-900">{selectedAttraction.goldenHours}</p>
                    </div>
                    <div className="flex-grow">
                      <p className="text-xs text-yellow-800 font-bold leading-relaxed">{selectedAttraction.goldenHourReason}</p>
                    </div>
                  </div>
                </div>
              )}
              {selectedAttraction.travelNotes && selectedAttraction.travelNotes.length > 0 && (
                <div className="bg-red-50 p-6 rounded-[2.5rem] border border-red-100">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl">⚠️</span>
                    <h4 className="font-black text-sm text-red-800 uppercase tracking-widest">{t.travelNotesTitle}</h4>
                  </div>
                  <ul className="space-y-2">
                    {selectedAttraction.travelNotes.map((note, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></span>
                        <p className="text-xs text-red-900 font-medium">{note}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white/95 to-transparent flex gap-3 shrink-0">
              <button onClick={handleNextAttraction} className="flex-grow bg-slate-900 text-white py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl active:scale-95 transition-all">
                {lang === 'en' ? 'Explore Next' : 'Điểm tiếp theo'}
              </button>
              <button onClick={() => handleOpenDirections(selectedAttraction.name, selectedAttraction.lat, selectedAttraction.lng)} className="w-20 bg-red-600 text-white py-5 rounded-[2rem] font-black shadow-xl active:scale-95 transition-all flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Directions Overlay */}
      {showDirections && directionDest && (
        <div className="absolute inset-0 z-[3000] bg-slate-900 flex flex-col animate-in fade-in duration-300 overflow-hidden">
          <header className="shrink-0 bg-slate-900 p-4 pt-8 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg></div>
              <div className="overflow-hidden">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{lang === 'en' ? 'Directions to' : 'Chỉ đường tới'}</p>
                <h4 className="text-white font-black truncate text-sm">{directionDest.name}</h4>
              </div>
            </div>
            <button onClick={() => setShowDirections(false)} className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-slate-400"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg></button>
          </header>
          
          <div className="flex-grow relative bg-slate-50 overflow-y-auto no-scrollbar">
            <div className="w-full h-72 shrink-0">
              <iframe src={getEmbedDirectionsUrl(directionDest.name, directionDest.lat, directionDest.lng)} className="w-full h-full border-none" allowFullScreen loading="lazy"></iframe>
            </div>
            
            <div className="p-6 space-y-8 pb-32">
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
                      <p className="text-sm text-white font-bold leading-relaxed">{aiAdvice}</p>
                    )}
                 </div>
              </div>

              {/* Ride Hailing Category Toggle */}
              <div className="bg-white p-6 rounded-[3rem] shadow-xl border border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🚖</span>
                    <h4 className="font-black text-base text-slate-900">{t.transportAdvisory.rideHailing.label}</h4>
                  </div>
                </div>

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
                </div>
              </div>

              {/* Detailed Bus Companies Section */}
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
          
          <footer className="shrink-0 p-6 bg-slate-900 border-t border-white/10">
            <button onClick={() => setShowDirections(false)} className="w-full bg-white text-slate-900 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] active:scale-95 transition-all">Đóng</button>
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
                <button onClick={() => setShowInstallGuide(null)} className="w-full mt-8 bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95">{t.close}</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VietnamMap;