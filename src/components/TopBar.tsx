import React from 'react';
import { Volume2, VolumeX, Smartphone, Music, Camera, Sliders, Edit3 } from 'lucide-react';
import { sapeAudio } from '../utils/sapeAudio';

interface TopBarProps {
  currentTab: 'eksplorasi' | 'destinasi' | 'bioskop' | 'peta' | 'koleksi';
  onNavigateTab: (tab: 'eksplorasi' | 'destinasi' | 'bioskop' | 'peta' | 'koleksi') => void;
  onOpenPlayStoreModal: () => void;
  onOpenSapeModal: () => void;
  onOpenEditorModal: () => void;
  onOpenGalleryModal: () => void;
  isAmbientPlaying: boolean;
  onToggleAmbient: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentTab,
  onNavigateTab,
  onOpenPlayStoreModal,
  onOpenSapeModal,
  onOpenEditorModal,
  onOpenGalleryModal,
  isAmbientPlaying,
  onToggleAmbient
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigateTab('eksplorasi')}
          className="text-left whitespace-nowrap shrink-0 flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-700 text-amber-100 flex items-center justify-center font-serif font-bold text-base shadow-sm group-hover:bg-amber-800 transition-colors">
            PK
          </div>
          <span className="font-serif text-lg font-bold tracking-tight text-stone-900 group-hover:text-amber-900 transition-colors">
            Pusaka Khatulistiwa
          </span>
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-stone-600">
          <button
            onClick={() => onNavigateTab('eksplorasi')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              currentTab === 'eksplorasi' ? 'text-amber-900 font-bold' : 'hover:text-stone-900'
            }`}
          >
            Eksplorasi
          </button>
          <button
            onClick={() => onNavigateTab('destinasi')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              currentTab === 'destinasi' ? 'text-amber-900 font-bold' : 'hover:text-stone-900'
            }`}
          >
            Destinasi Budaya
          </button>
          <button
            onClick={() => onNavigateTab('bioskop')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              currentTab === 'bioskop' ? 'text-amber-900 font-bold' : 'hover:text-stone-900'
            }`}
          >
            Bioskop Dokumenter
          </button>
          <button
            onClick={() => onNavigateTab('peta')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              currentTab === 'peta' ? 'text-amber-900 font-bold' : 'hover:text-stone-900'
            }`}
          >
            Peta Kalbar
          </button>
          <button
            onClick={() => onNavigateTab('koleksi')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              currentTab === 'koleksi' ? 'text-amber-900 font-bold' : 'hover:text-stone-900'
            }`}
          >
            Koleksi Saya
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Ambient Soundscape Toggle */}
          <button
            onClick={onToggleAmbient}
            title={isAmbientPlaying ? 'Matikan Suara Sungai & Burung Rimba' : 'Nyalakan Suara Alam Borneo'}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
              isAmbientPlaying
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
            }`}
            aria-label="Toggle ambient audio"
          >
            {isAmbientPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Sape Quick Strum */}
          <button
            onClick={onOpenSapeModal}
            title="Buka Alat Musik Sape' Virtual"
            className="w-9 h-9 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 flex items-center justify-center transition-colors hidden sm:flex"
            aria-label="Petik sape"
          >
            <Music className="w-4 h-4" />
          </button>

          {/* Etnofotografi Gallery Modal */}
          <button
            onClick={onOpenGalleryModal}
            title="Galeri Etnofotografi Kalbar"
            className="w-9 h-9 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors hidden lg:flex"
            aria-label="Galeri Etnofotografi"
          >
            <Camera className="w-4 h-4" />
          </button>

          {/* Edit Aplikasi / Studio Budaya CTA */}
          <button
            onClick={onOpenEditorModal}
            className="px-3.5 py-2 text-xs font-bold text-amber-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm active:scale-95"
            title="Buka Studio Editor untuk menyunting atau menambah cagar budaya & film dokumenter"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Aplikasi</span>
          </button>
        </div>
      </div>
    </header>
  );
};
