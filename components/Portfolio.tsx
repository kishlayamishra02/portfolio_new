import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PORTFOLIO from '../data/content';
import { ContentItem } from '../types';
import Modal from './Modal';
import { Timeline } from './ui/timeline';
import { StaggerCertificates } from './ui/stagger-certificates';
import { ExpandableTabs, TabItem } from './ui/expandable-tabs';
import SkillsGlobe from '@/components/ui/skills-globe';
import { GooeyText } from '@/components/ui/gooey-text-morphing';
import {
    Home, Terminal, Cpu, GraduationCap, Trophy,
    History, Users, ShieldAlert, Zap, Briefcase, ArrowUpRight, Heart, ExternalLink,
    Rocket, Gamepad2, Code2, Phone
} from 'lucide-react';
import { LinkPreview } from './ui/link-preview';
import { GlowingEffect } from './ui/glowing-effect';
import {
    TextRevealCard,
    TextRevealCardDescription,
    TextRevealCardTitle,
} from './ui/text-reveal-card';

// ─── Scroll helper ────────────────────────────────────
const scrollTo = (id: string) => {
    if (id === 'home') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// ─── Icon map ─────────────────────────────────────────
const ICONS: Record<string, React.ReactNode> = {
    zap: <Zap size={16} />, users: <Users size={16} />,
    shield: <ShieldAlert size={16} />, history: <History size={16} />,
    briefcase: <Briefcase size={16} />, terminal: <Terminal size={16} />,
    graduation: <GraduationCap size={16} />, trophy: <Trophy size={16} />,
    rocket: <Rocket size={16} />, gamepad: <Gamepad2 size={16} />,
    code: <Code2 size={16} />,
};

// ─── Fade-up animation wrapper ───────────────────────
const FadeUp: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
    children, delay = 0, className = ''
}) => (
    <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay, ease: [0.21, 1.02, 0.73, 0.96] }}
        className={className}
    >
        {children}
    </motion.div>
);

const FadeUpSlow: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
    children, delay = 0, className = ''
}) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
        className={className}
    >
        {children}
    </motion.div>
);

// ─── Section label + heading ──────────────────────────
const SectionHeader: React.FC<{ idx: number; title: string; subtitle?: string; accent?: boolean }> = ({ idx, title, subtitle, accent }) => (
    <div className="mb-14 space-y-3">
        <span className="text-[10px] font-black uppercase tracking-[1em] italic text-[#D4AF37]/60">
            {String(idx + 1).padStart(2, '0')} // {subtitle || 'SYSTEM PROTOCOL'}
        </span>
        <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter text-white uppercase leading-none">
            {title}
        </h2>
        <div className="h-px bg-gradient-to-r from-[#D4AF37]/40 via-[#D4AF37]/10 to-transparent w-32 mt-4" />
    </div>
);

