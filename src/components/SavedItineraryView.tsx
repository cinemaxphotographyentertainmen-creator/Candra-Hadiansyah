import React, { useState } from 'react';
import { DESTINATIONS_DATA, DOCUMENTARIES_DATA, Destination, DocumentaryFilm } from '../data/culturalData';
import { Bookmark, Film, MapPin, Download, CheckCircle2, Trash2, ArrowRight, Compass, Shield, Calendar } from 'lucide-react';

interface SavedItineraryViewProps {
  savedDestinationIds: string[];
  bookmarkedFilmIds: string[];
  onSelectDestination: (dest: Destination) => void;
  onSelectFilm: (film: DocumentaryFilm) => void;
  onRemoveDestination: (id: string) => void;
  onRemoveFilm: (id: string) => void;
  onNavigateTab: (tab: 'eksplorasi' | 'destinasi' | 'bioskop' | 'peta' | 'koleksi') => void;
}

export const SavedItineraryView: React.FC<SavedItineraryViewProps> = ({
  savedDestinationIds,
  bookmarkedFilmIds,
  onSelectDestination,
  onSelectFilm,
  onRemoveDestination,
  onRemoveFilm,
  onNavigateTab
}) => {
  const [offlineSyncing, setOfflineSyncing] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<'3hari' | '7hari'>('3hari');

  const savedDestinations = DESTINATIONS_DATA.filter((d) => savedDestinationIds.includes(d.id));
  const bookmarkedFilms = DOCUMENTARIES_DATA.filter((f) => bookmarkedFilmIds.includes(f.id));

  const handleDownloadOffline = () => {
    setOfflineSyncing(true);
    setTimeout(() => {
      setOfflineSyncing(false);
      setOfflineReady(true);
    }, 1800);
  };

  const routes = {
    '3hari': {
      title: 'Rute Khatulistiwa 3 Hari: Pesisir Barat & Tiga Budaya',
      regions: 'Pontianak · Mempawah · Singkawang · Sambas',
      stops: [
        { day: 'Hari 1', spot: 'Keraton Kadriah & Rumah Betang Radakng Pontianak', note: 'Menelusuri sejarah Kesultanan Kadriah dan peradaban rumah panjang ulin di tepi Kapuas.' },
        { day: 'Hari 2', spot: 'Makam Opu Daeng Manambon Mempawah & Rumah Marga Tjhia Singkawang', note: 'Tradisi Robo-Robo dan kuliner choipan di cagar budaya Hakka tertua.' },
        { day: 'Hari 3', spot: 'Keraton Alwatzikhoebillah Sambas & Sentra Tenun Lunggi', note: 'Melihat pusaka meriam VOC dan maestro penenun benang emas istana Sambas.' }
      ]
    },
    '7hari': {
      title: 'Ekspedisi Hulu Borneo 7 Hari: Jantung Hati Rimba & Danau Sakral',
      regions: 'Sintang · Melawi · Kapuas Hulu (Putussibau & Danau Sentarum)',
      stops: [
        { day: 'Hari 1-2', spot: 'Monolit Raksasa Bukit Kelam & Rumah Betang Ensaid Panjang Sintang', note: 'Melihat pembuatan pewarna alami tenun ikat Dayak Desa dari akar mengkudu.' },
        { day: 'Hari 3-4', spot: 'Cagar Biosfer Danau Sentarum & Perahu Tambang Adat', note: 'Kearifan nelayan tradisional Melayu dan pemanen madu hutan liar berkelanjutan.' },
        { day: 'Hari 5-6', spot: 'Rumah Betang Lunsa Hilir Dayak Tamambaloh Putussibau', note: 'Menginap di rumah panjang ulin asli berumur 150 tahun dan menikmati petikan sape\'.' },
        { day: 'Hari 7', spot: 'Pusat Kriya Manik Dayak & Kembali ke Pontianak via Supadio', note: 'Belanja cenderamata kriya Dayak berlisensi pelestarian budaya.' }
      ]
    }
  };

  return (
    <div className="space-y-10 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-amber-800">
            Rencana Perjalanan & Arsip Pribadi
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            Koleksi Saya & Panduan Ekspedisi
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
            Kompilasi destinasi budaya dan film dokumenter yang Anda simpan. Unduh paket untuk digunakan secara luring saat berada di daerah pedalaman tanpa sinyal seluler.
          </p>
        </div>

        {/* Offline Sync Box */}
        <div className="shrink-0">
          <button
            onClick={handleDownloadOffline}
            disabled={offlineSyncing}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-sm ${
              offlineReady
                ? 'bg-emerald-600 text-white'
                : 'bg-stone-900 hover:bg-stone-800 text-white'
            }`}
          >
            {offlineReady ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Paket Offline Siap Digunakan (42 MB)</span>
              </>
            ) : offlineSyncing ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Mengunduh Data Luring...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Unduh Data Budaya Luring (Offline)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Recommended Expedition Itinerary Planner */}
      <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-800" />
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Rencana Rute Ekspedisi Budaya Kalimantan Barat
            </h3>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl">
            <button
              onClick={() => setSelectedRoute('3hari')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedRoute === '3hari' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Rute 3 Hari (Pesisir)
            </button>
            <button
              onClick={() => setSelectedRoute('7hari')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedRoute === '7hari' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Ekspedisi 7 Hari (Hulu)
            </button>
          </div>
        </div>

        {/* Selected Route Content */}
        <div className="space-y-4">
          <div>
            <h4 className="font-serif text-base font-bold text-stone-900">{routes[selectedRoute].title}</h4>
            <p className="text-xs text-amber-800 font-medium mt-0.5">{routes[selectedRoute].regions}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {routes[selectedRoute].stops.map((stop, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-stone-50 border border-stone-100 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-800">{stop.day}</span>
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                </div>
                <h5 className="font-semibold text-xs text-stone-900">{stop.spot}</h5>
                <p className="text-xs text-stone-600 leading-relaxed">{stop.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Saved Destinations Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-amber-800" />
            <span>Destinasi Tersimpan ({savedDestinations.length})</span>
          </h3>
          {savedDestinations.length === 0 && (
            <button
              onClick={() => onNavigateTab('destinasi')}
              className="text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1"
            >
              <span>Telusuri Destinasi</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>

        {savedDestinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedDestinations.map((dest) => (
              <div
                key={dest.id}
                className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex gap-4 items-start justify-between group"
              >
                <div
                  onClick={() => onSelectDestination(dest)}
                  className="flex-1 min-w-0 cursor-pointer"
                >
                  <span className="text-[11px] text-amber-800 font-medium block">{dest.regencyName}</span>
                  <h4 className="font-serif text-sm font-bold text-stone-900 group-hover:text-amber-900 truncate mt-0.5">
                    {dest.name}
                  </h4>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-1">{dest.category} · {dest.admissionFee.split('/')[0]}</p>
                </div>

                <button
                  onClick={() => onRemoveDestination(dest.id)}
                  className="w-8 h-8 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors shrink-0"
                  aria-label="Hapus destinasi"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center rounded-2xl bg-white border border-stone-200 text-stone-500 text-xs">
            Belum ada destinasi budaya yang disimpan. Ketuk ikon penanda pada kartu cagar budaya untuk menyimpannya di sini.
          </div>
        )}
      </div>

      {/* Bookmarked Documentaries Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
            <Film className="w-4 h-4 text-amber-800" />
            <span>Film Dokumenter Watchlist ({bookmarkedFilms.length})</span>
          </h3>
          {bookmarkedFilms.length === 0 && (
            <button
              onClick={() => onNavigateTab('bioskop')}
              className="text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1"
            >
              <span>Telusuri Bioskop</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>

        {bookmarkedFilms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookmarkedFilms.map((film) => (
              <div
                key={film.id}
                className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex gap-4 items-start justify-between group"
              >
                <div
                  onClick={() => onSelectFilm(film)}
                  className="flex-1 min-w-0 cursor-pointer"
                >
                  <span className="text-[11px] text-amber-800 font-medium block">{film.duration} · {film.category}</span>
                  <h4 className="font-serif text-sm font-bold text-stone-900 group-hover:text-amber-900 truncate mt-0.5">
                    {film.title}
                  </h4>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-1">{film.ethnicGroup}</p>
                </div>

                <button
                  onClick={() => onRemoveFilm(film.id)}
                  className="w-8 h-8 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors shrink-0"
                  aria-label="Hapus dari watchlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center rounded-2xl bg-white border border-stone-200 text-stone-500 text-xs">
            Watchlist film dokumenter masih kosong. Jelajahi katalog bioskop untuk menyimpan dokumenter adat yang ingin Anda tonton.
          </div>
        )}
      </div>
    </div>
  );
};
