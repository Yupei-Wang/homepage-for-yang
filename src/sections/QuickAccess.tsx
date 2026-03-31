import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    id: 1,
    title: '跟我去审批局',
    subtitle: '看看体制内的一天如何过',
    image: '/card-office.jpg',
    action: '进入',
    gradient: 'from-blush to-lavender',
  },
  {
    id: 2,
    title: '加入我的下一次旅行',
    subtitle: '下一站可能是大理或清迈',
    image: '/card-travel.jpg',
    action: '进入',
    gradient: 'from-lavender to-mint',
  },
  {
    id: 3,
    title: '听听我最近在读什么',
    subtitle: '法语文学、社会学、或者一本诗集',
    image: '/card-reading.jpg',
    action: '进入',
    gradient: 'from-mint to-blush',
  },
];

export default function QuickAccess() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, index) => {
        if (card) {
          const trigger = ScrollTrigger.create({
            trigger: card,
            start: 'top 80%',
            onEnter: () => {
              gsap.fromTo(
                card,
                {
                  rotateY: -30,
                  opacity: 0,
                  x: index === 0 ? -50 : index === 2 ? 50 : 0,
                },
                {
                  rotateY: 0,
                  opacity: 1,
                  x: 0,
                  duration: 0.8,
                  ease: 'expo.out',
                  delay: index * 0.15,
                }
              );
            },
            once: true,
          });
          triggersRef.current.push(trigger);
        }
      });
    }, sectionRef);

    return () => {
      triggersRef.current.forEach((trigger) => trigger.kill());
      triggersRef.current = [];
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="quick-access"
      ref={sectionRef}
      className="relative py-24 px-6 lg:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-light rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-lavender-dark" />
            <span className="font-mono text-xs text-stone-soft uppercase tracking-widest">
              Quick Access
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-stone mb-4">
            快速<span className="text-gradient-soft">入口</span>
          </h2>
          <p className="font-sans text-stone-soft max-w-md mx-auto">
            探索我的世界，从这三个入口开始
          </p>
        </div>

        {/* Cards Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          style={{ perspective: '1000px' }}
        >
          {cards.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => { cardRefs.current[index] = el; }}
              className="group relative h-[420px] rounded-3xl overflow-hidden cursor-pointer shadow-card hover:shadow-card-hover transition-shadow duration-500"
              style={{
                transformStyle: 'preserve-3d',
                opacity: 0,
              }}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-expo-out group-hover:scale-110"
                style={{ backgroundImage: `url(${card.image})` }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/80 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
              
              {/* Soft Border on Hover */}
              <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${card.gradient} p-[3px]`}>
                <div className="w-full h-full rounded-3xl bg-cream" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="font-display text-2xl font-bold text-stone mb-2 transform transition-transform duration-500 group-hover:-translate-y-2">
                  {card.title}
                </h3>
                <p className="font-mono text-sm text-stone-soft mb-4 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                  {card.subtitle}
                </p>
                <div className={`flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r ${card.gradient} font-medium opacity-0 transform translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0`}>
                  <span>{card.action}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Corner Accent */}
              <div className={`absolute top-4 right-4 w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 flex items-center justify-center shadow-soft`}>
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
