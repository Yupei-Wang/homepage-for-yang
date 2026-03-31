import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, MessageSquare, BookOpen, Coffee, HelpCircle, Send, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const topics = [
  { value: 'work', label: '工作咨询', icon: MessageSquare, gradient: 'from-blush to-lavender' },
  { value: 'travel', label: '旅行搭伴', icon: Coffee, gradient: 'from-lavender to-mint' },
  { value: 'reading', label: '读书交流', icon: BookOpen, gradient: 'from-mint to-blush' },
  { value: 'chat', label: '随便聊聊', icon: HelpCircle, gradient: 'from-peach to-blush' },
];

const socialLinks = [
  { name: '微信', icon: '💬', color: 'hover:text-mint-dark' },
  { name: '小红书', icon: '📕', color: 'hover:text-blush-dark' },
  { name: '豆瓣', icon: '🎬', color: 'hover:text-lavender-dark' },
  { name: '邮箱', icon: '✉️', color: 'hover:text-peach-dark' },
];

export default function Connect() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    message: '',
  });
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          if (formRef.current) {
            const elements = formRef.current.querySelectorAll('.form-element');
            gsap.fromTo(
              elements,
              { y: 30, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.1,
                ease: 'expo.out',
              }
            );
          }
        },
        once: true,
      });
      triggersRef.current.push(trigger);
    }, sectionRef);

    return () => {
      triggersRef.current.forEach((trigger) => trigger.kill());
      triggersRef.current = [];
      ctx.revert();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', topic: '', message: '' });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="connect"
      ref={sectionRef}
      className="relative py-24 px-6 lg:px-12"
    >
      <div className="max-w-xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-light rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-blush-dark" />
            <span className="font-mono text-xs text-stone-soft uppercase tracking-widest">
              Connect
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-stone mb-4">
            告诉我，你正在为什么<span className="text-gradient-soft">兴奋</span>
          </h2>
          <p className="font-sans text-stone-soft">
            也许我们可以一起做点什么
          </p>
        </div>

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Name */}
          <div className="form-element" style={{ opacity: 0 }}>
            <label className="block font-mono text-xs uppercase tracking-wider text-stone-soft mb-2">
              姓名
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b-2 border-stone/20 focus:border-blush text-stone py-3 outline-none transition-colors duration-300 placeholder:text-stone/40"
              placeholder="怎么称呼你？"
            />
          </div>

          {/* Email */}
          <div className="form-element" style={{ opacity: 0 }}>
            <label className="block font-mono text-xs uppercase tracking-wider text-stone-soft mb-2">
              邮箱
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b-2 border-stone/20 focus:border-lavender text-stone py-3 outline-none transition-colors duration-300 placeholder:text-stone/40"
              placeholder="your@email.com"
            />
          </div>

          {/* Topic */}
          <div className="form-element" style={{ opacity: 0 }}>
            <label className="block font-mono text-xs uppercase tracking-wider text-stone-soft mb-3">
              你想聊什么
            </label>
            <div className="grid grid-cols-2 gap-3">
              {topics.map((topic) => {
                const Icon = topic.icon;
                return (
                  <button
                    key={topic.value}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, topic: topic.value })
                    }
                    className={`flex items-center gap-2 p-3 rounded-xl border transition-all duration-300 ${
                      formData.topic === topic.value
                        ? `bg-gradient-to-r ${topic.gradient} border-transparent text-white shadow-soft`
                        : 'border-stone/20 text-stone-soft hover:border-blush/50 hover:text-stone'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-sans text-sm">{topic.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Message */}
          <div className="form-element" style={{ opacity: 0 }}>
            <label className="block font-mono text-xs uppercase tracking-wider text-stone-soft mb-2">
              具体留言
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full bg-transparent border-b-2 border-stone/20 focus:border-mint text-stone py-3 outline-none transition-colors duration-300 resize-none placeholder:text-stone/40"
              placeholder="想对我说点什么..."
            />
          </div>

          {/* Submit Button */}
          <div className="form-element pt-4" style={{ opacity: 0 }}>
            <button
              type="submit"
              disabled={isSubmitted}
              className={`w-full py-4 rounded-xl font-display font-bold text-lg transition-all duration-500 flex items-center justify-center gap-2 ${
                isSubmitted
                  ? 'bg-mint text-stone'
                  : 'bg-gradient-to-r from-blush via-lavender to-mint text-white hover:shadow-soft hover:scale-[1.02]'
              }`}
            >
              {isSubmitted ? (
                <>
                  <Check className="w-5 h-5" />
                  已发送，我会找到你
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  发送，我会找到你
                </>
              )}
            </button>
          </div>
        </form>

        {/* Social Links */}
        <div className="mt-16">
          <div className="flex items-center justify-center gap-8">
            {socialLinks.map((link) => (
              <button
                key={link.name}
                className={`group flex flex-col items-center gap-2 text-stone-soft ${link.color} transition-all duration-300`}
              >
                <span className="text-2xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  {link.icon}
                </span>
                <span className="font-mono text-xs">{link.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
