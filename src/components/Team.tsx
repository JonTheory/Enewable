"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ──────────────────────────────────────────────
    Team Data - UPDATE WITH REAL TEAM MEMBERS
    ────────────────────────────────────────────── */
const team = [
    {
        name: "Johnathan Bagley",
        role: "CTO",
        bio: "Technical Strategy & Innovation",
        credentials: "MEng, Renewable Energy",
        initials: "JB",
    },
    {
        name: "Rob Bagley",
        role: "CEO / Lead Engineer",
        bio: "Installation & Technical Lead",
        credentials: "10+ Years Experience, ECSA Certified",
        initials: "RB",
    },
    {
        name: "Michael van Zyl",
        role: "Sales Director",
        bio: "Client Relations & Growth",
        credentials: "BCom, Business Development",
        initials: "MvZ",
    },
    {
        name: "Leo",
        role: "Solar Advisor",
        bio: "System Design & Consulting",
        credentials: "Solar PV Specialist, NABCEP",
        initials: "L",
    },
];

/* ──────────────────────────────────────────────
    Variants
    ────────────────────────────────────────────── */
const sectionVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
};

/* ──────────────────────────────────────────────
    Component
    ────────────────────────────────────────────── */
export default function Team() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    return (
        <section
            id="team"
            ref={sectionRef}
            className="relative py-24 sm:py-32 overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-zinc-950" />
            <div className="absolute inset-0 grid-overlay opacity-15" />
            <div
                className="absolute inset-0 opacity-40"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 40% at 30% 60%, rgba(254,212,32,0.06) 0%, transparent 60%)",
                }}
            />

            <motion.div
                className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8"
                variants={sectionVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {/* Header */}
                <motion.div variants={fadeUp} className="text-center mb-14 sm:mb-16">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-8 h-px bg-saffron/40" />
                        <span className="text-xs font-medium tracking-[0.2em] uppercase text-saffron/70">
                            Meet The Team
                        </span>
                        <div className="w-8 h-px bg-saffron/40" />
                    </div>
                    <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                        The People Behind{" "}
                        <span className="text-saffron">Enewable.</span>
                    </h2>
                    <p className="mt-4 max-w-lg mx-auto text-zinc-500 text-base sm:text-lg">
                        Experienced professionals dedicated to powering Johannesburg&apos;s
                        transition to clean energy.
                    </p>
                </motion.div>

                {/* Team Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
                    {team.map((member, i) => (
                        <motion.div
                            key={member.name}
                            variants={fadeUp}
                            custom={i}
                            className="group relative glass rounded-2xl p-5 sm:p-6 text-center hover:border-saffron/20 transition-all duration-300"
                        >
                            {/* Avatar */}
                            <div className="mb-4">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-zinc-900/80 border-2 border-zinc-800 flex items-center justify-center mx-auto group-hover:border-saffron/30 transition-colors duration-300">
                                    <span className="text-lg sm:text-xl font-bold text-saffron/70">
                                        {member.initials}
                                    </span>
                                </div>
                            </div>

                            {/* Name */}
                            <h3 className="font-heading text-base sm:text-lg font-bold text-white mb-0.5">
                                {member.name}
                            </h3>

                            {/* Role */}
                            <p className="text-xs text-saffron/80 font-medium mb-1">
                                {member.role}
                            </p>

                            {/* Credentials */}
                            <p className="text-[10px] text-zinc-500 italic mb-2">
                                {member.credentials}
                            </p>

                            {/* Bio */}
                            <p className="text-[11px] text-zinc-600 leading-relaxed">
                                {member.bio}
                            </p>

                            {/* Hover accent */}
                            <div className="absolute top-0 left-0 w-px h-0 bg-saffron/30 group-hover:h-full transition-all duration-500" />
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div variants={fadeUp} className="mt-14 text-center">
                    <motion.a
                        href="#quote"
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-saffron text-zinc-950 font-semibold text-sm rounded-xl hover:shadow-saffron-md transition-shadow duration-300 cursor-pointer"
                    >
                        Work With Our Team
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </motion.a>
                </motion.div>
            </motion.div>
        </section>
    );
}
