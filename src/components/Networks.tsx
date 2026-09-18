import React from 'react';
import { useI18n } from '../contexts/I18nContext';
import { motion } from 'framer-motion';

const links = [
  { name: 'TikTok', url: 'tiktok.com/@c3ntr4le', href: 'https://www.tiktok.com/@c3ntr4le' },
  { name: 'Instagram', url: 'instagram.com/trng_c3ntr4le', href: 'https://instagram.com/trng_c3ntr4le' },
  { name: 'SoundCloud', url: 'soundcloud.com/c3ntr4lee', href: 'https://soundcloud.com/c3ntr4lee' },
  { name: 'Locket', url: 'locket.cam/enwiti', href: 'https://locket.cam/enwiti' },
  { name: 'LinkedIn', url: 'linkedin.com/in/trungnguyenquang201', href: 'https://linkedin.com/in/trungnguyenquang201' },
  { name: 'Trung\'s Mail', url: 'trungnguyenquang201@gmail.com', href: 'mailto:trungnguyenquang201@gmail.com' },
  { name: 'My WhatsApp', url: '0964375548', href: 'https://wa.me/0964375548' },
  { name: 'Phone / Zalo', url: 'zalo.me/0964375548', href: 'https://zalo.me/0964375548' },
  { name: 'Facebook', url: 'fb.com/nqt1506ee', href: 'https://fb.com/nqt1506ee' },
  { name: 'Snapchat', url: 'snapchat.com/add/centrale1506', href: 'https://snapchat.com/add/centrale1506' },
  { name: 'Donate for me!', url: 'paypal.me/nqt1506', href: 'https://paypal.me/nqt1506' }
];

export default function Networks() {
  const { t } = useI18n();

  return (
    <section id="net" className="scroll-mt-24">
      <h2 className="text-[0.9rem] tracking-[4px] uppercase border-b border-border-primary pb-2 mb-6 text-text-accent font-normal">
        {t('section.net')}
      </h2>

      <div className="flex flex-col gap-2.5">
        {links.map((link, i) => (
          <motion.a 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            href={link.href} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-between p-4 bg-bg-card border border-border-primary text-text-primary transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#141414] hover:border-border-hover hover:translate-x-1 group"
          >
            <div>
              <h3 className="text-[0.85rem] tracking-[1.5px] mb-0.5 uppercase">{link.name}</h3>
              <p className="text-[0.75rem] text-text-accent">{link.url}</p>
            </div>
            <span className="text-[0.8rem] text-[#444] transition-all duration-300 group-hover:text-text-primary group-hover:translate-x-[2px]">
              →
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
