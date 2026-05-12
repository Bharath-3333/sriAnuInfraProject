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
    value: 'Srianuinfra@gmail.com',
    sub: 'We reply within 24 hours',
  },
  {
    icon: '🕐',
    label: 'Working Hours',
    value: 'Mon – Sat: 9AM – 6PM',
    sub: 'Sunday: Emergency support only',
  },
];

const WHATSAPP_NUMBER = '918309227037'; // E.164 format without '+' for wa.me

/**
 * Multiple professional WhatsApp message templates.
 * One is selected at random each time the form is submitted
 * so the conversation opener feels fresh and personal.
 */
const WA_MESSAGE_TEMPLATES: Array<(data: ContactFormData, serviceLabel: string) => string> = [
  (data, serviceLabel) => `
Good day, Sri Anu Infrastructure team!

I recently submitted an enquiry through your website and would like to follow up directly. Here are my details for your reference:

• Name     : ${data.name}
• Email    : ${data.email}
• Phone    : ${data.phone}
• Service  : ${serviceLabel}
• Subject  : ${data.subject}

Project brief:
${data.message}

Looking forward to hearing from you at your earliest convenience. Thank you.
`.trim(),

  (data, serviceLabel) => `
Hello Sri Anu Infrastructure,

I just filled out the contact form on your website regarding *${data.subject}* and wanted to reach out here as well for a quicker response.

My contact details:
👤 ${data.name}
📧 ${data.email}
📱 ${data.phone}
🔧 Service required: ${serviceLabel}

Additional details:
${data.message}

Please let me know the next steps. Thank you!
`.trim(),

  (data, serviceLabel) => `
Hi Sri Anu Infrastructure Team,

Hope you're doing well. I submitted a project enquiry on your website and I'm keen to get a quote at the earliest. Here's a quick summary:

Name    : ${data.name}
Email   : ${data.email}
Phone   : ${data.phone}
Service : ${serviceLabel}
Subject : ${data.subject}

Brief:
${data.message}

Kindly review and revert with a suitable time to connect. Thank you!
`.trim(),

  (data, serviceLabel) => `
Greetings from ${data.name}!

I've submitted a service request on the Sri Anu Infrastructure website and am following up via WhatsApp for a faster connect.

📋 Enquiry Summary
━━━━━━━━━━━━━━━━
Name    : ${data.name}
Email   : ${data.email}
Phone   : ${data.phone}
Service : ${serviceLabel}
Subject : ${data.subject}

Message:
${data.message}

I look forward to your response. Have a great day!
`.trim(),
];

/** Picks a random WhatsApp message template and opens the chat. */
function openWhatsApp(data: ContactFormData): void {
  const serviceLabel =
    SERVICE_TYPE_LABELS[data.serviceType as keyof typeof SERVICE_TYPE_LABELS] ?? data.serviceType;

  const template =
    WA_MESSAGE_TEMPLATES[Math.floor(Math.random() * WA_MESSAGE_TEMPLATES.length)];
  const message = template(data, serviceLabel);

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Contextual, human-readable submission error messages.
 * Maps common error signals to helpful, specific guidance.
 */
const SUBMISSION_ERROR_MESSAGES: Array<{ match: (msg: string) => boolean; text: string }> = [
  {
    match: (m) => /network|fetch|failed to fetch/i.test(m),
    text: `'It looks like there's a network issue on our end. Please check your internet connection and try again, or reach us directly on WhatsApp.`,
  },
  {
    match: (m) => /timeout|timed out/i.test(m),
    text: 'The request took too long to complete. Our servers may be busy — please try again in a moment.',
  },
  {
    match: (m) => /500|server error|internal/i.test(m),
    text: 'Something went wrong on our server. Our team has been notified. Please try again shortly or contact us directly.',
  },
  {
    match: (m) => /400|bad request|invalid/i.test(m),
    text: 'Some of the information submitted appears to be invalid. Please review your details and try again.',
  },
  {
    match: (m) => /429|rate limit|too many/i.test(m),
    text: `'You've submitted several requests in a short time. Please wait a few minutes before trying again.'`,
  },
  {
    match: (m) => /email/i.test(m),
    text: 'There was an issue with the email address provided. Please double-check it and resubmit.',
  },
  {
    match: (m) => /phone/i.test(m),
    text: `'The phone number you entered doesn't appear to be valid. Please verify and try again.'`,
  },
];

/** Returns a contextual error message based on the raw error string. */
function resolveErrorMessage(raw: string): string {
  const matched = SUBMISSION_ERROR_MESSAGES.find((rule) => rule.match(raw));
  return (
    matched?.text ??
    'We were unable to submit your enquiry at this time. Please try again or reach us directly on WhatsApp or via email at srianuinfra@gmail.com.'
  );
}

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

    // Open WhatsApp only on successful submission.
    // If the hook set `error`, `submitted` stays false and we bail out below
    // via the conditional render — WhatsApp never opens on failure.
    openWhatsApp(result.data);
  };

  const handleReset = () => {
    reset();
    setForm(EMPTY_FORM);
    setErrors({});
  };

  // Resolve a human-friendly, context-aware error message if the hook reports one.
  const friendlyError = error ? resolveErrorMessage(error) : null;

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
                  Enquiry Submitted Successfully!
                </h3>
                <p className="text-text-secondary text-sm font-body max-w-xs leading-relaxed">
                  Thank you for reaching out to Sri Anu Infrastructure. A WhatsApp chat has been
                  opened with your details — our team will respond within 24 hours for your
                  complimentary site assessment.
                </p>
                {/* Fallback CTA if the user closed the WhatsApp tab */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-2 inline-flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Re-open WhatsApp Chat
                </a>
                <button onClick={handleReset} className="btn-outline mt-1">
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-surface-soft rounded-3xl p-8 border border-surface-border"
                noValidate
              >
                {/* Contextual error banner */}
                {friendlyError && (
                  <div className="mb-5 bg-red-50 border border-red-200 rounded-xl p-4
                    text-red-600 text-sm font-body leading-relaxed">
                    {friendlyError}
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
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Submitting Enquiry…
                    </span>
                  ) : (
                    'Request Quote & Send →'
                  )}
                </button>

                <p className="text-text-muted text-xs text-center mt-3 font-body">
                  No spam. We'll only contact you regarding your project enquiry.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}