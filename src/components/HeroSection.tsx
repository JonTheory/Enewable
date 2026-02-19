"use client";

import { motion } from "framer-motion";

/* ──────────────────────────────────────────────
   Animation Variants
   ────────────────────────────────────────────── */
const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
};

const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" as const },
    },
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
};

/* ──────────────────────────────────────────────
   Stats Data
   ────────────────────────────────────────────── */
const stats = [
    {
        value: "12+",
        unit: "Hours",
        label: "Battery Backup",
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="7" width="16" height="10" rx="2" />
                <line x1="22" y1="11" x2="22" y2="13" />
                <rect x="5" y="10" width="4" height="4" fill="currentColor" opacity="0.3" />
                <rect x="10" y="10" width="4" height="4" fill="currentColor" opacity="0.15" />
            </svg>
        ),
    },
    {
        value: "R2,500+",
        unit: "/mo",
        label: "Potential Savings",
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12h8M12 8v8" />
            </svg>
        ),
    },
    {
        value: "Stage 6",
        unit: "",
        label: "Ready",
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
        ),
    },
    {
        value: "25yr",
        unit: "",
        label: "Panel Warranty",
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
    },
];

/* ──────────────────────────────────────────────
   Component
   ────────────────────────────────────────────── */
export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* ─── Background Layers ─── */}
            <div className="absolute inset-0 bg-zinc-950" />

            {/* Hero Image */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: "url('/images/hero-bg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center 40%",
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/40" />

            {/* Radial Saffron Glow */}
            <div
                className="absolute inset-0 opacity-60"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(254, 212, 32, 0.18) 0%, transparent 60%)",
                }}
            />

            {/* Blueprint Grid */}
            <div className="absolute inset-0 grid-overlay opacity-50" />

            {/* Subtle Noise Texture */}
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
            />

            {/* Decorative corner brackets */}
            <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-saffron/10" />
            <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-saffron/10" />
            <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-saffron/10" />
            <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-saffron/10" />

            {/* ─── Content ─── */}
            <motion.div
                className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Badge */}
                <motion.div variants={fadeUp} className="mb-8">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium tracking-widest uppercase text-saffron">
                        <span className="w-1.5 h-1.5 rounded-full bg-saffron animate-pulse" />
                        Powering Johannesburg Homes
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    variants={fadeUp}
                    className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-white"
                >
                    Power Your{" "}
                    <span className="text-saffron text-glow">Independence.</span>
                </motion.h1>

                {/* Sub-headline */}
                <motion.p
                    variants={fadeUp}
                    className="mt-6 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-zinc-400 leading-relaxed"
                >
                    The sunniest city in the world deserves better energy.{" "}
                    <span className="text-zinc-200">
                        Cut your Eskom bill, beat Load Shedding,
                    </span>{" "}
                    and take control of your power with smart solar solutions engineered
                    for the Highveld.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    variants={fadeUp}
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    {/* Primary CTA */}
                    <motion.a
                        href="#quote"
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="group relative px-8 py-4 bg-saffron text-zinc-950 font-semibold text-sm sm:text-base rounded-lg overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-saffron-md"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Get Your Free Quote
                            <svg
                                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                            </svg>
                        </span>
                        {/* Shine sweep */}
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </motion.a>

                    {/* Secondary CTA */}
                    <motion.a
                        href="#calculator"
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="group px-8 py-4 glass rounded-lg text-sm sm:text-base font-medium text-zinc-200 hover:text-saffron transition-colors duration-300 cursor-pointer"
                    >
                        <span className="flex items-center gap-2">
                            <svg
                                className="w-4 h-4 text-saffron/60 group-hover:text-saffron transition-colors"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                />
                            </svg>
                            Calculate Savings
                        </span>
                    </motion.a>
                </motion.div>

                {/* Trust Indicator */}
                <motion.p
                    variants={fadeIn}
                    className="mt-6 text-xs text-zinc-600 tracking-wide"
                >
                    ⚡ Trusted by 400+ Gauteng homeowners &nbsp;•&nbsp; SABS Approved
                    Installations
                </motion.p>

                {/* ─── Stats Bar ─── */}
                <motion.div
                    variants={fadeUp}
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            variants={scaleIn}
                            custom={i}
                            className="glass rounded-xl px-5 py-5 text-center group hover:border-saffron/20 transition-colors duration-300"
                        >
                            <div className="flex items-center justify-center gap-1.5 mb-2 text-saffron/50 group-hover:text-saffron/80 transition-colors">
                                {stat.icon}
                            </div>
                            <p className="text-2xl sm:text-3xl font-bold font-heading text-white">
                                {stat.value}
                                {stat.unit && (
                                    <span className="text-sm font-normal text-zinc-500 ml-0.5">
                                        {stat.unit}
                                    </span>
                                )}
                            </p>
                            <p className="mt-1 text-xs text-zinc-500 uppercase tracking-wider font-medium">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    variants={fadeIn}
                    className="mt-16 flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                        Explore
                    </span>
                    <motion.div
                        animate={{ y: [0, 6, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="w-5 h-8 rounded-full border border-zinc-700 flex items-start justify-center p-1.5"
                    >
                        <div className="w-1 h-1.5 rounded-full bg-saffron/60" />
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}
