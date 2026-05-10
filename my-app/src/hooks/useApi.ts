import { useEffect, useState, useRef, useCallback } from 'react';
import { projectsApi, contactApi } from '../lib/api';
import type { Project, CompanyStats } from '../types';
import type { ContactFormData } from '../lib/validators';
import type { AxiosResponse } from 'axios';

// ─── useProjects ──────────────────────────────────────────────────────────────
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    projectsApi
      .getAll()
      .then((res: AxiosResponse) => setProjects(res.data.data))
      .catch(() => setError('Failed to load projects'))
      .finally(() => setLoading(false));
  }, []);

  return { projects, loading, error };
}

// ─── useStats ─────────────────────────────────────────────────────────────────
export function useStats() {
  const [stats, setStats] = useState<CompanyStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectsApi
      .getStats()
      .then((res: AxiosResponse) => setStats(res.data.data))
      .catch(() =>
        setStats({
          totalProjects: 19,
          totalCapacityKw: 16104,
          totalAnnualKwh: 22500000,
          yearsOfExperience: 5,
        })
      )
      .finally(() => setLoading(false));
  }, []);

  return { stats, loading };
}

// ─── useContactForm ───────────────────────────────────────────────────────────
export function useContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [error, setError]           = useState<string | null>(null);

  const submit = useCallback(async (data: ContactFormData) => {
    setSubmitting(true);
    setError(null);
    try {
      await contactApi.submit(data);
      setSubmitted(true);
    } catch {
      setError('Failed to send your message. Please try again or call us directly.');
    } finally {
      setSubmitting(false);
    }
  }, []);

  const reset = useCallback(() => {
    setSubmitted(false);
    setError(null);
  }, []);

  return { submit, submitting, submitted, error, reset };
}

// ─── useScrollSpy ─────────────────────────────────────────────────────────────
export function useScrollSpy(sectionIds: string[], offset = 80) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + offset + 10;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollY) {
          setActiveId(sectionIds[i]);
          return;
        }
      }
      setActiveId('');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeId;
}

// ─── useCountUp ──────────────────────────────────────────────────────────────
export function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration, start]);

  return count;
}

// ─── useIntersectionObserver ──────────────────────────────────────────────────
export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}