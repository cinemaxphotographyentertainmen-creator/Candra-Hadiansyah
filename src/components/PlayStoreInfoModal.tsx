import React, { useState } from 'react';
import { APP_INFO } from '../data/culturalData';
import { X, Star, Download, ShieldCheck, Share2, Award, CheckCircle2, ThumbsUp, Smartphone } from 'lucide-react';

interface PlayStoreInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSimulateInstall?: () => void;
}

export const PlayStoreInfoModal: React.FC<PlayStoreInfoModalProps> = ({ isOpen, onClose, onSimulateInstall }) => {
  const [installed, setInstalled] = useState(false);
  const [activeTab, setActiveTab] = useState<'tentang' | 'ulasan' | 'keamanan'>('tentang');

  if (!isOpen) return null;

  const handleInstallClick = () => {
    setInstalled(true);
    if (onSimulateInstall) onSimulateInstall();
    setTimeout(() => {
      // Installed state
    }, 1200);
  };

  const sampleReviews = [
    {
      name: 'Rudi Hartono (Budayawan Kalbar)',
      rating: 5,
      date: '22 Oktober 2026',
      content: 'Aplikasi terlengkap untuk mendokumentasikan adat 14 Kabupaten/Kota. Fitur video dokumenternya sangat jernih dan audio sape-nya sangat otentik. Bermanfaat untuk edukasi anak muda.',
      likes: 84
    },
    {
      name: 'Dr. Clara Moniaga (Peneliti Antropologi)',
      rating: 5,
      date: '18 Oktober 2026',
      content: 'Data cagar budaya Keraton Kadriah dan Rumah Baluk Sebujit sangat akurat sesuai catatan Balai Pelestarian. Panduan etika adat sebelum berkunjung sangat bijaksana.',
      likes: 62
    },
    {
      name: 'Budi Santoso (Wisatawan Domestik)',
      rating: 5,
      date: '14 Oktober 2026',
      content: 'Sangat terbantu saat road trip dari Pontianak menuju Singkawang dan Sambas. Informasi jam buka dan tiket masuk sangat akurat.',
      likes: 39
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50/80">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a2.038 2.038 0 0 1-.61-1.464V3.278c0-.573.227-1.09.61-1.464zm11.235 11.238l2.585 2.586-12.01 6.845 9.425-9.431zm0-2.104L5.42 1.517l12.01 6.845-2.586 2.586zm1.488 1.052l3.374 1.923c.928.528.928 1.385 0 1.913l-3.374 1.923-2.317-2.317 2.317-2.442z" />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-600">Google Play Store Preview</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {/* App Header Box */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-stone-100">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-700 via-amber-800 to-stone-900 shadow-md flex items-center justify-center p-3 text-amber-200 shrink-0 border border-amber-600/30">
              <span className="font-serif text-3xl font-bold tracking-tighter">PK</span>
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-stone-900 leading-snug">{APP_INFO.name}</h2>
              <p className="text-xs font-medium text-emerald-700 mt-0.5">{APP_INFO.developer}</p>
              <div className="flex items-center gap-2 text-xs text-stone-500 mt-1.5 flex-wrap">
                <span>{APP_INFO.badge}</span>
                <span aria-hidden="true">·</span>
                <span>{APP_INFO.contentRating}</span>
              </div>
            </div>

            <div className="w-full sm:w-auto">
              <button
                onClick={handleInstallClick}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                  installed
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg'
                }`}
              >
                {installed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Terpasang di Perangkat</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Pasang Aplikasi ({APP_INFO.size})</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-3 gap-2 py-4 my-2 text-center border-b border-stone-100">
            <div>
              <div className="flex items-center justify-center gap-1 text-sm font-bold text-stone-900">
                <span>{APP_INFO.rating}</span>
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              </div>
              <p className="text-[11px] text-stone-500 mt-0.5">{APP_INFO.reviewsCount}</p>
            </div>
            <div className="border-x border-stone-100">
              <div className="text-sm font-bold text-stone-900">{APP_INFO.installs}</div>
              <p className="text-[11px] text-stone-500 mt-0.5">Unduhan</p>
            </div>
            <div>
              <div className="text-sm font-bold text-stone-900">{APP_INFO.size}</div>
              <p className="text-[11px] text-stone-500 mt-0.5">Ukuran Berkas</p>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-2 pt-2 pb-4 border-b border-stone-100">
            <button
              onClick={() => setActiveTab('tentang')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'tentang' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              Tentang Aplikasi
            </button>
            <button
              onClick={() => setActiveTab('ulasan')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'ulasan' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              Ulasan Pengguna (12.4K)
            </button>
            <button
              onClick={() => setActiveTab('keamanan')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'keamanan' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              Keamanan & Privasi
            </button>
          </div>

          {/* Tab Content */}
          <div className="pt-4">
            {activeTab === 'tentang' && (
              <div className="space-y-4 text-xs text-stone-700 leading-relaxed">
                <p>
                  <strong>Pusaka Khatulistiwa</strong> adalah aplikasi resmi direktori kebudayaan terpadu dan bioskop film dokumenter resolusi tinggi untuk 14 Kabupaten dan Kota di Provinsi Kalimantan Barat.
                </p>
                <p>
                  Jelajahi keraton bersejarah Melayu di tepian sungai, kemegahan arsitektur Rumah Betang Dayak berbahan kayu belian ratusan tahun, akulturasi magis Cap Go Meh di Kota Singkawang, hingga seni kriya tenun ikat tradisional pewarna alami.
                </p>

                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/60 mt-4">
                  <h4 className="font-semibold text-amber-950 mb-2">Yang Baru di Versi {APP_INFO.version}</h4>
                  <ul className="space-y-1.5 text-stone-700">
                    {APP_INFO.whatsNew.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-700 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                    <span className="text-[11px] text-stone-400 block">Kategori</span>
                    <span className="font-semibold text-stone-900">Wisata & Budaya Nusantara</span>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                    <span className="text-[11px] text-stone-400 block">Kompatibilitas</span>
                    <span className="font-semibold text-stone-900">Android 9.0+ & Web PWA</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ulasan' && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-stone-50">
                  <div className="text-center">
                    <div className="text-3xl font-extrabold text-stone-900">4.9</div>
                    <div className="flex text-amber-500 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-500" />
                      ))}
                    </div>
                    <p className="text-[10px] text-stone-500 mt-1">12.430 ulasan</p>
                  </div>
                  <div className="flex-1 space-y-1 text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 text-stone-500">5</span>
                      <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 text-stone-500">4</span>
                      <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600 rounded-full" style={{ width: '6%' }}></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 text-stone-500">3</span>
                      <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
                        <div className="h-full bg-stone-400 rounded-full" style={{ width: '1.5%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {sampleReviews.map((rev, index) => (
                    <div key={index} className="p-3.5 rounded-xl border border-stone-100 bg-white space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-stone-900">{rev.name}</span>
                        <span className="text-[10px] text-stone-400">{rev.date}</span>
                      </div>
                      <div className="flex text-amber-500">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-500" />
                        ))}
                      </div>
                      <p className="text-xs text-stone-700">{rev.content}</p>
                      <div className="flex items-center gap-1 text-[11px] text-stone-400 pt-1">
                        <ThumbsUp className="w-3 h-3" />
                        <span>Membantu ({rev.likes})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'keamanan' && (
              <div className="space-y-3 text-xs text-stone-700">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                  <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-emerald-950">Terverifikasi Bebas Iklan & Pelacak</h5>
                    <p className="text-[11px] text-emerald-800 mt-0.5">
                      Aplikasi ini didedikasikan sepenuhnya untuk preservasi budaya tanpa iklan mengganggu, tanpa pelacakan lokasi latar belakang ilegal.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-100">
                  <Smartphone className="w-5 h-5 text-stone-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-stone-900">Dukungan Mode Luring Penuh</h5>
                    <p className="text-[11px] text-stone-600 mt-0.5">
                      Dapat menyimpan direktori dan film dokumenter untuk diputar di pedalaman Kalimantan tanpa sinyal internet seluler.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
          <span className="text-xs text-stone-500">Lisensi Kebudayaan Republik Indonesia</span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-200/50 rounded-lg transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
