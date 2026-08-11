import React from 'react';
import { Gamepad2, Library, FolderHeart, Video, ArrowUpRight, Sparkles, Play, Youtube } from 'lucide-react';

interface HomeLandingProps {
  onNavigate: (view: string) => void;
}

const HomeLandingSection: React.FC<HomeLandingProps> = ({ onNavigate }) => {
  const sections = [
    {
      id: 'GAME',
      title: 'Game',
      count: 'Official Game Resource',
      icon: Gamepad2
    },
    {
      id: 'LIBRARY',
      title: 'Library',
      count: 'Mangaka, Cosplayer and Others',
      icon: Library
    },
    {
      id: 'REF',
      title: 'Reference',
      count: 'Pose & Color',
      icon: FolderHeart
    },
    {
      id: 'VIDEO',
      title: 'Video',
      count: 'Media Channel',
      icon: Video
    }
  ];

  const favoriteVideos = [
    {
      id: 'v1',
      title: 'キュアアンサー＆キュアミスティック',
      channel: '名探偵プリキュア！',
      url: 'https://www.youtube.com/watch?v=ANZ2qYtKdMA',
      image: 'https://i.ytimg.com/vi/ANZ2qYtKdMA/hqdefault.jpg'
    },
    {
      id: 'v2',
      title: 'キュアアルカナ・シャドウ',
      channel: '名探偵プリキュア！',
      url: 'https://www.youtube.com/watch?v=jx91h6qKR6U',
      image: 'https://i.ytimg.com/vi/jx91h6qKR6U/hqdefault.jpg'
    },
    {
      id: 'v3',
      title: 'キュアエクレール',
      channel: '名探偵プリキュア！',
      url: 'https://www.youtube.com/watch?v=QwExFKxU5ok',
      image: 'https://i.ytimg.com/vi/QwExFKxU5ok/hqdefault.jpg'
    }
  ];

  return (
    <div className="w-full flex flex-col gap-8 font-sans">
      <section className="relative w-full h-[260px] md:h-[320px] rounded-2xl border border-slate-200 overflow-hidden bg-[#070A10] text-white group no-invert">
        <img 
          src="/media/hero1.png" 
          alt="Main Banner" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.06]"
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-[#02040a]/95 via-transparent to-[#02040a]/95 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_34%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.08),transparent_30%)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

        <div className="relative z-20 flex h-full flex-col justify-end p-6 md:p-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-sky-400 text-[11px] font-mono tracking-widest uppercase mb-3 backdrop-blur-md w-fit">
            <span>NON-PROFIT REPOSITORY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight mb-2 uppercase">
            WAKAMOE DATABASE
          </h1>

          <p className="text-slate-200 text-xs sm:text-sm font-normal leading-relaxed max-w-lg">
            A non-profit database. All content belongs to the original rights holders.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {sections.map((sec) => {
          const Icon = sec.icon;
          return (
            <div
              key={sec.id}
              onClick={() => onNavigate(sec.id)}
              className="group rounded-2xl border border-slate-200 bg-white p-5 cursor-pointer transition-colors hover:border-sky-500 hover:bg-slate-50/50 flex flex-col justify-between h-[130px]"
            >
              <div className="flex justify-end items-center">
                <Icon size={20} className="text-slate-400 group-hover:text-sky-500 transition-colors" />
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    {sec.title}
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400">
                    {sec.count}
                  </span>
                </div>

                <ArrowUpRight size={16} className="text-slate-400 group-hover:text-sky-600 transition-colors" />
              </div>
            </div>
          );
        })}
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Youtube size={18} className="text-red-500" />
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-tight">Cool Videos</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {favoriteVideos.map((vid) => (
            <div
              key={vid.id}
              onClick={() => window.open(vid.url, '_blank', 'noopener,noreferrer')}
              className="group rounded-2xl border border-slate-200 bg-white overflow-hidden cursor-pointer hover:border-slate-400 transition-colors flex flex-col"
            >
              <div className="relative w-full aspect-video bg-slate-950 overflow-hidden no-invert">
                <img 
                  src={vid.image} 
                  alt={vid.title} 
                  className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-11 h-11 rounded-full bg-slate-900/70 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-red-600 group-hover:scale-110 transition-all">
                    <Play size={18} className="fill-white text-white ml-0.5" />
                  </div>
                </div>
              </div>

              <div className="p-4 flex flex-col justify-between flex-1">
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2 mb-2 leading-snug">
                  {vid.title}
                </h3>
                <span className="text-[11px] font-mono text-slate-400">
                  {vid.channel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeLandingSection;