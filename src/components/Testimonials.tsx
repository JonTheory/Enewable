"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */
const testimonials = [
    {
        name: "Thabo Mokoena",
        suburb: "Sandton",
        saving: "R4,200/mo",
        quote:
            "We went from dreading Stage 4 to not even noticing it. The kids can study, the fridge stays on, and our Eskom bill dropped by 70%. Best investment we've made.",
        system: "8kW Hybrid + 15kWh Battery",
        image: null as string | null, // fallback to initials
        initials: "TM",
    },
    {
        name: "Naledi Dlamini",
        suburb: "Midrand",
        saving: "R3,100/mo",
        quote:
            "The team was professional from quote to installation. They handled all the CoCT paperwork, and the app lets me monitor everything from my phone. Absolutely world-class.",
        system: "5kW Hybrid + 10kWh Battery",
        image: null as string | null,
        initials: "ND",
    },
    {
        name: "Carlos van der Merwe",
        suburb: "Fourways",
        saving: "R5,800/mo",
        quote:
            "Running a home office through load shedding was killing my productivity. Now I have 12+ hours of backup and my electricity bill is a fraction of what it was. The ROI is unreal.",
        system: "10kW Hybrid + 20kWh Battery",
        image: "/images/testimonial-3.png",
        initials: "CM",
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
export default function Testimonials() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    return (
        <section
            ref={sectionRef}
            className="relative py-24 sm:py-32 overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-zinc-950" />
            <div className="absolute inset-0 grid-overlay opacity-10" />

            <motion.div
                className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8"
                variants={sectionVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {/* Header */}
                <motion.div variants={fadeUp} className="mb-14 sm:mb-16">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-px bg-saffron/40" />
                        <span className="text-xs font-medium tracking-[0.2em] uppercase text-saffron/70">
                            Real Results
                        </span>
                    </div>
                    <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                        Joburg Homeowners{" "}
                        <span className="text-saffron">Love Their Solar.</span>
                    </h2>
                    <p className="mt-4 max-w-lg text-zinc-300 text-base sm:text-lg">
                        Don&apos;t take our word for it. Here&apos;s what our clients have to say after
                        going solar.
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.name}
                            variants={fadeUp}
                            custom={i}
                            className="relative glass rounded-2xl p-6 sm:p-7 flex flex-col group hover:border-saffron/20 transition-all duration-300"
                        >
                            {/* Stars */}
                            <div className="flex gap-0.5 mb-4">
                                {[...Array(5)].map((_, j) => (
                                    <svg
                                        key={j}
                                        className="w-4 h-4 text-saffron"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-zinc-300 text-sm leading-relaxed flex-1 mb-6">
                                &ldquo;{t.quote}&rdquo;
                            </p>

                            {/* Saving Badge */}
                            <div className="mb-5 inline-flex self-start items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-400/5 border border-emerald-400/15">
                                <svg
                                    className="w-3.5 h-3.5 text-emerald-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                    <polyline points="17 6 23 6 23 12" />
                                </svg>
                                <span className="text-xs font-semibold text-emerald-400">
                                    Saving {t.saving}
                                </span>
                            </div>

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                {t.image ? (
                                    <Image
                                        src={t.image}
                                        alt={t.name}
                                        width={44}
                                        height={44}
                                        className="rounded-full object-cover border-2 border-zinc-800"
                                    />
                                ) : (
                                    <div className="w-11 h-11 rounded-full bg-saffron/10 border-2 border-zinc-800 flex items-center justify-center">
                                        <span className="text-sm font-bold text-saffron/70">
                                            {t.initials}
                                        </span>
                                    </div>
                                )}
                                <div>
                                    <p className="text-sm font-semibold text-white">{t.name}</p>
                                    <p className="text-[11px] text-zinc-300">
                                        {t.suburb} · {t.system}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
