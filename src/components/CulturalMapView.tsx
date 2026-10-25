import React, { useState } from 'react';
import { REGION_LIST, RegencyInfo, DESTINATIONS_DATA, DOCUMENTARIES_DATA, Destination, DocumentaryFilm } from '../data/culturalData';
import { MapPin, Navigation, Compass, Utensils, Users, ChevronRight, Eye, Film } from 'lucide-react';
import { sapeAudio } from '../utils/sapeAudio';

interface CulturalMapViewProps {
  onSelectDestination: (dest: Destination) => void;
  onSelectFilm: (film: DocumentaryFilm) => void;
  onNavigateToDestinationsWithFilter: (regencyId: string) => void;
}

export const CulturalMapView: React.FC<CulturalMapViewProps> = ({
  onSelectDestination,
  onSelectFilm,
  onNavigateToDestinationsWithFilter
}) => {
  const [selectedRegionId, setSelectedRegionId] = useState<string>('pontianak');

  const selectedRegion = REGION_LIST.find((r) => r.id === selectedRegionId) || REGION_LIST[0];

  const regionDestinations = DESTINATIONS_DATA.filter((d) => d.regencyId === selectedRegion.id);
  const regionDocumentaries = DOCUMENTARIES_DATA.filter((d) => d.regencyId === selectedRegion.id);

  const handleSelectRegion = (reg: RegencyInfo) => {
    setSelectedRegionId(reg.id);
    sapeAudio.playSapeNote(349, 0.4);
  };

  return (
    <div className="space-y-6">
      {/* Title & Introduction */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-amber-800">
            Peta Cagar Budaya & Adat
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            Eksplorasi 14 Kabupaten & Kota Kalimantan Barat
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
            Klik titik wilayah pada peta interaktif Khatulistiwa untuk melihat profil kebudayaan, kuliner warisan leluhur, serta daftar cagar budaya dan film dokumenter di masing-masing daerah.
          </p>
        </div>
      </div>

      {/* Main Grid: Interactive Map + Region Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SVG Interactive Map Stage */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-stone-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-800" />
              <span className="text-xs font-bold text-stone-800">Topografi Budaya Provinsi Kalimantan Barat</span>
            </div>
            <span className="text-[11px] text-stone-400">Total Luas: 147.218 km²</span>
          </div>

          {/* Interactive SVG Canvas */}
          <div className="relative w-full aspect-[4/3] bg-stone-50 rounded-2xl border border-stone-200/70 p-2 flex items-center justify-center overflow-hidden">
            <svg
              viewBox="0 0 720 480"
              className="w-full h-full select-none"
            >
              {/* Background Geographic Shape representing Kalimantan Barat */}
              <defs>
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f3eee6" />
                  <stop offset="100%" stopColor="#e5ded2" />
                </linearGradient>
                <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.08" />
                </filter>
              </defs>

              {/* West Kalimantan Mainland Polygon Outline */}
              <path
                d="M 120 180 
                   Q 150 90, 210 50 
                   Q 260 20, 320 60 
                   Q 400 90, 480 80 
                   Q 560 70, 680 140 
                   Q 690 220, 640 260 
                   Q 580 290, 500 350 
                   Q 420 420, 320 440 
                   Q 240 430, 220 350 
                   Q 190 290, 160 260 
                   Q 130 230, 120 180 Z"
                fill="url(#mapGradient)"
                stroke="#c9bea9"
                strokeWidth="2"
                filter="url(#shadow)"
              />

              {/* Sungai Kapuas Path (Longest River in Indonesia) */}
              <path
                d="M 640 180 
                   Q 580 190, 520 220 
                   Q 460 230, 400 225 
                   Q 340 220, 270 200 
                   Q 220 215, 170 225"
                fill="none"
                stroke="#93c5fd"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.8"
              />
              <text x="360" y="240" fill="#3b82f6" fontSize="11" fontWeight="600" opacity="0.8" fontStyle="italic">
                Aliran Sungai Kapuas (1.143 km)
              </text>

              {/* Garis Khatulistiwa (Equator Line) */}
              <line x1="80" y1="220" x2="680" y2="220" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.85" />
              <text x="90" y="212" fill="#d97706" fontSize="10" fontWeight="bold">
                GARIS KHATULISTIWA (0° 0' 0")
              </text>

              {/* Regency Interactive Nodes */}
              {REGION_LIST.map((reg) => {
                const isSelected = reg.id === selectedRegionId;
                return (
                  <g
                    key={reg.id}
                    className="cursor-pointer group"
                    onClick={() => handleSelectRegion(reg)}
                  >
                    {/* Pulsing ring on selected */}
                    {isSelected && (
                      <circle
                        cx={reg.svgCoords.x}
                        cy={reg.svgCoords.y}
                        r="18"
                        fill="#d97706"
                        opacity="0.25"
                        className="animate-ping"
                      />
                    )}

                    {/* Outer node circle */}
                    <circle
                      cx={reg.svgCoords.x}
                      cy={reg.svgCoords.y}
                      r={isSelected ? 10 : 7}
                      fill={isSelected ? '#b45309' : '#ffffff'}
                      stroke={isSelected ? '#fef3c7' : '#78350f'}
                      strokeWidth={isSelected ? 3 : 2}
                      className="transition-all duration-200 group-hover:scale-125"
                    />

                    {/* Regency Label Box */}
                    <rect
                      x={reg.svgCoords.x - (reg.name.length * 3.2)}
                      y={reg.svgCoords.y + (isSelected ? 14 : 12)}
                      width={reg.name.length * 6.4}
                      height="16"
                      rx="4"
                      fill={isSelected ? '#1c1917' : 'rgba(255,255,255,0.92)'}
                      stroke={isSelected ? '#b45309' : 'rgba(0,0,0,0.08)'}
                      strokeWidth="1"
                    />
                    <text
                      x={reg.svgCoords.x}
                      y={reg.svgCoords.y + (isSelected ? 25 : 23)}
                      textAnchor="middle"
                      fill={isSelected ? '#fef3c7' : '#292524'}
                      fontSize="9"
                      fontWeight={isSelected ? 'bold' : '600'}
                      className="pointer-events-none"
                    >
                      {reg.name.replace('Kabupaten ', 'Kab. ')}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Map Legend */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-4 text-[11px] text-stone-500 pt-2 border-t border-stone-100">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-amber-500" />
                <span>Garis Khatulistiwa (0°)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-blue-300 rounded" />
                <span>Sungai Kapuas</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-700" />
                <span>Ibukota & Titik Cagar Budaya</span>
              </div>
            </div>
            <span>Pilih titik lingkaran untuk beralih daerah</span>
          </div>
        </div>

        {/* Selected Region Cultural Dossier */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-5">
          {/* Header */}
          <div className="border-b border-stone-100 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-800">{selectedRegion.nickname}</span>
              <span className="text-xs font-mono text-stone-400">Ibukota: {selectedRegion.capital}</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
              {selectedRegion.name}
            </h3>
            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              {selectedRegion.description}
            </p>
          </div>

          {/* Ethnic & Culinary Heritage */}
          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-100 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-800">
                <Users className="w-3.5 h-3.5 text-amber-800" />
                <span>Keragaman Etnis & Sub-Suku</span>
              </div>
              <p className="text-xs text-stone-600">
                {selectedRegion.ethnicities.join(' · ')}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/60 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-950">
                <Utensils className="w-3.5 h-3.5 text-amber-700" />
                <span>Kuliner Adat & Pangan Warisan</span>
              </div>
              <p className="text-xs text-amber-900">
                {selectedRegion.traditionalFood}
              </p>
            </div>
          </div>

          {/* Regional Highlights */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600">
                Destinasi Budaya di {selectedRegion.name}
              </h4>
              <button
                onClick={() => onNavigateToDestinationsWithFilter(selectedRegion.id)}
                className="text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1"
              >
                <span>Lihat Semua</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {regionDestinations.length > 0 ? (
              <div className="space-y-2">
                {regionDestinations.map((dest) => (
                  <div
                    key={dest.id}
                    onClick={() => onSelectDestination(dest)}
                    className="p-3 rounded-2xl border border-stone-100 bg-stone-50/50 hover:bg-stone-100 hover:border-amber-200 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div className="min-w-0">
                      <h5 className="font-semibold text-xs text-stone-900 group-hover:text-amber-900 truncate">
                        {dest.name}
                      </h5>
                      <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                        <span>{dest.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{dest.admissionFee}</span>
                      </div>
                    </div>
                    <Eye className="w-4 h-4 text-stone-400 group-hover:text-amber-700 shrink-0" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-stone-400 italic">
                Data cagar budaya sedang dalam proses penambahan oleh Balai Pelestarian Kebudayaan.
              </p>
            )}
          </div>

          {/* Regional Documentaries */}
          {regionDocumentaries.length > 0 && (
            <div className="space-y-2.5 pt-2 border-t border-stone-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600">
                Film Dokumenter Terkait
              </h4>
              {regionDocumentaries.map((film) => (
                <div
                  key={film.id}
                  onClick={() => onSelectFilm(film)}
                  className="p-3 rounded-2xl bg-amber-950 text-stone-100 cursor-pointer hover:bg-stone-900 transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="min-w-0">
                    <h5 className="font-serif font-bold text-xs text-amber-200 group-hover:text-amber-100 truncate">
                      {film.title}
                    </h5>
                    <p className="text-[10px] text-stone-400 mt-0.5">
                      {film.duration} · {film.ethnicGroup}
                    </p>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-amber-600 text-stone-950 flex items-center justify-center shrink-0">
                    <Film className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
