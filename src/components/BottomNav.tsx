import React from 'react';
import { Compass, Landmark, Film, Map, Bookmark } from 'lucide-react';

interface BottomNavProps {
  currentTab: 'eksplorasi' | 'destinasi' | 'bioskop' | 'peta' | 'koleksi';
  onNavigateTab: (tab: 'eksplorasi' | 'destinasi' | 'bioskop' | 'peta' | 'koleksi') => void;
  savedCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onNavigateTab, savedCount }) => {
  const tabs = [
    { id: 'eksplorasi' as const, label: 'Eksplorasi', icon: Compass },
    { id: 'destinasi' as const, label: 'Destinasi', icon: Landmark },
    { id: 'bioskop' as const, label: 'Bioskop', icon: Film },
    { id: 'peta' as const, label: 'Peta Kalbar', icon: Map },
    { id: 'koleksi' as const, label: 'Koleksi', icon: Bookmark, badge: savedCount },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 md:hidden">
      <div className="grid grid-cols-5 items-center h-16 max-w-lg mx-auto px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigateTab(tab.id)}
              className="min-h-[44px] min-w-[44px] flex flex-col items-center justify-center relative py-1 text-center group"
              aria-label={tab.label}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-amber-800' : 'text-stone-400 group-hover:text-stone-600'
                  }`}
                />
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-2 bg-amber-700 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-medium tracking-tight mt-1 transition-colors ${
                  isActive ? 'text-amber-900 font-bold' : 'text-stone-500'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-amber-800 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
