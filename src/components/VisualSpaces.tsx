import React, { useState } from 'react';
import { useI18n } from '../contexts/I18nContext';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  { src: './image/hoa_ly.jpg', alt: 'HOA LY', link: 'https://www.instagram.com/p/DYux0f6kkmI/?img_index=1' },
  { src: './image/cua_so.jpg', alt: 'CỬA SỔ', link: 'https://www.instagram.com/p/DX16_bUE_7w/?img_index=1' },
  { src: './image/ngon_nui.jpg', alt: 'NGỌN NÚI', link: 'https://www.instagram.com/p/DV6GKaXEu8A/?img_index=1' },
  { src: './image/anh_trang.jpg', alt: 'ÁNH TRĂNG', link: 'https://www.instagram.com/p/DVn_uFFEpWE/?img_index=1' },
  { src: './image/ruy_bang.jpg', alt: 'RUY BĂNG', link: 'https://www.instagram.com/p/DUONYo8Ejdc/?img_index=1' },
  { src: './image/hoa_trang.jpg', alt: 'HOA TRẮNG', link: 'https://www.instagram.com/p/DSz2LuLEjEK/?img_index=1' },
  { src: './image/hoa_don.jpg', alt: 'HOA ĐƠN', link: 'https://www.instagram.com/p/DRXZTwnkvzC/?img_index=1' },
  { src: './image/buom_dem.jpg', alt: 'BƯỚM ĐÊM', link: 'https://www.instagram.com/p/DQT5rESkqgl/?img_index=1' },
  { src: './image/thien_nga.jpg', alt: 'THIÊN NGA', link: 'https://www.instagram.com/p/DP_moAJEkgu/?img_index=1' }
];

export default function VisualSpaces() {
  const { t } = useI18n();
  const [selectedImg, setSelectedImg] = useState<{ src: string, alt: string, link: string } | null>(null);

  return (
    <section id="visual" className="scroll-mt-24">
      <h2 className="text-[0.9rem] tracking-[4px] uppercase border-b border-border-primary pb-2 mb-6 text-text-accent font-normal">
        {t('section.visual')}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
        {images.map((img, i) => (
          <div 
            key={i}
            className="block aspect-square overflow-hidden border border-border-primary bg-[#0b0b0b] relative cursor-pointer group hover:border-border-hover"
            onClick={() => setSelectedImg(img)}
          >
            <img 
              src={img.src} 
              alt={img.alt} 
              loading="lazy" 
              className="w-full h-full object-cover grayscale brightness-85 contrast-[110%] transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 w-full p-1.5 bg-black/70 text-white text-[0.65rem] text-center opacity-0 transition-opacity duration-300 tracking-[1px] group-hover:opacity-100">
              {img.alt}
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100000] bg-black/90 flex flex-col items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedImg(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-colors font-bold text-sm"
              onClick={() => setSelectedImg(null)}
            >
              {t('btn.close')}
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, type: 'spring' }}
              src={selectedImg.src} 
              alt={selectedImg.alt}
              className="max-w-full max-h-[75vh] object-contain border border-border-primary shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <motion.a 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              href={selectedImg.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 text-white border-b border-white/50 pb-1 hover:border-white transition-colors tracking-widest text-sm uppercase"
              onClick={(e) => e.stopPropagation()}
            >
              {t('view.instagram')}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
