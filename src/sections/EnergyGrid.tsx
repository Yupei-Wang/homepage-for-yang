import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Dumbbell, Camera, BookOpen, Music, Users, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Audio wave animation component
const AudioWave = () => {
  return (
    <div className="flex items-end gap-1 h-10">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="w-1.5 bg-gradient-to-t from-blush to-lavender rounded-full"
          style={{
            height: `${25 + Math.random() * 60}%`,
            animation: `wave 1.2s ease-in-out infinite`,
            animationDelay: `${i * 0.08}s`,
          }}
        />
      ))}
    </div>
  );
};

const energyData = [
  {
    id: 'travel',
    title: '旅行',
    size: 'large',
    stats: '12个国家 / 47个城市',
    description: '点击地图上的标记，看我留下的足迹',
    image: '/energy-travel.jpg',
    icon: MapPin,
    gradient: 'from-blush to-lavender',
  },
  {
    id: 'fitness',
    title: '健身',
    size: 'tall',
    stats: '本周已完成 4/5 次',
    description: '训练计划可视化',
    image: '/energy-fitness.jpg',
    icon: Dumbbell,
    gradient: 'from-lavender to-mint',
  },
  {
    id: 'photo',
    title: '拍照',
    size: 'wide',
    stats: '最近一组胶片',
    description: '漏光效果的旅行记忆',
    image: '/energy-photo.jpg',
    icon: Camera,
    gradient: 'from-peach to-blush',
  },
  {
    id: 'reading',
    title: '阅读',
    size: 'small',
    stats: '《第二性》',
    description: '进度 65%',
    image: '/energy-book.jpg',
    icon: BookOpen,
    gradient: 'from-mint to-blush',
  },
  {
    id: 'music',
    title: '唱歌',
    size: 'small',
    stats: 'Cigarettes After Sex',
    description: '最近在听',
    image: '/energy-music.jpg',
    icon: Music,
    gradient: 'from-blush to-lavender',
    hasWave: true,
  },
  {
    id: 'organize',
    title: '组织',
    size: 'large',
    stats: '读书会 3期 / 健身小组 12人 / 旅行规划帮 5人',
    description: '我发起的活动',
    image: '/energy-organize.jpg',
    icon: Users,
    gradient: 'from-blush via-lavender to-mint',
  },
];

export default function EnergyGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [counts, setCounts] = useState({ countries: 0, cities: 0 });
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, index) => {
        if (card) {
          const trigger = ScrollTrigger.create({
            trigger: card,
            start: 'top 85%',
            onEnter: () => {
              gsap.fromTo(
                card,
                {
                  y: 50,
                  opacity: 0,
                  scale: 0.95,
                },
                {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  duration: 0.7,
                  ease: 'expo.out',
                  delay: index * 0.1,
                }
              );
            },
            once: true,
          });
          triggersRef.current.push(trigger);
        }
      });

      // Counter animation for travel card
      const travelTrigger = ScrollTrigger.create({
        trigger: cardRefs.current[0],
        start: 'top 80%',
        onEnter: () => {
          gsap.to({}, {
            duration: 2,
            ease: 'expo.out',
            onUpdate: function() {
              const progress = this.progress();
              setCounts({
                countries: Math.round(12 * progress),
                cities: Math.round(47 * progress),
              });
            },
          });
        },
        once: true,
      });
      triggersRef.current.push(travelTrigger);
    }, sectionRef);

    return () => {
      triggersRef.current.forEach((trigger) => trigger.kill());
      triggersRef.current = [];
      ctx.revert();
    };
  }, []);

  const getGridClass = (size: string) => {
    switch (size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2';
      case 'tall':
        return 'md:col-span-1 md:row-span-2';
      case 'wide':
        return 'md:col-span-2 md:row-span-1';
      default:
        return 'md:col-span-1 md:row-span-1';
    }
  };

  return (
    <section
      id="energy"
      ref={sectionRef}
      className="relative py-24 px-6 lg:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-light rounded-full mb-6">
            <Zap className="w-4 h-4 text-mint-dark" />
            <span className="font-mono text-xs text-stone-soft uppercase tracking-widest">
              Energy Grid
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-stone mb-4">
            能量<span className="text-gradient-soft">场</span>
          </h2>
          <p className="font-sans text-stone-soft max-w-xl mx-auto">
            这里记录着我生活中的各种能量来源
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
          {energyData.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                ref={(el) => { cardRefs.current[index] = el; }}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-card hover:shadow-card-hover transition-shadow duration-500 ${getGridClass(
                  item.size
                )}`}
                style={{ opacity: 0 }}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-expo-out group-hover:scale-105"
                  style={{ backgroundImage: `url(${item.image})` }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/70 to-transparent opacity-85 group-hover:opacity-75 transition-opacity duration-500" />

                {/* Soft Border on Hover */}
                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${item.gradient} p-[3px]`}>
                  <div className="w-full h-full rounded-3xl bg-cream/50" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  {/* Top: Icon & Title */}
                  <div className="flex items-start justify-between">
                    <div className={`flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r ${item.gradient} shadow-soft`}>
                      <Icon className="w-5 h-5 text-white" />
                      <span className="font-display text-sm font-semibold text-white">
                        {item.title}
                      </span>
                    </div>
                  </div>

                  {/* Bottom: Stats & Description */}
                  <div>
                    {item.id === 'travel' ? (
                      <div className="mb-2">
                        <span className="font-display text-4xl font-bold text-gradient-soft">
                          {counts.countries}
                        </span>
                        <span className="font-mono text-sm text-stone-soft ml-1">
                          个国家
                        </span>
                        <span className="font-display text-4xl font-bold text-gradient-warm ml-4">
                          {counts.cities}
                        </span>
                        <span className="font-mono text-sm text-stone-soft ml-1">
                          个城市
                        </span>
                      </div>
                    ) : item.hasWave ? (
                      <div className="mb-2">
                        <AudioWave />
                      </div>
                    ) : (
                      <p className="font-display text-xl font-semibold text-stone mb-1">
                        {item.stats}
                      </p>
                    )}
                    <p className="font-mono text-sm text-stone-soft">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
