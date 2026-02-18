/*
 * Waldhotel Bad Essen – Contact Form Component
 * Design: "Waldstille" – Japandi Minimalism
 * Uses tRPC to submit messages to the backend with owner notification
 */
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export default function ContactForm() {
  const { lang, t } = useLanguage();
  const cf = t.contactForm;

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    },
    onError: () => {
      setStatus('error');
    },
  });

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!formData.name || formData.name.length < 2) {
      newErrors.name = cf.nameRequired;
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = cf.emailRequired;
    }
    if (!formData.message || formData.message.length < 10) {
      newErrors.message = cf.messageRequired;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');
    setErrors({});
    submitMutation.mutate({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      subject: formData.subject || undefined,
      message: formData.message,
      lang,
    });
  }

  function handleChange(field: keyof FormData, value: string) {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error on change
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white border border-[#C8A96E]/20 rounded-sm p-8 md:p-12 text-center">
        <CheckCircle className="w-12 h-12 text-[#28863E] mx-auto mb-4" />
        <p className="text-[#253541] text-lg font-heading">{cf.success}</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm text-[#C8A96E] hover:text-[#253541] transition-colors duration-300 underline underline-offset-4"
        >
          {lang === 'de' ? 'Weitere Nachricht senden' : 'Send another message'}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#C8A96E]/20 rounded-sm p-8 md:p-12">
      <h3 className="font-heading text-2xl md:text-3xl text-[#253541] mb-2">{cf.title}</h3>
      <p className="text-[#253541]/60 text-sm mb-8">{cf.subtitle}</p>

      {status === 'error' && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-sm p-4 mb-6">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{cf.error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name & Email row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="contact-name" className="block text-xs tracking-[0.1em] uppercase text-[#253541]/60 mb-2">
              {cf.name} *
            </label>
            <input
              id="contact-name"
              type="text"
              value={formData.name}
              onChange={e => handleChange('name', e.target.value)}
              className={`w-full px-4 py-3 bg-[#F8F6F3] border ${errors.name ? 'border-red-400' : 'border-[#C8A96E]/20'} rounded-sm text-[#253541] text-sm focus:outline-none focus:border-[#C8A96E] transition-colors duration-300`}
              placeholder={cf.name}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="contact-email" className="block text-xs tracking-[0.1em] uppercase text-[#253541]/60 mb-2">
              {cf.email} *
            </label>
            <input
              id="contact-email"
              type="email"
              value={formData.email}
              onChange={e => handleChange('email', e.target.value)}
              className={`w-full px-4 py-3 bg-[#F8F6F3] border ${errors.email ? 'border-red-400' : 'border-[#C8A96E]/20'} rounded-sm text-[#253541] text-sm focus:outline-none focus:border-[#C8A96E] transition-colors duration-300`}
              placeholder={cf.email}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>
        </div>

        {/* Phone & Subject row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="contact-phone" className="block text-xs tracking-[0.1em] uppercase text-[#253541]/60 mb-2">
              {cf.phone}
            </label>
            <input
              id="contact-phone"
              type="tel"
              value={formData.phone}
              onChange={e => handleChange('phone', e.target.value)}
              className="w-full px-4 py-3 bg-[#F8F6F3] border border-[#C8A96E]/20 rounded-sm text-[#253541] text-sm focus:outline-none focus:border-[#C8A96E] transition-colors duration-300"
              placeholder={cf.phone}
            />
          </div>
          <div>
            <label htmlFor="contact-subject" className="block text-xs tracking-[0.1em] uppercase text-[#253541]/60 mb-2">
              {cf.subject}
            </label>
            <input
              id="contact-subject"
              type="text"
              value={formData.subject}
              onChange={e => handleChange('subject', e.target.value)}
              className="w-full px-4 py-3 bg-[#F8F6F3] border border-[#C8A96E]/20 rounded-sm text-[#253541] text-sm focus:outline-none focus:border-[#C8A96E] transition-colors duration-300"
              placeholder={cf.subjectPlaceholder}
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="contact-message" className="block text-xs tracking-[0.1em] uppercase text-[#253541]/60 mb-2">
            {cf.message} *
          </label>
          <textarea
            id="contact-message"
            rows={5}
            value={formData.message}
            onChange={e => handleChange('message', e.target.value)}
            className={`w-full px-4 py-3 bg-[#F8F6F3] border ${errors.message ? 'border-red-400' : 'border-[#C8A96E]/20'} rounded-sm text-[#253541] text-sm focus:outline-none focus:border-[#C8A96E] transition-colors duration-300 resize-vertical`}
            placeholder={cf.messagePlaceholder}
          />
          {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center gap-2 bg-[#28863E] text-white px-8 py-3.5 text-sm tracking-wider uppercase hover:bg-[#253541] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {cf.sending}
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              {cf.send}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
