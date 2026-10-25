import React, { useState, useMemo } from 'react';
import { DOCUMENTARIES_DATA, DocumentaryFilm } from '../data/culturalData';
import { Film, Play, Star, Award, Clock, Calendar, Search, Bookmark, BookmarkCheck, ArrowRight, RotateCcw, Plus, Edit3 } from 'lucide-react';

interface DocumentaryCinemaViewProps {
  documentaries?: DocumentaryFilm[];
  onSelectFilm: (film: DocumentaryFilm) => void;
  bookmarkedFilmIds: string[];
  onToggleBookmarkFilm: (id: string) => void;
  onOpenEditor?: (filmId?: string) => void;
}

export const DocumentaryCinemaView: React.FC<DocumentaryCinemaViewProps> = ({
  documentaries = DOCUMENTARIES_DATA,
  onSelectFilm,
  bookmarkedFilmIds,
  onToggleBookmarkFilm,
  onOpenEditor
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Semua Genre Dokumenter' },
    { id: 'Ritual & Tradisi', label: 'Ritual & Tradisi Adat' },
    { id: 'Seni Musik & Tari', label: 'Seni Musik & Sape\'' },
    { id: 'Kriya & Tenun', label: 'Kriya & Tenun Ikat' },
    { id: 'Arsitektur Leluhur', label: 'Arsitektur Rumah Panjang' },
    { id: 'Sejarah Maritim', label: 'Sejarah Keraton & Sungai' }
  ];

  const filteredFilms = useMemo(() => {
    return documentaries.filter((film) => {
      const matchSearch =
        film.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        film.synopsis.toLowerCase().includes(searchQuery.toLowerCase()) ||
        film.ethnicGroup.toLowerCase().includes(searchQuery.toLowerCase()) ||
        film.regencyName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory = selectedCategory === 'all' || film.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [documentaries, searchQuery, selectedCategory]);

  const featuredFilm = documentaries[1] || documentaries[0];

  return (
    <div className="space-y-8 pb-8">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-amber-800">
            Sinema Dokumenter Budaya Kalbar
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            Bioskop Audio-Visual Kebudayaan
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
            Koleksi film dokumenter etnofotografi dan sejarah peradaban Kalimantan Barat beresolusi tinggi, dilengkapi babak cerita dan takarir dwibahasa (Indonesia - Inggris).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-stone-500 font-mono">
            <span className="font-bold text-stone-900 tabular-nums">{filteredFilms.length}</span> film terkurasi
          </div>
          {onOpenEditor && (
            <button
              onClick={() => onOpenEditor('new')}
              className="px-3 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs flex items-center gap-1 shadow-sm transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Film</span>
            </button>
          )}
        </div>
      </div>

      {/* Hero Cinema Showcase */}
      <div
        onClick={() => onSelectFilm(featuredFilm)}
        className="relative rounded-3xl overflow-hidden bg-stone-950 text-white border border-stone-800 shadow-xl cursor-pointer group"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between z-10 relative">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Sorotan Editor Sinema
                </span>
                <span aria-hidden="true">·</span>
                <span>{featuredFilm.duration}</span>
                <span aria-hidden="true">·</span>
                <span>{featuredFilm.category}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-3 leading-tight group-hover:text-amber-200 transition-colors">
                {featuredFilm.title}
              </h3>

              <p className="text-stone-300 text-xs sm:text-sm mt-3 leading-relaxed max-w-xl line-clamp-3">
                {featuredFilm.synopsis}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-xs text-stone-400">
                <span>Sutradara: {featuredFilm.director}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{featuredFilm.rating}</span>
                </span>
              </div>

              <button
                type="button"
                className="px-5 py-2.5 rounded-xl bg-amber-600 group-hover:bg-amber-500 text-stone-950 font-bold text-xs transition-colors flex items-center gap-2 shadow-lg"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Putar di Bioskop Teater</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[220px] lg:min-h-full overflow-hidden bg-black">
            <img
              src={featuredFilm.thumbnail}
              alt={featuredFilm.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-stone-950 via-stone-950/40 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-amber-600/90 text-stone-950 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <Play className="w-7 h-7 fill-current ml-1" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Genre Tabs */}
      <div className="p-4 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari judul dokumenter, nama sutradara, atau kelompok etnis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600 focus:bg-white transition-colors"
          />
        </div>

        {/* Categories */}
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

      {/* Documentary Grid */}
      {filteredFilms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFilms.map((film) => {
            const isBookmarked = bookmarkedFilmIds.includes(film.id);
            return (
              <div
                key={film.id}
                className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail */}
                  <div
                    onClick={() => onSelectFilm(film)}
                    className="relative aspect-video w-full bg-stone-900 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={film.thumbnail}
                      alt={film.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

                    {/* Bookmark */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmarkFilm(film.id);
                      }}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                        isBookmarked ? 'bg-amber-600 text-stone-950' : 'bg-black/50 hover:bg-black/80 text-white'
                      }`}
                      aria-label="Simpan ke watchlist"
                    >
                      {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>

                    {/* Center play icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
                      <div className="w-12 h-12 rounded-full bg-amber-600 text-stone-950 flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>

                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-amber-200 font-medium">
                      <span>{film.duration}</span>
                      <span className="flex items-center gap-1 text-white">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="tabular-nums">{film.rating}</span>
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4 space-y-2">
                    <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                      <span>{film.regencyName.split(' ')[0]}</span>
                      <span aria-hidden="true">·</span>
                      <span>{film.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{film.releaseYear}</span>
                    </div>

                    <h3
                      onClick={() => onSelectFilm(film)}
                      className="font-serif text-base font-bold text-stone-900 group-hover:text-amber-900 transition-colors cursor-pointer line-clamp-2 leading-snug"
                    >
                      {film.title}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {film.synopsis}
                    </p>

                    <div className="pt-2 text-[11px] text-stone-500">
                      <span className="text-stone-400">Etnis: </span>
                      <span className="font-medium text-stone-800">{film.ethnicGroup}</span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-stone-500">{film.chapters.length} Babak</span>
                    {onOpenEditor && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenEditor(film.id);
                        }}
                        className="text-stone-400 hover:text-amber-800 p-1 rounded hover:bg-stone-100 transition-colors"
                        title="Sunting data film ini di Studio Editor"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => onSelectFilm(film)}
                    className="font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1"
                  >
                    <span>Tonton Film</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-white border border-stone-200 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center mx-auto">
            <Film className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-stone-800">Tidak ada film dokumenter ditemukan</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Silakan sesuaikan kata kunci atau pilih semua kategori.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Atur Ulang Filter</span>
          </button>
        </div>
      )}
    </div>
  );
};
