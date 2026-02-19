"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ──────────────────────────────────────────────
   Steps Data
   ────────────────────────────────────────────── */
const steps = [
    {
        number: "01",
        title: "Free Site Assessment",
        description:
            "We visit your property, assess your roof, measure your DB board, and analyse your Eskom usage to design the perfect system.",
        duration: "Day 1",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
        ),
    },
    {
        number: "02",
        title: "Custom System Design",
        description:
            "Our engineers design a system tailored to your consumption, roof orientation, and budget — with transparent pricing in ZAR.",
        duration: "Day 2-3",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
            </svg>
        ),
    },
    {
        number: "03",
        title: "Professional Installation",
        description:
            "Our SABS-certified team installs your system in 1-2 days. We handle all wiring, mounting, inverter setup, and battery connections.",
        duration: "Day 7-9",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
            </svg>
        ),
    },
    {
        number: "04",
        title: "Monitor & Enjoy",
        description:
            "Track your generation, savings, and battery levels in real-time via our app. We handle Eskom/CoCT registration and all compliance.",
        duration: "Day 10+",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
        ),
    },
];

/* ──────────────────────────────────────────────
   Variants
   ────────────────────────────────────────────── */
const sectionVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
};

/* ──────────────────────────────────────────────
   Component
   ────────────────────────────────────────────── */
export default function ProcessSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    return (
        <section
            id="process"
            ref={sectionRef}
            className="relative py-24 sm:py-32 overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-zinc-950" />
            <div className="absolute inset-0 grid-overlay opacity-10" />
            <div
                className="absolute inset-0 opacity-40"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 40% at 70% 50%, rgba(254,212,32,0.05) 0%, transparent 60%)",
                }}
            />

            <motion.div
                className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8"
                variants={sectionVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {/* Header */}
                <motion.div variants={fadeUp} className="mb-14 sm:mb-16 text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-8 h-px bg-saffron/40" />
                        <span className="text-xs font-medium tracking-[0.2em] uppercase text-saffron/70">
                            How It Works
                        </span>
                        <div className="w-8 h-px bg-saffron/40" />
                    </div>
                    <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                        From Assessment to{" "}
                        <span className="text-saffron">Independence.</span>
                    </h2>
                    <p className="mt-4 max-w-lg mx-auto text-zinc-500 text-base sm:text-lg">
                        Four simple steps between you and energy freedom. We handle
                        everything from start to finish.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="relative">
                    {/* Connecting Line (desktop) */}
                    <div className="hidden md:block absolute top-20 left-[calc(12.5%+12px)] right-[calc(12.5%+12px)] h-px bg-gradient-to-r from-saffron/0 via-saffron/20 to-saffron/0" />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
                        {steps.map((step, i) => (
                            <motion.div
                                key={step.number}
                                variants={fadeUp}
                                custom={i}
                                className="relative flex flex-col items-center text-center group"
                            >
                                {/* Step Circle */}
                                <div className="relative mb-6">
                                    <div className="w-16 h-16 rounded-2xl bg-zinc-900/80 border border-zinc-800/60 flex items-center justify-center text-saffron/60 group-hover:text-saffron group-hover:border-saffron/30 group-hover:shadow-[0_0_20px_rgba(254,212,32,0.08)] transition-all duration-300">
                                        {step.icon}
                                    </div>
                                    {/* Step number */}
                                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-saffron text-zinc-950 text-[10px] font-bold flex items-center justify-center">
                                        {step.number}
                                    </span>
                                </div>

                                {/* Duration */}
                                <span className="text-[10px] uppercase tracking-[0.15em] text-saffron/50 mb-2 font-medium">
                                    {step.duration}
                                </span>

                                {/* Title */}
                                <h3 className="font-heading text-lg font-bold text-white mb-2">
                                    {step.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-zinc-500 leading-relaxed max-w-[240px]">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <motion.div variants={fadeUp} className="mt-14 text-center">
                    <motion.a
                        href="#quote"
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-saffron text-zinc-950 font-semibold text-sm rounded-xl hover:shadow-saffron-md transition-shadow duration-300 cursor-pointer"
                    >
                        Start Your Journey
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </motion.a>
                </motion.div>
            </motion.div>
        </section>
    );
}
