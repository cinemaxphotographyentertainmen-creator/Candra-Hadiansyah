import React, { useState } from 'react';
import { CULTURAL_GALLERY, CulturalPhoto } from '../data/culturalData';
import { X, Camera, MapPin, Maximize2, ChevronLeft, ChevronRight, Eye, Film } from 'lucide-react';

interface CulturalGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CulturalGalleryModal: React.FC<CulturalGalleryModalProps> = ({ isOpen, onClose }) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!isOpen) return null;

  const currentPhoto = CULTURAL_GALLERY[activePhotoIndex] || CULTURAL_GALLERY[0];

  const handleNext = () => {
    setActivePhotoIndex((prev) => (prev + 1) % CULTURAL_GALLERY.length);
  };

  const handlePrev = () => {
    setActivePhotoIndex((prev) => (prev - 1 + CULTURAL_GALLERY.length) % CULTURAL_GALLERY.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-950/95 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-stone-900 rounded-3xl shadow-2xl border border-stone-800 text-stone-100 overflow-hidden my-4 flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                Galeri Etnofotografi Budaya Kalimantan Barat
              </h3>
              <p className="text-xs text-stone-400">
                Karya Fotografi & Dokumentasi: {currentPhoto.photographer}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              title="Perbesar Layar Penuh"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              aria-label="Tutup galeri foto"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Photo Showcase Area */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black flex items-center justify-center overflow-hidden group select-none">
          <img
            src={currentPhoto.imageUrl}
            alt={currentPhoto.title}
            className="w-full h-full object-contain transition-all duration-300"
          />

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm transition-all border border-white/10 group-hover:opacity-100 opacity-80"
            aria-label="Foto sebelumnya"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm transition-all border border-white/10 group-hover:opacity-100 opacity-80"
            aria-label="Foto selanjutnya"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Floating Photo Meta Scrim */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{currentPhoto.location}, {currentPhoto.regency}</span>
                <span aria-hidden="true">·</span>
                <span>{currentPhoto.category}</span>
              </div>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                {currentPhoto.title}
              </h4>
              <p className="text-xs text-stone-300 mt-1 max-w-2xl leading-relaxed">
                {currentPhoto.description}
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-900/90 border border-stone-800 text-[11px] text-stone-400 shrink-0 font-mono">
              <span className="text-stone-300 font-semibold block">{currentPhoto.photographer}</span>
              <span>{currentPhoto.cameraInfo}</span>
            </div>
          </div>
        </div>

        {/* Thumbnail Navigation Strip */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center gap-3 overflow-x-auto no-scrollbar">
          {CULTURAL_GALLERY.map((photo, idx) => {
            const isCurrent = idx === activePhotoIndex;
            return (
              <button
                key={photo.id}
                onClick={() => setActivePhotoIndex(idx)}
                className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                  isCurrent ? 'border-amber-500 scale-105 shadow-md' : 'border-stone-800 opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
