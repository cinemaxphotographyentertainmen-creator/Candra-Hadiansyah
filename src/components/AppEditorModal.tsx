import React, { useState, useEffect } from 'react';
import { Destination, DocumentaryFilm, REGION_LIST, DESTINATIONS_DATA, DOCUMENTARIES_DATA } from '../data/culturalData';
import { X, Save, Plus, Trash2, RotateCcw, Check, Film, Landmark, Sliders, Smartphone, AlertCircle, ExternalLink } from 'lucide-react';

interface AppEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  destinations: Destination[];
  documentaries: DocumentaryFilm[];
  onSaveDestinations: (data: Destination[]) => void;
  onSaveDocumentaries: (data: DocumentaryFilm[]) => void;
  onResetToDefaults: () => void;
  initialEditTarget?: { type: 'destination' | 'documentary'; id: string } | null;
}

export const AppEditorModal: React.FC<AppEditorModalProps> = ({
  isOpen,
  onClose,
  destinations,
  documentaries,
  onSaveDestinations,
  onSaveDocumentaries,
  onResetToDefaults,
  initialEditTarget
}) => {
  const [activeTab, setActiveTab] = useState<'destinasi' | 'film' | 'pengaturan'>('destinasi');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Destination Form State
  const [selectedDestId, setSelectedDestId] = useState<string>(
    initialEditTarget?.type === 'destination' ? initialEditTarget.id : destinations[0]?.id || ''
  );
  const [destForm, setDestForm] = useState<Partial<Destination>>({});

  // Documentary Form State
  const [selectedDocId, setSelectedDocId] = useState<string>(
    initialEditTarget?.type === 'documentary' ? initialEditTarget.id : documentaries[0]?.id || ''
  );
  const [docForm, setDocForm] = useState<Partial<DocumentaryFilm>>({});

  useEffect(() => {
    if (initialEditTarget) {
      if (initialEditTarget.type === 'destination') {
        setActiveTab('destinasi');
        setSelectedDestId(initialEditTarget.id);
      } else {
        setActiveTab('film');
        setSelectedDocId(initialEditTarget.id);
      }
    }
  }, [initialEditTarget]);

  // Load selected destination into form
  useEffect(() => {
    if (selectedDestId === 'new') {
      setDestForm({
        id: `dest_${Date.now()}`,
        name: '',
        regencyId: 'pontianak',
        regencyName: 'Kota Pontianak',
        category: 'Rumah Adat',
        shortDesc: '',
        longDesc: '',
        history: '',
        image: '/src/assets/images/hero_radakng_borneo_1792942702543.jpg',
        admissionFee: 'Sukarela / Gratis',
        openingHours: 'Setiap Hari: 08:00 - 17:00 WIB',
        address: 'Kalimantan Barat',
        etiquette: ['Berpakaian sopan dan tertutup', 'Menghormati pemangku adat setempat'],
        audioGuideDuration: '5 Menit',
        heritageStatus: 'Warisan Budaya Daerah Kalbar',
        tags: ['Budaya', 'Kalbar'],
        coordinates: { lat: -0.0263, lng: 109.3425 },
        recommendedStay: '1 - 2 Jam',
        photographer: 'Cinemax Photography Studio'
      });
    } else {
      const found = destinations.find((d) => d.id === selectedDestId);
      if (found) {
        setDestForm({ ...found });
      }
    }
  }, [selectedDestId, destinations]);

  // Load selected documentary into form
  useEffect(() => {
    if (selectedDocId === 'new') {
      setDocForm({
        id: `doc_${Date.now()}`,
        title: '',
        regencyId: 'pontianak',
        regencyName: 'Kota Pontianak',
        category: 'Ritual & Tradisi',
        synopsis: '',
        duration: '30 Menit',
        releaseYear: 2026,
        director: 'Cinemax Documentary Team',
        production: 'Cinemax Photography Entertainment',
        thumbnail: '/src/assets/images/doc_capgomeh_singkawang_1792942703322.jpg',
        videoUrl: '',
        awards: ['Seleksi Resmi Dokumenter Kalbar 2026'],
        ethnicGroup: 'Dayak / Melayu / Tionghoa',
        chapters: [
          { title: 'Prolog & Latar Sejarah', timestamp: '00:00', seconds: 0 },
          { title: 'Ritual & Kehidupan Masyarakat', timestamp: '10:00', seconds: 600 },
          { title: 'Pesan Warisan Budaya', timestamp: '20:00', seconds: 1200 }
        ],
        subtitles: [
          { lang: 'id', label: 'Bahasa Indonesia' },
          { lang: 'en', label: 'English' }
        ],
        curatorNotes: 'Karya visual yang merekam kekayaan budaya Kalimantan Barat dengan penuh hormat.',
        rating: 4.95,
        reviewCount: 120
      });
    } else {
      const found = documentaries.find((f) => f.id === selectedDocId);
      if (found) {
        setDocForm({ ...found });
      }
    }
  }, [selectedDocId, documentaries]);

  if (!isOpen) return null;

  const triggerToast = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // Save Destination
  const handleSaveDestination = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destForm.name) return;

    const reg = REGION_LIST.find((r) => r.id === destForm.regencyId);
    const completeDest: Destination = {
      id: destForm.id || `dest_${Date.now()}`,
      name: destForm.name,
      regencyId: destForm.regencyId || 'pontianak',
      regencyName: reg ? reg.name : destForm.regencyName || 'Kota Pontianak',
      category: destForm.category || 'Rumah Adat',
      shortDesc: destForm.shortDesc || '',
      longDesc: destForm.longDesc || destForm.shortDesc || '',
      history: destForm.history || 'Catatan sejarah sedang disusun oleh tim kurator kebudayaan.',
      image: destForm.image || '/src/assets/images/hero_radakng_borneo_1792942702543.jpg',
      admissionFee: destForm.admissionFee || 'Gratis',
      openingHours: destForm.openingHours || '08:00 - 17:00 WIB',
      address: destForm.address || 'Kalimantan Barat',
      etiquette: destForm.etiquette || ['Berpakaian sopan'],
      audioGuideDuration: destForm.audioGuideDuration || '5 Menit',
      heritageStatus: destForm.heritageStatus || 'Cagar Budaya Kalbar',
      tags: destForm.tags || ['Budaya'],
      coordinates: destForm.coordinates || { lat: -0.0263, lng: 109.3425 },
      recommendedStay: destForm.recommendedStay || '1 Jam',
      photographer: destForm.photographer || 'Cinemax Photography Studio'
    };

    let updatedList: Destination[];
    if (selectedDestId === 'new') {
      updatedList = [completeDest, ...destinations];
      setSelectedDestId(completeDest.id);
    } else {
      updatedList = destinations.map((d) => (d.id === completeDest.id ? completeDest : d));
    }

    onSaveDestinations(updatedList);
    triggerToast(`Destinasi "${completeDest.name}" berhasil disimpan!`);
  };

  // Delete Destination
  const handleDeleteDestination = () => {
    if (destinations.length <= 1) {
      alert('Minimal harus ada satu destinasi di aplikasi.');
      return;
    }
    const updated = destinations.filter((d) => d.id !== selectedDestId);
    onSaveDestinations(updated);
    setSelectedDestId(updated[0]?.id || 'new');
    triggerToast('Destinasi berhasil dihapus.');
  };

  // Save Documentary
  const handleSaveDocumentary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docForm.title) return;

    const reg = REGION_LIST.find((r) => r.id === docForm.regencyId);
    const completeDoc: DocumentaryFilm = {
      id: docForm.id || `doc_${Date.now()}`,
      title: docForm.title,
      regencyId: docForm.regencyId || 'pontianak',
      regencyName: reg ? reg.name : docForm.regencyName || 'Kota Pontianak',
      category: docForm.category || 'Ritual & Tradisi',
      synopsis: docForm.synopsis || '',
      duration: docForm.duration || '30 Menit',
      releaseYear: docForm.releaseYear || 2026,
      director: docForm.director || 'Cinemax Documentary Studio',
      production: docForm.production || 'Cinemax Photography Entertainment',
      thumbnail: docForm.thumbnail || '/src/assets/images/doc_capgomeh_singkawang_1792942703322.jpg',
      videoUrl: docForm.videoUrl || '',
      awards: docForm.awards || ['Dokumenter Resmi Kalbar'],
      ethnicGroup: docForm.ethnicGroup || 'Dayak / Melayu / Tionghoa',
      chapters: docForm.chapters || [
        { title: 'Babak Pembuka', timestamp: '00:00', seconds: 0 }
      ],
      subtitles: docForm.subtitles || [
        { lang: 'id', label: 'Bahasa Indonesia' },
        { lang: 'en', label: 'English' }
      ],
      curatorNotes: docForm.curatorNotes || 'Catatan kurasi karya sinematografi.',
      rating: docForm.rating || 4.95,
      reviewCount: docForm.reviewCount || 100
    };

    let updatedList: DocumentaryFilm[];
    if (selectedDocId === 'new') {
      updatedList = [completeDoc, ...documentaries];
      setSelectedDocId(completeDoc.id);
    } else {
      updatedList = documentaries.map((f) => (f.id === completeDoc.id ? completeDoc : f));
    }

    onSaveDocumentaries(updatedList);
    triggerToast(`Film dokumenter "${completeDoc.title}" berhasil disimpan!`);
  };

  // Delete Documentary
  const handleDeleteDocumentary = () => {
    if (documentaries.length <= 1) {
      alert('Minimal harus ada satu film dokumenter di aplikasi.');
      return;
    }
    const updated = documentaries.filter((f) => f.id !== selectedDocId);
    onSaveDocumentaries(updated);
    setSelectedDocId(updated[0]?.id || 'new');
    triggerToast('Film dokumenter berhasil dihapus.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-6 flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-600 text-stone-950 flex items-center justify-center font-bold">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white leading-tight">
                Studio Kurasi & Editor Aplikasi Budaya Kalbar
              </h3>
              <p className="text-xs text-amber-300 font-medium">
                Pusaka Khatulistiwa · Cinemax Photography Entertainment
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            aria-label="Tutup editor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Ribbon */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-stone-50 border-b border-stone-200 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('destinasi')}
              className={`px-4 py-2 font-semibold rounded-xl flex items-center gap-1.5 transition-colors ${
                activeTab === 'destinasi'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:bg-stone-200/70'
              }`}
            >
              <Landmark className="w-4 h-4" />
              <span>Kelola Destinasi Budaya ({destinations.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('film')}
              className={`px-4 py-2 font-semibold rounded-xl flex items-center gap-1.5 transition-colors ${
                activeTab === 'film'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:bg-stone-200/70'
              }`}
            >
              <Film className="w-4 h-4" />
              <span>Kelola Film Dokumenter ({documentaries.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('pengaturan')}
              className={`px-4 py-2 font-semibold rounded-xl flex items-center gap-1.5 transition-colors ${
                activeTab === 'pengaturan'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:bg-stone-200/70'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Cadangan & Reset</span>
            </button>
          </div>

          {successMessage && (
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-100 px-3 py-1 rounded-lg font-medium animate-fade-in">
              <Check className="w-3.5 h-3.5 text-emerald-700" />
              <span>{successMessage}</span>
            </div>
          )}
        </div>

        {/* Editor Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* TAB 1: EDIT DESTINASI BUDAYA */}
          {activeTab === 'destinasi' && (
            <form onSubmit={handleSaveDestination} className="space-y-6">
              {/* Selector Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 bg-stone-50 rounded-2xl border border-stone-200">
                <div className="flex-1">
                  <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                    Pilih Cagar Budaya untuk Disunting:
                  </label>
                  <select
                    value={selectedDestId}
                    onChange={(e) => setSelectedDestId(e.target.value)}
                    aria-label="Pilih Cagar Budaya untuk Disunting"
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-none focus:border-amber-600"
                  >
                    {destinations.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.regencyName})
                      </option>
                    ))}
                    <option value="new">+ Tambah Destinasi Baru...</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => setSelectedDestId('new')}
                    className="px-3 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Baru</span>
                  </button>
                  {selectedDestId !== 'new' && (
                    <button
                      type="button"
                      onClick={handleDeleteDestination}
                      className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Form Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Nama Cagar Budaya / Destinasi</label>
                  <input
                    type="text"
                    required
                    value={destForm.name || ''}
                    onChange={(e) => setDestForm({ ...destForm, name: e.target.value })}
                    placeholder="Contoh: Rumah Betang Radakng Pontianak"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Kabupaten / Kota di Kalbar</label>
                  <select
                    value={destForm.regencyId || 'pontianak'}
                    onChange={(e) => {
                      const regId = e.target.value;
                      const r = REGION_LIST.find((item) => item.id === regId);
                      setDestForm({
                        ...destForm,
                        regencyId: regId,
                        regencyName: r ? r.name : 'Kota Pontianak'
                      });
                    }}
                    aria-label="Pilih Kabupaten atau Kota di Kalbar"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-medium text-stone-900 focus:bg-white focus:outline-none focus:border-amber-600"
                  >
                    {REGION_LIST.map((reg) => (
                      <option key={reg.id} value={reg.id}>
                        {reg.name} ({reg.nickname})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Kategori Budaya</label>
                  <select
                    value={destForm.category || 'Rumah Adat'}
                    onChange={(e) => setDestForm({ ...destForm, category: e.target.value as Destination['category'] })}
                    aria-label="Pilih Kategori Budaya"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-medium text-stone-900 focus:bg-white focus:outline-none focus:border-amber-600"
                  >
                    <option value="Keraton">Keraton & Kesultanan</option>
                    <option value="Rumah Adat">Rumah Adat / Betang</option>
                    <option value="Situs Bersejarah">Situs Bersejarah & Sakral</option>
                    <option value="Sentra Kriya">Sentra Kriya & Tenun</option>
                    <option value="Cagar Alam Budaya">Cagar Alam Budaya</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Status Cagar Budaya</label>
                  <input
                    type="text"
                    value={destForm.heritageStatus || ''}
                    onChange={(e) => setDestForm({ ...destForm, heritageStatus: e.target.value })}
                    placeholder="Contoh: Cagar Budaya Peringkat Nasional"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Tiket Masuk</label>
                  <input
                    type="text"
                    value={destForm.admissionFee || ''}
                    onChange={(e) => setDestForm({ ...destForm, admissionFee: e.target.value })}
                    placeholder="Contoh: Rp 10.000 / orang (Sukarela donasi)"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Jam Operasional</label>
                  <input
                    type="text"
                    value={destForm.openingHours || ''}
                    onChange={(e) => setDestForm({ ...destForm, openingHours: e.target.value })}
                    placeholder="Contoh: Setiap Hari: 08:00 - 17:00 WIB"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              {/* URL Gambar & Fotografer */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">URL Foto / Gambar Cagar Budaya</label>
                  <input
                    type="text"
                    value={destForm.image || ''}
                    onChange={(e) => setDestForm({ ...destForm, image: e.target.value })}
                    placeholder="/src/assets/images/... atau URL gambar web"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 font-mono focus:bg-white focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Kredit Fotografer</label>
                  <input
                    type="text"
                    value={destForm.photographer || 'Cinemax Photography Studio'}
                    onChange={(e) => setDestForm({ ...destForm, photographer: e.target.value })}
                    placeholder="Cinemax Photography Studio"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              {/* Textareas */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Deskripsi Ringkas (Tampil pada Kartu)</label>
                <textarea
                  rows={2}
                  value={destForm.shortDesc || ''}
                  onChange={(e) => setDestForm({ ...destForm, shortDesc: e.target.value })}
                  placeholder="Ringkasan 1-2 kalimat tentang keunikan cagar budaya ini..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Deskripsi Lengkap & Narasi Budaya</label>
                <textarea
                  rows={3}
                  value={destForm.longDesc || ''}
                  onChange={(e) => setDestForm({ ...destForm, longDesc: e.target.value })}
                  placeholder="Cerita mendalam tentang arsitektur, makna filosofis, dan nilai tradisi..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Sejarah & Asal-Usul</label>
                <textarea
                  rows={2}
                  value={destForm.history || ''}
                  onChange={(e) => setDestForm({ ...destForm, history: e.target.value })}
                  placeholder="Tahun pendirian, tokoh pendiri (raja/temenggung), dan peristiwa bersejarah..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-amber-600"
                />
              </div>

              {/* Alamat & Audio Guide Duration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Alamat Lengkap</label>
                  <input
                    type="text"
                    value={destForm.address || ''}
                    onChange={(e) => setDestForm({ ...destForm, address: e.target.value })}
                    placeholder="Jl. ..., Kelurahan ..., Kecamatan ..., Kabupaten ..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Durasi Audio Guide Pemandu</label>
                  <input
                    type="text"
                    value={destForm.audioGuideDuration || ''}
                    onChange={(e) => setDestForm({ ...destForm, audioGuideDuration: e.target.value })}
                    placeholder="Contoh: 6 Menit 30 Detik"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              {/* Save Button Strip */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <span className="text-xs text-stone-500">
                  Perubahan akan langsung diperbarui di tampilan aplikasi dan tersimpan permanen.
                </span>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
                >
                  <Save className="w-4 h-4 text-amber-400" />
                  <span>Simpan Perubahan Destinasi</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: EDIT FILM DOKUMENTER */}
          {activeTab === 'film' && (
            <form onSubmit={handleSaveDocumentary} className="space-y-6">
              {/* Selector Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 bg-stone-50 rounded-2xl border border-stone-200">
                <div className="flex-1">
                  <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                    Pilih Film Dokumenter untuk Disunting:
                  </label>
                  <select
                    value={selectedDocId}
                    onChange={(e) => setSelectedDocId(e.target.value)}
                    aria-label="Pilih Film Dokumenter untuk Disunting"
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-none focus:border-amber-600"
                  >
                    {documentaries.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.title} ({f.duration})
                      </option>
                    ))}
                    <option value="new">+ Tambah Film Baru...</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => setSelectedDocId('new')}
                    className="px-3 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Film Baru</span>
                  </button>
                  {selectedDocId !== 'new' && (
                    <button
                      type="button"
                      onClick={handleDeleteDocumentary}
                      className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Form Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Judul Film Dokumenter</label>
                  <input
                    type="text"
                    required
                    value={docForm.title || ''}
                    onChange={(e) => setDocForm({ ...docForm, title: e.target.value })}
                    placeholder="Contoh: Melodi Senyap Dawai Sape'"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Genre / Kategori Sinema</label>
                  <select
                    value={docForm.category || 'Ritual & Tradisi'}
                    onChange={(e) => setDocForm({ ...docForm, category: e.target.value as DocumentaryFilm['category'] })}
                    aria-label="Pilih Genre atau Kategori Sinema"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-medium text-stone-900 focus:bg-white focus:outline-none focus:border-amber-600"
                  >
                    <option value="Ritual & Tradisi">Ritual & Tradisi</option>
                    <option value="Seni Musik & Tari">Seni Musik & Sape'</option>
                    <option value="Kriya & Tenun">Kriya & Tenun Ikat</option>
                    <option value="Arsitektur Leluhur">Arsitektur Rumah Panjang</option>
                    <option value="Sejarah Maritim">Sejarah Keraton & Sungai</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Sutradara</label>
                  <input
                    type="text"
                    value={docForm.director || ''}
                    onChange={(e) => setDocForm({ ...docForm, director: e.target.value })}
                    placeholder="Nama sutradara..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Rumah Produksi / Studio</label>
                  <input
                    type="text"
                    value={docForm.production || 'Cinemax Photography Entertainment'}
                    onChange={(e) => setDocForm({ ...docForm, production: e.target.value })}
                    placeholder="Cinemax Photography Entertainment"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Durasi Film</label>
                  <input
                    type="text"
                    value={docForm.duration || ''}
                    onChange={(e) => setDocForm({ ...docForm, duration: e.target.value })}
                    placeholder="Contoh: 42 Menit"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Kelompok Etnis & Adat</label>
                  <input
                    type="text"
                    value={docForm.ethnicGroup || ''}
                    onChange={(e) => setDocForm({ ...docForm, ethnicGroup: e.target.value })}
                    placeholder="Contoh: Dayak Kenyah & Kayan"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              {/* URL Poster & Custom Video Embed Link */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">URL Gambar Poster / Thumbnail</label>
                  <input
                    type="text"
                    value={docForm.thumbnail || ''}
                    onChange={(e) => setDocForm({ ...docForm, thumbnail: e.target.value })}
                    placeholder="/src/assets/images/... atau URL gambar"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 font-mono focus:bg-white focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 flex items-center justify-between">
                    <span>Tautan Video / Trailer (YouTube / Web)</span>
                    <span className="text-[10px] text-amber-700 font-normal">Opsional (Dapat kosong)</span>
                  </label>
                  <input
                    type="text"
                    value={docForm.videoUrl || ''}
                    onChange={(e) => setDocForm({ ...docForm, videoUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=... atau tautan video"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 font-mono focus:bg-white focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              {/* Sinopsis & Catatan Kurator */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Sinopsis Film Dokumenter</label>
                <textarea
                  rows={3}
                  value={docForm.synopsis || ''}
                  onChange={(e) => setDocForm({ ...docForm, synopsis: e.target.value })}
                  placeholder="Sinopsis mendalam tentang alur cerita dokumenter..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Catatan Kurator Sinema</label>
                <textarea
                  rows={2}
                  value={docForm.curatorNotes || ''}
                  onChange={(e) => setDocForm({ ...docForm, curatorNotes: e.target.value })}
                  placeholder="Catatan dari dewan juri/kurator mengenai nilai kultural..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-amber-600"
                />
              </div>

              {/* Save Button Strip */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <span className="text-xs text-stone-500">
                  Data film akan langsung diperbarui di bioskop sinema aplikasi.
                </span>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
                >
                  <Save className="w-4 h-4 text-amber-400" />
                  <span>Simpan Perubahan Film</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: PENGATURAN & CADANGAN */}
          {activeTab === 'pengaturan' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                <h4 className="font-serif font-bold text-amber-950 text-sm">
                  Pengaturan Data Aplikasi & Cadangan
                </h4>
                <p className="text-xs text-amber-900 leading-relaxed">
                  Semua suntingan yang Anda buat disimpan secara persisten di peramban (LocalStorage). Anda dapat mengembalikan data ke kondisi awal pabrik atau menyalin data JSON.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-stone-200 bg-white space-y-3">
                  <h5 className="font-bold text-xs text-stone-900">Kembalikan ke Data Bawaan</h5>
                  <p className="text-xs text-stone-500">
                    Menghapus seluruh suntingan pribadi dan mereset katalog destinasi dan film dokumenter ke data standar resmi 14 Kabupaten/Kota.
                  </p>
                  <button
                    onClick={() => {
                      if (confirm('Apakah Anda yakin ingin mereset semua data aplikasi ke bawaan pabrik?')) {
                        onResetToDefaults();
                        triggerToast('Aplikasi berhasil direset ke data awal.');
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset ke Data Asli Bawaan</span>
                  </button>
                </div>

                <div className="p-4 rounded-2xl border border-stone-200 bg-white space-y-3">
                  <h5 className="font-bold text-xs text-stone-900">Salin Cadangan JSON</h5>
                  <p className="text-xs text-stone-500">
                    Salin seluruh data destinasi ({destinations.length}) dan film dokumenter ({documentaries.length}) dalam format teks JSON.
                  </p>
                  <button
                    onClick={() => {
                      const payload = JSON.stringify({ destinations, documentaries }, null, 2);
                      navigator.clipboard?.writeText(payload);
                      triggerToast('Data JSON berhasil disalin ke clipboard!');
                    }}
                    className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>Salin Data Lengkap (JSON)</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <span>Cinemax Photography Entertainment Studio Editor</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold"
          >
            Tutup Editor
          </button>
        </div>
      </div>
    </div>
  );
};
