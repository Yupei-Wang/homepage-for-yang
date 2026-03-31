import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    year: '2006-2012',
    location: '广宗县实验小学',
    title: '学会组织的第一群人',
    description:
      '班长、升旗手、永远被点名的小小开心果。后来发现，只要一组织活动，我总会自然站到最中间。',
    image: 'timeline-1.jpg',
    side: 'left',
    color: 'blush',
  },
  {
    year: '2012-2015',
    location: '广宗县第二中学',
    title: '开始向外看',
    description:
      '我的少女追星时代，墙上贴满海报，手机里全是应援歌。从那时起，喜欢一件事就会全力以赴。',
    image: 'timeline-2.jpg',
    side: 'right',
    color: 'lavender',
  },
  {
    year: '2015-2018',
    location: '石家庄精英中学',
    title: '带领的压力与快感',
    description:
      '在高考倒计时牌子下面，一边刷题一边想：以后我要去哪里。压力很大，但也第一次学会和自己慢慢和解。',
    image: 'timeline-3.jpg',
    side: 'left',
    color: 'peach',
  },
  {
    year: '2018-2022',
    location: '北京外国语大学',
    title: '法语是新的组织工具',
    description:
      '在北外学法语、混在国庆方阵和彩排的人群里。语言、队形、节奏，慢慢变成我组织一切的“新工具”。',
    image: 'timeline-4.jpg',
    side: 'right',
    color: 'mint',
  },
  {
    year: '2022-至今',
    location: '沙河市某城市服务窗口',
    title: '回到起点，但带着工具',
    description:
      '每天面对100+人，把流程尽量讲成“聊天”。下班之后继续当人类活动策划：读书会、健身局，还有下一次出游的小计划。',
    image: 'timeline-5.jpg',
    side: 'left',
    color: 'blush-dark',
  },
];

export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line draw animation
      if (lineRef.current) {
        const lineTrigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 60%',
          onEnter: () => {
            gsap.fromTo(
              lineRef.current,
              { scaleY: 0, transformOrigin: 'top' },
              { scaleY: 1, duration: 1.5, ease: 'expo.out' }
            );
          },
          once: true,
        });
        triggersRef.current.push(lineTrigger);
      }

      // Item animations
      itemRefs.current.forEach((item, index) => {
        if (item) {
          const isLeft = timelineData[index].side === 'left';
          const dot = item.querySelector('.timeline-dot');
          const content = item.querySelector('.timeline-content');

          const itemTrigger = ScrollTrigger.create({
            trigger: item,
            start: 'top 75%',
            onEnter: () => {
              if (dot) {
                gsap.fromTo(
                  dot,
                  { scale: 0 },
                  {
                    scale: 1,
                    duration: 0.4,
                    ease: 'back.out(1.7)',
                    delay: index * 0.15,
                  }
                );
              }

              if (content) {
                gsap.fromTo(
                  content,
                  {
                    x: isLeft ? -80 : 80,
                    opacity: 0,
                  },
                  {
                    x: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: 'expo.out',
                    delay: index * 0.15 + 0.1,
                  }
                );
              }
            },
            once: true,
          });
          triggersRef.current.push(itemTrigger);
        }
      });
    }, sectionRef);

    return () => {
      triggersRef.current.forEach((trigger) => trigger.kill());
      triggersRef.current = [];
      ctx.revert();
    };
  }, []);

  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      'blush': 'bg-blush shadow-soft',
      'blush-dark': 'bg-blush-dark shadow-soft',
      'lavender': 'bg-lavender shadow-soft',
      'peach': 'bg-peach shadow-soft',
      'mint': 'bg-mint shadow-soft',
    };
    return colorMap[color] || 'bg-blush';
  };

  const getTextColor = (color: string) => {
    const colorMap: Record<string, string> = {
      'blush': 'text-blush-dark',
      'blush-dark': 'text-blush-dark',
      'lavender': 'text-lavender-dark',
      'peach': 'text-peach-dark',
      'mint': 'text-mint-dark',
    };
    return colorMap[color] || 'text-blush-dark';
  };

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative py-24 px-6 lg:px-12"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-light rounded-full mb-6">
            <Rocket className="w-4 h-4 text-peach-dark" />
            <span className="font-mono text-xs text-stone-soft uppercase tracking-widest">
              Timeline
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-stone mb-4">
            人生<span className="text-gradient-warm">时间轴</span>
          </h2>
          <p className="font-sans text-stone-soft max-w-md mx-auto">
            从小镇女孩到城市上班族，这是我自己的小小人生时间轴
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Center Line - 柔和渐变 */}
          <div
            ref={lineRef}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-blush via-lavender to-mint rounded-full"
            style={{ transform: 'scaleY(0)' }}
          />

          {/* Timeline Items */}
          <div className="space-y-16">
            {timelineData.map((item, index) => (
              <div
                key={item.year}
                ref={(el) => { itemRefs.current[index] = el; }}
                className={`relative flex items-start ${
                  item.side === 'left'
                    ? 'md:flex-row'
                    : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div 
                  className={`timeline-dot absolute left-4 md:left-1/2 w-5 h-5 -translate-x-1/2 rounded-full ${getColorClass(item.color)} border-4 border-cream z-10 hover:scale-125 transition-transform duration-300 cursor-pointer`} 
                />

                {/* Content */}
                <div
                  className={`timeline-content ml-12 md:ml-0 md:w-[45%] ${
                    item.side === 'left' ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
                  }`}
                  style={{ opacity: 0 }}
                >
                  <div className="glass-light rounded-2xl p-6 hover:-translate-y-2 hover:shadow-card-hover transition-all duration-500 group">
                    {/* Year & Location */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className={`font-mono text-sm font-bold ${getTextColor(item.color)}`}>
                        {item.year}
                      </span>
                      <span className="text-stone-soft/40">·</span>
                      <span className="font-mono text-sm text-stone-soft">
                        {item.location}
                      </span>
                    </div>

                    {/* Image */}
                    <div className="relative h-44 rounded-xl overflow-hidden mb-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cream/80 to-transparent" />
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-display text-xl font-bold text-stone mb-2 group-hover:text-gradient-soft transition-all duration-300">
                      {item.title}
                    </h3>
                    <p className="font-sans text-sm text-stone-soft leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
