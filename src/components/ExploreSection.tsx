import React from 'react';
import { REGION_LIST, RegencyInfo, DESTINATIONS_DATA, DOCUMENTARIES_DATA, Destination, DocumentaryFilm } from '../data/culturalData';
import { Compass, Film, Headphones, Music, ArrowRight, Play, Eye, Sparkles, MapPin, Bookmark, BookmarkCheck, Camera, Edit3 } from 'lucide-react';
import { sapeAudio } from '../utils/sapeAudio';

interface ExploreSectionProps {
  destinations?: Destination[];
  documentaries?: DocumentaryFilm[];
  onSelectDestination: (dest: Destination) => void;
  onSelectFilm: (film: DocumentaryFilm) => void;
  onNavigateTab: (tab: 'eksplorasi' | 'destinasi' | 'bioskop' | 'peta' | 'koleksi') => void;
  onOpenSapeModal: () => void;
  onOpenGalleryModal?: () => void;
  onOpenEditorModal?: () => void;
  savedDestinationIds: string[];
  onToggleSaveDestination: (id: string) => void;
  selectedRegencyFilter: string;
  onSelectRegencyFilter: (regencyId: string) => void;
}

export const ExploreSection: React.FC<ExploreSectionProps> = ({
  destinations = DESTINATIONS_DATA,
  documentaries = DOCUMENTARIES_DATA,
  onSelectDestination,
  onSelectFilm,
  onNavigateTab,
  onOpenSapeModal,
  onOpenGalleryModal,
  onOpenEditorModal,
  savedDestinationIds,
  onToggleSaveDestination,
  selectedRegencyFilter,
  onSelectRegencyFilter
}) => {
  const featuredDestinations = destinations.slice(0, 4);
  const featuredFilm = documentaries[0];
  const secondaryFilms = documentaries.slice(1, 4);

  return (
    <div className="space-y-12 pb-8">
      {/* Editorial Exhibition Marquee Hero */}
      <section className="relative rounded-3xl overflow-hidden bg-stone-950 text-white border border-stone-800 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
          {/* Left Text Narrative Zone */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between z-10 relative">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400">
                <span>Warisan Leluhur Bumi Khatulistiwa</span>
                <span aria-hidden="true">·</span>
                <span>Kalimantan Barat</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 leading-[1.15] text-balance">
                Menjaga Denyut Peradaban Dayak, Melayu & Tionghoa di Tanah Borneo.
              </h1>

              <p className="text-stone-300 text-sm sm:text-base mt-4 leading-relaxed max-w-xl">
                Jelajahi keagungan rumah betang berumur ratusan tahun, keraton kesultanan bahari di muara sungai Kapuas, kemegahan perayaan akulturasi Cap Go Meh, dan film dokumenter budaya bersuara jernih.
              </p>
            </div>

            {/* Hero Interactive Triggers */}
            <div className="mt-8 pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigateTab('destinasi')}
                className="px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-lg"
              >
                <span>Jelajahi 14 Kabupaten / Kota</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onSelectFilm(featuredFilm)}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md font-medium text-xs sm:text-sm transition-all flex items-center gap-2 border border-white/15"
              >
                <Play className="w-4 h-4 fill-current text-amber-400" />
                <span>Tonton Film Dokumenter Pilihan</span>
              </button>

              <button
                onClick={onOpenSapeModal}
                className="px-4 py-3 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-amber-300 border border-amber-500/30 font-medium text-xs sm:text-sm transition-all flex items-center gap-2"
              >
                <Music className="w-4 h-4" />
                <span>Petik Sape' Digital</span>
              </button>

              {onOpenGalleryModal && (
                <button
                  onClick={onOpenGalleryModal}
                  className="px-4 py-3 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-200 border border-white/10 font-medium text-xs sm:text-sm transition-all flex items-center gap-2"
                >
                  <Camera className="w-4 h-4 text-amber-400" />
                  <span>Galeri Etnofotografi</span>
                </button>
              )}

              {onOpenEditorModal && (
                <button
                  onClick={onOpenEditorModal}
                  className="px-4 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-md"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Studio Editor</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full overflow-hidden">
            <img
              src="/src/assets/images/hero_radakng_borneo_1792942702543.jpg"
              alt="Rumah Betang Radakng Kalimantan Barat"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-stone-950 via-stone-950/40 to-transparent" />

            <div className="absolute bottom-4 left-6 right-6 text-xs text-stone-300 pointer-events-none">
              <span className="font-serif italic">Arsitektur Rumah Betang Radakng · Mahakarya Kayu Ulin Terpanjang</span>
            </div>
          </div>
        </div>

        {/* Operational Utility Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-8 py-4 bg-stone-900/90 border-t border-stone-800 text-xs">
          <div>
            <span className="text-stone-400 block text-[11px]">Wilayah Terliput</span>
            <span className="font-bold text-amber-300">14 Kabupaten & Kota</span>
          </div>
          <div>
            <span className="text-stone-400 block text-[11px]">Cagar Budaya</span>
            <span className="font-bold text-white">Keraton, Betang, Situs Sakral</span>
          </div>
          <div>
            <span className="text-stone-400 block text-[11px]">Film Sinema</span>
            <span className="font-bold text-white">4K Dokumenter & Subtitle</span>
          </div>
          <div>
            <span className="text-stone-400 block text-[11px]">Audio Pemandu</span>
            <span className="font-bold text-amber-300">Audio Guide & Dawai Sape'</span>
          </div>
        </div>
      </section>

      {/* 14 Kabupaten & Kota Quick Horizontal Filter Bar */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Pusat Budaya 14 Daerah Kalbar
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Pilih kabupaten atau kota untuk menyaring cagar budaya dan film daerah
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('peta')}
            className="text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1 shrink-0"
          >
            <span>Buka Peta Utuh</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Horizontal Scrollable Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => onSelectRegencyFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
              selectedRegencyFilter === 'all'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            Semua Wilayah ({REGION_LIST.length})
          </button>

          {REGION_LIST.map((reg) => {
            const isSelected = selectedRegencyFilter === reg.id;
            return (
              <button
                key={reg.id}
                onClick={() => onSelectRegencyFilter(reg.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap shrink-0 transition-all ${
                  isSelected
                    ? 'bg-amber-700 text-white shadow-sm'
                    : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                {reg.name.replace('Kabupaten ', 'Kab. ')}
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Cultural Destinations */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-amber-800">
              Cagar Budaya Unggulan
            </div>
            <h3 className="font-serif text-2xl font-bold text-stone-900 mt-0.5">
              Destinasi Bersejarah & Arsitektur Sakral
            </h3>
          </div>
          <button
            onClick={() => onNavigateTab('destinasi')}
            className="text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1"
          >
            <span>Lihat Semua ({DESTINATIONS_DATA.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDestinations.map((dest) => {
            const isSaved = savedDestinationIds.includes(dest.id);
            return (
              <div
                key={dest.id}
                className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                {/* Card Media Slot */}
                <div
                  onClick={() => onSelectDestination(dest)}
                  className="relative h-48 w-full bg-stone-100 overflow-hidden cursor-pointer"
                >
                  <img
                    src={dest.image}
                    alt={dest.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent" />

                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSaveDestination(dest.id);
                    }}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                      isSaved
                        ? 'bg-amber-600 text-white'
                        : 'bg-black/40 hover:bg-black/70 text-white'
                    }`}
                    aria-label="Simpan destinasi"
                  >
                    {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  </button>

                  <div className="absolute bottom-2.5 left-3 right-3 text-[11px] text-amber-200 flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{dest.regencyName}</span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* Unboxed Metadata Line */}
                    <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                      <span>{dest.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{dest.audioGuideDuration}</span>
                    </div>

                    <h4
                      onClick={() => onSelectDestination(dest)}
                      className="font-serif text-base font-bold text-stone-900 group-hover:text-amber-900 transition-colors mt-1 leading-snug cursor-pointer line-clamp-2"
                    >
                      {dest.name}
                    </h4>

                    <p className="text-xs text-stone-600 mt-1.5 line-clamp-2 leading-relaxed">
                      {dest.shortDesc}
                    </p>
                  </div>

                  {/* Card Footer with Details Trigger */}
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-stone-700">
                      {dest.admissionFee.split('/')[0]}
                    </span>
                    <button
                      onClick={() => onSelectDestination(dest)}
                      className="text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1"
                    >
                      <span>Telusuri</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Documentary Spotlight Bento Block */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-amber-800">
              Bioskop Kebudayaan Kalbar
            </div>
            <h3 className="font-serif text-2xl font-bold text-stone-900 mt-0.5">
              Sinema Dokumenter Pilihan
            </h3>
          </div>
          <button
            onClick={() => onNavigateTab('bioskop')}
            className="text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1"
          >
            <span>Katalog Lengkap ({DOCUMENTARIES_DATA.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Lead Documentary Spotlight Card */}
          <div
            onClick={() => onSelectFilm(featuredFilm)}
            className="lg:col-span-7 rounded-3xl bg-stone-900 border border-stone-800 text-white overflow-hidden shadow-md cursor-pointer group flex flex-col justify-between"
          >
            <div className="relative aspect-video w-full bg-black overflow-hidden">
              <img
                src={featuredFilm.thumbnail}
                alt={featuredFilm.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />

              {/* Play Button Indicator */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-amber-600/90 group-hover:bg-amber-500 text-stone-950 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 fill-current ml-1" />
                </div>
              </div>

              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
                  <span>{featuredFilm.regencyName}</span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredFilm.duration}</span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredFilm.category}</span>
                </div>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1 leading-snug">
                  {featuredFilm.title}
                </h4>
              </div>
            </div>

            <div className="p-6 space-y-3">
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed line-clamp-2">
                {featuredFilm.synopsis}
              </p>
              <div className="flex items-center justify-between text-xs text-stone-400 pt-2 border-t border-stone-800">
                <span>Etnis: {featuredFilm.ethnicGroup}</span>
                <span className="text-amber-400 font-semibold flex items-center gap-1">
                  <span>Putar Film Sekarang</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Secondary Features Stack */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {secondaryFilms.map((film) => (
              <div
                key={film.id}
                onClick={() => onSelectFilm(film)}
                className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md hover:border-amber-300 transition-all cursor-pointer flex gap-4 group"
              >
                <div className="relative w-28 h-20 rounded-xl overflow-hidden bg-stone-900 shrink-0">
                  <img
                    src={film.thumbnail}
                    alt={film.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Play className="w-5 h-5 text-amber-400 fill-current opacity-90" />
                  </div>
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                      <span>{film.regencyName.split(' ')[0]}</span>
                      <span aria-hidden="true">·</span>
                      <span>{film.duration}</span>
                    </div>
                    <h5 className="font-serif text-xs sm:text-sm font-bold text-stone-900 group-hover:text-amber-900 transition-colors line-clamp-2 mt-0.5">
                      {film.title}
                    </h5>
                  </div>
                  <span className="text-[11px] text-stone-500">
                    Sutradara: {film.director.split('&')[0]}
                  </span>
                </div>
              </div>
            ))}

            {/* Interactive Sape Pluck Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-900 via-amber-800 to-stone-900 text-amber-100 flex items-center justify-between gap-3 shadow-sm border border-amber-700/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-400/30">
                  <Music className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">Instrumen Sape' Dayak Virtual</h5>
                  <p className="text-[11px] text-amber-200/80">Coba petik 6 dawai kayu adau pentatonik</p>
                </div>
              </div>
              <button
                onClick={onOpenSapeModal}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors shrink-0"
              >
                Coba Petik
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
