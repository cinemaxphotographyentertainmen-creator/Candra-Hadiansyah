import React, { useState, useEffect, useRef } from 'react';
import { DocumentaryFilm } from '../data/culturalData';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, SkipForward, Award, Calendar, Clock, Film, MessageSquare, Star, Send, Check, Edit3 } from 'lucide-react';
import { sapeAudio } from '../utils/sapeAudio';

interface DocumentaryPlayerModalProps {
  film: DocumentaryFilm | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onOpenEditor?: (docId: string) => void;
}

export const DocumentaryPlayerModal: React.FC<DocumentaryPlayerModalProps> = ({
  film,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onOpenEditor
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(15);
  const [totalDurationSeconds] = useState(1800); // 30 minutes simulation
  const [selectedSubtitle, setSelectedSubtitle] = useState<'id' | 'en' | 'off'>('id');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [ambientLights, setAmbientLights] = useState(true);
  const [reviews, setReviews] = useState<{ id: string; user: string; text: string; rating: number; date: string }[]>([
    {
      id: '1',
      user: 'Bambang Wijanarko (Kolektor Budaya)',
      rating: 5,
      text: 'Visual sinematografi sangat megah. Sangat langka melihat dokumentasi detail proses pemahatan kayu Adau suku Dayak.',
      date: 'Kemarin'
    },
    {
      id: '2',
      user: 'Siti Aminah (Mahasiswi Pontianak)',
      rating: 5,
      text: 'Subtitlenya sangat membantu memahami dialek bahasa daerah. Musik pengiringnya bikin merinding bangga!',
      date: '3 hari lalu'
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [commentSuccess, setCommentSuccess] = useState(false);

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDurationSeconds) return 0;
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, totalDurationSeconds]);

  if (!film) return null;

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(Number(e.target.value));
  };

  const handleJumpToChapter = (seconds: number) => {
    setCurrentTime(seconds);
    setIsPlaying(true);
    sapeAudio.playSapeNote(349, 0.4);
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      sapeAudio.playSapeNote(440, 0.5);
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newRev = {
      id: Date.now().toString(),
      user: 'Sahabat Budaya Khatulistiwa',
      rating: newRating,
      text: newComment.trim(),
      date: 'Baru saja'
    };

    setReviews([newRev, ...reviews]);
    setNewComment('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 2500);
  };

  // Subtitle script simulation based on playback time
  const getActiveSubtitle = () => {
    if (selectedSubtitle === 'off') return null;
    if (selectedSubtitle === 'id') {
      if (currentTime < 120) return '“Kayu ini bukan sekadar pohon, ia adalah nafas leluhur yang kami jaga...”';
      if (currentTime < 400) return '“Setiap getaran dawai membawa doa bagi sungai dan rimba yang memberi makan anak cucu kami.”';
      if (currentTime < 900) return '“Adat adalah payung persaudaraan kita di tanah Khatulistiwa.”';
      return '“Selama sape masih berbunyi, jiwa Kalimantan takkan pernah padam.”';
    } else {
      if (currentTime < 120) return '"This wood is not just a tree, it is the living breath of our ancestors..."';
      if (currentTime < 400) return '"Every vibration of the string carries prayers for the river and forest that sustain us."';
      if (currentTime < 900) return '"Customary law is our umbrella of harmony on this Equator land."';
      return '"As long as the sape continues to sing, the soul of Borneo will never fade."';
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 transition-colors duration-500 overflow-y-auto ${
      ambientLights ? 'bg-stone-950/95' : 'bg-black'
    }`}>
      <div className="relative w-full max-w-4xl bg-stone-900 rounded-3xl shadow-2xl border border-stone-800 text-stone-100 overflow-hidden my-4">
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md transition-colors border border-white/10"
          aria-label="Tutup bioskop dokumenter"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Player Display Screen */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden group select-none">
          {/* Visual Stream / Background Image */}
          <img
            src={film.thumbnail}
            alt={film.title}
            className={`w-full h-full object-cover transition-opacity duration-700 ${
              isPlaying ? 'opacity-90 scale-100' : 'opacity-70 scale-105'
            }`}
          />

          {/* Cinematic Grain & Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none" />

          {/* Subtitle Rendering */}
          {getActiveSubtitle() && (
            <div className="absolute bottom-16 left-6 right-6 text-center pointer-events-none z-20">
              <span className="inline-block px-4 py-1.5 rounded-lg bg-black/75 backdrop-blur-sm text-amber-200 text-xs sm:text-sm font-medium tracking-wide shadow-lg border border-amber-500/20">
                {getActiveSubtitle()}
              </span>
            </div>
          )}

          {/* Center Play Indicator when paused */}
          {!isPlaying && (
            <div
              onClick={handleTogglePlay}
              className="absolute inset-0 flex items-center justify-center cursor-pointer z-20 bg-black/30"
            >
              <div className="w-16 h-16 rounded-full bg-amber-600/90 hover:bg-amber-500 text-white flex items-center justify-center shadow-xl transform transition-transform hover:scale-110">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
            </div>
          )}

          {/* Bottom Player Controls Strip */}
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black via-black/80 to-transparent z-20 space-y-2">
            {/* Scrubber Progress Bar */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-stone-400 w-12 text-right">
                {formatSeconds(currentTime)}
              </span>
              <input
                type="range"
                min="0"
                max={totalDurationSeconds}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <span className="text-[11px] font-mono text-stone-400 w-12">
                {formatSeconds(totalDurationSeconds)}
              </span>
            </div>

            {/* Controls Bar */}
            <div className="flex items-center justify-between text-stone-300">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleTogglePlay}
                  className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                  aria-label={isPlaying ? 'Jeda film' : 'Putar film'}
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
                  aria-label={isMuted ? 'Nyalakan suara' : 'Bisukan suara'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <span className="text-xs font-medium text-stone-400 hidden sm:inline-block truncate max-w-xs">
                  {film.title}
                </span>
              </div>

              {/* Right Settings */}
              <div className="flex items-center gap-2 text-xs">
                {/* Subtitle Selector */}
                <select
                  value={selectedSubtitle}
                  onChange={(e) => setSelectedSubtitle(e.target.value as 'id' | 'en' | 'off')}
                  className="bg-stone-800 text-stone-300 px-2 py-1 rounded text-xs border border-stone-700 cursor-pointer focus:outline-none"
                >
                  <option value="id">Sub: Indonesia</option>
                  <option value="en">Sub: English</option>
                  <option value="off">Sub: Tutup</option>
                </select>

                {/* Speed Selector */}
                <button
                  onClick={() => setPlaybackSpeed((s) => (s === 1.0 ? 1.25 : s === 1.25 ? 1.5 : 1.0))}
                  className="px-2 py-1 bg-stone-800 hover:bg-stone-700 rounded text-xs font-mono text-stone-300"
                >
                  {playbackSpeed}x
                </button>

                {/* Ambient Mode */}
                <button
                  onClick={() => setAmbientLights(!ambientLights)}
                  title="Mode Teater"
                  className={`px-2 py-1 rounded text-xs ${
                    ambientLights ? 'bg-amber-600/40 text-amber-300 border border-amber-500/30' : 'bg-stone-800 text-stone-400'
                  }`}
                >
                  Teater
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Documentary Details & Chapters */}
        <div className="p-6 max-h-[45vh] overflow-y-auto space-y-6">
          {/* Header Metadata */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-400">
                <span>{film.regencyName}</span>
                <span aria-hidden="true">·</span>
                <span>{film.category}</span>
                <span aria-hidden="true">·</span>
                <span>Tahun {film.releaseYear}</span>
                <span aria-hidden="true">·</span>
                <span>{film.duration}</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                {film.title}
              </h2>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
              <button
                onClick={() => onToggleBookmark(film.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 ${
                  isBookmarked
                    ? 'bg-amber-600 text-stone-950 font-bold'
                    : 'bg-stone-800 hover:bg-stone-700 text-stone-200'
                }`}
              >
                <span>{isBookmarked ? 'Tersimpan di Watchlist' : '+ Simpan ke Watchlist'}</span>
              </button>

              {onOpenEditor && (
                <button
                  onClick={() => onOpenEditor(film.id)}
                  className="px-3 py-2 rounded-xl text-xs font-semibold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 flex items-center gap-1.5 transition-colors"
                  title="Sunting data film di Studio Editor"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Film</span>
                </button>
              )}
            </div>
          </div>

          {/* Interactive Chapters List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Babak Cerita Dokumenter (Klik untuk Melompat)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {film.chapters.map((chap, idx) => (
                <button
                  key={idx}
                  onClick={() => handleJumpToChapter(chap.seconds)}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-stone-800/60 hover:bg-stone-800 text-left border border-stone-800/80 hover:border-amber-500/40 transition-all group"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-5 h-5 rounded-md bg-stone-700 group-hover:bg-amber-500/20 text-stone-300 group-hover:text-amber-400 text-[11px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-xs text-stone-300 group-hover:text-white truncate">
                      {chap.title}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-stone-500 shrink-0 ml-2">
                    {chap.timestamp}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Synopsis & Curator Note */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">Sinopsis Film</h4>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {film.synopsis}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-900/40 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
              <Award className="w-4 h-4" />
              <span>Catatan Kurator Budaya</span>
            </div>
            <p className="text-xs text-amber-100/90 leading-relaxed italic">
              "{film.curatorNotes}"
            </p>
          </div>

          {/* Credits Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-stone-800/40 text-xs">
            <div>
              <span className="text-[11px] text-stone-500 block">Sutradara</span>
              <span className="font-medium text-stone-300">{film.director}</span>
            </div>
            <div>
              <span className="text-[11px] text-stone-500 block">Rumah Produksi</span>
              <span className="font-medium text-stone-300">{film.production}</span>
            </div>
            <div>
              <span className="text-[11px] text-stone-500 block">Kelompok Adat</span>
              <span className="font-medium text-amber-300">{film.ethnicGroup}</span>
            </div>
          </div>

          {/* User Reviews & Comment Submission */}
          <div className="space-y-4 pt-2 border-t border-stone-800">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Diskusi & Apresiasi Penonton ({reviews.length})</span>
              </h4>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleAddReview} className="p-3.5 rounded-2xl bg-stone-800/60 border border-stone-700/60 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-300">Beri Nilai:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="text-stone-500 hover:text-amber-400"
                    >
                      <Star className={`w-4 h-4 ${star <= newRating ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Tulis ulasan atau kesan tentang dokumenter ini..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim</span>
                </button>
              </div>

              {commentSuccess && (
                <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>Ulasan Anda berhasil ditambahkan!</span>
                </div>
              )}
            </form>

            {/* Reviews list */}
            <div className="space-y-2.5">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-3 rounded-xl bg-stone-800/40 border border-stone-800 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-200">{rev.user}</span>
                    <span className="text-[10px] text-stone-500">{rev.date}</span>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-stone-300 text-xs">{rev.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
