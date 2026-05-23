"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowUp,
  ArrowUpRight,
  BadgeCheck,
  Brush,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Gem,
  Mail,
  MessageCircleHeart,
  Moon,
  Newspaper,
  Palette,
  PenLine,
  Scissors,
  Sparkles,
  Star,
  Sun,
  Users,
  WandSparkles,
} from "lucide-react";

type Theme = "dark" | "light";
type BlogKey = "cuts" | "beard" | "color";

const services = [
  {
    title: "Precision Haircut",
    value: "Men's precision cut",
    text: "Shape, texture, neckline, wash, and finish.",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=700&q=86",
    icon: Scissors,
  },
  {
    title: "Color Consultation",
    value: "Color consultation",
    text: "Tone planning, hair history, and shade direction.",
    image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=700&q=86",
    icon: Palette,
  },
  {
    title: "Beard Sculpting",
    value: "Beard sculpting",
    text: "Line-up, taper, hot towel detail, and shape.",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=700&q=86",
    icon: BadgeCheck,
  },
  {
    title: "Full Grooming",
    value: "Full grooming package",
    text: "Cut, beard, wash, finish, and product guidance.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=86",
    icon: WandSparkles,
  },
];

const team = [
  {
    name: "Marcus Hale",
    role: "Senior Barber",
    specialty: "Skin fades, beard structure, and executive grooming.",
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=520&q=86",
  },
  {
    name: "Elena Voss",
    role: "Color Specialist",
    specialty: "Dimensional brunette, glossy blondes, and soft correction.",
    image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=520&q=86",
  },
  {
    name: "Noah Grant",
    role: "Cut & Finish",
    specialty: "Textured shapes, long layers, blowout, and finish work.",
    image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=520&q=86",
  },
];

const testimonialSlides = [
  [
    {
      name: "Daniel K.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=220&q=86",
      quote:
        "Best fade I have had in years. They checked how I style my hair for work, fixed the neckline properly, and gave me a product suggestion that actually made sense. The cut still looked clean after two weeks.",
    },
    {
      name: "Amelia R.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=220&q=86",
      quote:
        "The color consultation felt premium and honest. They looked at my old dye, explained the warm tones, and suggested a softer plan instead of rushing me into bleach. I left trusting the process.",
    },
  ],
  [
    {
      name: "Jonas M.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=220&q=86",
      quote:
        "Booking was simple, and the barber replied with a better time window the same day. The beard shape was clean without looking overdone, and the hot towel finish made it feel properly premium.",
    },
    {
      name: "Marco P.",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=220&q=86",
      quote:
        "I came in with a vague reference and they translated it into a cut that fit my face and morning routine. The team feels calm, sharp, and very professional from start to finish.",
    },
  ],
];

const blogs: Record<BlogKey, { title: string; preview: string; body: string; image: string }> = {
  cuts: {
    title: "How often should you cut?",
    preview:
      "A simple guide based on hair length and style. Learn how fades, medium cuts, and longer shapes need different maintenance rhythms.",
    body:
      "Short fades usually need a refresh every two to three weeks. Medium styles can wait four to six weeks, while longer layered cuts often hold for six to eight weeks. The best schedule depends on neckline growth, hair texture, and how polished you want the shape to stay.",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=700&q=86",
  },
  beard: {
    title: "Beard shape by face type",
    preview:
      "What to ask for when you sit down. A subtle beard adjustment can sharpen the jaw, balance cheeks, or soften longer face shapes.",
    body:
      "A rounder face usually benefits from a tighter cheek line and more length at the chin. A longer face often looks better with fuller sides and less chin length. Bring a reference, but let the barber adjust the geometry to your actual jaw and growth pattern.",
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=700&q=86",
  },
  color: {
    title: "Color consult checklist",
    preview:
      "Bring these details before changing tone. Color works best when the stylist knows your past dye, heat habits, and upkeep plan.",
    body:
      "Before changing color, know your recent dye history, heat styling habits, maintenance budget, and how often you can return. Good color work starts with honesty about the current hair condition, then moves into shade, tone, and aftercare.",
    image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=700&q=86",
  },
};

