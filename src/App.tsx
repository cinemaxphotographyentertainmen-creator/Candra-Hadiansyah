/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { BottomNav } from './components/BottomNav';
import { ExploreSection } from './components/ExploreSection';
import { DestinationsView } from './components/DestinationsView';
import { DocumentaryCinemaView } from './components/DocumentaryCinemaView';
import { CulturalMapView } from './components/CulturalMapView';
import { SavedItineraryView } from './components/SavedItineraryView';
import { DestinationDetailModal } from './components/DestinationDetailModal';
import { DocumentaryPlayerModal } from './components/DocumentaryPlayerModal';
import { SapeInstrumentModal } from './components/SapeInstrumentModal';
import { PlayStoreInfoModal } from './components/PlayStoreInfoModal';
import { AppEditorModal } from './components/AppEditorModal';
import { CulturalGalleryModal } from './components/CulturalGalleryModal';
import {
  Destination,
  DocumentaryFilm,
  APP_INFO,
  DESTINATIONS_DATA,
  DOCUMENTARIES_DATA,
  getStoredDestinations,
  saveStoredDestinations,
  getStoredDocumentaries,
  saveStoredDocumentaries
} from './data/culturalData';
import { sapeAudio } from './utils/sapeAudio';
import { Smartphone, Download, Star, ShieldCheck, Heart, Info, Sliders, Camera, Edit3 } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'eksplorasi' | 'destinasi' | 'bioskop' | 'peta' | 'koleksi'>('eksplorasi');
  
  // Dynamic editable database state
  const [destinations, setDestinations] = useState<Destination[]>(() => getStoredDestinations());
  const [documentaries, setDocumentaries] = useState<DocumentaryFilm[]>(() => getStoredDocumentaries());

  // Modal active states
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedFilm, setSelectedFilm] = useState<DocumentaryFilm | null>(null);
  const [isSapeModalOpen, setIsSapeModalOpen] = useState(false);
  const [isPlayStoreModalOpen, setIsPlayStoreModalOpen] = useState(false);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [initialEditTarget, setInitialEditTarget] = useState<{ type: 'destination' | 'documentary'; id: string } | null>(null);

  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);

  // Filter pass-through state from map or explore
  const [destinationsRegencyFilter, setDestinationsRegencyFilter] = useState('all');

  // Bookmarks state (persisted in localStorage if available)
  const [savedDestinationIds, setSavedDestinationIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('pk_saved_destinations');
      return stored ? JSON.parse(stored) : ['keraton_kadriah', 'rumah_betang_radakng_pontianak'];
    } catch {
      return ['keraton_kadriah', 'rumah_betang_radakng_pontianak'];
    }
  });

  const [bookmarkedFilmIds, setBookmarkedFilmIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('pk_bookmarked_films');
      return stored ? JSON.parse(stored) : ['doc_sape_melodi'];
    } catch {
      return ['doc_sape_melodi'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('pk_saved_destinations', JSON.stringify(savedDestinationIds));
    } catch {
      // ignore storage error
    }
  }, [savedDestinationIds]);

  useEffect(() => {
    try {
      localStorage.setItem('pk_bookmarked_films', JSON.stringify(bookmarkedFilmIds));
    } catch {
      // ignore storage error
    }
  }, [bookmarkedFilmIds]);

  const toggleSaveDestination = (id: string) => {
    setSavedDestinationIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    sapeAudio.playSapeNote(523, 0.4);
  };

  const toggleBookmarkFilm = (id: string) => {
    setBookmarkedFilmIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    sapeAudio.playSapeNote(440, 0.4);
  };

  const handleToggleAmbient = () => {
    const newState = sapeAudio.toggleAmbient();
    setIsAmbientPlaying(newState);
  };

  const handleNavigateToDestinationsWithFilter = (regencyId: string) => {
    setDestinationsRegencyFilter(regencyId);
    setCurrentTab('destinasi');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Editor Actions
  const handleSaveDestinations = (updated: Destination[]) => {
    setDestinations(updated);
    saveStoredDestinations(updated);
    // If currently selected destination was updated, sync modal
    if (selectedDestination) {
      const refreshed = updated.find((d) => d.id === selectedDestination.id);
      if (refreshed) setSelectedDestination(refreshed);
    }
  };

  const handleSaveDocumentaries = (updated: DocumentaryFilm[]) => {
    setDocumentaries(updated);
    saveStoredDocumentaries(updated);
    if (selectedFilm) {
      const refreshed = updated.find((f) => f.id === selectedFilm.id);
      if (refreshed) setSelectedFilm(refreshed);
    }
  };

  const handleResetToDefaults = () => {
    setDestinations(DESTINATIONS_DATA);
    setDocumentaries(DOCUMENTARIES_DATA);
    saveStoredDestinations(DESTINATIONS_DATA);
    saveStoredDocumentaries(DOCUMENTARIES_DATA);
  };

  const handleOpenEditorForDestination = (destId?: string) => {
    if (destId) {
      setInitialEditTarget({ type: 'destination', id: destId });
    } else {
      setInitialEditTarget(null);
    }
    setIsEditorModalOpen(true);
  };

  const handleOpenEditorForDocumentary = (docId?: string) => {
    if (docId) {
      setInitialEditTarget({ type: 'documentary', id: docId });
    } else {
      setInitialEditTarget(null);
    }
    setIsEditorModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 flex flex-col font-sans selection:bg-amber-200 selection:text-amber-950">
      {/* Play Store Top Strip Announcement */}
      <aside aria-label="Play Store App Banner" className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-stone-200 text-xs py-2 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span className="font-semibold text-white">Google Play Store Edition:</span>
            <span className="truncate hidden sm:inline text-stone-300">
              {APP_INFO.name} — Versi Resmi Budaya 14 Daerah Kalbar
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsGalleryModalOpen(true)}
              className="text-[11px] font-semibold text-amber-300 hover:text-amber-200 flex items-center gap-1 hidden sm:flex"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Galeri Foto</span>
            </button>

            <button
              onClick={() => {
                setInitialEditTarget(null);
                setIsEditorModalOpen(true);
              }}
              className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-600/40"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit Aplikasi</span>
            </button>

            <button
              onClick={() => setIsPlayStoreModalOpen(true)}
              className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-2 flex items-center gap-1"
            >
              <span>Info Play Store</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Top Bar Navigation */}
      <TopBar
        currentTab={currentTab}
        onNavigateTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPlayStoreModal={() => setIsPlayStoreModalOpen(true)}
        onOpenSapeModal={() => setIsSapeModalOpen(true)}
        onOpenEditorModal={() => {
          setInitialEditTarget(null);
          setIsEditorModalOpen(true);
        }}
        onOpenGalleryModal={() => setIsGalleryModalOpen(true)}
        isAmbientPlaying={isAmbientPlaying}
        onToggleAmbient={handleToggleAmbient}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-20 md:pb-12">
        {currentTab === 'eksplorasi' && (
          <ExploreSection
            destinations={destinations}
            documentaries={documentaries}
            onSelectDestination={setSelectedDestination}
            onSelectFilm={setSelectedFilm}
            onNavigateTab={setCurrentTab}
            onOpenSapeModal={() => setIsSapeModalOpen(true)}
            onOpenGalleryModal={() => setIsGalleryModalOpen(true)}
            onOpenEditorModal={() => {
              setInitialEditTarget(null);
              setIsEditorModalOpen(true);
            }}
            savedDestinationIds={savedDestinationIds}
            onToggleSaveDestination={toggleSaveDestination}
            selectedRegencyFilter={destinationsRegencyFilter}
            onSelectRegencyFilter={(regId) => {
              if (regId === 'all') {
                setDestinationsRegencyFilter('all');
                setCurrentTab('destinasi');
              } else {
                handleNavigateToDestinationsWithFilter(regId);
              }
            }}
          />
        )}

        {currentTab === 'destinasi' && (
          <DestinationsView
            destinations={destinations}
            onSelectDestination={setSelectedDestination}
            savedDestinationIds={savedDestinationIds}
            onToggleSaveDestination={toggleSaveDestination}
            initialRegencyFilter={destinationsRegencyFilter}
            onOpenEditor={handleOpenEditorForDestination}
          />
        )}

        {currentTab === 'bioskop' && (
          <DocumentaryCinemaView
            documentaries={documentaries}
            onSelectFilm={setSelectedFilm}
            bookmarkedFilmIds={bookmarkedFilmIds}
            onToggleBookmarkFilm={toggleBookmarkFilm}
            onOpenEditor={handleOpenEditorForDocumentary}
          />
        )}

        {currentTab === 'peta' && (
          <CulturalMapView
            onSelectDestination={setSelectedDestination}
            onSelectFilm={setSelectedFilm}
            onNavigateToDestinationsWithFilter={handleNavigateToDestinationsWithFilter}
          />
        )}

        {currentTab === 'koleksi' && (
          <SavedItineraryView
            savedDestinationIds={savedDestinationIds}
            bookmarkedFilmIds={bookmarkedFilmIds}
            onSelectDestination={setSelectedDestination}
            onSelectFilm={setSelectedFilm}
            onRemoveDestination={toggleSaveDestination}
            onRemoveFilm={toggleBookmarkFilm}
            onNavigateTab={setCurrentTab}
          />
        )}
      </main>

      {/* Editorial Footer */}
      <footer className="bg-white border-t border-stone-200 mt-auto hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs text-stone-600">
            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-amber-700 text-white flex items-center justify-center font-serif font-bold text-xs">
                  PK
                </div>
                <span className="font-serif font-bold text-stone-900 text-sm">Pusaka Khatulistiwa</span>
              </div>
              <p className="text-stone-500 leading-relaxed max-w-md">
                Platform kurasi terpadu destinasi cagar budaya dan bioskop film dokumenter kebudayaan 14 Kabupaten & Kota di Provinsi Kalimantan Barat, Indonesia.
              </p>
              <div className="pt-1 flex items-center gap-2">
                <button
                  onClick={() => {
                    setInitialEditTarget(null);
                    setIsEditorModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-[11px] flex items-center gap-1 transition-colors"
                >
                  <Sliders className="w-3 h-3 text-amber-700" />
                  <span>Buka Studio Editor Aplikasi</span>
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold text-stone-900 block text-xs uppercase tracking-wider">Kemitraan & Produksi</span>
              <p className="text-stone-500 font-medium">Cinemax Photography Entertainment</p>
              <p className="text-stone-500">Balai Pelestarian Kebudayaan Wilayah XII</p>
              <p className="text-stone-500">Dinas Pemuda, Olahraga & Pariwisata Kalbar</p>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold text-stone-900 block text-xs uppercase tracking-wider">Akses & Versi</span>
              <p className="text-stone-500">Versi Android Play Store {APP_INFO.version}</p>
              <p className="text-stone-500">Web Progressive Web App (PWA)</p>
              <p className="text-stone-500">Fitur Editor & Audio Guide Luring</p>
            </div>
          </div>

          <div className="pt-6 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
            <span>© 2026 Pusaka Khatulistiwa · Cinemax Photography Entertainment. Seluruh hak cipta dilindungi undang-undang kebudayaan.</span>
            <span>Kalimantan Barat · Indonesia</span>
          </div>
        </div>
      </footer>

      {/* Mobile Ergonomic Bottom Tab Navigation */}
      <BottomNav
        currentTab={currentTab}
        onNavigateTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        savedCount={savedDestinationIds.length + bookmarkedFilmIds.length}
      />

      {/* Modals & Interactive Overlays */}
      <DestinationDetailModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        isSaved={selectedDestination ? savedDestinationIds.includes(selectedDestination.id) : false}
        onToggleSave={toggleSaveDestination}
        onOpenEditor={handleOpenEditorForDestination}
      />

      <DocumentaryPlayerModal
        film={selectedFilm}
        onClose={() => setSelectedFilm(null)}
        isBookmarked={selectedFilm ? bookmarkedFilmIds.includes(selectedFilm.id) : false}
        onToggleBookmark={toggleBookmarkFilm}
        onOpenEditor={handleOpenEditorForDocumentary}
      />

      <SapeInstrumentModal
        isOpen={isSapeModalOpen}
        onClose={() => setIsSapeModalOpen(false)}
      />

      <PlayStoreInfoModal
        isOpen={isPlayStoreModalOpen}
        onClose={() => setIsPlayStoreModalOpen(false)}
      />

      {/* App Editor / Studio Modal */}
      <AppEditorModal
        isOpen={isEditorModalOpen}
        onClose={() => setIsEditorModalOpen(false)}
        destinations={destinations}
        documentaries={documentaries}
        onSaveDestinations={handleSaveDestinations}
        onSaveDocumentaries={handleSaveDocumentaries}
        onResetToDefaults={handleResetToDefaults}
        initialEditTarget={initialEditTarget}
      />

      {/* Cultural Photography Gallery Modal */}
      <CulturalGalleryModal
        isOpen={isGalleryModalOpen}
        onClose={() => setIsGalleryModalOpen(false)}
      />
    </div>
  );
}
