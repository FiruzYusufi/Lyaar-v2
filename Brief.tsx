import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './components/Logo';
import { Background } from './components/Background';
import { 
  ArrowLeft, 
  Send, 
  CheckCircle2, 
  ChevronRight, 
  User, 
  Briefcase, 
  DollarSign, 
  Palette, 
  Sparkles, 
  Loader2,
  Phone,
  AtSign,
  MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";

const SERVICES = [
  'Веб-разработка',
  'CRM-системы',
  'Telegram-боты',
  'UI/UX Дизайн',
  'Digital Маркетинг',
  'Брендинг'
];

const STYLES = [
  { name: 'Минимализм', desc: 'Чистота и фокус' },
  { name: 'Премиум', desc: 'Элегантность и статус' },
  { name: 'Смелый', desc: 'Яркость и энергия' },
  { name: 'Классика', desc: 'Надежность и традиции' }
];

export const Brief: React.FC = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [contactMethod, setContactMethod] = useState('');
  const [contactValue, setContactValue] = useState('');

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleAiImprove = async () => {
    if (!projectDesc || projectDesc.length < 10) return;
    
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Улучши это описание проекта для digital-агентства. Сделай его более профессиональным, структурированным и привлекательным, сохранив суть. Описание: "${projectDesc}"`,
        config: {
          systemInstruction: "Ты — опытный бизнес-аналитик и копирайтер в digital-агентстве Lyaar. Твоя задача — превращать сырые идеи клиентов в четкие, вдохновляющие и профессиональные описания проектов.",
        }
      });
      
      if (response.text) {
        setProjectDesc(response.text.trim());
      }
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      nextStep();
    } else {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-coffee-bg flex items-center justify-center px-6">
        <Background />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full p-12 bg-white rounded-[3rem] shadow-2xl text-center space-y-6"
        >
          <div className="w-20 h-20 bg-coffee-latte/20 text-coffee-latte rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-serif italic text-coffee-dark">Бриф отправлен!</h2>
          <p className="text-coffee-ink/60">
            Спасибо за доверие. Наша команда уже изучает ваш проект. Мы свяжемся с вами в течение 24 часов с готовым предложением.
          </p>
          <Link 
            to="/" 
            className="inline-block px-8 py-4 bg-coffee-dark text-coffee-bg rounded-full font-bold hover:bg-coffee-latte hover:text-coffee-dark transition-all"
          >
            Вернуться на главную
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-coffee-bg selection:bg-coffee-latte selection:text-coffee-dark pb-20">
      <Background />
      
      <nav className="p-6 flex justify-between items-center relative z-10">
        <Link to="/"><Logo /></Link>
        <Link to="/" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-coffee-ink/60 hover:text-coffee-dark transition-colors">
          <ArrowLeft size={16} /> Назад
        </Link>
      </nav>

      <main className="container mx-auto max-w-4xl px-6 mt-12 relative z-10">
        <header className="space-y-6 mb-16">
          <div className="flex items-center gap-4">
            {[1, 2, 3].map(s => (
              <div 
                key={s} 
                className={`h-1 flex-1 rounded-full transition-all duration-500 ${s <= step ? 'bg-coffee-latte' : 'bg-coffee-dark/5'}`} 
              />
            ))}
          </div>
          <div className="flex justify-between items-end">
            <div className="space-y-2">
              <motion.span 
                key={step}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs font-bold uppercase tracking-[0.4em] text-coffee-latte"
              >
                Шаг {step} из 3
              </motion.span>
              <h1 className="text-4xl md:text-6xl font-serif leading-tight text-coffee-dark">
                {step === 1 && <>Давайте <span className="italic">познакомимся</span>.</>}
                {step === 2 && <>Расскажите о <span className="italic">проекте</span>.</>}
                {step === 3 && <>Детали и <span className="italic">бюджет</span>.</>}
              </h1>
            </div>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-12">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.section 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-coffee-ink/40 flex items-center gap-2">
                      <User size={12} /> Имя
                    </label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-white/50 backdrop-blur-sm border border-coffee-dark/10 rounded-2xl p-5 outline-none focus:border-coffee-latte transition-all text-lg"
                      placeholder="Иван"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-coffee-ink/40 flex items-center gap-2">
                      <User size={12} /> Фамилия
                    </label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-white/50 backdrop-blur-sm border border-coffee-dark/10 rounded-2xl p-5 outline-none focus:border-coffee-latte transition-all text-lg"
                      placeholder="Иванов"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-coffee-ink/40">Эл. почта</label>
                    <input 
                      required
                      type="email" 
                      className="w-full bg-white/50 backdrop-blur-sm border border-coffee-dark/10 rounded-2xl p-5 outline-none focus:border-coffee-latte transition-all text-lg"
                      placeholder="ivan@example.com"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-coffee-ink/40">Компания (необязательно)</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/50 backdrop-blur-sm border border-coffee-dark/10 rounded-2xl p-5 outline-none focus:border-coffee-latte transition-all text-lg"
                      placeholder="Название вашей компании"
                    />
                  </div>
                </div>
              </motion.section>
            )}

            {step === 2 && (
              <motion.section 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <div className="space-y-6">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-coffee-ink/40 flex items-center gap-2">
                    <Briefcase size={12} /> Какая услуга вам нужна?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {SERVICES.map(service => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService(service)}
                        className={`p-6 rounded-2xl border text-left transition-all ${
                          selectedServices.includes(service)
                            ? 'bg-coffee-dark text-coffee-bg border-coffee-dark shadow-lg scale-[1.02]'
                            : 'bg-white border-coffee-dark/5 hover:border-coffee-dark/20 text-coffee-ink'
                        }`}
                      >
                        <span className="text-sm font-medium">{service}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-coffee-ink/40">Опишите ваш бизнес или проект</label>
                    <button 
                      type="button"
                      onClick={handleAiImprove}
                      disabled={isAiLoading || !projectDesc || projectDesc.length < 10}
                      className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-coffee-latte hover:text-coffee-dark disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      {isAiLoading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                      Улучшить с AI
                    </button>
                  </div>
                  <textarea 
                    required
                    rows={4}
                    value={projectDesc}
                    onChange={(e) => setProjectDesc(e.target.value)}
                    className="w-full bg-white/50 backdrop-blur-sm border border-coffee-dark/10 rounded-3xl p-6 outline-none focus:border-coffee-latte transition-all resize-none text-lg"
                    placeholder="Расскажите о целях, целевой аудитории и основных задачах..."
                  />
                </div>

                <div className="space-y-6">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-coffee-ink/40">Ссылки на материалы (сайт, соцсети, презентация)</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/50 backdrop-blur-sm border border-coffee-dark/10 rounded-2xl p-5 outline-none focus:border-coffee-latte transition-all text-lg"
                    placeholder="https://..."
                  />
                </div>
              </motion.section>
            )}

            {step === 3 && (
              <motion.section 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-coffee-ink/40 flex items-center gap-2">
                      <DollarSign size={12} /> Ориентировочный бюджет
                    </label>
                    <select className="w-full bg-white/50 backdrop-blur-sm border border-coffee-dark/10 rounded-2xl p-5 outline-none focus:border-coffee-latte transition-all appearance-none text-lg">
                      <option>До $2,000</option>
                      <option>$2,000 — $5,000</option>
                      <option>$5,000 — $10,000</option>
                      <option>$10,000+</option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-coffee-ink/40">Ориентировочный срок</label>
                    <select className="w-full bg-white/50 backdrop-blur-sm border border-coffee-dark/10 rounded-2xl p-5 outline-none focus:border-coffee-latte transition-all appearance-none text-lg">
                      <option>До 2 недель</option>
                      <option>1 месяц</option>
                      <option>2-3 месяца</option>
                      <option>Бессрочно / Поддержка</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-6">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-coffee-ink/40 flex items-center gap-2">
                    <Palette size={12} /> Предпочтительный стиль
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {STYLES.map(style => (
                      <button
                        key={style.name}
                        type="button"
                        onClick={() => setSelectedStyle(style.name)}
                        className={`p-4 rounded-2xl border text-center transition-all ${
                          selectedStyle === style.name
                            ? 'bg-coffee-latte text-coffee-dark border-coffee-latte shadow-lg'
                            : 'bg-white border-coffee-dark/5 hover:border-coffee-dark/20 text-coffee-ink'
                        }`}
                      >
                        <span className="text-sm font-bold block">{style.name}</span>
                        <span className="text-[10px] opacity-60">{style.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-6">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-coffee-ink/40">Как с вами лучше связаться?</label>
                    <div className="flex flex-wrap gap-6">
                      {['Telegram', 'WhatsApp', 'Email', 'Звонок'].map(method => (
                        <label key={method} className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="radio" 
                            name="contact_method" 
                            className="hidden peer" 
                            onChange={() => {
                              setContactMethod(method);
                              setContactValue('');
                            }}
                          />
                          <div className="w-6 h-6 border-2 border-coffee-dark/10 rounded-full peer-checked:border-coffee-latte peer-checked:bg-coffee-latte transition-all flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity" />
                          </div>
                          <span className="text-sm font-medium text-coffee-ink/60 group-hover:text-coffee-dark">{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {contactMethod && (
                      <motion.div
                        key={contactMethod}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                      >
                        <label className="text-[10px] uppercase tracking-widest font-bold text-coffee-ink/40 flex items-center gap-2">
                          {contactMethod === 'Telegram' && <MessageSquare size={12} />}
                          {contactMethod === 'WhatsApp' && <Phone size={12} />}
                          {contactMethod === 'Email' && <AtSign size={12} />}
                          {contactMethod === 'Звонок' && <Phone size={12} />}
                          {contactMethod === 'Telegram' ? 'Ваш @username' : contactMethod === 'Email' ? 'Ваш Email' : 'Ваш номер телефона'}
                        </label>
                        <input 
                          required
                          type={contactMethod === 'Email' ? 'email' : 'text'}
                          value={contactValue}
                          onChange={(e) => setContactValue(e.target.value)}
                          className="w-full bg-white/50 backdrop-blur-sm border border-coffee-dark/10 rounded-2xl p-5 outline-none focus:border-coffee-latte transition-all text-lg"
                          placeholder={contactMethod === 'Telegram' ? '@username' : contactMethod === 'Email' ? 'example@mail.com' : '+7 (___) ___-__-__'}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-6">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-coffee-ink/40">Дополнительные комментарии</label>
                  <textarea 
                    rows={3}
                    className="w-full bg-white/50 backdrop-blur-sm border border-coffee-dark/10 rounded-2xl p-5 outline-none focus:border-coffee-latte transition-all resize-none text-lg"
                    placeholder="Любые дополнительные детали..."
                  />
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          <div className="flex gap-4 pt-8">
            {step > 1 && (
              <button 
                type="button"
                onClick={prevStep}
                className="px-8 py-5 border border-coffee-dark/10 text-coffee-dark rounded-2xl font-bold hover:bg-coffee-dark hover:text-coffee-bg transition-all"
              >
                Назад
              </button>
            )}
            <button 
              type="submit"
              className="flex-1 py-5 bg-coffee-dark text-coffee-bg rounded-2xl font-bold text-lg hover:bg-coffee-latte hover:text-coffee-dark transition-all flex items-center justify-center gap-3 shadow-xl group"
            >
              {step < 3 ? (
                <>Далее <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
              ) : (
                <>Отправить бриф <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
