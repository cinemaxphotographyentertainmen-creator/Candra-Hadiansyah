import React, { useState, useMemo } from 'react';
import { DESTINATIONS_DATA, REGION_LIST, Destination } from '../data/culturalData';
import { Search, MapPin, Filter, Headphones, Bookmark, BookmarkCheck, ArrowRight, RotateCcw, Plus, Edit3 } from 'lucide-react';

interface DestinationsViewProps {
  destinations?: Destination[];
  onSelectDestination: (dest: Destination) => void;
  savedDestinationIds: string[];
  onToggleSaveDestination: (id: string) => void;
  initialRegencyFilter?: string;
  onOpenEditor?: (destId?: string) => void;
}

export const DestinationsView: React.FC<DestinationsViewProps> = ({
  destinations = DESTINATIONS_DATA,
  onSelectDestination,
  savedDestinationIds,
  onToggleSaveDestination,
  initialRegencyFilter = 'all',
  onOpenEditor
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegency, setSelectedRegency] = useState<string>(initialRegencyFilter);

  const categories = [
    { id: 'all', label: 'Semua Kategori' },
    { id: 'Keraton', label: 'Keraton & Kesultanan' },
    { id: 'Rumah Adat', label: 'Rumah Betang & Radakng' },
    { id: 'Situs Bersejarah', label: 'Situs Sakral & Bersejarah' },
    { id: 'Sentra Kriya', label: 'Sentra Kriya & Tenun' }
  ];

  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      const matchSearch =
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.regencyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCategory = selectedCategory === 'all' || dest.category === selectedCategory;
      const matchRegency = selectedRegency === 'all' || dest.regencyId === selectedRegency;

      return matchSearch && matchCategory && matchRegency;
    });
  }, [destinations, searchQuery, selectedCategory, selectedRegency]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedRegency('all');
  };

  return (
    <div className="space-y-8 pb-8">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-amber-800">
            Direktori Cagar Budaya & Adat
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            Destinasi Budaya 14 Kabupaten & Kota
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
            Arsip lengkap situs cagar budaya nasional, rumah panjang adat Dayak ulin, istana kemaharajaan Melayu, cagar budaya Hakka Tionghoa, dan sentra tenun tradisional.
          </p>
        </div>

        {/* Live Count Indicator & Add Button */}
        <div className="flex items-center gap-3">
          <div className="text-xs text-stone-500 font-mono">
            <span className="font-bold text-stone-900 tabular-nums">{filteredDestinations.length}</span> dari {destinations.length} destinasi
          </div>
          {onOpenEditor && (
            <button
              onClick={() => onOpenEditor('new')}
              className="px-3 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs flex items-center gap-1 shadow-sm transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Baru</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
        {/* Search input + Regency Selector */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-7 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari nama cagar budaya, keraton, rumah betang, atau kata kunci..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600 focus:bg-white transition-colors"
            />
          </div>

          <div className="md:col-span-5">
            <select
              value={selectedRegency}
              onChange={(e) => setSelectedRegency(e.target.value)}
              aria-label="Filter berdasarkan Kabupaten atau Kota"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-amber-600 focus:bg-white cursor-pointer font-medium"
            >
              <option value="all">Semua Wilayah (14 Kabupaten & Kota)</option>
              {REGION_LIST.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} ({r.nickname})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Interactive Category Segmented Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Destinations Cards Grid */}
      {filteredDestinations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((dest) => {
            const isSaved = savedDestinationIds.includes(dest.id);
            return (
              <div
                key={dest.id}
                className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Image slot */}
                  <div
                    onClick={() => onSelectDestination(dest)}
                    className="relative h-52 w-full bg-stone-100 overflow-hidden cursor-pointer"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />

                    {/* Bookmark action */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSaveDestination(dest.id);
                      }}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                        isSaved ? 'bg-amber-600 text-white' : 'bg-black/40 hover:bg-black/70 text-white'
                      }`}
                      aria-label="Simpan destinasi"
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-amber-200">
                      <span className="font-semibold flex items-center gap-1 truncate">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>{dest.regencyName}</span>
                      </span>
                      <span className="shrink-0 bg-black/50 px-2 py-0.5 rounded text-[10px] text-stone-200">
                        {dest.recommendedStay}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4 space-y-2">
                    {/* Unboxed metadata line */}
                    <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                      <span>{dest.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Headphones className="w-3 h-3 text-amber-700" />
                        <span>{dest.audioGuideDuration}</span>
                      </span>
                    </div>

                    <h3
                      onClick={() => onSelectDestination(dest)}
                      className="font-serif text-lg font-bold text-stone-900 group-hover:text-amber-900 transition-colors leading-snug cursor-pointer line-clamp-1"
                    >
                      {dest.name}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {dest.shortDesc}
                    </p>

                    <div className="pt-2 text-[11px] text-stone-500 flex items-center gap-1 truncate">
                      <span className="text-stone-400">Status:</span>
                      <span className="font-medium text-stone-700 truncate">{dest.heritageStatus}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Strip */}
                <div className="p-4 pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-stone-800">{dest.admissionFee.split('/')[0]}</span>
                    {onOpenEditor && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenEditor(dest.id);
                        }}
                        className="text-stone-400 hover:text-amber-800 p-1 rounded hover:bg-stone-100 transition-colors"
                        title="Edit cagar budaya ini"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => onSelectDestination(dest)}
                    className="font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1 transition-colors"
                  >
                    <span>Pelajari Adat & Sejarah</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center rounded-3xl bg-white border border-stone-200 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-stone-800">
            Tidak ada destinasi yang cocok
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Coba ubah kata kunci pencarian atau sesuaikan pilihan kabupaten/kategori di atas.
          </p>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-stone-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Atur Ulang Filter</span>
          </button>
        </div>
      )}
    </div>
  );
};
