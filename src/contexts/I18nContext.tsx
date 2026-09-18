import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'vi' | 'en';

interface I18nContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: string) => any;
}

const translations = {
  vi: {
    'nav.edu': 'HỌC VẤN & CÔNG VIỆC',
    'nav.visual': 'THƯ VIỆN ẢNH',
    'nav.net': 'LIÊN KẾT',
    'nav.bank': 'NGÂN HÀNG',
    'nav.contact': 'LIÊN HỆ',
    
    'header.location': '📍An Dương, Hải Phòng, Việt Nam',
    'header.callme': 'GỌI CHO TÔI',
    
    'section.edu': '౨ৎ HỌC VẤN & CÔNG VIỆC',
    'section.visual': '౨ৎ THƯ VIỆN ẢNH',
    'section.net': '౨ৎ LIÊN KẾT & LIÊN HỆ',
    'section.bank': '౨ৎ THÔNG TIN NGÂN HÀNG (BẤM ĐỂ COPY)',
    
    'bank.copied': 'Đã sao chép: ',
    
    'contact.title': 'GỬI TIN NHẮN CHO TÔI',
    'contact.name': 'Tên của bạn',
    'contact.email': 'Email của bạn',
    'contact.message': 'Lời nhắn',
    'contact.send': 'GỬI TIN NHẮN',
    'contact.success': 'Đã gửi thành công! Cảm ơn bạn.',
    'contact.required': 'Bắt buộc nhập',
    
    'job.present': 'Hiện tại',
    'job.staff': 'Nhân viên',
    'job.lx.desc': 'Điều phối container xuất khẩu (Tài khoản chính: LG Electronics): Lên kế hoạch và cấp lệnh đóng hàng/giao container cho thành phẩm từ nhà máy LG Electronics; tối ưu hóa quy trình hậu cần để đảm bảo điều phối đúng hạn.',
    
    'job.4p.time': 'Tháng 3 2025 – Tháng 4 2026',
    'job.4p.subtitle': 'Kiểm toán QA',
    'job.4p.bullets': [
      "Quản lý các đợt kiểm toán LPA hàng ngày.",
      "Giám sát các đợt kiểm toán ESD hàng tuần và hàng tháng (nội bộ/bên ngoài).",
      "Quản lý các đợt kiểm toán quy trình nội bộ và bên ngoài.",
      "Duy trì tài liệu FI11.",
      "Quản lý CP/PFMEA và chuẩn bị các báo cáo PFMEA Ngược cho các sản phẩm của Renault."
    ],
    
    'job.mia.time': 'Tháng 9 2022 – Tháng 2 2025',
    'job.mia.subtitle': 'Chuyên viên Digital Marketing',
    'job.mia.bullets': [
      "Xây dựng và phát triển các kênh mạng xã hội: A box of Mia (1.6K likes), Vali size S (854 likes), IG @aboxofmia (1063 followers).",
      "Quản lý 3 trang Facebook (Giáo dục, Du học, Blog).",
      "Chạy quảng cáo Facebook Ads, lên lịch đăng bài và xử lý các vấn đề nội dung.",
      "Tư vấn các chương trình học và cơ hội du học.",
      "Quản lý lượng học viên trung bình từ 150-180 người.",
      "Tham gia giảng dạy cho học viên từ 5-10 tuổi sau khi đạt chứng chỉ IELTS 5.0."
    ],
    
    'job.vds.time': 'Tháng 12 2023 – Tháng 5 2024',
    'job.vds.subtitle': 'Chuyên viên Digital Marketing',
    'job.vds.bullets': [
      "Xây dựng và phát triển kênh mạng xã hội: Cá Voi Thở (438 likes, 616 followers).",
      "Quản lý trang Facebook cho tổ chức phi lợi nhuận về tư vấn nghề nghiệp tại Hải Phòng.",
      "Chạy các chiến dịch quảng cáo để tăng cường tương tác và độ phủ sóng."
    ],
    
    'job.hpu.time': 'Tháng 9 2019 – 2023',
    'job.hpu.title': 'Đại học Hải Phòng',
    'job.hpu.subtitle': 'Cử nhân Công nghệ Thông tin',
    'job.hpu.bullets': [
      "Chuyên ngành: Công nghệ Thông tin.",
      "Chứng chỉ ngoại ngữ: IELTS 5.0.",
      "Kỹ năng cốt lõi: Phân tích hệ thống, phát triển front-end cơ bản, quản trị mạng và xử lý sự cố kỹ thuật."
    ],
    
    'btn.close': '✕ ĐÓNG'
  },
  en: {
    'nav.edu': 'EDU & WORK',
    'nav.visual': 'VISUAL SPACES',
    'nav.net': 'NETWORKS',
    'nav.bank': 'BANKING',
    'nav.contact': 'CONTACT',
    
    'header.location': '📍An Duong, Hai Phong city, Vietnam',
    'header.callme': 'CALL ME',
    
    'section.edu': '౨ৎ EDUCATION & WORK',
    'section.visual': '౨ৎ VISUAL SPACES',
    'section.net': '౨ৎ NETWORKS & CONTACTS',
    'section.bank': '౨ৎ BANKING DETAILED (CLICK TO COPY)',
    
    'bank.copied': 'Copied: ',
    
    'contact.title': 'SEND ME A MESSAGE',
    'contact.name': 'Your Name',
    'contact.email': 'Your Email',
    'contact.message': 'Message',
    'contact.send': 'SEND MESSAGE',
    'contact.success': 'Message sent successfully! Thank you.',
    'contact.required': 'Required',
    
    'job.present': 'Present',
    'job.staff': 'Staff',
    'job.lx.desc': 'Outbound Container Coordinator (Key Account: LG Electronics): Plan and issue container stuffing/delivery orders specifically for finished goods from LG Electronics factory; streamline outbound logistics workflows to ensure on-time dispatch and shipment integrity.',
    
    'job.4p.time': 'Mar 2025 – Apr 2026',
    'job.4p.subtitle': 'QA Audit',
    'job.4p.bullets': [
      "Managed daily LPA audits.",
      "Oversaw weekly and monthly ESD audits (internal/external).",
      "Managed internal and external process audits.",
      "Maintained FI11 documentation.",
      "Managed CP/PFMEA and prepared Reverse PFMEA reports for Renault products."
    ],
    
    'job.mia.time': 'Sep 2022 – Feb 2025',
    'job.mia.subtitle': 'Digital Marketing Executive',
    'job.mia.bullets': [
      "Built and grew social media channels: A box of Mia (1.6K likes), Vali size S (854 likes), IG @aboxofmia (1063 followers).",
      "Managed three Facebook pages (Education, Study Abroad, Blog).",
      "Ran Facebook Ads, scheduled posts, and handled content-related issues.",
      "Provided consultation for study programs and study abroad opportunities.",
      "Oversaw a student base of 150–180 on average.",
      "After obtaining an IELTS 5.0 certificate, took on a teaching role for students aged 5–10."
    ],
    
    'job.vds.time': 'Dec 2023 – May 2024',
    'job.vds.subtitle': 'Digital Marketing Executive',
    'job.vds.bullets': [
      "Built and grew social media channels: Cá Voi Thở (438 likes, 616 followers).",
      "Managed a Facebook page for a nonprofit organization focused on career counseling and digital content creation in Hai Phong.",
      "Ran advertising campaigns to boost engagement and reach."
    ],
    
    'job.hpu.time': 'Sep 2019 – 2023',
    'job.hpu.title': 'Hai Phong University',
    'job.hpu.subtitle': 'Bachelor of Information Technology',
    'job.hpu.bullets': [
      "Major: Information Technology.",
      "Language certification: 5.0 IELTS.",
      "Core skills developed: Systems analysis, basic front-end development, network management, and technical troubleshooting."
    ],
    
    'btn.close': '✕ CLOSE'
  }
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>('en'); // default english based on original HTML

  const toggleLang = () => {
    setLang(prev => prev === 'vi' ? 'en' : 'vi');
  };

  const t = (key: string) => {
    return (translations[lang] as any)[key] || key;
  };

  return (
    <I18nContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
};
