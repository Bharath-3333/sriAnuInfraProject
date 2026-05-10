import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number is too long')
    .regex(/^[+\d\s\-()]+$/, 'Please enter a valid phone number'),
  subject: z
    .string()
    .min(3, 'Subject must be at least 3 characters')
    .max(150, 'Subject is too long'),
  serviceType: z.enum([
    'ROOFTOP_SOLAR',
    'GROUND_MOUNT',
    'NET_METERING',
    'MAINTENANCE',
    'CONSULTATION',
    'OTHER',
  ]),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message is too long'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const SERVICE_TYPE_LABELS: Record<ContactFormData['serviceType'], string> = {
  ROOFTOP_SOLAR:  'Rooftop Solar Installation',
  GROUND_MOUNT:   'Ground Mount Solar Plant',
  NET_METERING:   'Net Metering Setup',
  MAINTENANCE:    'O&M / Maintenance',
  CONSULTATION:   'Technical Consultation',
  OTHER:          'Other',
};