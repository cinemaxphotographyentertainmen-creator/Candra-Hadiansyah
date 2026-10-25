import React, { useState } from 'react';
import { Destination } from '../data/culturalData';
import { X, MapPin, Clock, Ticket, AlertCircle, Bookmark, BookmarkCheck, Headphones, Play, Pause, ExternalLink, Share2, Compass, Check, Edit3, Eye, Camera } from 'lucide-react';
import { sapeAudio } from '../utils/sapeAudio';

interface DestinationDetailModalProps {
  destination: Destination | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onOpenEditor?: (destId: string) => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  onClose,
  isSaved,
  onToggleSave,
  onOpenEditor
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);
  const [is360Active, setIs360Active] = useState(false);
  const [panPosition, setPanPosition] = useState(50);

  if (!destination) return null;

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      sapeAudio.playSapeNote(392, 0.6);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${destination.coordinates.lat},${destination.coordinates.lng}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        {/* Top Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-colors"
          aria-label="Tutup detail destinasi"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Hero Frame with 360 Panorama Feature */}
        <div className="relative h-64 sm:h-80 w-full bg-stone-900 overflow-hidden select-none">
          <div
            className="w-full h-full transition-transform duration-200"
            style={{
              transform: is360Active ? `scale(1.25) translateX(${(50 - panPosition) * 0.4}%)` : 'none'
            }}
          >
            <img
              src={destination.image}
              alt={destination.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          {/* Subtle Scrim Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent pointer-events-none" />

          {/* 360 View Controls Badge */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            <button
              onClick={() => setIs360Active(!is360Active)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 ${
                is360Active
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-black/60 hover:bg-black/80 text-stone-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{is360Active ? 'Tutup Mode 360°' : 'Jelajah Panorama 360°'}</span>
            </button>

            {destination.photographer && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-[10px] text-stone-300">
                <Camera className="w-3 h-3 text-amber-400" />
                <span>Foto: {destination.photographer}</span>
              </span>
            )}
          </div>

          {/* 360 Panning Slider */}
          {is360Active && (
            <div className="absolute bottom-20 left-6 right-6 z-20 bg-black/70 backdrop-blur-md p-2.5 rounded-xl border border-white/20 space-y-1">
              <div className="flex items-center justify-between text-[10px] text-amber-300 font-medium">
                <span>← Putar Sudut Kiri</span>
                <span>Geser untuk Menatap Panorama</span>
                <span>Putar Sudut Kanan →</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={panPosition}
                onChange={(e) => setPanPosition(Number(e.target.value))}
                className="w-full h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          )}

          {/* Floating Category & Regency Meta */}
          <div className="absolute bottom-4 left-6 right-6 pointer-events-none">
            <div className="flex items-center gap-2 text-xs font-medium text-amber-300">
              <span>{destination.regencyName}</span>
              <span aria-hidden="true">·</span>
              <span>{destination.category}</span>
              <span aria-hidden="true">·</span>
              <span>{destination.heritageStatus}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1 leading-tight">
              {destination.name}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          {/* Audio Guide Player Ribbon */}
          <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200/80 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-amber-950">Audio Guide Pemandu Budaya</h4>
                <p className="text-[11px] text-amber-800">
                  {isPlayingAudio ? 'Sedang memutar narasi & petikan dawai sape...' : `Durasi narasi lengkap: ${destination.audioGuideDuration}`}
                </p>
              </div>
            </div>
            <button
              onClick={handleToggleAudio}
              className="px-4 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
            >
              {isPlayingAudio ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Jeda</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Dengarkan</span>
                </>
              )}
            </button>
          </div>

          {/* Practical Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100 flex items-start gap-2.5">
              <Ticket className="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] text-stone-400 block font-medium">Tiket Masuk</span>
                <span className="text-xs font-semibold text-stone-800">{destination.admissionFee}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100 flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] text-stone-400 block font-medium">Jam Kunjungan</span>
                <span className="text-xs font-semibold text-stone-800">{destination.openingHours}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100 flex items-start gap-2.5">
              <Compass className="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] text-stone-400 block font-medium">Saran Durasi</span>
                <span className="text-xs font-semibold text-stone-800">{destination.recommendedStay}</span>
              </div>
            </div>
          </div>

          {/* Description & Narrative */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-semibold text-stone-900">Deskripsi & Keunikan Budaya</h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {destination.longDesc}
            </p>
          </div>

          {/* History */}
          <div className="space-y-2 p-4 rounded-2xl bg-stone-50 border border-stone-100">
            <h4 className="font-serif text-sm font-semibold text-stone-900">Sejarah & Asal-Usul</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              {destination.history}
            </p>
          </div>

          {/* Adat & Visiting Etiquette */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-900">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              <span>Etika & Adat Istiadat Saat Berkunjung</span>
            </div>
            <ul className="space-y-2">
              {destination.etiquette.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-700 shrink-0 mt-1.5" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Location Address */}
          <div className="pt-2 flex items-start gap-2.5 text-xs text-stone-500">
            <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-stone-700">Lokasi: </span>
              <span>{destination.address}</span>
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(destination.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                isSaved
                  ? 'bg-amber-600 text-white'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="w-4 h-4" />
                  <span>Tersimpan di Koleksi</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  <span>Simpan ke Rencana</span>
                </>
              )}
            </button>

            <button
              onClick={handleShare}
              className="px-3.5 py-2 rounded-xl text-xs font-medium bg-white border border-stone-200 text-stone-600 hover:bg-stone-100 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Tersalin' : 'Bagikan'}</span>
            </button>

            {onOpenEditor && (
              <button
                onClick={() => onOpenEditor(destination.id)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1.5 transition-colors"
                title="Sunting informasi destinasi ini di Studio Editor"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Destinasi</span>
              </button>
            )}
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <span>Buka di Peta GPS</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
