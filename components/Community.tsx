
import React, { useState } from 'react';
import { MessageSquare, Flame, Navigation, Send, Search, Filter, Shield, X, AlertCircle, PenLine } from 'lucide-react';
import { BongsuAlert } from '../types';

const CommunityView: React.FC = () => {
  const [alerts, setAlerts] = useState<BongsuAlert[]>([
    { id: '1', user: '여수러버77', message: '진남관 근처에 주차할 곳이 마땅치 않은데 팁 있을까요?', time: '방금 전', type: 'question' },
    { id: '2', user: '바다사나이', message: '오동도 등대 가는 길에 예쁜 포토존 발견했습니다!', time: '10분 전', type: 'help' },
    { id: '3', user: '초보수군', message: '거북선 내부 입장료가 얼마인가요?', time: '25분 전', type: 'question' },
    { id: '4', user: '맛있는인생', message: '게장 골목에서 지금 대기 없는 곳 공유합니다.', time: '1시간 전', type: 'help' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [postType, setPostType] = useState<'question' | 'help'>('question');

  const handlePost = () => {
    if (!newPost.trim()) return;
    
    const post: BongsuAlert = {
      id: Date.now().toString(),
      user: '정민서',
      message: newPost,
      time: '방금 전',
      type: postType
    };

    setAlerts([post, ...alerts]);
    setNewPost("");
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Search & Stats */}
      <div className="flex gap-3">
        <div className="flex-1 bg-white border border-slate-100 px-5 py-3 rounded-[1.25rem] flex items-center gap-2 shadow-sm">
          <Search size={16} className="text-slate-400" />
          <input type="text" placeholder="봉수 소식 검색..." className="bg-transparent border-none text-xs w-full focus:outline-none placeholder:text-slate-300" />
        </div>
        <button className="bg-white border border-slate-100 p-3.5 rounded-[1.25rem] shadow-sm text-slate-400 active:bg-slate-50">
          <Filter size={18} />
        </button>
      </div>

      {/* Top Write Button Area */}
      <section className="bg-[#0F172A] rounded-[2rem] p-6 shadow-xl relative overflow-hidden group border border-[#EAB308]/20">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Flame size={64} className="text-[#EF4444]" />
        </div>
        <div className="relative">
          <h3 className="text-white font-black text-lg mb-1 flex items-center gap-2">
            새로운 봉수 발신
            <span className="w-1.5 h-1.5 bg-[#EF4444] rounded-full animate-pulse"></span>
          </h3>
          <p className="text-slate-400 text-[10px] font-bold tracking-tight mb-4 uppercase">Signal to other navy members</p>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/10 text-slate-300 text-xs font-medium py-3.5 px-5 rounded-2xl flex items-center justify-between transition-all"
          >
            <span>지금 여수의 소식을 전하세요...</span>
            <PenLine size={16} className="text-[#EAB308]" />
          </button>
        </div>
      </section>

      {/* Active Beacons Feed */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#EF4444]/10 rounded-2xl flex items-center justify-center">
              <Flame size={20} className="text-[#EF4444] animate-pulse" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-lg">실시간 봉수 피드</h3>
              <p className="text-[10px] text-slate-400 font-bold tracking-tight">여수 수군들의 생생한 첩보</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
             <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">ACTIVE</span>
             <span className="text-[10px] text-slate-400 mt-1">1,240명 접속중</span>
          </div>
        </div>
        
        <div className="space-y-4">
          {alerts.map(alert => (
            <div key={alert.id} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm animate-in slide-in-from-top-2 duration-300">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center font-black text-sm text-[#EAB308] border border-[#EAB308]/20 shadow-inner">
                    {alert.user.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-black text-slate-900">{alert.user}</span>
                      {alert.user === '정민서' && <Shield size={12} className="text-blue-500 fill-blue-500" />}
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">{alert.time}</span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm ${
                  alert.type === 'question' ? 'bg-orange-50 text-orange-600 border border-orange-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                }`}>
                  {alert.type === 'question' ? '질문' : '정보공유'}
                </div>
              </div>
              <p className="text-[13px] text-slate-700 leading-relaxed font-medium">
                {alert.message}
              </p>
              <div className="mt-5 flex gap-2">
                <button className="flex-1 bg-slate-50 text-slate-600 text-[11px] font-bold py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors border border-slate-100">
                  <MessageSquare size={14} /> 응답하기
                </button>
                <button className="flex-1 bg-[#0F172A] text-white text-[11px] font-black py-3 rounded-2xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">
                  <Navigation size={14} /> 도움주기
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Post Creation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0F172A]/80 backdrop-blur-sm z-50 flex flex-col justify-end animate-in fade-in duration-300">
          <div className="bg-white rounded-t-[3rem] p-8 pb-12 animate-in slide-in-from-bottom-20 duration-500">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-[#EF4444]">
                  <AlertCircle size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900">봉수 올리기</h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Send Signal to Navy</p>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-3 bg-slate-100 rounded-full text-slate-400 active:scale-90"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex gap-2 mb-6">
              <button 
                onClick={() => setPostType('question')}
                className={`flex-1 py-3.5 rounded-2xl text-xs font-black transition-all border ${
                  postType === 'question' 
                    ? 'bg-orange-50 border-orange-200 text-orange-600 shadow-inner' 
                    : 'bg-slate-50 border-transparent text-slate-400'
                }`}
              >
                도움 요청 (질문)
              </button>
              <button 
                onClick={() => setPostType('help')}
                className={`flex-1 py-3.5 rounded-2xl text-xs font-black transition-all border ${
                  postType === 'help' 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-600 shadow-inner' 
                    : 'bg-slate-50 border-transparent text-slate-400'
                }`}
              >
                정보 공유 (제보)
              </button>
            </div>

            <textarea 
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="여수 바다를 여행 중인 동료들에게 알릴 내용을 적어주세요..."
              className="w-full h-40 bg-slate-50 border border-slate-100 rounded-3xl p-6 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F172A]/5 resize-none placeholder:text-slate-300 font-medium"
            />

            <button 
              onClick={handlePost}
              disabled={!newPost.trim()}
              className="w-full bg-[#0F172A] text-white py-5 rounded-2xl mt-8 font-black text-base shadow-2xl active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
            >
              <Flame size={20} className="text-[#EF4444]" />
              봉수 발신하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityView;
