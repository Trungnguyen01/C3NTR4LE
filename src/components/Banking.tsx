import React, { useState } from 'react';
import { useI18n } from '../contexts/I18nContext';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const banks = [
  { name: 'VPBank, VietinBank, TPBank', number: '0967375548' },
  { name: 'MBBank', number: '0686815062001' },
  { name: 'TechcomBank', number: 'GNURTNG' },
  { name: 'VietcomBank (VCB)', number: '9964375548' }
];

const BankCard = ({ bank, index }: { bank: any, index: number }) => {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(bank.number);
    setCopied(true);
    toast.success(`${t('bank.copied')} ${bank.number}`, {
      icon: '✅',
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={handleCopy}
      className={`flex items-center justify-between p-4 bg-bg-card border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer group hover:bg-[#141414] hover:translate-x-1 ${copied ? 'border-[#00ff66]' : 'border-border-primary hover:border-border-hover'}`}
    >
      <div>
        <h3 className="text-[0.85rem] tracking-[1.5px] mb-0.5 uppercase text-text-primary">{bank.name}</h3>
        <p className="text-[0.75rem] text-text-accent">{bank.number}</p>
      </div>
      <span className="text-[1.2rem] transition-transform duration-300 group-hover:scale-110">
        {copied ? '✅' : '📋'}
      </span>
    </motion.div>
  );
};

export default function Banking() {
  const { t } = useI18n();

  return (
    <section>
      <h2 className="text-[0.9rem] tracking-[4px] uppercase border-b border-border-primary pb-2 mb-6 text-text-accent font-normal">
        {t('section.bank')}
      </h2>

      <div className="flex flex-col gap-2.5">
        {banks.map((bank, i) => (
          <BankCard key={i} bank={bank} index={i} />
        ))}
      </div>
    </section>
  );
}
