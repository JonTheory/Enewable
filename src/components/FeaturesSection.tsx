"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ──────────────────────────────────────────────
   Feature Data
   ────────────────────────────────────────────── */
const features = [
    {
        title: "Hybrid Inverters",
        description:
            "Seamlessly switch between solar, battery, and Eskom grid power. Smart load management keeps your home running through every stage of Load Shedding — no manual intervention needed.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <path d="M12 7v10M7 12h10" />
                <circle cx="7" cy="7" r="1" fill="currentColor" opacity="0.4" />
                <circle cx="17" cy="7" r="1" fill="currentColor" opacity="0.4" />
                <circle cx="7" cy="17" r="1" fill="currentColor" opacity="0.4" />
                <circle cx="17" cy="17" r="1" fill="currentColor" opacity="0.4" />
            </svg>
        ),
        stats: [
            { label: "Efficiency", value: "98.6%" },
            { label: "Switch Time", value: "<10ms" },
        ],
        tag: "Core System",
    },
    {
        title: "Lithium-Ion Batteries",
        description:
            "Bank your Highveld sunshine with high-density LiFePO₄ cells. 6,000+ cycle life, 10-year warranty, and enough capacity to run your essentials from sunset to sunrise.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                <rect x="4" y="6" width="16" height="12" rx="2" />
                <line x1="22" y1="10" x2="22" y2="14" />
                <rect x="7" y="9" width="3" height="6" rx="0.5" fill="currentColor" opacity="0.3" />
                <rect x="11" y="9" width="3" height="6" rx="0.5" fill="currentColor" opacity="0.2" />
                <rect x="15" y="9" width="3" height="6" rx="0.5" fill="currentColor" opacity="0.1" />
            </svg>
        ),
        stats: [
            { label: "Cycle Life", value: "6,000+" },
            { label: "Warranty", value: "10 Years" },
        ],
        tag: "Energy Storage",
    },
    {
        title: "Remote Monitoring",
        description:
            "Track every watt from your phone. Real-time dashboards show solar generation, battery state, grid consumption, and savings — even alert you before load shedding schedules hit.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                <rect x="5" y="2" width="14" height="20" rx="3" />
                <circle cx="12" cy="18" r="1" fill="currentColor" opacity="0.4" />
                <path d="M9 8h6M9 11h4" opacity="0.6" />
            </svg>
        ),
        stats: [
            { label: "Uptime", value: "99.9%" },
            { label: "Alerts", value: "Real-time" },
        ],
        tag: "Intelligence",
    },
];

/* ──────────────────────────────────────────────
   Animation Variants
   ────────────────────────────────────────────── */
const sectionVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
};

const headerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
};

/* ──────────────────────────────────────────────
   Component
   ────────────────────────────────────────────── */
export default function FeaturesSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    return (
        <section
            id="features"
            ref={sectionRef}
            className="relative py-24 sm:py-32 overflow-hidden"
        >
            {/* ─── Background ─── */}
            <div className="absolute inset-0 bg-zinc-950" />
            <div className="absolute inset-0 grid-overlay opacity-30" />

            {/* Top fade from hero */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-zinc-950 to-transparent" />

            {/* Subtle radial accent */}
            <div
                className="absolute inset-0 opacity-40"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 40% at 70% 50%, rgba(254, 212, 32, 0.06) 0%, transparent 60%)",
                }}
            />

            {/* ─── Content ─── */}
            <motion.div
                className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8"
                variants={sectionVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {/* Section Header */}
                <motion.div variants={headerVariants} className="mb-16 sm:mb-20">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-px bg-saffron/40" />
                        <span className="text-xs font-medium tracking-[0.2em] uppercase text-saffron/70">
                            Engineered for the Highveld
                        </span>
                    </div>

                    <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                        Built to Keep{" "}
                        <span className="text-saffron">Joburg Powered.</span>
                    </h2>

                    <p className="mt-4 max-w-xl text-zinc-300 text-base sm:text-lg leading-relaxed">
                        Every component is selected and sized for South African conditions —
                        high irradiance, volatile grid supply, and the demand for
                        uninterrupted power.
                    </p>
                </motion.div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            variants={cardVariants}
                            custom={i}
                            className="group relative glass rounded-2xl p-6 sm:p-8 hover:border-saffron/20 transition-all duration-500 flex flex-col"
                        >
                            {/* Tag */}
                            <span className="inline-flex self-start px-2.5 py-0.5 rounded-md bg-saffron/5 border border-saffron/10 text-[10px] font-medium tracking-wider uppercase text-saffron/60 mb-5">
                                {feature.tag}
                            </span>

                            {/* Icon */}
                            <div className="w-12 h-12 rounded-xl bg-saffron/5 border border-saffron/10 flex items-center justify-center text-saffron/70 group-hover:text-saffron group-hover:bg-saffron/10 transition-all duration-300 mb-5">
                                {feature.icon}
                            </div>

                            {/* Title */}
                            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-3">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-zinc-300 leading-relaxed flex-1">
                                {feature.description}
                            </p>

                            {/* Stats */}
                            <div className="mt-6 pt-5 border-t border-zinc-800/60 grid grid-cols-2 gap-4">
                                {feature.stats.map((stat) => (
                                    <div key={stat.label}>
                                        <p className="text-lg font-bold font-heading text-white">
                                            {stat.value}
                                        </p>
                                        <p className="text-[11px] text-zinc-300 uppercase tracking-wider">
                                            {stat.label}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Corner accent on hover */}
                            <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl">
                                <div className="absolute top-0 right-0 w-px h-0 bg-saffron/30 group-hover:h-10 transition-all duration-500" />
                                <div className="absolute top-0 right-0 h-px w-0 bg-saffron/30 group-hover:w-10 transition-all duration-500" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom trust bar */}
                <motion.div
                    variants={headerVariants}
                    className="mt-14 sm:mt-20 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-zinc-300 tracking-wide"
                >
                    <span className="flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-saffron/40" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        CoCT & Eskom Compliant
                    </span>
                    <span className="flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-saffron/40" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Tier 1 Solar Panels
                    </span>
                    <span className="flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-saffron/40" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        SABS Certified Inverters
                    </span>
                    <span className="flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-saffron/40" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Professional Installation
                    </span>
                </motion.div>
            </motion.div>
        </section>
    );
}
