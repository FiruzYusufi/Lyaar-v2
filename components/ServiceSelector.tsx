import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceType, Service, ProjectConfig } from '../types';
import { 
  Globe, 
  Database, 
  MessageSquare, 
  Palette, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight,
  Calculator,
  Sparkles
} from 'lucide-react';

const SERVICES: Service[] = [
  { id: 'website', title: 'Веб-разработка', description: 'Высокопроизводительные сайты по индивидуальному заказу.', basePrice: 2500, icon: 'Globe' },
  { id: 'crm', title: 'CRM-системы', description: 'Индивидуальные решения для автоматизации бизнеса.', basePrice: 4000, icon: 'Database' },
  { id: 'telegram', title: 'Telegram-боты', description: 'Интеллектуальные интерфейсы для общения.', basePrice: 1500, icon: 'MessageSquare' },
  { id: 'design', title: 'UI/UX Дизайн', description: 'Премиальные интерфейсы, которые конвертируют.', basePrice: 2000, icon: 'Palette' },
  { id: 'marketing', title: 'Digital Маркетинг', description: 'Стратегия и исполнение, ориентированные на рост.', basePrice: 3000, icon: 'TrendingUp' },
];

const ICON_MAP: Record<string, any> = { Globe, Database, MessageSquare, Palette, TrendingUp };

export const ServiceSelector: React.FC = () => {
  const [selected, setSelected] = useState<ServiceType[]>([]);
  const [complexity, setComplexity] = useState<ProjectConfig['complexity']>('medium');
  const [timeline, setTimeline] = useState<ProjectConfig['timeline']>('standard');

  const toggleService = (id: ServiceType) => {
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const totalPrice = useMemo(() => {
    const base = selected.reduce((acc, id) => {
      const service = SERVICES.find(s => s.id === id);
      return acc + (service?.basePrice || 0);
    }, 0);

    const complexityMultiplier = { simple: 0.8, medium: 1, high: 1.5 }[complexity];
    const timelineMultiplier = { fast: 1.3, standard: 1, relaxed: 0.9 }[timeline];

    return Math.round(base * complexityMultiplier * timelineMultiplier);
  }, [selected, complexity, timeline]);

  const recommendation = useMemo(() => {
    if (selected.length === 0) return null;
    
    if (selected.includes('website') && !selected.includes('marketing')) {
      return {
        title: "Ускоритель роста",
        description: "Добавление Digital-маркетинга поможет вашему новому сайту сразу охватить нужную аудиторию.",
        suggest: 'marketing' as ServiceType
      };
    }
    
    if (selected.includes('crm') && !selected.includes('telegram')) {
      return {
        title: "Омниканальная поддержка",
        description: "Интегрируйте Telegram-бота для круглосуточной поддержки клиентов прямо в вашу CRM.",
        suggest: 'telegram' as ServiceType
      };
    }

    return null;
  }, [selected]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Selection Grid */}
      <div className="lg:col-span-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVICES.map((service) => {
            const Icon = ICON_MAP[service.icon];
            const isActive = selected.includes(service.id);
            return (
              <motion.button
                key={service.id}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleService(service.id)}
                className={`p-6 rounded-2xl text-left transition-all duration-300 border ${
                  isActive 
                    ? 'bg-coffee-dark text-coffee-bg border-coffee-dark shadow-xl' 
                    : 'bg-white text-coffee-ink border-coffee-dark/10 hover:border-coffee-dark/30'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${isActive ? 'bg-white/10' : 'bg-coffee-bg'}`}>
                    <Icon size={24} />
                  </div>
                  {isActive && <CheckCircle2 size={20} className="text-coffee-latte" />}
                </div>
                <h3 className="text-xl font-medium mb-2">{service.title}</h3>
                <p className={`text-sm ${isActive ? 'text-coffee-bg/70' : 'text-coffee-ink/60'}`}>
                  {service.description}
                </p>
              </motion.button>
            );
          })}
        </div>

        {/* Complexity & Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-white rounded-3xl border border-coffee-dark/5">
          <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-widest text-coffee-ink/50">Сложность проекта</label>
            <div className="flex gap-2">
              {(['simple', 'medium', 'high'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setComplexity(c)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                    complexity === c ? 'bg-coffee-dark text-white' : 'bg-coffee-bg text-coffee-ink/60 hover:bg-coffee-dark/10'
                  }`}
                >
                  {c === 'simple' ? 'Простой' : c === 'medium' ? 'Средний' : 'Высокий'}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-widest text-coffee-ink/50">Сроки</label>
            <div className="flex gap-2">
              {(['fast', 'standard', 'relaxed'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeline(t)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                    timeline === t ? 'bg-coffee-dark text-white' : 'bg-coffee-bg text-coffee-ink/60 hover:bg-coffee-dark/10'
                  }`}
                >
                  {t === 'fast' ? 'Срочно' : t === 'standard' ? 'Стандарт' : 'Спокойно'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Sidebar */}
      <div className="lg:col-span-4 sticky top-24">
        <div className="p-8 bg-coffee-dark text-coffee-bg rounded-3xl shadow-2xl space-y-8">
          <div className="flex items-center gap-3">
            <Calculator size={20} className="text-coffee-latte" />
            <h3 className="text-xl font-serif italic">Итог проекта</h3>
          </div>

          <div className="space-y-4 min-h-[100px]">
            {selected.length === 0 ? (
              <p className="text-coffee-bg/40 text-sm italic">Выберите услуги для оценки стоимости...</p>
            ) : (
              <ul className="space-y-2">
                {selected.map(id => (
                  <motion.li 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={id} 
                    className="flex justify-between text-sm"
                  >
                    <span className="text-coffee-bg/70">{SERVICES.find(s => s.id === id)?.title}</span>
                    <span className="font-mono text-coffee-latte">${SERVICES.find(s => s.id === id)?.basePrice}</span>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>

          <div className="pt-6 border-t border-white/10">
            <div className="flex justify-between items-end mb-8">
              <span className="text-xs uppercase tracking-widest text-coffee-bg/50">Примерная стоимость</span>
              <span className="text-4xl font-serif italic text-coffee-latte">${totalPrice.toLocaleString()}</span>
            </div>

            <button className="w-full py-4 bg-coffee-latte hover:bg-white hover:text-coffee-dark text-coffee-dark font-bold rounded-2xl transition-all flex items-center justify-center gap-2 group">
              Начать проект <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Smart Recommendation */}
          <AnimatePresence>
            {recommendation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="p-4 bg-white/5 rounded-2xl border border-white/10 mt-4"
              >
                <div className="flex items-center gap-2 text-coffee-latte mb-2">
                  <circle className="w-2 h-2 rounded-full bg-coffee-latte" />
                  <span className="text-xs font-bold uppercase tracking-tighter">{recommendation.title}</span>
                </div>
                <p className="text-xs text-coffee-bg/60 mb-3">{recommendation.description}</p>
                <button 
                  onClick={() => toggleService(recommendation.suggest)}
                  className="text-[10px] font-bold uppercase tracking-widest text-coffee-latte hover:text-white transition-colors"
                >
                  + Добавить {SERVICES.find(s => s.id === recommendation.suggest)?.title}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
