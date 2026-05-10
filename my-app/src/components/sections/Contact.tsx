import { useState } from 'react';
import { useInView } from '../../hooks/useApi';
import { useContactForm } from '../../hooks/useApi';
import { contactFormSchema, SERVICE_TYPE_LABELS, type ContactFormData } from '../../lib/validators';

const CONTACT_INFO = [
  {
    icon: '📍',
    label: 'Address',
    value: 'Visakhapatnam, Andhra Pradesh, India',
    sub: 'Serving all of South India',
  },
  {
    icon: '📞',
    label: 'Phone',
    value: '+91 83092 27037',
    sub: 'Mon – Sat, 9AM – 6PM IST',
  },
  {
    icon: '✉️',
    label: 'Email',
    value: 'info@srianui.com',
    sub: 'We reply within 24 hours',
  },
  {
    icon: '🕐',
    label: 'Working Hours',
    value: 'Mon – Sat: 9AM – 6PM',
    sub: 'Sunday: Emergency support only',
  },
];

const EMPTY_FORM: ContactFormData = {
  name: '', email: '', phone: '', subject: '',
  serviceType: 'ROOFTOP_SOLAR', message: '',
};

type FormErrors = Partial<Record<keyof ContactFormData, string>>;

export default function Contact() {
  const { ref, inView } = useInView();
  const { submit, submitting, submitted, error, reset } = useContactForm();

  const [form, setForm]     = useState<ContactFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactFormSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((err) => {
        const key = err.path[0] as keyof ContactFormData;
        if (!fieldErrors[key]) fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    await submit(result.data);
  };

  const handleReset = () => {
    reset();
    setForm(EMPTY_FORM);
    setErrors({});
  };

  return (
    <section id="contact" className="bg-white py-24 px-5">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={ref} className={`mb-14 transition-all duration-700
          ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <span className="section-tag">Request Estimate</span>
          <h2 className="section-title">Request a Professional Project Quote</h2>
          <p className="section-body">
            Complete this enquiry to receive a tailored proposal, estimated budget,
            and delivery timeline from our solar engineering team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {CONTACT_INFO.map((info) => (
              <div
                key={info.label}
                className="flex gap-4 p-5 bg-surface-soft rounded-2xl border border-surface-border
                  hover:shadow-card transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-green-light flex items-center
                  justify-center text-xl flex-shrink-0">
                  {info.icon}
                </div>
                <div>
                  <div className="font-heading font-700 text-brand-green text-xs tracking-widest uppercase mb-0.5">
                    {info.label}
                  </div>
                  <div className="font-heading font-600 text-text-primary text-sm">
                    {info.value}
                  </div>
                  <div className="text-text-muted text-xs font-body mt-0.5">{info.sub}</div>
                </div>
              </div>
            ))}

            <div className="rounded-3xl bg-white shadow-card border border-surface-border p-6 mt-2">
              <div className="font-heading font-700 text-text-primary text-sm uppercase tracking-[0.28em] mb-3">
                Quote guidance
              </div>
              <ul className="space-y-3 text-sm text-text-muted font-body leading-relaxed">
                <li>• Share your project location, capacity requirements, and timeline.</li>
                <li>• Our team provides a bespoke estimate within 24 hours.</li>
                <li>• Confidential review with no obligation to proceed.</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="bg-brand-green-light border border-brand-green/20 rounded-3xl
                p-12 text-center flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-brand-green flex items-center
                  justify-center text-white text-3xl shadow-brand">
                  ✓
                </div>
                <h3 className="font-display text-2xl font-700 text-brand-green-dark">
                  Message Sent!
                </h3>
                <p className="text-text-secondary text-sm font-body max-w-xs leading-relaxed">
                  Thank you for reaching out. Our team will contact you within 24 hours
                  for your free site assessment.
                </p>
                <button onClick={handleReset} className="btn-outline mt-2">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-surface-soft rounded-3xl p-8 border border-surface-border"
                noValidate
              >
                {/* Error banner */}
                {error && (
                  <div className="mb-5 bg-red-50 border border-red-200 rounded-xl p-4
                    text-red-600 text-sm font-body">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="form-label">Full Name *</label>
                    <input
                      id="name" name="name" type="text"
                      value={form.name} onChange={handleChange}
                      placeholder="Company or Individual Name"
                      className={`form-input ${errors.name ? 'border-red-400' : ''}`}
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="form-label">Email Address *</label>
                    <input
                      id="email" name="email" type="email"
                      value={form.email} onChange={handleChange}
                      placeholder="you@company.com"
                      className={`form-input ${errors.email ? 'border-red-400' : ''}`}
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="form-label">Phone Number *</label>
                    <input
                      id="phone" name="phone" type="tel"
                      value={form.phone} onChange={handleChange}
                      placeholder="+91 83092 27037"
                      className={`form-input ${errors.phone ? 'border-red-400' : ''}`}
                    />
                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                  </div>

                  {/* Service Type */}
                  <div>
                    <label htmlFor="serviceType" className="form-label">Service Needed *</label>
                    <select
                      id="serviceType" name="serviceType"
                      value={form.serviceType} onChange={handleChange}
                      className="form-input"
                    >
                      {(Object.entries(SERVICE_TYPE_LABELS) as [ContactFormData['serviceType'], string][]).map(
                        ([val, label]) => (
                          <option key={val} value={val}>{label}</option>
                        )
                      )}
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div className="mb-4">
                  <label htmlFor="subject" className="form-label">Subject *</label>
                  <input
                    id="subject" name="subject" type="text"
                    value={form.subject} onChange={handleChange}
                      placeholder="Project title or inquiry summary"
                    className={`form-input ${errors.subject ? 'border-red-400' : ''}`}
                  />
                  {errors.subject && <span className="form-error">{errors.subject}</span>}
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label htmlFor="message" className="form-label">Message *</label>
                  <textarea
                    id="message" name="message" rows={4}
                    value={form.message} onChange={handleChange}
                    placeholder="Tell us about your project — location, load details, roof area, or any specific requirements…"
                    className={`form-input resize-none ${errors.message ? 'border-red-400' : ''}`}
                  />
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full justify-center py-4 text-sm disabled:opacity-60
                    disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Requesting Quote…
                    </span>
                  ) : (
                    'Request Quote & Send →'
                  )}
                </button>

                <p className="text-text-muted text-xs text-center mt-3 font-body">
                  No spam. We'll only contact you about your enquiry.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}