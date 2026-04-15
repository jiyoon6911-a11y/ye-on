
import React, { useState, useEffect } from 'react';
import { Wind, Navigation, Flame, ShieldCheck, Coins, ArrowRight, MessageCircle } from 'lucide-react';
import { User } from '../types';

interface WatchViewProps {
  user: User;
  onClose: () => void;
}

const WatchView: React.FC<WatchViewProps> = ({ user, onClose }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="relative">
      {/* Hardware Frame (Apple Watch Ultra Style) */}
      <div className="w-[280px] h-[340px] bg-[#2d2e30] rounded-[60px] p-2 shadow-[0_0_80px_rgba(0,0,0,0.5)] border-[4px] border-[#3f4042] relative scale-110">
        {/* Screen Bezel */}
        <div className="w-full h-full bg-black rounded-[52px] border-[2px] border-slate-800 overflow-hidden relative">
          
          {/* Watch Status Bar */}
          <div className="absolute top-3 left-0 right-0 px-8 flex justify-between items-center z-20">
            <span className="text-[11px] font-black text-white">{formatTime(time)}</span>
            <div className="flex gap-1 items-center">
              <div className="w-1.5 h-1.5 bg-[#EF4444] rounded-full animate-pulse"></div>
              <Wind size={10} className="text-[#EAB308]" />
            </div>
          </div>

          {/* Watch Content - Optimized to fit in one screen */}
          <div className="h-full w-full flex flex-col pt-10 pb-4 px-5 space-y-2 overflow-hidden">
            
            {/* 1. Glace Hopae (Compact) */}
            <div className="bg-gradient-to-br from-[#1e1b4b] to-black p-3 rounded-[24px] border border-white/10 shadow-lg">
              <div className="flex items-center gap-1.5 mb-0.5">
                <ShieldCheck size={12} className="text-[#EAB308]" />
                <span className="text-[9px] font-black text-[#EAB308] tracking-tighter">명예수군</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-white font-bold text-base leading-tight">{user.name}</p>
                <div className="flex items-center gap-1">
                  <Coins size={9} className="text-slate-400" />
                  <span className="text-[10px] font-bold text-slate-300">{user.points} 냥</span>
                </div>
              </div>
            </div>

            {/* 2. Quick Navigation Mission (Compact) */}
            <div className="bg-[#0F172A] p-3 rounded-[24px] border border-white/5 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-[#EF4444] rounded-lg flex items-center justify-center shadow-lg">
                  <Navigation size={14} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-bold text-slate-400 uppercase leading-none mb-0.5">Target</p>
                  <p className="text-white text-[10px] font-bold truncate">진남관 (120m)</p>
                </div>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#EAB308] w-3/4 rounded-full"></div>
              </div>
            </div>

            {/* 3. Action Buttons (Grid) */}
            <div className="grid grid-cols-2 gap-2">
              <button className="bg-[#EF4444] h-16 rounded-[24px] flex flex-col items-center justify-center gap-1 active:scale-95 transition-all shadow-lg">
                <Flame size={18} className="text-white" />
                <span className="text-[9px] font-black text-white">봉수 발신</span>
              </button>
              <button className="bg-white/10 h-16 rounded-[24px] flex flex-col items-center justify-center gap-1 active:scale-95 transition-all border border-white/5">
                <MessageCircle size={18} className="text-white" />
                <span className="text-[9px] font-black text-white">메시지</span>
              </button>
            </div>

            {/* 4. Mini Status Bar (Bottom) */}
            <div className="bg-emerald-500/10 p-3 rounded-[20px] border border-emerald-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <ShieldCheck size={12} className="text-emerald-500" />
                </div>
                <span className="text-[9px] font-bold text-emerald-500">전라좌수영 승천 중</span>
              </div>
              <ArrowRight size={10} className="text-emerald-500 opacity-50" />
            </div>

          </div>
        </div>

        {/* Digital Crown */}
        <div className="absolute top-[80px] right-[-10px] w-[14px] h-[54px] bg-[#3f4042] rounded-r-lg border-y border-r border-[#555] shadow-lg">
          <div className="w-full h-full" style={{backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 4px, rgba(0,0,0,0.2) 4px, rgba(0,0,0,0.2) 5px)'}}></div>
        </div>
        
        {/* Side Button */}
        <div className="absolute top-[160px] right-[-6px] w-[8px] h-[70px] bg-[#3f4042] rounded-r-md border-y border-r border-[#555] shadow-md"></div>

        {/* Action Button (Orange) */}
        <div className="absolute top-[110px] left-[-6px] w-[8px] h-[50px] bg-[#f85b1c] rounded-l-md border-y border-l border-[#d44810] shadow-md shadow-[#f85b1c]/20"></div>
      </div>
    </div>
  );
};

export default WatchView;
