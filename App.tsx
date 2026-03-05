import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Logo } from './components/Logo';
import { Marquee } from './components/Marquee';
import { ServiceSelector } from './components/ServiceSelector';
import { Background } from './components/Background';
import { Brief } from './Brief';
import { 
  ArrowUpRight, 
  Menu, 
  X, 
  Moon, 
  Sun, 
  Coffee,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  ChevronDown,
  ExternalLink,
  Sparkles,
  Zap,
  Shield,
  Layers
} from 'lucide-react';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-coffee-dark/10 py-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left group"
      >
        <span className="text-xl md:text-2xl font-serif italic group-hover:text-coffee-latte transition-colors">{question}</span>
        <ChevronDown className={`transition-transform duration-500 ${isOpen ? 'rotate-180 text-coffee-latte' : 'text-coffee-ink/20'}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pt-6 text-coffee-ink/60 leading-relaxed max-w-2xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProjectCard = ({ title, category, image, delay, size = 'normal' }: { title: string, category: string, image: string, delay: number, size?: 'normal' | 'large' }) => (
  <motion.div 
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ delay, duration: 1, ease: [0.16, 1, 0.3, 1] }}
    className={`group relative overflow-hidden rounded-[3rem] bg-coffee-dark/5 ${size === 'large' ? 'md:col-span-2 md:row-span-2 aspect-[16/10]' : 'aspect-[4/5]'}`}
  >
    <div className="absolute inset-0 z-0">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 group-hover:rotate-1"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-coffee-dark/20 group-hover:bg-coffee-dark/40 transition-colors duration-500" />
    </div>

    <div className="absolute inset-0 z-10 bg-gradient-to-t from-coffee-dark via-coffee-dark/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700" />

    <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-14">
      <div className="overflow-hidden">
        <motion.div 
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          transition={{ delay: delay + 0.2, duration: 0.8 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl text-[10px] font-bold uppercase tracking-[0.2em] text-coffee-latte border border-white/10">
            {category}
          </span>
          <div className="h-px w-8 bg-coffee-latte/30" />
        </motion.div>
      </div>

      <div className="overflow-hidden">
        <motion.h3 
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          transition={{ delay: delay + 0.3, duration: 0.8 }}
          className={`font-serif italic text-white leading-tight mb-8 ${size === 'large' ? 'text-4xl md:text-7xl' : 'text-3xl md:text-4xl'}`}
        >
          {title}
        </motion.h3>
      </div>

      <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
        <button className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] text-white group/btn">
          <span className="relative">
            Explore Case
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-coffee-latte transition-all duration-300 group-hover/btn:w-full" />
          </span>
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-coffee-latte group-hover/btn:border-coffee-latte group-hover/btn:text-coffee-dark transition-all">
            <ArrowUpRight size={18} />
          </div>
        </button>
        
        <div className="flex gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-coffee-latte animate-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
        </div>
      </div>
    </div>
    
    {/* Corner Accent */}
    <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform duration-700">
        <Sparkles size={20} className="text-coffee-latte" />
      </div>
    </div>
  </motion.div>
);

const MainContent: React.FC = () => {
  const [theme, setTheme] = useState<'classic' | 'dark' | 'light'>('classic');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Все');
  const { scrollYProgress } = useScroll();
  
  const categories = ['Все', 'Web Ecosystem', 'Branding', 'Automation', 'UI/UX'];
  
  const projects = [
    { title: "Lyaar Ecosystem", category: "Web Ecosystem", image: "https://picsum.photos/seed/lyaar/1200/800", size: 'large' as const },
    { title: "Luxe Living", category: "Branding", image: "https://picsum.photos/seed/luxe/800/1000" },
    { title: "Bot Flow", category: "Automation", image: "https://picsum.photos/seed/bot/800/1000" },
    { title: "Edu Portal", category: "Web Ecosystem", image: "https://picsum.photos/seed/edu/800/1000" },
    { title: "Minimalist UI", category: "UI/UX", image: "https://picsum.photos/seed/ui/800/1000" },
  ];

  const filteredProjects = activeCategory === 'Все' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'classic' ? '' : theme);
  }, [theme]);

  return (
    <div className="min-h-screen selection:bg-coffee-latte selection:text-coffee-dark">
      <Background />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center bg-coffee-bg/80 backdrop-blur-md border-b border-coffee-dark/5">
        <Logo />
        
        <div className="hidden md:flex items-center gap-12 text-xs font-bold uppercase tracking-[0.2em] text-coffee-ink/60">
          <a href="#directions" className="hover:text-coffee-dark transition-colors">Направления</a>
          <a href="#services" className="hover:text-coffee-dark transition-colors">Услуги</a>
          <a href="#projects" className="hover:text-coffee-dark transition-colors">Проекты</a>
          <a href="#faq" className="hover:text-coffee-dark transition-colors">FAQ</a>
          <a href="#contact" className="hover:text-coffee-dark transition-colors">Контакты</a>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/brief" className="hidden lg:flex px-6 py-2 bg-coffee-dark text-coffee-bg rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-coffee-latte hover:text-coffee-dark transition-all">
            Заполнить бриф
          </Link>
          
          <div className="flex bg-coffee-dark/5 p-1 rounded-full border border-coffee-dark/10">
            <button onClick={() => setTheme('classic')} className={`p-2 rounded-full transition-all ${theme === 'classic' ? 'bg-coffee-dark text-coffee-bg' : 'text-coffee-ink/40'}`}><Coffee size={16} /></button>
            <button onClick={() => setTheme('dark')} className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'bg-coffee-dark text-coffee-bg' : 'text-coffee-ink/40'}`}><Moon size={16} /></button>
            <button onClick={() => setTheme('light')} className={`p-2 rounded-full transition-all ${theme === 'light' ? 'bg-coffee-dark text-coffee-bg' : 'text-coffee-ink/40'}`}><Sun size={16} /></button>
          </div>

          <button className="md:hidden p-2 text-coffee-dark" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <motion.div 
        initial={false}
        animate={isMenuOpen ? { x: 0 } : { x: '100%' }}
        className="fixed inset-0 z-40 bg-coffee-bg flex flex-col items-center justify-center gap-8 md:hidden"
      >
        <a href="#directions" onClick={() => setIsMenuOpen(false)} className="text-4xl font-serif italic">Направления</a>
        <a href="#services" onClick={() => setIsMenuOpen(false)} className="text-4xl font-serif italic">Услуги</a>
        <a href="#projects" onClick={() => setIsMenuOpen(false)} className="text-4xl font-serif italic">Проекты</a>
        <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-4xl font-serif italic">Контакты</a>
        <Link to="/brief" onClick={() => setIsMenuOpen(false)} className="px-8 py-4 bg-coffee-dark text-coffee-bg rounded-full font-bold">Заполнить бриф</Link>
      </motion.div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-coffee-bg">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coffee-dark/5 border border-coffee-dark/10 text-[10px] font-bold uppercase tracking-[0.3em] text-coffee-latte"
            >
              <Sparkles size={12} /> Digital Excellence Agency
            </motion.div>

            <div className="relative">
              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-7xl md:text-[10rem] font-serif leading-[0.85] tracking-tight"
              >
                Lyaar <br />
                <span className="italic text-coffee-latte relative">
                  Digital
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="absolute -bottom-2 left-0 h-1 bg-coffee-latte/30 rounded-full"
                  />
                </span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="absolute -top-12 -right-12 w-32 h-32 bg-coffee-latte rounded-full flex items-center justify-center rotate-12 hidden lg:flex"
              >
                <span className="text-coffee-dark font-bold text-[10px] uppercase tracking-widest text-center leading-tight">
                  Premium <br /> Quality
                </span>
              </motion.div>
            </div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-coffee-ink/60 text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto"
            >
              Мы проектируем и разрабатываем цифровые продукты, которые определяют будущее вашего бренда.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-col md:flex-row items-center justify-center gap-8"
            >
              <Link to="/brief" className="group relative px-12 py-6 bg-coffee-dark text-coffee-bg rounded-full font-bold overflow-hidden transition-all hover:scale-105 active:scale-95">
                <span className="relative z-10 flex items-center gap-3 text-lg">
                  Заполнить бриф <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
                <motion.div 
                  className="absolute inset-0 bg-coffee-latte"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ type: 'tween', ease: 'easeInOut' }}
                />
              </Link>
              <a href="#directions" className="text-sm font-bold uppercase tracking-widest text-coffee-ink/40 hover:text-coffee-dark transition-colors border-b border-transparent hover:border-coffee-dark pb-1">
                Наши направления
              </a>
            </motion.div>
          </div>
        </div>

        {/* Background Interactive Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 -left-20 w-96 h-96 bg-coffee-latte/10 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              x: [0, -100, 0],
              y: [0, 50, 0],
              rotate: [0, -10, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 -right-20 w-[30rem] h-[30rem] bg-coffee-dark/5 rounded-full blur-3xl"
          />
          
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-coffee-dark/5 to-transparent -rotate-12" />
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-coffee-dark/5 to-transparent rotate-12" />
        </div>

        {/* Floating Project Preview */}
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-12 right-12 p-6 glass rounded-3xl max-w-[240px] hidden xl:block border border-white/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-coffee-latte">Live Project</span>
          </div>
          <h4 className="text-lg font-serif italic mb-2">Lyaar Ecosystem</h4>
          <p className="text-[10px] text-coffee-ink/60 leading-relaxed">
            Комплексная цифровая среда для управления бизнес-процессами.
          </p>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-coffee-ink/20"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll to explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-coffee-dark/20 to-transparent" />
        </motion.div>
      </section>

      {/* Directions Section */}
      <section id="directions" className="py-32 px-6 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-coffee-latte/10 border border-coffee-latte/20 text-[10px] font-bold uppercase tracking-[0.3em] text-coffee-latte"
              >
                <Layers size={12} /> Направления Lyaar
              </motion.div>
              <h2 className="text-6xl md:text-8xl font-serif leading-[0.85] tracking-tight">
                Экосистема <br />
                <span className="italic text-coffee-latte">Будущего</span>.
              </h2>
              <p className="text-coffee-ink/60 text-xl font-light leading-relaxed max-w-xl">
                Мы создаем не просто продукты, а полноценные цифровые экосистемы, которые работают на ваш бизнес 24/7, объединяя дизайн, технологии и стратегию.
              </p>
            </div>
            
            <div className="relative aspect-square">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-coffee-dark/5 rounded-full"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-12 border border-coffee-latte/10 rounded-full border-dashed"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <span className="block text-6xl font-serif italic text-coffee-dark">360°</span>
                  <span className="block text-[10px] uppercase tracking-[0.4em] text-coffee-latte font-bold">Solutions</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-coffee-dark/5 border border-coffee-dark/5 rounded-[3rem] overflow-hidden">
            {[
              { icon: Sparkles, title: 'Lyaar Design', desc: 'Визуальные коды, которые влюбляют в бренд с первого взгляда. Мы создаем идентичность, которая говорит сама за себя.' },
              { icon: Zap, title: 'Lyaar Tech', desc: 'Сверхбыстрые сайты и приложения на передовых технологиях. Производительность без компромиссов.' },
              { icon: Shield, title: 'Lyaar CRM', desc: 'Автоматизация, которая освобождает ваше время для главного. Умные системы управления вашим бизнесом.' },
              { icon: Layers, title: 'Lyaar Growth', desc: 'Стратегический маркетинг, превращающий охваты в продажи. Мы масштабируем ваш успех в цифровой среде.' }
            ].map((dir, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-12 md:p-16 bg-coffee-bg hover:bg-white transition-all group"
              >
                <div className="flex justify-between items-start mb-12">
                  <div className="w-16 h-16 bg-coffee-dark/5 rounded-2xl flex items-center justify-center text-coffee-latte group-hover:bg-coffee-dark group-hover:text-coffee-bg transition-all duration-500">
                    <dir.icon size={32} />
                  </div>
                  <span className="text-4xl font-serif italic text-coffee-dark/5 group-hover:text-coffee-latte/20 transition-colors">0{i + 1}</span>
                </div>
                <h3 className="text-3xl font-serif italic mb-6 group-hover:translate-x-2 transition-transform duration-500">{dir.title}</h3>
                <p className="text-coffee-ink/60 leading-relaxed max-w-sm">{dir.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="max-w-3xl mb-24 space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-coffee-latte">Индивидуальные решения</span>
            <h2 className="text-5xl md:text-7xl font-serif leading-tight">Выберите свой путь <br />к <span className="italic text-coffee-latte">Цифровому росту</span>.</h2>
            <p className="text-coffee-ink/60 text-lg max-w-xl">Используйте наш интерактивный конфигуратор, чтобы собрать идеальный стек проекта и получить мгновенную оценку.</p>
          </div>
          <ServiceSelector />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 relative overflow-hidden">
        {/* Floating Background Text */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-[0.02] select-none">
          <div className="absolute top-1/4 -left-20 text-[20rem] font-serif italic whitespace-nowrap rotate-12">
            Digital Excellence Agency
          </div>
          <div className="absolute bottom-1/4 -right-20 text-[20rem] font-serif italic whitespace-nowrap -rotate-12">
            Lyaar Digital Ecosystem
          </div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-32 gap-16">
            <div className="max-w-3xl space-y-10">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-6"
              >
                <div className="w-16 h-px bg-coffee-latte" />
                <span className="text-xs font-bold uppercase tracking-[0.5em] text-coffee-latte">Digital Excellence Agency</span>
              </motion.div>
              
              <h2 className="text-7xl md:text-9xl font-serif leading-[0.8] tracking-tighter">
                Наши <br />
                <span className="italic text-coffee-latte relative inline-block">
                  Проекты
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="absolute -bottom-4 left-0 h-2 bg-coffee-latte/20 rounded-full"
                  />
                </span>
              </h2>
              
              <p className="text-coffee-ink/60 text-2xl font-light leading-relaxed max-w-2xl">
                Мы создаем цифровые шедевры, которые объединяют эстетику и функциональность в единую экосистему.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 bg-white/40 backdrop-blur-3xl p-3 rounded-[2.5rem] border border-coffee-dark/5 shadow-2xl">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-10 py-5 rounded-[2rem] text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-700 ${
                    activeCategory === cat 
                      ? 'bg-coffee-dark text-coffee-bg shadow-2xl scale-105' 
                      : 'text-coffee-ink/40 hover:text-coffee-dark hover:bg-white/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Project Spotlight */}
          {activeCategory === 'Все' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="mb-20 group relative aspect-[21/9] rounded-[4rem] overflow-hidden bg-coffee-dark shadow-3xl hidden xl:block"
            >
              <img 
                src="https://picsum.photos/seed/featured/1920/1080" 
                alt="Featured Project" 
                className="w-full h-full object-cover opacity-60 transition-transform duration-[2s] group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-coffee-dark via-coffee-dark/40 to-transparent" />
              
              <div className="absolute inset-0 flex flex-col justify-center p-24 max-w-4xl">
                <span className="inline-block px-4 py-1.5 rounded-full bg-coffee-latte text-coffee-dark text-[10px] font-bold uppercase tracking-widest mb-8">
                  Featured Case Study
                </span>
                <h3 className="text-8xl font-serif italic text-white mb-8 leading-tight">
                  Lyaar <br /> Global Platform
                </h3>
                <p className="text-white/60 text-xl font-light mb-12 max-w-xl">
                  Революционная платформа для управления глобальными активами в реальном времени.
                </p>
                <button className="flex items-center gap-6 text-white group/btn">
                  <span className="text-xs font-bold uppercase tracking-[0.4em]">View Full Case</span>
                  <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-coffee-dark transition-all duration-500">
                    <ArrowUpRight size={24} />
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 auto-rows-fr">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <ProjectCard 
                  key={project.title}
                  title={project.title}
                  category={project.category}
                  image={project.image}
                  delay={i * 0.1}
                  size={project.size}
                />
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-32 text-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-16 py-8 bg-coffee-dark text-coffee-bg rounded-full font-bold overflow-hidden transition-all shadow-2xl"
            >
              <span className="relative z-10 flex items-center gap-4 text-lg tracking-widest uppercase">
                Смотреть все работы 
                <div className="w-8 h-8 rounded-full bg-coffee-latte text-coffee-dark flex items-center justify-center group-hover:rotate-45 transition-transform">
                  <ArrowUpRight size={20} />
                </div>
              </span>
              <div className="absolute inset-0 bg-coffee-latte translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 px-6 bg-coffee-bg/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-24 space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-coffee-latte">Помощь</span>
            <h2 className="text-5xl md:text-6xl font-serif leading-tight">Часто задаваемые <span className="italic text-coffee-latte">Вопросы</span>.</h2>
          </div>

          <div className="space-y-4">
            <FAQItem 
              question="Сколько времени занимает разработка сайта?" 
              answer="В среднем от 3 до 6 недель, в зависимости от сложности функционала и объема контента. Мы всегда фиксируем сроки в договоре." 
            />
            <FAQItem 
              question="Работаете ли вы с готовыми дизайнами?" 
              answer="Да, мы можем реализовать проект по вашим макетам, если они соответствуют нашим стандартам качества и техническим требованиям." 
            />
            <FAQItem 
              question="Предоставляете ли вы поддержку после запуска?" 
              answer="Конечно. Мы предлагаем пакеты технического обслуживания, чтобы ваш проект всегда оставался быстрым, безопасным и актуальным." 
            />
            <FAQItem 
              question="Какие технологии вы используете?" 
              answer="Мы работаем с современным стеком: React, Next.js, Node.js, а также специализированными CRM-решениями и API для ботов." 
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-coffee-dark text-coffee-bg rounded-t-[5rem]">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="space-y-12">
            <h2 className="text-6xl md:text-8xl font-serif leading-[0.9]">Готовы <br /><span className="italic text-coffee-latte">Создать</span> <br />что-то великое?</h2>
            <div className="space-y-8">
              <div className="space-y-2">
                <p className="text-coffee-bg/60 text-xl max-w-md">Давайте обсудим ваше видение и то, как Lyaar может помочь вам в его реализации.</p>
                <p className="text-coffee-latte font-medium">Остались вопросы? Свяжитесь с нашей командой по адресу <a href="mailto:info@lyaar.io" className="underline hover:text-white transition-colors">info@lyaar.io</a></p>
              </div>
              <div className="flex gap-4">
                <a href="#" className="p-4 bg-white/5 rounded-full hover:bg-coffee-latte hover:text-coffee-dark transition-all"><Instagram size={20} /></a>
                <a href="#" className="p-4 bg-white/5 rounded-full hover:bg-coffee-latte hover:text-coffee-dark transition-all"><Twitter size={20} /></a>
                <a href="#" className="p-4 bg-white/5 rounded-full hover:bg-coffee-latte hover:text-coffee-dark transition-all"><Linkedin size={20} /></a>
                <a href="#" className="p-4 bg-white/5 rounded-full hover:bg-coffee-latte hover:text-coffee-dark transition-all"><Mail size={20} /></a>
              </div>
            </div>
          </div>
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2"><label className="text-[10px] uppercase tracking-widest font-bold text-coffee-bg/40">Полное имя</label><input type="text" className="w-full bg-transparent border-b border-white/20 py-4 focus:border-coffee-latte outline-none transition-colors" placeholder="Иван Иванов" /></div>
              <div className="space-y-2"><label className="text-[10px] uppercase tracking-widest font-bold text-coffee-bg/40">Электронная почта</label><input type="email" className="w-full bg-transparent border-b border-white/20 py-4 focus:border-coffee-latte outline-none transition-colors" placeholder="ivan@example.com" /></div>
            </div>
            <div className="space-y-2"><label className="text-[10px] uppercase tracking-widest font-bold text-coffee-bg/40">Сообщение</label><textarea rows={4} className="w-full bg-transparent border-b border-white/20 py-4 focus:border-coffee-latte outline-none transition-colors resize-none" placeholder="Расскажите о вашем проекте..." /></div>
            <button className="px-12 py-5 bg-coffee-latte text-coffee-dark font-bold rounded-full hover:bg-white transition-all">Отправить сообщение</button>
          </form>
        </div>
        <footer className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <Logo className="opacity-50 grayscale brightness-200" /><p className="text-xs text-coffee-bg/30 uppercase tracking-widest">© 2026 Lyaar Digital Agency. Все права защищены.</p>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold text-coffee-bg/40"><a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a><a href="#" className="hover:text-white transition-colors">Условия использования</a></div>
        </footer>
      </section>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/brief" element={<Brief />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
