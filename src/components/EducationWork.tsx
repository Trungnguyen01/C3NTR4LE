import React, { useState } from 'react';
import { useI18n } from '../contexts/I18nContext';
import { motion, AnimatePresence } from 'framer-motion';

const TimelineItem = ({ 
  time, 
  title, 
  subtitle, 
  bullets 
}: { 
  time: string, 
  title: string, 
  subtitle: string, 
  bullets: React.ReactNode[] 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative pl-5 border-l mb-5 transition-colors duration-400 ${isOpen ? 'border-border-hover' : 'border-border-primary hover:border-border-hover'} group`}>
      <div 
        className="absolute -left-[4px] top-[14px] w-[7px] h-[7px] rounded-full transition-all duration-400 bg-[#333] group-hover:bg-text-primary group-hover:shadow-[0_0_8px_rgba(255,255,255,0.6)]"
        style={isOpen ? { backgroundColor: 'var(--text-color)', boxShadow: '0 0 8px rgba(255, 255, 255, 0.6)' } : {}}
      />
      
      <div 
        className="cursor-pointer py-1.5" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-xs text-text-accent mb-0.5 tracking-[0.5px]">{time}</div>
        <div className="text-[0.9rem] font-bold text-[#e0e0e0] flex items-center gap-2">
          {title}
          <span 
            className="text-[0.75rem] text-[#444] transition-all duration-400 group-hover:text-[#888]"
            style={isOpen ? { transform: 'rotate(-180deg)', color: 'var(--text-color)' } : {}}
          >
            ↓
          </span>
        </div>
        <div className="text-[0.8rem] text-[#666]">{subtitle}</div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="py-2.5">
              <ul className="list-none pl-1">
                {bullets.map((bullet, i) => (
                  <li key={i} className="text-[0.8rem] text-[#b0b0b0] mb-2 relative pl-3.5 leading-[1.5]">
                    <span className="absolute left-0 text-[#444]">—</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function EducationWork() {
  const { t } = useI18n();

  return (
    <section>
      <h2 className="text-[0.9rem] tracking-[4px] uppercase border-b border-border-primary pb-2 mb-6 text-text-accent font-normal">
        {t('section.edu')}
      </h2>

      <TimelineItem 
        time={t('job.present')}
        title="LX PANTOS"
        subtitle={t('job.staff')}
        bullets={[
          <>{t('job.lx.desc')}</>
        ]}
      />

      <TimelineItem 
        time={t('job.4p.time')}
        title="4P ELECTRONICS JSC"
        subtitle={t('job.4p.subtitle')}
        bullets={t('job.4p.bullets')}
      />

      <TimelineItem 
        time={t('job.mia.time')}
        title="Mia Education Academy"
        subtitle={t('job.mia.subtitle')}
        bullets={t('job.mia.bullets')}
      />

      <TimelineItem 
        time={t('job.vds.time')}
        title="VDS Agency"
        subtitle={t('job.vds.subtitle')}
        bullets={t('job.vds.bullets')}
      />

      <TimelineItem 
        time={t('job.hpu.time')}
        title={t('job.hpu.title')}
        subtitle={t('job.hpu.subtitle')}
        bullets={t('job.hpu.bullets')}
      />
    </section>
  );
}