function SectionAccent({ kind }: { kind: string }) {
  const icons = useMemo(() => {
    const map: Record<string, [typeof Scissors, typeof Sparkles]> = {
      hero: [Scissors, Sparkles],
      about: [Gem, CalendarDays],
      services: [Brush, Star],
      team: [Users, Star],
      testimonials: [MessageCircleHeart, Sparkles],
      booking: [CalendarDays, Mail],
      blogs: [Newspaper, PenLine],
    };
    return map[kind] ?? [Sparkles, Star];
  }, [kind]);
  const [First, Second] = icons;
  return (
    <div className={`section-accent accent-${kind}`} aria-hidden="true">
      <First />
      <Second />
      <span />
      <span />
    </div>
  );
}

export function SalonLanding() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [activeBlog, setActiveBlog] = useState<BlogKey | null>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("veloura-theme") as Theme | null;
    setTheme(saved === "light" ? "light" : "dark");
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("veloura-theme", theme);
  }, [theme]);

  useEffect(() => {
    const revealItems = document.querySelectorAll(".reveal-left, .reveal-right, .reveal-up");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 1.2);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const chooseService = (service: string) => {
    setSelectedService(service);
    scrollTo("#booking");
  };

  return (
    <main className="overflow-hidden selection:bg-[#c89a52] selection:text-[#18120f]">
      <header className="surface fixed left-1/2 top-3 z-50 flex w-[min(1180px,calc(100%-24px))] -translate-x-1/2 items-center justify-between gap-3 rounded-full border border-white/10 bg-[#18120f]/80 p-2 shadow-[0_18px_70px_rgba(11,7,5,.45)] backdrop-blur-xl motion">
        <button onClick={() => scrollTo("#home")} className="flex items-center gap-3 rounded-full motion hover:-translate-y-0.5" type="button">
          <span className="grid h-11 w-11 place-items-center rounded-full border border-[#c89a52]/60 bg-white/10 font-black text-[#e4c277]">V</span>
          <span className="leading-none text-left">
            <span className="block font-display text-xl font-black">Veloura</span>
            <span className="hidden text-[10px] font-black uppercase tracking-[.28em] text-[#e4c277] sm:block">Salon Atelier</span>
          </span>
        </button>
        <nav id="siteNav" className={`site-nav ${menuOpen ? "mobile-open" : ""} hidden items-center gap-6 text-sm font-extrabold text-white/70 md:flex`}>
          {[
            ["About", "#about"],
            ["Services", "#services"],
            ["Barbers", "#team"],
            ["Reviews", "#testimonials"],
            ["Booking", "#booking"],
            ["Blogs", "#blogs"],
          ].map(([label, href]) => (
            <button key={href} onClick={() => scrollTo(href)} className="nav-link" type="button">
              {label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button className="motion grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/10 text-[#e4c277] hover:-translate-y-0.5 hover:border-[#c89a52]/60" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme" type="button">
            {theme === "dark" ? <Sun /> : <Moon />}
          </button>
          <button onClick={() => scrollTo("#booking")} className="hidden rounded-full bg-gradient-to-r from-[#e4c277] to-[#c89a52] px-5 py-3 text-sm font-black text-[#18120f] shadow-[0_16px_36px_rgba(200,154,82,.25)] motion hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(200,154,82,.38)] sm:inline-flex" type="button">
            Book Now
          </button>
          <button id="menuButton" type="button" className="hamburger grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/10 motion hover:-translate-y-0.5 hover:border-[#c89a52]/60 md:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <section id="home" className="relative grid min-h-screen items-center px-5 pb-16 pt-32 sm:px-8 lg:px-10">
        <SectionAccent kind="hero" />
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[.95fr_1.05fr]">
          <div className="reveal-left relative z-10 text-center lg:text-left">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[.18em] text-[#e4c277] backdrop-blur motion hover:-translate-y-0.5 hover:border-[#c89a52]/60"><Sparkles className="h-4 w-4" /> Cuts, color, grooming</div>
            <h1 className="font-display text-[clamp(42px,6vw,80px)] font-black leading-[.98] tracking-normal text-balance">A polished salon visit, made easy to book.</h1>
            <p className="muted mx-auto mt-6 max-w-2xl text-base leading-8 text-white/70 lg:mx-0">Precision cuts, dimensional color, beard sculpting, and consultation-first service for clients who want to look sharp without guessing.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <button onClick={() => scrollTo("#booking")} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#e4c277] to-[#c89a52] px-6 font-black text-[#18120f] shadow-[0_22px_70px_rgba(200,154,82,.25)] motion hover:-translate-y-1" type="button">Reserve Chair <ArrowUpRight className="h-5 w-5" /></button>
              <button onClick={() => scrollTo("#services")} className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/10 bg-white/10 px-6 font-black text-white backdrop-blur motion hover:-translate-y-1 hover:border-[#c89a52]/60 hover:bg-white/15" type="button">View Services</button>
            </div>
          </div>
          <div className="reveal-right relative min-h-[430px] lg:min-h-[620px]">
            <img className="absolute left-[8%] top-[5%] h-[78%] w-[78%] rounded-[30px] border border-white/10 object-cover shadow-[0_34px_100px_rgba(11,7,5,.46)] motion hover:scale-[1.015]" src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1300&q=88" alt="Elegant salon interior" />
            <img className="absolute right-0 top-0 w-[38%] rounded-3xl border-[7px] border-[#241a15] object-cover shadow-2xl motion hover:-translate-y-2 hover:rotate-2" src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=520&q=86" alt="Salon tools" />
            <img className="absolute bottom-0 left-0 w-[42%] rounded-3xl border-[7px] border-[#241a15] object-cover shadow-2xl motion hover:translate-y-2 hover:-rotate-2" src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=520&q=86" alt="Barber styling hair" />
          </div>
        </div>
      </section>

      <section id="about" className="relative px-5 py-24 sm:px-8 lg:px-10">
        <SectionAccent kind="about" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <div className="reveal-left relative"><img className="aspect-[.9] w-full rounded-[30px] border border-white/10 object-cover shadow-[0_34px_100px_rgba(11,7,5,.42)] motion hover:scale-[1.015]" src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=1000&q=86" alt="Salon artist styling hair" /></div>
          <div className="reveal-right"><p className="mb-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.18em] text-[#e4c277]"><Gem className="h-4 w-4" /> About Veloura</p><h2 className="font-display text-[clamp(36px,5vw,70px)] font-black leading-none">Designed like a private atelier. Run like a serious business.</h2><p className="muted mt-6 max-w-2xl leading-8 text-white/70">Veloura pairs editorial taste with practical systems: consultation notes, texture mapping, color history, finishing preferences, and aftercare guidance saved for every guest.</p></div>
        </div>
      </section>

      <section id="services" className="relative px-5 py-24 sm:px-8 lg:px-10">
        <SectionAccent kind="services" />
        <div className="reveal-up mx-auto max-w-3xl text-center"><p className="mb-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.18em] text-[#e4c277]"><Sparkles className="h-4 w-4" /> Our Services</p><h2 className="font-display text-[clamp(36px,5vw,70px)] font-black leading-none">Big-service salon care with clear choices.</h2><p className="muted mx-auto mt-5 max-w-2xl leading-8 text-white/70">Choose the result first. The barber or stylist can confirm timing and preparation after the request arrives.</p></div>
        <div className="mx-auto mt-12 grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.value} onClick={() => chooseService(service.value)} className={`service-option reveal-up group cursor-pointer overflow-hidden rounded-[28px] border border-white/10 bg-white/[.07] shadow-[0_24px_70px_rgba(11,7,5,.25)] motion hover:-translate-y-2 hover:border-[#c89a52]/60 hover:bg-white/[.1] ${selectedService === service.value ? "is-selected" : ""}`}>
                <img className="h-56 w-full object-cover motion group-hover:scale-105" src={service.image} alt={service.title} />
                <div className="p-5"><Icon className="mb-4 h-7 w-7 text-[#e4c277]" /><h3 className="text-lg font-black">{service.title}</h3><p className="muted mt-2 text-sm leading-7 text-white/65">{service.text}</p></div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="team" className="relative px-5 py-24 sm:px-8 lg:px-10">
        <SectionAccent kind="team" />
        <div className="reveal-up mx-auto max-w-3xl text-center"><p className="mb-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.18em] text-[#e4c277]"><Users className="h-4 w-4" /> Meet Our Barbers</p><h2 className="font-display text-[clamp(36px,5vw,70px)] font-black leading-none">Specialists behind the chair.</h2></div>
        <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-3">
          {team.map((member) => (
            <article key={member.name} className="reveal-up rounded-[28px] border border-white/10 bg-white/[.07] p-4 text-center motion hover:-translate-y-2 hover:border-[#c89a52]/60 hover:bg-white/[.1]"><img className="mx-auto h-52 w-full rounded-3xl object-cover" src={member.image} alt={member.name} /><h3 className="mt-5 text-xl font-black">{member.name}</h3><p className="mt-1 text-sm font-black uppercase tracking-[.14em] text-[#e4c277]">{member.role}</p><p className="muted mt-3 text-sm leading-7 text-white/65">{member.specialty}</p></article>
          ))}
        </div>
      </section>

      <section id="offer" className="relative px-5 py-16 sm:px-8 lg:px-10">
        <div className="banner-card reveal-up mx-auto max-w-7xl overflow-hidden rounded-[34px] border border-[#c89a52]/35 bg-gradient-to-r from-[#2b1e17] via-[#3a241c] to-[#6f4a2d] p-8 text-center shadow-[0_30px_90px_rgba(11,7,5,.36)] md:p-12">
          <p className="text-xs font-black uppercase tracking-[.2em] text-[#e4c277]">New client offer</p>
          <h2 className="mx-auto mt-3 max-w-3xl font-display text-[clamp(34px,5vw,64px)] font-black leading-none text-white">Book a consultation before your first cut or color.</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/75">Send your request and the barber can confirm whether the selected service, date, and style direction are right before you visit.</p>
          <button onClick={() => scrollTo("#booking")} className="motion mt-7 inline-flex min-h-14 items-center justify-center rounded-full bg-[#e4c277] px-7 font-black text-[#18120f] hover:-translate-y-1" type="button">Start Booking</button>
        </div>
      </section>

      <section id="testimonials" className="relative px-5 py-24 sm:px-8 lg:px-10">
        <SectionAccent kind="testimonials" />
        <div className="reveal-up mx-auto max-w-3xl text-center"><p className="mb-3 text-xs font-black uppercase tracking-[.18em] text-[#e4c277]">Testimonials</p><h2 className="font-display text-[clamp(36px,5vw,70px)] font-black leading-none">Clients leave ready for the week.</h2></div>
        <div className="reveal-up mx-auto mt-12 max-w-4xl">
          <div className="surface overflow-hidden rounded-[30px] border border-white/10 bg-white/[.07] shadow-[0_24px_70px_rgba(11,7,5,.25)]">
            <div className="flex motion" style={{ transform: `translateX(-${testimonialIndex * 100}%)` }}>
              {testimonialSlides.map((slide, slideIndex) => (
                <div key={slideIndex} className="grid min-w-full gap-5 p-5 md:grid-cols-2 sm:p-6">
                  {slide.map((review) => (
                    <blockquote key={review.name} className="rounded-[26px] bg-white/[.06] p-7 text-center"><img className="mx-auto mb-5 h-20 w-20 rounded-full border-4 border-[#e4c277]/50 object-cover" src={review.image} alt={review.name} /><p className="muted text-base leading-8 text-white/75">â€œ{review.quote}â€</p><cite className="mt-5 block font-black not-italic text-[#e4c277]">{review.name}</cite></blockquote>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 flex items-center justify-center gap-3">
            <button onClick={() => setTestimonialIndex((testimonialIndex - 1 + testimonialSlides.length) % testimonialSlides.length)} className="motion grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/10 hover:-translate-y-0.5 hover:border-[#c89a52]/60" type="button" aria-label="Previous testimonial"><ChevronLeft /></button>
            <div className="flex gap-2" aria-label="Testimonial slide indicators">{testimonialSlides.map((_, index) => <button key={index} onClick={() => setTestimonialIndex(index)} className={`motion h-2.5 w-2.5 rounded-full ${index === testimonialIndex ? "bg-[#e4c277]" : "bg-white/20"}`} aria-label={`Show testimonial ${index + 1}`} type="button" />)}</div>
            <button onClick={() => setTestimonialIndex((testimonialIndex + 1) % testimonialSlides.length)} className="motion grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/10 hover:-translate-y-0.5 hover:border-[#c89a52]/60" type="button" aria-label="Next testimonial"><ChevronRight /></button>
          </div>
        </div>
      </section>

      <section id="booking" className="relative px-5 py-24 sm:px-8 lg:px-10">
        <SectionAccent kind="booking" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <div className="reveal-left text-center lg:text-left"><p className="mb-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.18em] text-[#e4c277]"><CalendarDays className="h-4 w-4" /> Booking Appointment</p><h2 className="font-display text-[clamp(36px,5vw,70px)] font-black leading-none">Request a chair or consultation.</h2><p className="muted mx-auto mt-6 max-w-2xl leading-8 text-white/70 lg:mx-0">The form sends client details to the barber email through FormSubmit. In a future Next.js backend, this can become a Server Action or API route.</p>{selectedService && <p className="mt-4 rounded-2xl border border-[#c89a52]/40 bg-white/10 p-4 text-sm font-bold text-[#e4c277]">{selectedService} has been added. Now fill up your info to submit the booking request.</p>}</div>
          <form action="https://formsubmit.co/monniebcollins@gmail.com" method="POST" className="surface reveal-right rounded-[30px] border border-white/10 bg-white/[.07] p-5 shadow-[0_34px_100px_rgba(11,7,5,.35)] backdrop-blur motion hover:border-[#c89a52]/40 sm:p-7">
            <input type="hidden" name="_subject" value="New Veloura booking request" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            <div className="grid gap-4 md:grid-cols-2"><label className="form-label">Full name<input className="form-field" name="name" type="text" placeholder="Alex Morgan" required /></label><label className="form-label">Email<input className="form-field" name="email" type="email" placeholder="alex@email.com" required /></label></div>
            <div className="grid gap-4 md:grid-cols-2"><label className="form-label">Phone<input className="form-field" name="phone" type="tel" placeholder="+44 7000 000000" /></label><label className="form-label">Service<select className="form-field" name="service" required value={selectedService} onChange={(event) => setSelectedService(event.target.value)}><option value="">Select one</option>{services.map((service) => <option key={service.value}>{service.value}</option>)}</select></label></div>
            <div className="grid gap-4 md:grid-cols-2"><label className="form-label">Preferred date<input className="form-field" name="date" type="date" required /></label><label className="form-label">Preferred time<input className="form-field" name="time" type="time" required /></label></div>
            <label className="form-label">Appointment notes<textarea className="form-field" name="notes" rows={4} placeholder="Tell us hair length, target style, color history, or if this is just a consultation." /></label>
            <button type="submit" className="mt-3 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#e4c277] to-[#c89a52] px-6 font-black text-[#18120f] motion hover:-translate-y-1 hover:shadow-[0_26px_72px_rgba(200,154,82,.35)]">Send Booking Request <Mail className="h-5 w-5" /></button>
            <p className="muted mt-4 text-sm leading-7 text-white/60">Submits to monniebcollins@gmail.com using FormSubmit. On Vercel, this should work after email activation.</p>
          </form>
        </div>
      </section>

      <section id="blogs" className="relative px-5 py-24 sm:px-8 lg:px-10">
        <SectionAccent kind="blogs" />
        <div className="reveal-up mx-auto max-w-3xl text-center"><p className="mb-3 text-xs font-black uppercase tracking-[.18em] text-[#e4c277]">Blogs</p><h2 className="font-display text-[clamp(36px,5vw,70px)] font-black leading-none">Style notes from the chair.</h2></div>
        <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-3">
          {(Object.keys(blogs) as BlogKey[]).map((key) => (
            <article key={key} onClick={() => setActiveBlog(key)} className="reveal-up cursor-pointer overflow-hidden rounded-[28px] border border-white/10 bg-white/[.07] motion hover:-translate-y-2 hover:border-[#c89a52]/60" role="button" tabIndex={0}>
              <img className="h-56 w-full object-cover" src={blogs[key].image} alt={blogs[key].title} />
              <div className="min-h-[190px] p-6"><h3 className="text-xl font-black">{blogs[key].title}</h3><p className="muted mt-3 text-sm leading-7 text-white/65">{blogs[key].preview}</p></div>
            </article>
          ))}
        </div>
        {activeBlog && <div className="surface reveal-up is-visible mx-auto mt-8 max-w-4xl rounded-[28px] border border-[#c89a52]/40 bg-white/[.08] p-6 shadow-[0_24px_70px_rgba(11,7,5,.24)]"><button onClick={() => setActiveBlog(null)} className="motion mb-4 inline-flex rounded-full border border-white/10 px-4 py-2 text-sm font-black text-[#e4c277] hover:-translate-y-0.5 hover:border-[#c89a52]/60" type="button">Close article</button><h3 className="font-display text-3xl font-black">{blogs[activeBlog].title}</h3><p className="muted mt-4 leading-8 text-white/70">{blogs[activeBlog].body}</p></div>}
      </section>

      <footer className="surface border-t border-white/10 px-5 py-12 sm:px-8 lg:px-10">
        <div className="reveal-up mx-auto grid max-w-7xl gap-8 text-sm text-white/65 md:grid-cols-[1.2fr_.8fr_.8fr_1fr]">
          <div><strong className="font-display text-3xl text-white">Veloura</strong><p className="muted mt-3 leading-7">Salon Atelier for modern cuts, careful color, beard grooming, and appointment-first service.</p><div className="mt-5 flex gap-3"><a className="motion grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/10 text-[#e4c277] hover:-translate-y-1 hover:border-[#c89a52]/60" href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="3"/><path d="M17.5 6.5h.01"/></svg></a><a className="motion grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/10 text-[#e4c277] hover:-translate-y-1 hover:border-[#c89a52]/60" href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a><a className="motion grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/10 text-[#e4c277] hover:-translate-y-1 hover:border-[#c89a52]/60" href="https://www.twitter.com/" target="_blank" rel="noreferrer" aria-label="Twitter"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43 1s-4.1 1.8-6.4 4.9A4.48 4.48 0 0 0 12 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg></a></div></div>
          <div><h3 className="font-black text-white">Explore</h3><div className="mt-4 grid gap-3">{[["About", "#about"], ["Services", "#services"], ["Barbers", "#team"], ["Booking", "#booking"]].map(([label, href]) => <button key={href} className="motion text-left hover:text-[#e4c277]" onClick={() => scrollTo(href)} type="button">{label}</button>)}</div></div>
          <div><h3 className="font-black text-white">Hours</h3><p className="muted mt-4 leading-7">Tue - Sun<br />10:00 AM - 8:00 PM<br />Closed Monday</p></div>
          <div><h3 className="font-black text-white">Contact</h3><p className="muted mt-4 leading-7">Booking mail:<br />monniebcollins@gmail.com</p><p className="muted mt-3 leading-7">123 Atelier Lane<br />London, UK</p></div>
        </div>
        <div className="muted mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/45 md:flex-row md:items-center md:justify-between"><p>Â© 2026 Veloura Salon Atelier. All rights reserved.</p><p>Designed for booking-first salon experiences.</p></div>
      </footer>

      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className={`motion fixed bottom-5 right-5 z-50 h-12 w-12 place-items-center rounded-full border border-white/10 bg-[#e4c277] text-[#18120f] shadow-[0_18px_44px_rgba(11,7,5,.35)] hover:-translate-y-1 ${showTop ? "grid" : "hidden"}`} aria-label="Back to top" type="button"><ArrowUp /></button>
    </main>
  );
}
