import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronDown, Sparkles } from 'lucide-react';

const subtitles = ['白天上班族', '法语译者', '旅行者', '组织者'];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const statusRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation - split letters
      const title = titleRef.current;
      if (title) {
        const text = title.textContent || '';
        title.innerHTML = text
          .split('')
          .map((char) => `<span class="inline-block">${char}</span>`)
          .join('');

        gsap.fromTo(
          title.querySelectorAll('span'),
          {
            y: 100,
            opacity: 0,
            rotateX: -90,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: 'expo.out',
            delay: 0.2,
          }
        );
      }

      // Subtitles animation
      subtitleRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(
            ref,
            { x: -30, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.5,
              ease: 'expo.out',
              delay: 0.8 + index * 0.2,
            }
          );
        }
      });

      // Status bar animation
      if (statusRef.current) {
        gsap.fromTo(
          statusRef.current,
          { scale: 0.95, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'back.out(1.7)',
            delay: 1.6,
          }
        );
      }

      // CTA button animation
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'expo.out',
            delay: 1.8,
          }
        );
      }

      // Scroll hint animation
      if (scrollHintRef.current) {
        gsap.fromTo(
          scrollHintRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
            delay: 2.2,
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToQuickAccess = () => {
    const element = document.querySelector('#quick-access');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Animated Background Elements - 柔和版 */}
      <div className="absolute inset-0 overflow-hidden bg-hero-aura pointer-events-none">
        {/* Floating Orbs - 柔和 pastel */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blush/26 rounded-full blur-[110px] animate-float-gentle" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-lavender/35 rounded-full blur-[105px] animate-float-gentle" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] bg-mint/26 rounded-full blur-[130px] animate-float-gentle" style={{ animationDelay: '-1.5s' }} />
        
        {/* Decorative Shapes */}
        <div className="absolute top-20 right-20 w-20 h-20 border-2 border-blush/24 rounded-full" />
        <div className="absolute bottom-32 left-16 w-12 h-12 bg-lavender/28 rounded-xl rotate-12" />
        <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-mint/30 rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 sm:px-8 lg:px-10 max-w-6xl mx-auto pt-28 pb-20 lg:pt-32 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-10 lg:gap-16 items-center">
          {/* Left: Text */}
          <div className="text-left max-w-xl mx-auto lg:mx-0">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-light rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-blush-dark" />
              <span className="font-mono text-[11px] sm:text-xs text-stone-soft">
                ENFJ · 组织者 · 连接者
              </span>
            </div>

            {/* Main Title */}
            <h1
              ref={titleRef}
              className="font-display text-[52px] sm:text-[64px] md:text-[96px] font-black text-gradient-dreamy tracking-tight leading-none mb-3 drop-shadow-[0_8px_22px_rgba(47,42,54,0.12)]"
              style={{ perspective: '1000px' }}
            >
              郝洋
            </h1>

            {/* Subtitles */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-5">
              {subtitles.map((subtitle, index) => (
                <span key={subtitle} className="flex items-center">
                  <span
                    ref={(el) => { subtitleRefs.current[index] = el; }}
                    className="font-mono text-sm md:text-base text-stone-soft"
                  >
                    {subtitle}
                  </span>
                  {index < subtitles.length - 1 && (
                    <span className="mx-3 md:mx-4 text-blush">✦</span>
                  )}
                </span>
              ))}
            </div>

            {/* Status Bar */}
            <div
              ref={statusRef}
              className="inline-flex items-center gap-3 px-5 sm:px-6 py-3 glass-light rounded-full mb-7"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-pulse-soft absolute inline-flex h-full w-full rounded-full bg-mint-dark" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-mint-dark" />
              </span>
              <span className="font-mono text-sm text-stone-soft">
                在线 <span className="text-stone-soft/40 mx-2">|</span> 沙河市
                <span className="text-stone-soft/40 mx-2">|</span> 今日已审批23份文件
                <span className="text-stone-soft/40 mx-2">|</span> 午休中想聊聊摄影
              </span>
            </div>

            {/* CTA Button */}
            <div className="flex items-center gap-4">
              <button
                ref={ctaRef}
                onClick={scrollToQuickAccess}
                className="group relative inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 bg-gradient-to-r from-blush via-peach to-lavender text-white font-display font-semibold rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-soft-hover overflow-hidden"
              >
                <span className="relative z-10">看看我今天在忙什么</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-lavender via-peach to-blush opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
            </div>

            {/* Tagline */}
            <p className="mt-5 font-mono text-xs sm:text-sm text-stone-soft/80 italic">
              "把审批表的严谨，变成邀请你同行的底气。"
            </p>
          </div>

          {/* Right: Portrait */}
          <div className="w-full flex justify-center lg:justify-end mt-6 lg:mt-0">
            <div className="relative w-60 h-72 sm:w-64 sm:h-80 md:w-72 md:h-88 glass-cream rounded-[2.4rem] shadow-soft overflow-hidden border-soft">
              <div className="absolute inset-0 bg-gradient-to-br from-peach/40 via-transparent to-lavender/40 pointer-events-none" />
              <img
                src="my-photo.png"
                alt="郝洋 · 个人艺术照"
                className="w-full h-full object-cover"
              />
              {/* Top label */}
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/5 backdrop-blur text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] text-stone-soft">
                Personal Portrait
              </div>
              {/* Bottom tag */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-stone-soft">
                <span className="font-mono">Haoyang · 1999</span>
                <span className="font-mono text-blush-pink">INS STYLE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-blush/50 to-lavender/50" />
        <ChevronDown className="w-5 h-5 text-blush-dark animate-bounce" />
      </div>
    </section>
  );
}