// ─── Experience/Project card ──────────────────────────
const Card: React.FC<{ item: ContentItem; idx: number; onClick: () => void }> = ({ item, idx, onClick }) => (
    <FadeUp delay={idx * 0.07}>
        <div
            className="group relative rounded-2xl p-px hover:shadow-[0_0_20px_rgba(212,175,55,0.05)] transition-shadow duration-500"
            onClick={onClick}
            data-hover="true"
        >
            <GlowingEffect
                blur={0}
                borderWidth={2}
                disabled={false}
                glow={true}
                inactiveZone={0.01}
                proximity={80}
                spread={60}
                variant="default"
            />
            <div
                className="relative rounded-[15px] p-8 border border-white/5 bg-[#040407]/80 backdrop-blur-xl h-full flex flex-col overflow-hidden"
            >
                {/* Handcrafted gold shine */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-mono tracking-widest text-[#D4AF37]/40">
                        MARKERS.{String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] font-mono tracking-tighter text-white/20">{item.year}</span>
                </div>

                <h3 className="text-xl font-black italic uppercase tracking-tight leading-tight mb-2 text-white/90 group-hover:text-white transition-colors duration-500">
                    {item.title}
                </h3>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F59E0B]/60 mb-4 italic">{item.description}</p>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-500 line-clamp-3 font-medium">{item.details}</p>

                <div className="flex flex-wrap gap-2 pt-8 mt-auto">
                    {item.tags?.map(t => (
                        <span key={t} className="px-3 py-1 rounded-sm text-[9px] font-black uppercase tracking-widest italic border border-[#D4AF37]/10 bg-[#D4AF37]/5 text-[#D4AF37]/70">
                            {t}
                        </span>
                    ))}
                </div>

                <div className="absolute bottom-8 right-8 text-[#D4AF37]/0 group-hover:text-[#D4AF37]/80 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                    <ArrowUpRight size={20} />
                </div>
            </div>
        </div>
    </FadeUp>
);

// ─── Clock Component ──────────────────────────────────
const Clock: React.FC = () => {
    const [time, setTime] = React.useState(new Date());

    React.useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const format = (date: Date) => {
        const d = date.getDate().toString().padStart(2, '0');
        const m = (date.getMonth() + 1).toString().padStart(2, '0');
        const y = date.getFullYear();
        const hh = date.getHours().toString().padStart(2, '0');
        const mm = date.getMinutes().toString().padStart(2, '0');
        const ss = date.getSeconds().toString().padStart(2, '0');
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
        return `${dayName} ${d}/${m}/${y} ${hh}:${mm}:${ss}`;
    };

    return (
        <div className="text-[10px] font-black tracking-[0.2em] uppercase italic text-[#D4AF37]/80">
            {format(time)}
        </div>
    );
};

// ─── Main component ───────────────────────────────────
const Portfolio: React.FC = () => {
    const [selected, setSelected] = useState<ContentItem | null>(null);
    const d = PORTFOLIO;

    const navTabs: TabItem[] = [
        { title: 'Home', icon: Home, id: 'home' },
        { type: 'separator' },
        { title: 'Experience', icon: Terminal, id: 'experience' },
        { title: 'Leadership', icon: Briefcase, id: 'leadership' },
        { title: 'Projects', icon: Trophy, id: 'projects' },
        { title: 'Skills', icon: Cpu, id: 'skills' },
        { title: 'Education', icon: GraduationCap, id: 'education' },
        { title: 'Clients', icon: Zap, id: 'clients' },
        { title: 'Volunteering', icon: Heart, id: 'volunteering' },
        { title: 'Journey', icon: History, id: 'timeline' },
    ];

    const timelineData = useMemo(() => d.timeline.map(e => ({
        title: e.title,
        content: (
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg text-[#D4AF37]" style={{ background: 'rgba(212, 175, 55, 0.05)', border: '1px solid rgba(212, 175, 55, 0.1)' }}>
                        {ICONS[e.iconType || 'history']}
                    </span>
                    <p className="text-white font-black uppercase tracking-widest text-[10px] italic">{e.title}</p>
                </div>
                <p className="text-neutral-500 text-sm leading-relaxed italic pl-11">{e.content}</p>
            </div>
        ),
    })), []);

    // ─── Skills data ─────────────────────────────────────
    const skillsData = useMemo(() => [
        { name: 'React.js', level: 'Expert', detail: 'Built 10+ production apps with hooks, context, Redux. Component architecture and performance optimization.' },
        { name: 'TypeScript', level: 'Expert', detail: 'Type-safe full-stack development. Advanced generics, utility types, and strict mode across all projects.' },
        { name: 'Python', level: 'Expert', detail: 'AI/ML pipelines, data science, automation scripts, and backend APIs with Flask/FastAPI.' },
        { name: 'Node.js', level: 'Expert', detail: 'REST/GraphQL APIs, real-time systems with Socket.io, Express/Fastify microservices.' },
        { name: 'MongoDB', level: 'Advanced', detail: 'Aggregation pipelines, indexing strategies, schema design for high-throughput applications.' },
        { name: 'Next.js', level: 'Advanced', detail: 'SSR/SSG, API routes, middleware, and ISR for SEO-optimized production applications.' },
        { name: 'Tailwind CSS', level: 'Expert', detail: 'Utility-first design systems, responsive layouts, dark mode, and custom plugin development.' },
        { name: 'Git & GitHub', level: 'Expert', detail: 'Branching strategies, CI/CD workflows, code reviews, and open-source contribution.' },
        { name: 'Cybersecurity', level: 'Advanced', detail: 'NIST framework, vulnerability assessment, digital forensics, steganography, and risk analysis.' },
        { name: 'Oracle Cloud', level: 'Certified', detail: 'OCI Gen AI Professional certified. Cloud infrastructure, compute, networking, and AI services.' },
        { name: 'Google Cloud', level: 'Trained', detail: 'GCP Arcade program. Cloud functions, BigQuery, Kubernetes Engine, and AI Platform.' },
        { name: 'Machine Learning', level: 'Advanced', detail: 'Classification, regression, NLP, deep learning with TensorFlow/PyTorch, and model deployment.' },
        { name: 'SQL', level: 'Advanced', detail: 'Complex queries, joins, CTEs, window functions. MySQL and PostgreSQL for data engineering.' },
        { name: 'Express.js', level: 'Expert', detail: 'RESTful API design, middleware chains, authentication, rate limiting, and error handling.' },
        { name: 'Socket.io', level: 'Advanced', detail: 'Real-time bidirectional communication for chat, live updates, and collaborative features.' },
        { name: 'Prompt Engineering', level: 'Advanced', detail: 'Crafting effective prompts for LLMs, chain-of-thought, RAG patterns, and AI agent design.' },
        { name: 'Generative AI', level: 'Advanced', detail: 'Gemini API, OpenAI integration, fine-tuning, and building AI-powered applications.' },
        { name: 'Leadership', level: 'Proven', detail: 'Managed 300+ developers across hackathons, mentored teams, and drove project delivery under pressure.' },
        { name: 'Data Science', level: 'Advanced', detail: 'Pandas, NumPy, visualization with Matplotlib/Seaborn, predictive modeling, and analytics.' },
        { name: 'Agile / PM', level: 'Practiced', detail: 'Sprint planning, daily standups, Jira workflows, scope management, and stakeholder communication.' },
    ], []);

    const allSkillNames = useMemo(() => skillsData.map(s => s.name), [skillsData]);
    const [currentSkillIdx, setCurrentSkillIdx] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSkillIdx(prev => (prev + 1) % allSkillNames.length);
        }, 2500);
        return () => clearInterval(interval);
    }, [allSkillNames.length]);

    // ─── IntersectionObserver for auto nav highlight ───
    const sectionIds = ['home', 'experience', 'leadership', 'projects', 'skills', 'education', 'certificates', 'clients', 'volunteering', 'timeline'];
    const navSectionMap: Record<string, number> = {
        'home': 0,
        'experience': 2,
        'leadership': 3,
        'projects': 4,
        'skills': 5,
        'education': 6,
        'certificates': 6,
        'clients': 7,
        'volunteering': 8,
        'timeline': 9,
    };
    const [activeNavIndex, setActiveNavIndex] = useState<number>(0);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        sectionIds.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        const navIdx = navSectionMap[id];
                        if (navIdx !== undefined) setActiveNavIndex(navIdx);
                    }
                },
                { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
            );
            observer.observe(el);
            observers.push(observer);
        });
        return () => observers.forEach(o => o.disconnect());
    }, []);

    return (
        <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen text-white relative"
            style={{ background: 'transparent' }}
        >
            {/* ── Ambient orbs ─────────────────────────────── */}
            <div
                className="fixed pointer-events-none opacity-30 max-w-[100vw] overflow-hidden"
                style={{
                    width: 800, height: 800, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)',
                    top: -200, right: -200, filter: 'blur(80px)',
                }}
            />
            <div
                className="fixed pointer-events-none opacity-30 max-w-[100vw] overflow-hidden"
                style={{
                    width: 600, height: 600, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(245, 158, 11, 0.03) 0%, transparent 70%)',
                    bottom: '20%', left: -150, filter: 'blur(100px)',
                }}
            />

            {/* ── Nav ──────────────────────────────────────── */}
            <nav className="fixed top-6 w-full z-50 flex justify-center px-4">
                <ExpandableTabs tabs={navTabs} activeIndex={activeNavIndex} onChange={id => id && scrollTo(id)} />
            </nav>

            {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
            <section id="home" className="relative min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-24 py-24 sm:py-36 overflow-hidden bg-grid">
                {/* grid fade (transparent to allow background to show) */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Left */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.21, 1.02, 0.73, 0.96] }}
                            className="space-y-8"
                        >
                            {/* Role badge */}
                            <div className="inline-flex items-center gap-3 glass border-[#D4AF37]/10 rounded-full px-5 py-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] italic text-[#D4AF37]/70">{d.hero.role}</span>
                            </div>

                            {/* Name */}
                            <h1 className="heading-xl">
                                <span className="gradient-text">Kishlaya</span><br />
                                <span className="text-outline">Mishra</span>
                            </h1>

                            <p className="text-base md:text-lg leading-relaxed max-w-lg italic font-medium" style={{ color: 'var(--muted)' }}>
                                {d.hero.description}
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                <button
                                    className="btn-primary w-full sm:w-auto"
                                    onClick={() => scrollTo('experience')}
                                    data-hover="true"
                                >{d.primaryCTA}</button>
                                <button
                                    className="btn-ghost w-full sm:w-auto"
                                    onClick={() => scrollTo('education')}
                                    data-hover="true"
                                >{d.secondaryCTA}</button>
                            </div>

                            {/* Stat pills */}
                            <div className="flex flex-wrap gap-4 pt-2">
                                {[
                                    { label: 'Projects Built', value: '7+' },
                                    { label: 'CVEs Resolved', value: '20+' },
                                    { label: 'Devs Managed', value: '700+' },
                                ].map(s => (
                                    <div key={s.label} className="glass rounded-2xl px-5 py-3 text-center">
                                        <div className="text-xl font-black gradient-text">{s.value}</div>
                                        <div className="text-[9px] uppercase tracking-widest italic mt-0.5" style={{ color: 'var(--muted)' }}>{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right — Philosophy card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.9, delay: 0.25 }}
                        className="flex justify-center"
                    >
                        <TextRevealCard
                            text={d.philosophyTitle}
                            revealText={d.philosophyReveal}
                            className="cursor-pointer border-[#D4AF37]/10"
                            style={{ boxShadow: '0 0 80px rgba(var(--primary), 0.03)' }}
                        >
                            <TextRevealCardTitle className="italic uppercase tracking-widest text-[#D4AF37] text-sm font-black">
                                {d.badge}
                            </TextRevealCardTitle>
                            <TextRevealCardDescription className="italic text-[13px]">
                                {d.philosophyText}
                            </TextRevealCardDescription>
                        </TextRevealCard>
                    </motion.div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
          EXPERIENCE
      ══════════════════════════════════════════════ */}
            <section id="experience" className="px-4 sm:px-8 md:px-24 py-16 sm:py-24">
                <FadeUp>
                    <SectionHeader idx={0} title={d.sections[0].title} subtitle="OPERATIONAL LOG" accent />
                </FadeUp>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {d.sections[0].items.map((item, i) => (
                        <Card key={item.id} item={item} idx={i} onClick={() => setSelected(item)} />
                    ))}
                </div>
            </section>

            {/* ══════════════════════════════════════════════
          LEADERSHIP
      ══════════════════════════════════════════════ */}
            <section id="leadership" className="px-4 sm:px-8 md:px-24 py-16 sm:py-24 relative">
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(var(--primary), 0.03) 0%, transparent 100%)' }}
                />
                <FadeUp>
                    <SectionHeader idx={1} title={d.sections[1].title} subtitle="STRATEGIC OVERSIGHT" />
                </FadeUp>
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5">
                    {d.sections[1].items.map((item, i) => (
                        <Card key={item.id} item={item} idx={i} onClick={() => setSelected(item)} />
                    ))}
                </div>
            </section>

            {/* ══════════════════════════════════════════════
          PROJECTS
      ══════════════════════════════════════════════ */}
            <section id="projects" className="px-4 sm:px-8 md:px-24 py-16 sm:py-24">
                <FadeUp>
                    <SectionHeader idx={2} title={d.sections[2].title} subtitle="ENGINEERING DEPLOYMENTS" accent />
                </FadeUp>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {d.sections[2].items.map((item, i) => (
                        <Card key={item.id} item={item} idx={i} onClick={() => setSelected(item)} />
                    ))}
                </div>
            </section>

            {/* ══════════════════════════════════════════════
          SKILLS
      ══════════════════════════════════════════════ */}
            <section id="skills" className="px-4 sm:px-8 md:px-24 py-16 sm:py-24 relative overflow-hidden">
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 60% 50% at 30% 50%, rgba(var(--primary), 0.04) 0%, transparent 100%)' }}
                />
                <FadeUp>
                    <SectionHeader idx={3} title="Skills & Expertise" subtitle="TECHNICAL CAPABILITIES" accent />
                </FadeUp>

                <div className="relative flex justify-center w-full max-w-full overflow-hidden">
                    <FadeUp delay={0.1}>
                        <SkillsGlobe
                            skills={allSkillNames}
                            width={1400}
                            height={1400}
                        />
                    </FadeUp>
                </div>

                {/* Cycling GooeyText */}
                <FadeUp delay={0.3}>
                    <div className="mt-16 flex flex-col items-center">
                        <p className="text-[10px] font-black tracking-[0.5em] uppercase italic text-white/20 mb-2">PROFICIENT IN</p>
                        <GooeyText
                            texts={allSkillNames}
                            className="h-20 w-full"
                            textClassName="text-3xl md:text-5xl font-black italic tracking-tight text-[#D4AF37]"
                            morphTime={1.2}
                            cooldownTime={1.5}
                        />
                    </div>
                </FadeUp>
            </section>

            {/* ══════════════════════════════════════════════
          EDUCATION
      ══════════════════════════════════════════════ */}
            <section id="education" className="px-4 sm:px-8 md:px-24 py-16 sm:py-24 relative z-10">
                <FadeUp>
                    <SectionHeader idx={4} title="Education & Credentials" subtitle="ACADEMIC FOUNDATION" accent />
                </FadeUp>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {d.education.map((edu, i) => (
                        <FadeUp key={edu.id} delay={0.1 + (i * 0.1)}>
                            <div
                                className="group relative rounded-3xl p-px h-full"
                                data-hover="true"
                            >
                                <GlowingEffect
                                    blur={0}
                                    borderWidth={2}
                                    disabled={false}
                                    glow={true}
                                    inactiveZone={0.01}
                                    proximity={80}
                                    spread={60}
                                    variant="default"
                                />
                                <a
                                    href={edu.link || "https://www.linkedin.com/in/kishlayamishra"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative h-full block rounded-[23px] bg-[#040407]/80 backdrop-blur-xl border border-white/5 p-8 transition-all overflow-hidden"
                                >
                                    <div>
                                        <h3 className="text-xl font-black italic uppercase tracking-tight gradient-text leading-tight">{edu.school}</h3>
                                        <p className="text-sm italic mt-2 text-white/80">{edu.degree}</p>
                                        <p className="text-[11px] font-black tracking-widest uppercase italic mt-1" style={{ color: 'var(--muted)' }}>{edu.date}</p>
                                    </div>
                                    <div className="flex items-center gap-3 mt-5">
                                        <span className="tag">Grade: {edu.grade}</span>
                                    </div>
                                    <div className="hr-accent my-6" />
                                    <div className="flex flex-wrap gap-2">
                                        {edu.skills.map(skill => (
                                            <span key={skill} className="px-2 py-1 rounded-sm text-[9px] font-black uppercase tracking-widest italic bg-white/5 text-white/40">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </a>
                            </div>
                        </FadeUp>
                    ))}
                </div>

                <FadeUp delay={0.3}>
                    <p className="text-[13px] leading-relaxed italic text-center md:text-left mt-8" style={{ color: 'var(--muted)' }}>
                        Plus continuous upskilling across {d.certifications.length}+ industry certifications.
                    </p>
                </FadeUp>
            </section>

            {/* ══════════════════════════════════════════════
          CERTIFICATES (Stagger Cards)
      ══════════════════════════════════════════════ */}
            <section id="certificates" className="px-4 sm:px-8 md:px-24 py-16 sm:py-24">
                <FadeUp>
                    <SectionHeader idx={5} title="Licenses & Certifications" subtitle="VERIFIED CREDENTIALS" accent />
                </FadeUp>
                <FadeUp delay={0.1}>
                    <StaggerCertificates data={d.certifications} />
                </FadeUp>
            </section>

            {/* ══════════════════════════════════════════════
          CLIENT PROJECTS
      ══════════════════════════════════════════════ */}
            <section id="clients" className="px-4 sm:px-8 md:px-24 py-16 sm:py-24 relative overflow-hidden">
                <div
                    className="absolute inset-x-0 -top-px h-px w-full"
                    style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.2) 50%, transparent 100%)' }}
                />

                <div className="w-full text-left mb-16">
                    <FadeUp>
                        <SectionHeader idx={6} title="Client Projects" subtitle="STRATEGIC PARTNERSHIPS" accent />
                    </FadeUp>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 max-w-6xl mx-auto">
                    {/* Seculence card - Split Column */}
                    <FadeUpSlow delay={0.2} className="md:col-span-6">
                        <a
                            href="https://seculence.vercel.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative block h-full rounded-[2rem] p-1 group"
                            data-hover="true"
                        >
                            <GlowingEffect
                                spread={60}
                                glow={true}
                                disabled={false}
                                proximity={80}
                                inactiveZone={0.01}
                                borderWidth={2}
                            />
                            <div className="relative h-full rounded-[1.9rem] bg-[#040407]/80 backdrop-blur-3xl border border-white/5 p-8 flex flex-col justify-between overflow-hidden">
                                <div>
                                    <p className="text-[#D4AF37] text-[9px] font-black tracking-widest uppercase mb-6 opacity-40 italic">SECURITY PROTOCOL</p>
                                    <p className="text-neutral-400 text-sm md:text-base leading-relaxed italic font-medium">
                                        Engineering elite digital defense for
                                        <span className="font-black italic text-[#D4AF37] mx-1">Seculence Security</span>.
                                        Fortifying mission-critical infrastructure with advanced threat detection and resilient architectures.
                                    </p>
                                </div>
                                <div className="mt-8 flex items-center gap-2 text-[#D4AF37]/40 group-hover:text-[#D4AF37] transition-all text-[10px] font-black tracking-[0.2em] uppercase italic">
                                    LAUNCH SYSTEM <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </div>
                            </div>
                        </a>
                    </FadeUpSlow>

                    {/* Kismati card - Split Column */}
                    <FadeUpSlow delay={0.4} className="md:col-span-6">
                        <a
                            href="https://kismaticom.vercel.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative block h-full rounded-[2rem] p-1 group"
                            data-hover="true"
                        >
                            <GlowingEffect
                                spread={60}
                                glow={true}
                                disabled={false}
                                proximity={80}
                                inactiveZone={0.01}
                                borderWidth={2}
                            />
                            <div className="relative h-full rounded-[1.9rem] bg-[#040407]/80 backdrop-blur-3xl border border-white/5 p-8 flex flex-col justify-between overflow-hidden">
                                <div>
                                    <p className="text-[#D4AF37] text-[9px] font-black tracking-widest uppercase mb-6 opacity-40 italic">AGENCY OPERATIONS</p>
                                    <p className="text-neutral-400 text-sm md:text-base leading-relaxed italic font-medium">
                                        Pioneering regional dominance with
                                        <span className="font-black italic text-[#D4AF37] mx-1">KISMATI Digital</span>.
                                        Architecting ultra-fast React workflows and global SEO scaling for subcontinental visionaries.
                                    </p>
                                </div>
                                <div className="mt-8 flex items-center gap-2 text-[#D4AF37]/40 group-hover:text-[#D4AF37] transition-all text-[10px] font-black tracking-[0.2em] uppercase italic">
                                    ACCESS HUB <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </div>
                            </div>
                        </a>
                    </FadeUpSlow>

                    {/* Suresh Icecream card - Long Card */}
                    <FadeUpSlow delay={0.6} className="md:col-span-12">
                        <a
                            href="https://sureshicecream.netlify.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative block rounded-[2rem] p-1 group"
                            data-hover="true"
                        >
                            <GlowingEffect
                                spread={60}
                                glow={true}
                                disabled={false}
                                proximity={80}
                                inactiveZone={0.01}
                                borderWidth={2}
                            />
                            <div className="relative rounded-[1.9rem] bg-[#040407]/80 backdrop-blur-3xl border border-white/5 p-8 md:p-16 text-center overflow-hidden">
                                <p className="text-[#D4AF37] text-[9px] font-black tracking-widest uppercase mb-8 opacity-40 italic">LEGACY TRANSFORMATION</p>
                                <p className="text-neutral-400 text-sm md:text-xl leading-relaxed italic font-medium max-w-4xl mx-auto">
                                    Migrating 35 years of legacy into the future with
                                    <span className="font-black italic text-[#D4AF37] mx-2 bg-[#D4AF37]/10 px-3 py-1 rounded-sm border border-[#D4AF37]/20 shadow-[0_0_15px_rgba(212,175,55,0.1)]">Suresh Icecream</span>.
                                    We redesigned an iconic foundation into a high-converting, digital-first storefront, successfully preserving ancestral tradition while implementing modern automation and high-performance e-commerce logistics for the new era.
                                </p>
                                <div className="mt-10 flex items-center justify-center gap-2 text-[#D4AF37]/40 group-hover:text-[#D4AF37] transition-all text-[10px] font-black tracking-[0.2em] uppercase italic">
                                    EXPLORE STOREFRONT OPERATIONS <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </div>
                            </div>
                        </a>
                    </FadeUpSlow>

                    <FadeUpSlow delay={0.8} className="md:col-span-12">
                        <div className="pt-20 flex flex-col items-center gap-6">
                            <p className="text-[#D4AF37] text-[10px] font-black italic tracking-[0.5em] uppercase opacity-30">READY FOR YOUR OWN CINEMATIC TRANSFORMATION?</p>
                            <a
                                href="mailto:kishlayamishra@gmail.com?subject=Came from your client's projects&body=Want to work together, what are next steps"
                                className="group flex items-center gap-3 text-white/30 hover:text-white transition-all text-xl md:text-2xl font-black italic border-b-2 border-white/10 hover:border-[#D4AF37] pb-1"
                                data-hover="true"
                            >
                                WORK WITH ME 😎 <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </a>
                        </div>
                    </FadeUpSlow>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
          VOLUNTEERING
      ══════════════════════════════════════════════ */}
            <section id="volunteering" className="px-4 sm:px-8 md:px-24 py-16 sm:py-24 relative">
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(245, 158, 11, 0.03) 0%, transparent 100%)' }}
                />
                <FadeUp>
                    <SectionHeader idx={7} title="Volunteering" subtitle="COMMUNITY IMPACT" />
                </FadeUp>
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5">
                    {d.volunteering.map((vol, i) => (
                        <FadeUp key={vol.id} delay={i * 0.08}>
                            <div
                                className="group relative rounded-2xl p-px h-full"
                                data-hover="true"
                            >
                                <GlowingEffect
                                    blur={0}
                                    borderWidth={2}
                                    disabled={false}
                                    glow={true}
                                    inactiveZone={0.01}
                                    proximity={80}
                                    spread={60}
                                    variant="default"
                                />
                                <div
                                    className="relative h-full rounded-[15px] p-6 border border-white/5 bg-[#040407]/80 backdrop-blur-xl flex flex-col overflow-hidden"
                                >
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="p-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] shrink-0 mt-1 border border-[#D4AF37]/20">
                                            <Heart size={18} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-base font-black italic uppercase tracking-tight text-white/90 group-hover:text-white transition-colors">
                                                {vol.role}
                                            </h3>
                                            <p className="text-sm italic font-semibold mt-1" style={{ color: 'var(--muted)' }}>
                                                {vol.organization}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-[10px] font-black tracking-widest uppercase italic text-[#D4AF37]/80">{vol.date}</span>
                                        <span className="px-2 py-0.5 rounded-sm text-[9px] font-black uppercase tracking-widest italic bg-white/5 text-white/40 border border-white/5">
                                            {vol.category}
                                        </span>
                                    </div>
                                    <p className="text-[13px] leading-relaxed italic mt-auto" style={{ color: 'var(--muted)' }}>
                                        {vol.description}
                                    </p>
                                    {vol.link && (
                                        <a
                                            href={vol.link}
                                            target="_blank"
                                            className="inline-flex items-center gap-1.5 mt-4 text-[11px] font-black uppercase tracking-widest italic text-[#D4AF37]/80 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#D4AF37] hover:after:w-full after:transition-all duration-300"
                                            data-hover="true"
                                        >
                                            Learn more <ExternalLink size={12} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </FadeUp>
                    ))}
                </div>
            </section>

            {/* ══════════════════════════════════════════════
          TIMELINE (Journey)
      ══════════════════════════════════════════════ */}
            <section id="timeline" className="py-16 sm:py-24">
                <div className="px-4 sm:px-8 md:px-24 mb-14">
                    <FadeUp>
                        <SectionHeader idx={8} title="The Journey" subtitle="CHRONOLOGICAL TRAJECTORY" accent />
                    </FadeUp>
                    <FadeUp delay={0.1}>
                        <p className="text-[11px] font-black tracking-widest uppercase italic mt-4" style={{ color: 'var(--muted)' }}>
                            Last updated: March 6, 2026
                        </p>
                    </FadeUp>
                </div>
                <Timeline data={timelineData} />
            </section>

            {/* ── Modal ────────────────────────────────────── */}
            <AnimatePresence>
                {selected && <Modal item={selected} onClose={() => setSelected(null)} />}
            </AnimatePresence>

            {/* ══════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════ */}
            <footer className="px-4 sm:px-8 md:px-24 py-16 sm:py-24 border-t relative overflow-hidden" style={{ borderColor: 'var(--border)' }}>
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(var(--primary), 0.04) 0%, transparent 100%)' }}
                />
                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
                    <div className="space-y-8">
                        <h2
                            className="heading-lg cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => scrollTo('home')}
                            data-hover="true"
                        >
                            <span className="gradient-text">{d.footerMainTitle}</span><br />
                            <span className="text-outline-accent">{d.footerSubTitle}</span>
                        </h2>
                        <div className="flex flex-wrap gap-8 text-[11px] font-black uppercase tracking-[0.35em] italic" style={{ color: 'var(--muted)' }}>
                            <a href="https://linkedin.com/in/kishlayamishra" target="_blank" className="relative group transition-colors hover:text-[#D4AF37]" data-hover="true">
                                LinkedIn
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#F59E0B] transition-all duration-300 group-hover:w-full" />
                            </a>
                            <a href="https://github.com/kishlayamishra02" target="_blank" className="relative group transition-colors hover:text-[#D4AF37]" data-hover="true">
                                GitHub
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#F59E0B] transition-all duration-300 group-hover:w-full" />
                            </a>
                            <a href="https://x.com/kishlayamishra2" target="_blank" className="relative group transition-colors hover:text-[#D4AF37]" data-hover="true">
                                X
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#F59E0B] transition-all duration-300 group-hover:w-full" />
                            </a>
                            <a href="https://devpost.com/kishlayamishra" target="_blank" className="relative group transition-colors hover:text-[#D4AF37]" data-hover="true">
                                Devpost
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#F59E0B] transition-all duration-300 group-hover:w-full" />
                            </a>
                            <a
                                href="mailto:kishlayamishra@gmail.com?subject=Came from your portfolio&body=Want to work together"
                                className="relative group transition-colors hover:text-[#D4AF37]"
                                data-hover="true"
                            >
                                Email
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#F59E0B] transition-all duration-300 group-hover:w-full" />
                            </a>
                            <a href={`tel:${PORTFOLIO.phone}`} className="relative group transition-colors hover:text-[#D4AF37] flex items-center gap-2" data-hover="true">
                                {PORTFOLIO.phone}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#F59E0B] transition-all duration-300 group-hover:w-full" />
                            </a>
                            <a
                                href="https://wa.me/918000363769?text=HI, lets talk"
                                target="_blank"
                                className="relative group transition-colors hover:text-[#25D366]"
                                data-hover="true"
                            >
                                WhatsApp
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#25D366] transition-all duration-300 group-hover:w-full" />
                            </a>
                            <a
                                className="relative group transition-colors hover:text-[#D4AF37]"
                                data-hover="true"
                                href="mailto:kishlayamishra@gmail.com?subject=Came from your portfolio&body=Want to work together"
                            >
                                {d.footerCTA}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#F59E0B] transition-all duration-300 group-hover:w-full" />
                            </a>
                        </div>
                    </div>
                    <div className="text-right space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] italic" style={{ color: 'var(--muted)' }}>
                            Kishlaya Mishra ©{new Date().getFullYear()}
                        </p>
                        <Clock />
                        <p className="text-[12px] italic" style={{ color: 'var(--muted)' }}>{d.hero.role}</p>
                    </div>
                </div>
            </footer>

            {/* ── Marquee ──────────────────────────────────── */}
            <div className="overflow-hidden py-5 border-t flex items-center relative select-none" style={{ borderColor: 'var(--border)' }}>
                <motion.div
                    initial={{ x: 0 }} animate={{ x: '-100%' }}
                    transition={{ repeat: Infinity, duration: 200, ease: 'linear' }}
                    style={{
                        display: 'flex',
                        whiteSpace: 'nowrap',
                        gap: '80px',
                        fontSize: '30px',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        letterSpacing: '0.3em',
                        fontStyle: 'italic',
                        paddingRight: '80px',
                        color: 'rgba(212, 175, 55, 0.08)'
                    }}
                >
                    {Array.from({ length: 10 }).map((_, i) => <span key={i} className="px-10">{d.marqueeText}</span>)}
                </motion.div>
            </div>
        </motion.div >
    );
};

export default Portfolio;