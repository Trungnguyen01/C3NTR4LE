import React from 'react';
import { useForm } from 'react-hook-form';
import { useI18n } from '../contexts/I18nContext';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

type FormData = {
  name: string;
  email: string;
  message: string;
};

// Thay thế đường link URL này bằng link Web App của Google Apps Script của bạn
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxYrsnACA-TDHbvfJMPHvo6RxyGqI3_GVaCKdj0VMr9DHGnzFHwA5-j_LcaDXKImqsn_w/exec';

export default function ContactForm() {
  const { t } = useI18n();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      if (!GOOGLE_SCRIPT_URL) {
        toast.error('Vui lòng thêm link Google Script vào file ContactForm.tsx');
        return;
      }

      const dataParams = new URLSearchParams();
      dataParams.append('name', data.name);
      dataParams.append('email', data.email);
      dataParams.append('message', data.message);

      await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', GOOGLE_SCRIPT_URL);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(new Error('Network Error'));
        xhr.send(dataParams.toString());
      });

      toast.success(t('contact.success'));
      reset();
    } catch (error) {
      console.error('Lỗi khi gửi form:', error);
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau.');
    }
  };

  return (
    <section>
      <h2 className="text-[0.9rem] tracking-[4px] uppercase border-b border-border-primary pb-2 mb-6 text-text-accent font-normal">
        {t('contact.title')}
      </h2>

      <motion.form 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit(onSubmit)} 
        className="flex flex-col gap-4 bg-bg-card p-6 border border-border-primary"
      >
        <div>
          <input 
            {...register("name", { required: true })} 
            placeholder={t('contact.name')} 
            className="w-full bg-transparent border-b border-border-primary py-2 px-1 text-sm text-text-primary focus:outline-none focus:border-text-primary transition-colors placeholder:text-[#555]"
          />
          {errors.name && <span className="text-red-500 text-xs mt-1 block">{t('contact.required')}</span>}
        </div>
        
        <div>
          <input 
            type="email"
            {...register("email", { required: true })} 
            placeholder={t('contact.email')} 
            className="w-full bg-transparent border-b border-border-primary py-2 px-1 text-sm text-text-primary focus:outline-none focus:border-text-primary transition-colors placeholder:text-[#555]"
          />
          {errors.email && <span className="text-red-500 text-xs mt-1 block">{t('contact.required')}</span>}
        </div>

        <div>
          <textarea 
            {...register("message", { required: true })} 
            placeholder={t('contact.message')} 
            rows={4}
            className="w-full bg-transparent border-b border-border-primary py-2 px-1 text-sm text-text-primary focus:outline-none focus:border-text-primary transition-colors resize-none placeholder:text-[#555]"
          />
          {errors.message && <span className="text-red-500 text-xs mt-1 block">{t('contact.required')}</span>}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="mt-4 border border-border-primary bg-transparent text-text-primary py-3 px-4 text-xs tracking-[2px] uppercase font-bold hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '...' : t('contact.send')}
        </button>
      </motion.form>
    </section>
  );
}
