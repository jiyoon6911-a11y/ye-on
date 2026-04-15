
import React, { useState } from 'react';
import { Home as HomeIcon, Map as MapIcon, BookOpen, Users, Watch, Bell, X, Smartphone } from 'lucide-react';
import HomeView from './components/Home';
import MapView from './components/MapAR';
import DiaryView from './components/Diary';
import CommunityView from './components/Community';
import WatchView from './components/WatchView';
import { TabType, User } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [viewMode, setViewMode] = useState<'mobile' | 'watch'>('mobile');
  
  const currentUser: User = {
    name: "정민서",
    rank: "명예수군",
    affiliation: "여수 전라좌수영",
    points: 1592,
    completedMissions: 12
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <HomeView user={currentUser} onToggleWatch={() => setViewMode('watch')} />;
      case 'map': return <MapView />;
      case 'diary': return <DiaryView />;
      case 'community': return <CommunityView />;
      default: return <HomeView user={currentUser} onToggleWatch={() => setViewMode('watch')} />;
    }
  };

  if (viewMode === 'watch') {
    return (
      <div className="flex flex-col h-screen w-full items-center justify-center bg-slate-900 p-4 animate-in fade-in duration-700">
        <WatchView user={currentUser} onClose={() => setViewMode('mobile')} />
        
        {/* Helper to go back */}
        <button 
          onClick={() => setViewMode('mobile')}
          className="mt-12 flex items-center gap-2 text-slate-400 text-sm hover:text-white transition-colors"
        >
          <Smartphone size={18} />
          <span>모바일 화면으로 돌아가기</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen max-w-[480px] mx-auto bg-slate-50 overflow-hidden shadow-2xl relative border-x border-slate-200 animate-in fade-in duration-500">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center bg-white border-b border-slate-100 z-10">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold tracking-tight text-[#0F172A]">
            YE<span className="text-[#EF4444]">:</span>ON
          </h1>
        </div>
        <button className="p-2 bg-slate-100 rounded-full relative">
          <Bell size={20} className="text-slate-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="h-20 bg-white border-t border-slate-100 flex items-center justify-around px-2 z-20 pb-safe">
        <NavButton 
          active={activeTab === 'home'} 
          onClick={() => setActiveTab('home')} 
          icon={<HomeIcon size={24} />} 
          label="홈" 
        />
        <NavButton 
          active={activeTab === 'map'} 
          onClick={() => setActiveTab('map')} 
          icon={<MapIcon size={24} />} 
          label="AR연" 
        />
        <NavButton 
          active={activeTab === 'diary'} 
          onClick={() => setActiveTab('diary')} 
          icon={<BookOpen size={24} />} 
          label="기록관" 
        />
        <NavButton 
          active={activeTab === 'community'} 
          onClick={() => setActiveTab('community')} 
          icon={<Users size={24} />} 
          label="봉수대" 
        />
      </nav>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-1 w-16 transition-all duration-300 ${
      active ? 'text-[#0F172A]' : 'text-slate-400'
    }`}
  >
    <div className={`p-1 rounded-xl transition-all duration-300 ${active ? 'bg-slate-100 scale-110' : ''}`}>
      {icon}
    </div>
    <span className={`text-[10px] font-medium ${active ? 'opacity-100' : 'opacity-80'}`}>{label}</span>
  </button>
);

export default App;
