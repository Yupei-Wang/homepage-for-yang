import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Lightbulb, Heart, CheckSquare, ThumbsUp, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const enfjData = [
  {
    letter: 'E',
    title: '外向',
    subtitle: 'Extraversion',
    quote: '我的能量来自与人的连接',
    content: {
      stats: '今年深度对话 127 人',
      description: '照片墙：过去一年的合影，按月份排列',
    },
    icon: MessageCircle,
    gradient: 'from-blush to-lavender',
  },
  {
    letter: 'N',
    title: '直觉',
    subtitle: 'Intuition',
    quote: '我看向可能性的方向',
    content: {
      idea: '如果把排队等待的时间悄悄变成阅读时间...',
      description: '思维地图：当前在思考的话题',
    },
    icon: Lightbulb,
    gradient: 'from-lavender to-mint',
  },
  {
    letter: 'F',
    title: '情感',
    subtitle: 'Feeling',
    quote: '决策时，我问我关心的人',
    content: {
      highlight: '周三帮一位老人理顺了材料，他握我的手10秒钟',
      description: '情感温度计：本周情绪曲线',
    },
    icon: Heart,
    gradient: 'from-blush to-peach',
  },
  {
    letter: 'J',
    title: '判断',
    subtitle: 'Judging',
    quote: '计划让我自由',
    content: {
      plans: [
        { status: '进行中', text: '组织第4期县城读书会' },
        { status: '规划中', text: '国庆带父母游玩' },
        { status: '待启动', text: '法语翻译副业' },
      ],
      description: '当前进行中的计划清单',
    },
    icon: CheckSquare,
    gradient: 'from-mint to-lavender',
  },
];

export default function ENFJStage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const letterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      letterRefs.current.forEach((letter, index) => {
        if (letter) {
          const trigger = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top 60%',
            onEnter: () => {
              gsap.fromTo(
                letter,
                { scale: 0.8, opacity: 0 },
                {
                  scale: 1,
                  opacity: 1,
                  duration: 0.6,
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

      contentRefs.current.forEach((content, index) => {
        if (content) {
          const trigger = ScrollTrigger.create({
            trigger: content,
            start: 'top 60%',
            end: 'bottom 40%',
            onEnter: () => setActiveIndex(index),
            onEnterBack: () => setActiveIndex(index),
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
      id="enfj"
      ref={sectionRef}
      className="relative py-24 px-6 lg:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-light rounded-full mb-6">
            <Star className="w-4 h-4 text-peach-dark" />
            <span className="font-mono text-xs text-stone-soft uppercase tracking-widest">
              Personality
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-stone mb-4">
            ENFJ人格<span className="text-gradient-dreamy">舞台</span>
          </h2>
          <p className="font-sans text-stone-soft max-w-md mx-auto">
            外向 · 直觉 · 情感 · 判断
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left: Letters */}
          <div className="lg:w-1/4 flex lg:flex-col gap-4 justify-center">
            {enfjData.map((item, index) => (
              <div
                key={item.letter}
                ref={(el) => { letterRefs.current[index] = el; }}
                className={`relative cursor-pointer transition-all duration-500 ${
                  activeIndex === index
                    ? 'text-transparent bg-clip-text bg-gradient-to-r ' + item.gradient
                    : 'text-stone/20 hover:text-stone/40'
                }`}
                onClick={() => {
                  const content = contentRefs.current[index];
                  if (content) {
                    content.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
                style={{ opacity: 0 }}
              >
                <span
                  className={`font-display text-7xl lg:text-9xl font-black transition-all duration-500 ${
                    activeIndex === index ? 'scale-110 drop-shadow-lg' : 'scale-100'
                  }`}
                  style={activeIndex === index ? {
                    filter: 'drop-shadow(0 4px 20px rgba(248, 180, 217, 0.3))'
                  } : {}}
                >
                  {item.letter}
                </span>
                {activeIndex === index && (
                  <div className={`absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r ${item.gradient} rounded-full`} />
                )}
              </div>
            ))}
          </div>

          {/* Right: Content */}
          <div className="lg:w-3/4 space-y-16">
            {enfjData.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.letter}
                  ref={(el) => { contentRefs.current[index] = el; }}
                  className="glass-light rounded-3xl p-8 hover:shadow-soft transition-all duration-500"
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0 shadow-soft`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold text-stone">
                        {item.title}
                      </h3>
                      <span className="font-mono text-sm text-stone-soft">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Quote */}
                  <p className={`font-sans text-lg italic mb-8 border-l-4 pl-4 text-stone/80 border-gradient-to-b ${item.gradient}`}>
                    "{item.quote}"
                  </p>

                  {/* Content */}
                  <div className="space-y-4">
                    {item.content.stats && (
                      <div className="flex items-center gap-3">
                        <span className="font-display text-4xl font-bold text-gradient-soft">
                          {item.content.stats.split(' ')[0]}
                        </span>
                        <span className="font-mono text-sm text-stone-soft">
                          {item.content.stats.split(' ').slice(1).join(' ')}
                        </span>
                      </div>
                    )}

                    {item.content.idea && (
                      <div className="glass-light rounded-xl p-4 border-l-4 border-mint">
                        <span className="font-mono text-xs text-mint-dark uppercase tracking-wider">
                          刚刚想到
                        </span>
                        <p className="font-sans text-stone mt-1">
                          {item.content.idea}
                        </p>
                        <button className="mt-3 flex items-center gap-2 text-sm text-blush-dark hover:text-lavender-dark transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          投票：你觉得这个想法可行吗？
                        </button>
                      </div>
                    )}

                    {item.content.highlight && (
                      <div className="glass-light rounded-xl p-4 border-l-4 border-blush">
                        <span className="font-mono text-xs text-blush-dark uppercase tracking-wider">
                          本周高光时刻
                        </span>
                        <p className="font-sans text-stone mt-1">
                          {item.content.highlight}
                        </p>
                      </div>
                    )}

                    {item.content.plans && (
                      <div className="space-y-3">
                        {item.content.plans.map((plan, planIndex) => (
                          <div
                            key={planIndex}
                            className="flex items-center gap-4 glass-light rounded-xl p-4"
                          >
                            <span
                              className={`font-mono text-xs px-3 py-1 rounded-full ${
                                plan.status === '进行中'
                                  ? 'bg-mint/30 text-mint-dark'
                                  : plan.status === '规划中'
                                  ? 'bg-lavender/30 text-lavender-dark'
                                  : 'bg-stone/10 text-stone-soft'
                              }`}
                            >
                              {plan.status}
                            </span>
                            <span className="font-sans text-stone">
                              {plan.text}
                            </span>
                          </div>
                        ))}
                        <button className="w-full mt-4 py-4 bg-gradient-to-r from-blush to-lavender hover:from-lavender hover:to-mint text-white font-display font-bold rounded-xl transition-all duration-300 hover:shadow-soft">
                          想加入哪个？
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
