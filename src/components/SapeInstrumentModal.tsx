import React, { useState } from 'react';
import { X, Volume2, Sparkles, Music, Play } from 'lucide-react';
import { sapeAudio } from '../utils/sapeAudio';

interface SapeInstrumentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SapeString {
  id: number;
  label: string;
  note: string;
  frequency: number;
  color: string;
  thickness: string;
}

const SAPE_STRINGS: SapeString[] = [
  { id: 1, label: 'Dawai 1 (Melodi Tinggi)', note: 'C5 (523 Hz)', frequency: 523.25, color: '#eab308', thickness: 'h-[2px]' },
  { id: 2, label: 'Dawai 2 (Leluhur)', note: 'A4 (440 Hz)', frequency: 440.00, color: '#f59e0b', thickness: 'h-[2.5px]' },
  { id: 3, label: 'Dawai 3 (Harmoni Lembah)', note: 'G4 (392 Hz)', frequency: 392.00, color: '#d97706', thickness: 'h-[3px]' },
  { id: 4, label: 'Dawai 4 (Pohon Adau)', note: 'F4 (349 Hz)', frequency: 349.23, color: '#b45309', thickness: 'h-[3.5px]' },
  { id: 5, label: 'Dawai 5 (Dengung Rendah)', note: 'D4 (294 Hz)', frequency: 293.66, color: '#92400e', thickness: 'h-[4px]' },
  { id: 6, label: 'Dawai 6 (Bass Rimba)', note: 'C4 (262 Hz)', frequency: 261.63, color: '#78350f', thickness: 'h-[4.5px]' },
];

export const SapeInstrumentModal: React.FC<SapeInstrumentModalProps> = ({ isOpen, onClose }) => {
  const [activeStringId, setActiveStringId] = useState<number | null>(null);
  const [isPlayingMelody, setIsPlayingMelody] = useState(false);

  if (!isOpen) return null;

  const handlePluck = (str: SapeString) => {
    setActiveStringId(str.id);
    sapeAudio.playSapeNote(str.frequency, 0.9);
    setTimeout(() => {
      setActiveStringId((current) => (current === str.id ? null : current));
    }, 300);
  };

  const handlePlayTraditionalSong = () => {
    if (isPlayingMelody) return;
    setIsPlayingMelody(true);
    sapeAudio.playTraditionalArpeggio();
    setTimeout(() => {
      setIsPlayingMelody(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-stone-900 rounded-3xl shadow-2xl border border-stone-800 text-stone-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Music className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-amber-200">Dawai Sape' Dayak Kalimantan</h3>
              <p className="text-[11px] text-stone-400">Sentuh atau klik dawai untuk memetik nada magis kayu adau</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            aria-label="Tutup pemetik sape"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sape Wooden Body Display */}
        <div className="p-6">
          <div className="relative rounded-2xl bg-gradient-to-b from-[#2b1810] via-[#1f100a] to-[#120804] border border-amber-900/40 p-6 shadow-inner overflow-hidden">
            {/* Traditional Carving Ornament watermark */}
            <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
              <svg className="w-96 h-96 text-amber-500" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 0 C60 20, 80 40, 100 50 C80 60, 60 80, 50 100 C40 80, 20 60, 0 50 C20 40, 40 20, 50 0 Z" />
              </svg>
            </div>

            {/* Fretboard & Strings Container */}
            <div className="relative space-y-4 py-2">
              {SAPE_STRINGS.map((str) => {
                const isActive = activeStringId === str.id;
                return (
                  <div
                    key={str.id}
                    onClick={() => handlePluck(str)}
                    className="group flex items-center gap-3 cursor-pointer select-none py-1.5 px-3 rounded-xl hover:bg-white/5 transition-all"
                  >
                    {/* String note label */}
                    <div className="w-24 shrink-0 text-right">
                      <span className="text-xs font-mono font-medium text-amber-300/80 block">
                        {str.note.split(' ')[0]}
                      </span>
                      <span className="text-[10px] text-stone-400 truncate block">
                        {str.label.split(' ')[0]} {str.label.split(' ')[1]}
                      </span>
                    </div>

                    {/* Interactive String Cable */}
                    <div className="flex-1 relative flex items-center h-8">
                      {/* String Line */}
                      <div
                        className={`w-full ${str.thickness} rounded-full transition-all duration-150 ${
                          isActive
                            ? 'bg-amber-300 shadow-[0_0_12px_#fbbf24] scale-y-150 animate-pulse'
                            : 'bg-stone-600 group-hover:bg-amber-400/80'
                        }`}
                      />
                      {/* Pluck Glow Ripple */}
                      {isActive && (
                        <div className="absolute inset-0 bg-amber-400/10 rounded-lg pointer-events-none animate-ping" />
                      )}
                    </div>

                    {/* Touch Action Button */}
                    <button
                      type="button"
                      className={`w-10 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all shrink-0 ${
                        isActive
                          ? 'bg-amber-500 text-stone-950 scale-105'
                          : 'bg-stone-800 text-stone-300 group-hover:bg-amber-600 group-hover:text-white'
                      }`}
                    >
                      Petik
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Play & Info Controls */}
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={handlePlayTraditionalSong}
              disabled={isPlayingMelody}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isPlayingMelody ? 'Memainkan Melodi...' : 'Putar Nada Tradisional Sape'}</span>
            </button>

            <div className="flex items-center gap-2 text-stone-400 text-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Tangga nada pentatonik Dayak Kenyah & Kayan</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-stone-950/80 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
          <span>Resonansi disintesis langsung menggunakan Web Audio API</span>
          <button
            onClick={onClose}
            className="text-stone-300 hover:text-white font-medium"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
