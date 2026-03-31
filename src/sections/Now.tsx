import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Calendar, Eye, Radio } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Now() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [colonVisible, setColonVisible] = useState(true);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    const colonInterval = setInterval(() => {
      setColonVisible((prev) => !prev);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(colonInterval);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          if (timeRef.current) {
            gsap.fromTo(
              timeRef.current,
              { scale: 0.8, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 1.5,
                ease: 'expo.out',
              }
            );
          }
        },
        once: true,
      });
      triggersRef.current.push(timeTrigger);

      const contentTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        onEnter: () => {
          if (contentRef.current) {
            gsap.fromTo(
              contentRef.current,
              { y: 20, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'expo.out',
                delay: 0.7,
              }
            );
          }
        },
        once: true,
      });
      triggersRef.current.push(contentTrigger);
    }, sectionRef);

    return () => {
      triggersRef.current.forEach((trigger) => trigger.kill());
      triggersRef.current = [];
      ctx.revert();
    };
  }, []);

  const formatTime = (time: string) => {
    const hours = time.slice(0, 2);
    const minutes = time.slice(2, 4);
    return (
      <span className="font-mono">
        {hours}
        <span
          className={`transition-opacity duration-100 ${
            colonVisible ? 'opacity-100' : 'opacity-30'
          }`}
        >
          :
        </span>
        {minutes}
      </span>
    );
  };

  return (
    <section
      id="now"
      ref={sectionRef}
      className="relative py-24 px-6 lg:px-12"
    >
      <div className="max-w-3xl mx-auto">
        <div className="glass-light rounded-3xl p-12 text-center relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blush/20 rounded-full blur-[100px]" />
          
          {/* Live Badge */}
          <div className="relative inline-flex items-center gap-2 px-4 py-2 bg-mint/20 rounded-full mb-8">
            <Radio className="w-4 h-4 text-mint-dark animate-pulse" />
            <span className="font-mono text-xs text-mint-dark uppercase tracking-wider">
              LIVE NOW
            </span>
          </div>

          {/* Time Display */}
          <div
            ref={timeRef}
            className="relative font-mono text-7xl md:text-9xl font-bold text-gradient-soft mb-8"
            style={{ opacity: 0 }}
          >
            {formatTime(currentTime)}
          </div>

          {/* Status */}
          <div
            ref={contentRef}
            className="relative space-y-6"
            style={{ opacity: 0 }}
          >
            <div className="flex items-center justify-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-pulse-soft absolute inline-flex h-full w-full rounded-full bg-mint-dark" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-mint-dark" />
              </span>
              <span className="font-mono text-sm text-stone-soft">在线</span>
            </div>

            {/* Status Message */}
            <p className="font-sans text-lg text-stone/80 max-w-xl mx-auto leading-relaxed">
              刚结束今天的最后一份审批，在听
              <span className="text-blush-dark font-medium">
                {' '}Cigarettes After Sex
              </span>
              ，想找人聊聊大理的民宿
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button className="flex items-center gap-2 px-6 py-3 glass-light hover:bg-blush/20 text-stone hover:text-blush-dark rounded-full transition-all duration-300 hover:-translate-y-1 border border-blush/20 hover:border-blush/50">
                <MessageCircle className="w-4 h-4" />
                <span className="font-display text-sm font-medium">
                  发起对话
                </span>
              </button>
              <button className="flex items-center gap-2 px-6 py-3 glass-light hover:bg-lavender/20 text-stone hover:text-lavender-dark rounded-full transition-all duration-300 hover:-translate-y-1 border border-lavender/20 hover:border-lavender/50">
                <Calendar className="w-4 h-4" />
                <span className="font-display text-sm font-medium">
                  预约时间
                </span>
              </button>
              <button className="flex items-center gap-2 px-6 py-3 glass-light hover:bg-mint/20 text-stone hover:text-mint-dark rounded-full transition-all duration-300 hover:-translate-y-1 border border-mint/20 hover:border-mint/50">
                <Eye className="w-4 h-4" />
                <span className="font-display text-sm font-medium">
                  看看她的本周
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
