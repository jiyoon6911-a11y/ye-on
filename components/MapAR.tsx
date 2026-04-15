
import React, { useState, useEffect, useRef } from 'react';
import { Camera, MapPin, X, Info, Navigation, Wind, Loader2, Sparkles, Trophy, Play } from 'lucide-react';

const MapView: React.FC = () => {
  const [selectedMission, setSelectedMission] = useState<any>(null);
  const [arMode, setArMode] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isLoadingCamera, setIsLoadingCamera] = useState(false);
  const [isKiteCaught, setIsKiteCaught] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const missions = [
    { id: '1', title: '진남관의 위용', location: '진남관', coords: { x: 30, y: 35 }, reward: '300냥', type: 'History' },
    { id: '2', title: '쑥라떼 보급작전', location: '여수당', coords: { x: 55, y: 50 }, reward: '100냥', type: 'Food' },
    { id: '3', title: '동백의 섬 탐사', location: '오동도', coords: { x: 80, y: 70 }, reward: '500냥', type: 'Exploration' },
  ];

  useEffect(() => {
    if (arMode && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(err => console.error("Video play failed:", err));
    }
  }, [arMode, stream]);

  const startCamera = async () => {
    setIsLoadingCamera(true);
    setIsKiteCaught(false);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false
      });
      setStream(mediaStream);
      setArMode(true);
    } catch (err) {
      console.error("Camera access denied:", err);
      alert("카메라 권한이 필요합니다. 브라우저 설정을 확인해주세요.");
    } finally {
      setIsLoadingCamera(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setArMode(false);
  };

  const handleCatchKite = () => {
    if (isKiteCaught) return;
    setIsKiteCaught(true);
    if (navigator.vibrate) navigator.vibrate(100);
  };

  if (arMode) {
    return (
      <div className="absolute inset-0 bg-black z-50 flex flex-col animate-in zoom-in-95 duration-300 overflow-hidden">
        {/* Real Camera Feed */}
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        </div>

        {/* AR Overlay UI */}
        <div className="relative flex-1 flex flex-col pointer-events-none">
          {/* Top Info Bar */}
          <div className="absolute top-8 left-0 right-0 px-6 flex justify-between items-center pointer-events-auto">
             <button 
               onClick={stopCamera}
               className="p-4 bg-[#0F172A]/80 backdrop-blur-md rounded-full text-white border border-white/10 shadow-xl active:scale-90 transition-all"
             >
               <X size={24} />
             </button>
             <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl text-white border border-white/20 flex items-center gap-2">
               <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
               <span className="text-[10px] font-black uppercase tracking-[0.2em]">AR 전술 스캔 중</span>
             </div>
          </div>

          {/* Interaction Area */}
          <div className="absolute inset-0 flex items-center justify-center">
            {!isKiteCaught ? (
              <div 
                onClick={handleCatchKite}
                className="group relative pointer-events-auto cursor-pointer animate-[float_4s_ease-in-out_infinite]"
              >
                <div className="absolute -inset-16 border border-[#EAB308]/20 rounded-full animate-ping pointer-events-none"></div>
                <div className="absolute -inset-8 border-2 border-[#EAB308]/40 rounded-full pointer-events-none"></div>
                
                <div className="w-32 h-32 bg-white/20 backdrop-blur-xl rounded-3xl flex flex-col items-center justify-center border-2 border-[#EAB308] shadow-[0_0_50px_rgba(234,179,8,0.3)] transform rotate-12 transition-transform active:scale-75">
                  <Wind className="text-[#EAB308] drop-shadow-lg" size={56} />
                  <div className="absolute -bottom-2 bg-[#EAB308] text-[#0F172A] text-[9px] font-black px-2 py-0.5 rounded shadow-lg whitespace-nowrap">
                    신호연 포착! 탭하여 획득
                  </div>
                </div>

                <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                  <div className="w-full h-1 bg-[#EAB308] opacity-50 absolute animate-[scan_2s_linear_infinite]"></div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 animate-in zoom-in duration-500">
                <div className="w-32 h-32 bg-[#EAB308] rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(234,179,8,0.6)] animate-bounce">
                  <Trophy size={64} className="text-[#0F172A]" />
                </div>
                <div className="bg-[#0F172A] px-6 py-2 rounded-2xl border border-[#EAB308]/30 shadow-2xl">
                  <h3 className="text-[#EAB308] font-black text-xl">미션 성공!</h3>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Guidance Area */}
          <div className="absolute bottom-10 left-0 right-0 px-6 pointer-events-auto">
            {!isKiteCaught ? (
              <div className="bg-[#0F172A]/90 backdrop-blur-xl border border-white/10 p-6 rounded-[2.5rem] w-full shadow-2xl flex flex-col items-center">
                <p className="text-white font-bold text-center mb-1">화면 중앙의 연을 터치하세요!</p>
                <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">좌수영의 비밀 정보를 획득하십시오</p>
              </div>
            ) : (
              <div className="bg-[#0F172A]/90 backdrop-blur-xl border border-[#EAB308]/20 p-6 rounded-[2.5rem] w-full shadow-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg transform">
                    <Sparkles size={28} className="text-[#0F172A]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-bold text-lg">보급품 획득 완료</h4>
                    <p className="text-emerald-400 text-[10px] font-black tracking-wide">+{selectedMission?.reward || '300냥'}이 정민서 님의 호패에 충전되었습니다.</p>
                  </div>
                </div>
                <button 
                  onClick={stopCamera}
                  className="w-full bg-white text-[#0F172A] py-4 rounded-2xl text-sm font-black shadow-xl active:scale-95 transition-all"
                >
                  기지(지도)로 복귀하기
                </button>
              </div>
            )}
          </div>
        </div>
        
        <style>{`
          @keyframes scan {
            0% { top: 0%; opacity: 0; }
            50% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
          @keyframes float {
            0%, 100% { transform: translate(0, 0) rotate(12deg); }
            25% { transform: translate(10px, -15px) rotate(10deg); }
            50% { transform: translate(-5px, 10px) rotate(15deg); }
            75% { transform: translate(-10px, -5px) rotate(11deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="h-full relative overflow-hidden flex flex-col">
      <div className="flex-1 relative bg-slate-200">
        {/* Simplified Map UI without top persistent button */}
        <div className="absolute inset-0 opacity-40" style={{backgroundImage: `radial-gradient(#0F172A 1px, transparent 1px)`, backgroundSize: '20px 20px'}}></div>
        
        {/* Mission Markers */}
        {missions.map(mission => (
          <button
            key={mission.id}
            onClick={() => setSelectedMission(mission)}
            className="absolute p-2 transition-transform active:scale-90"
            style={{ left: `${mission.coords.x}%`, top: `${mission.coords.y}%` }}
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-[#EF4444]/20 rounded-full animate-ping"></div>
              <div className="w-12 h-12 bg-white rounded-xl shadow-xl flex items-center justify-center border-2 border-[#0F172A]">
                <Wind className="text-[#0F172A]" size={24} />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#EF4444] rounded-full border-2 border-white"></div>
            </div>
            <span className="absolute top-14 left-1/2 -translate-x-1/2 bg-[#0F172A] text-white text-[8px] px-2 py-0.5 rounded-full whitespace-nowrap font-bold">
              {mission.location}
            </span>
          </button>
        ))}

        {selectedMission && (
          <div className="absolute bottom-8 left-6 right-6 bg-white rounded-[2.5rem] shadow-2xl p-7 animate-in slide-in-from-bottom-8 duration-300 z-20 border border-slate-100">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                Mission: {selectedMission.type}
              </div>
              <button onClick={() => setSelectedMission(null)} className="p-1.5 bg-slate-100 rounded-full text-slate-400">
                <X size={16} />
              </button>
            </div>
            <h3 className="text-2xl font-black text-[#0F172A] leading-tight">{selectedMission.title}</h3>
            <p className="text-slate-500 text-xs mt-2 flex items-center gap-1">
              <MapPin size={12} className="text-red-500" /> {selectedMission.location} 부근에 신호연이 나타났습니다.
            </p>
            
            <div className="mt-8 flex gap-3">
              <button 
                onClick={startCamera}
                disabled={isLoadingCamera}
                className="flex-1 bg-[#0F172A] text-white py-4 rounded-2xl font-black text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {isLoadingCamera ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} fill="currentColor" />}
                미션지에서 AR 연 잡기
              </button>
            </div>
            <p className="text-center mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">성공 시 보상: {selectedMission.reward}</p>
          </div>
        )}

        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
           <button className="w-12 h-12 bg-white shadow-xl rounded-2xl flex items-center justify-center text-[#0F172A] border border-slate-100 active:bg-slate-50">
             <Navigation size={20} />
           </button>
           <button className="w-12 h-12 bg-white shadow-xl rounded-2xl flex items-center justify-center text-[#0F172A] border border-slate-100 active:bg-slate-50">
             <Info size={20} />
           </button>
        </div>
      </div>
    </div>
  );
};

export default MapView;
