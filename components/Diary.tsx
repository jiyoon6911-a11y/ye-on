
import React from 'react';
import { Sparkles, Calendar, MapPin, Quote, ShieldCheck, Award } from 'lucide-react';
import { Badge } from '../types';

const DiaryView: React.FC = () => {
  const badges: Badge[] = [
    { id: '1', name: '여수 첫발', icon: '⚓', date: '2026.10.10' },
    { id: '2', name: '쑥라떼 중독', icon: '🍵', date: '2026.10.11' },
    { id: '3', name: '역사 지킴이', icon: '🏯', date: '2026.10.12' },
    { id: '4', name: '야경 마스터', icon: '🌃', date: '2026.10.12' },
  ];

  return (
    <div className="p-6 flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* AI Nanjung-ilgi Summary */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={18} className="text-[#EAB308]" />
          <h3 className="font-bold text-slate-900">오늘의 AI 난중일기</h3>
        </div>
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Quote size={80} />
          </div>
          <div className="relative">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-3">
              <Calendar size={12} />
              <span>병인년 시월 열이렛날, 날씨 쾌청</span>
            </div>
            <p className="text-slate-700 leading-relaxed text-sm italic font-serif">
              "오동도에서 붉은 동백꽃이 피어나는 것을 보았으니, 그 빛깔이 마치 아군의 승리를 알리는 봉수와 같았다. 진남관의 높은 누각에 올라 바다를 바라보며 지난 날의 역사를 되새기니 참으로 보람찬 하루였도다."
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs">AI</div>
              <span className="text-[10px] text-slate-400">여수 디지털 비서가 정리한 오늘의 소회</span>
            </div>
          </div>
        </div>
      </section>

      {/* NFT Badge Grid */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Award size={18} className="text-[#EF4444]" />
            <h3 className="font-bold text-slate-900">획득한 NFT 휘장</h3>
          </div>
          <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-bold text-slate-500">Total 4</span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {badges.map(badge => (
            <div key={badge.id} className="flex flex-col items-center gap-2">
              <div className="aspect-square w-full bg-[#0F172A] rounded-2xl flex items-center justify-center text-2xl shadow-lg border-2 border-[#EAB308]/30 relative group overflow-hidden">
                {badge.icon}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-active:opacity-100 transition-opacity"></div>
              </div>
              <span className="text-[10px] font-bold text-slate-700">{badge.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Activity Timeline */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck size={18} className="text-[#0F172A]" />
          <h3 className="font-bold text-slate-900">활동 기록</h3>
        </div>
        <div className="space-y-6 relative ml-4">
          <div className="absolute top-0 bottom-0 left-[-1.5px] w-[3px] bg-slate-100"></div>
          
          <TimelineItem 
            time="15:20" 
            title="진남관 미션 완료" 
            location="진남관 전라좌수영" 
            reward="+300냥"
            isLast={false}
          />
          <TimelineItem 
            time="14:10" 
            title="여수당 보급소 방문" 
            location="이순신광장 인근" 
            reward="+50냥"
            isLast={false}
          />
          <TimelineItem 
            time="11:45" 
            title="오동도 탐사 시작" 
            location="오동도 입구" 
            reward="+100냥"
            isLast={true}
          />
        </div>
      </section>
    </div>
  );
};

interface TimelineItemProps {
  time: string;
  title: string;
  location: string;
  reward: string;
  isLast: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ time, title, location, reward, isLast }) => (
  <div className="relative pl-8 flex flex-col gap-1">
    <div className="absolute left-[-6px] top-1.5 w-3 h-3 bg-[#0F172A] rounded-full border-2 border-white shadow-sm z-10"></div>
    <div className="flex justify-between items-center">
      <span className="text-[10px] font-bold text-[#EF4444]">{time}</span>
      <span className="text-[10px] font-black text-blue-600">{reward}</span>
    </div>
    <h4 className="text-sm font-bold text-slate-900">{title}</h4>
    <p className="text-[10px] text-slate-500 flex items-center gap-1">
      <MapPin size={10} /> {location}
    </p>
  </div>
);

export default DiaryView;
