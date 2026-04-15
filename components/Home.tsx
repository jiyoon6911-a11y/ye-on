
import React from 'react';
import { QrCode, Watch, Trophy, Coins, ShieldCheck, ChevronRight } from 'lucide-react';
import { User } from '../types';

interface HomeProps {
  user: User;
  onToggleWatch?: () => void;
}

const HomeView: React.FC<HomeProps> = ({ user, onToggleWatch }) => {
  return (
    <div className="p-6 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Title & Welcome */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">충무공의 후예여,</h2>
        <p className="text-slate-500 text-sm">여수 바다의 평화를 지키는 디지털 수군이 되신걸 환영합니다.</p>
      </div>

      {/* Digital Hopae Card */}
      <div className="relative aspect-[1.6/1] w-full bg-[#3d2b1f] rounded-2xl p-6 shadow-2xl overflow-hidden group">
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
          style={{backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.5) 10px, rgba(0,0,0,0.5) 11px)`}}>
        </div>
        <div className="absolute inset-2 border-2 border-[#EAB308]/30 rounded-xl pointer-events-none"></div>
        <div className="relative h-full flex flex-col justify-between text-[#EAB308]">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-widest uppercase opacity-70">디지털 전라좌수영</span>
              <h3 className="text-2xl font-bold mt-1 text-white">{user.name}</h3>
              <div className="mt-2 flex items-center gap-1.5 bg-[#EAB308] text-[#3d2b1f] px-2 py-0.5 rounded text-[10px] font-black">
                <ShieldCheck size={12} />
                {user.rank}
              </div>
            </div>
            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm border border-white/20">
              <QrCode size={48} className="text-white opacity-90" />
            </div>
          </div>
          <div className="flex justify-between items-end border-t border-[#EAB308]/20 pt-4 mt-2">
            <div>
              <p className="text-[10px] opacity-70">AFFILIATION</p>
              <p className="text-xs font-bold text-white">{user.affiliation}</p>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-[10px] opacity-70">EXPIRY</p>
              <p className="text-xs font-bold text-white">2026.12.31</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-2">
          <div className="flex items-center gap-2 text-slate-500">
            <Coins size={16} className="text-yellow-500" />
            <span className="text-xs font-medium">군량미(Point)</span>
          </div>
          <p className="text-xl font-bold text-slate-900">{user.points.toLocaleString()} 냥</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-2">
          <div className="flex items-center gap-2 text-slate-500">
            <Trophy size={16} className="text-red-500" />
            <span className="text-xs font-medium">수행 미션</span>
          </div>
          <p className="text-xl font-bold text-slate-900">{user.completedMissions} 건</p>
        </div>
      </div>

      {/* Watch Sync Button - Now Interactive */}
      <button 
        onClick={onToggleWatch}
        className="w-full bg-[#0F172A] text-white p-5 rounded-2xl flex items-center justify-between shadow-lg active:scale-[0.98] transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center animate-pulse group-hover:bg-[#EF4444] transition-colors">
            <Watch size={20} />
          </div>
          <div className="text-left">
            <p className="text-sm font-bold">워치 인터페이스 전환</p>
            <p className="text-[10px] text-slate-400">손목 위에서 미션 수행하기</p>
          </div>
        </div>
        <div className="bg-[#EF4444] text-white text-[10px] font-black px-2 py-1 rounded">GO WATCH</div>
      </button>

      {/* Active Mission Quick View */}
      <div className="mt-2">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-bold text-slate-900">현재 수행 중인 명</h4>
          <span className="text-xs text-blue-600 font-bold">전체보기</span>
        </div>
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
            <img src="https://picsum.photos/seed/yeosu/100/100" className="w-10 h-10 rounded-lg object-cover" alt="Mission" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-blue-600 font-bold">진행중</p>
            <p className="font-bold text-slate-900">여수당 쑥라떼 맛보기</p>
            <p className="text-[10px] text-slate-500 mt-0.5">이순신광장 주변 • 15:00 마감</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
