
import React, { useState } from 'react';
import { FOOD_LIST } from '../constants';
import { Region, Language } from '../types';
import { translations } from '../locales';

interface Props {
  lang: Language;
  onOpenMap?: (name: string, address: string) => void;
}

const FoodExplorer: React.FC<Props> = ({ lang, onOpenMap }) => {
  const t = translations[lang];
  const [filter, setFilter] = useState<Region | 'All'>('All');
  const [search, setSearch] = useState('');

  const filteredFood = FOOD_LIST.filter(f => {
    const matchesRegion = filter === 'All' || f.region === filter;
    const foodItem = (t.foodItems as any)[f.id];
    const nameToSearch = foodItem?.name || f.name;
    const matchesSearch = nameToSearch.toLowerCase().includes(search.toLowerCase()) || 
                          f.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    return matchesRegion && matchesSearch;
  });

  const deliveryApps = [
    { name: 'ShopeeFood', url: 'https://shopeefood.vn/', color: 'bg-[#ee4d2d]', icon: '🦐' },
    { name: 'GrabFood', url: 'https://www.grab.com/vn/en/food/', color: 'bg-[#00b14f]', icon: '🥝' },
    { name: 'Be', url: 'https://be.com.vn/dich-vu/be-food/', color: 'bg-[#ffc107]', text: 'text-slate-900', icon: '🐝' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 animate-in fade-in duration-500">
      <div className="flex flex-col mb-12 gap-8">
        <div>
          <h2 className="text-4xl font-serif font-bold text-slate-900 mb-2">{t.foodHeader}</h2>
          <p className="text-slate-600">{t.foodDesc}</p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <input 
              type="text" 
              placeholder={t.searchFood} 
              className="w-full bg-white border border-slate-200 rounded-2xl px-12 py-4 text-xs font-bold focus:ring-2 focus:ring-red-500 outline-none shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          
          <div className="flex bg-slate-50 p-1 rounded-2xl shadow-inner border border-slate-200 overflow-x-auto no-scrollbar">
            {['All', ...Object.values(Region)].map(r => (
              <button
                key={r}
                onClick={() => setFilter(r as any)}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  filter === r ? 'bg-white text-red-600 shadow-md' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {r === 'All' ? t.all : r === Region.NORTH ? t.north : r === Region.CENTRAL ? t.central : t.south}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredFood.length === 0 ? (
        <div className="py-20 text-center text-slate-300">
          <p className="text-5xl mb-6">🍽️</p>
          <p className="font-bold text-sm uppercase tracking-widest">{t.noFoodFound}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFood.map(f => {
            const foodItem = (t.foodItems as any)[f.id];
            return (
              <div key={f.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all group border border-slate-50 flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <img src={f.image} alt={foodItem?.name || f.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-5 left-5 flex flex-wrap gap-2 pr-5">
                    {f.tags.map(tag => (
                      <span key={tag} className="bg-white/95 backdrop-blur text-red-600 text-[9px] uppercase font-black px-2.5 py-1.5 rounded-lg shadow-sm border border-red-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="absolute bottom-5 right-5 bg-slate-900/80 backdrop-blur px-4 py-2 rounded-2xl text-[10px] font-black text-white shadow-lg border border-white/10">
                    {f.priceRange}
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <div className="mb-3">
                    <h3 className="text-2xl font-black text-slate-900 leading-tight">{foodItem?.name || f.name}</h3>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mb-8 line-clamp-2">
                    {foodItem?.desc || f.description}
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">
                      {t.suggestedAddress}
                    </p>
                    {f.recommendedPlaces.map((place, i) => (
                      <div key={i} className="bg-slate-50/50 p-3 rounded-2xl border border-transparent hover:border-red-100 transition-all group/place relative">
                        <div 
                          className="cursor-pointer flex justify-between items-center"
                          onClick={() => onOpenMap && onOpenMap(place.name, place.address)}
                        >
                          <div className="max-w-[75%]">
                            <p className="text-sm font-black text-slate-800 group-hover/place:text-red-600 transition-colors">{place.name}</p>
                            <p className="text-[10px] text-slate-400 font-medium truncate mb-1">{place.address}</p>
                            {place.phone && (
                                <a 
                                  href={`tel:${place.phone}`} 
                                  className="text-[9px] font-black text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-100 flex items-center gap-1 w-fit"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  📞 {place.phone}
                                </a>
                            )}
                          </div>
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-red-600 transition-all shadow-sm border border-slate-100 group-hover/place:bg-red-600 group-hover/place:text-white">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Section */}
                  <div className="mt-auto space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.deliveryTitle}</p>
                      <span className="text-[8px] font-bold text-slate-300">{t.deliveryDesc}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {deliveryApps.map(app => (
                        <a 
                          key={app.name}
                          href={app.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${app.color} ${app.text || 'text-white'} p-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/5`}
                        >
                          <span className="text-lg">{app.icon}</span>
                          <span className="text-[8px] font-black uppercase tracking-tight">{app.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FoodExplorer;
