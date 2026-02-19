"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

/* ──────────────────────────────────────────────
    Team Data - UPDATE WITH REAL TEAM MEMBERS
    Add image paths when photos are available
    ────────────────────────────────────────────── */
const team = [
    {
        name: "Rob Bagley",
        role: "CEO / Lead Engineer",
        bio: "With 35 years of engineering experience and a Mechanical Engineering Diploma from Wits Technikon, Rob leads our technical operations and installations. His expertise in solar system design ensures every installation meets the highest standards.",
        credentials: "35 Years Experience | Mechanical Engineer Diploma (Wits) | ECSA Registered",
        initials: "RB",
        image: null, // Add path like "/images/team/rob-bagley.jpg" when available
    },
    {
        name: "Johnathan Bagley",
        role: "CTO",
        bio: "Johnathan holds a Master's in Renewable Energy and oversees our technical strategy and innovation. He ensures we stay at the forefront of solar technology, bringing the latest advances to Johannesburg homes.",
        credentials: "MEng Renewable Energy | Technical Strategy Specialist",
        initials: "JB",
        image: null,
    },
    {
        name: "Michael van Zyl",
        role: "Sales Director",
        bio: "Michael brings his business acumen and customer-focused approach to help homeowners navigate their solar journey. He ensures every client gets a solution tailored to their specific needs and budget.",
        credentials: "BCom Business Development | Client Relations Expert",
        initials: "MvZ",
        image: null,
    },
    {
        name: "Leo",
        role: "Solar Advisor",
        bio: "As a NABCEP Certified Solar PV Specialist, Leo provides expert guidance on system design and sizing. He helps clients understand their options and choose the perfect solar solution for their home.",
        credentials: "NABCEP Certified | Solar PV Specialist | System Design Expert",
        initials: "L",
        image: null,
    },
];

/* ──────────────────────────────────────────────
    Variants
    ────────────────────────────────────────────── */
const sectionVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
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
            className="relative min-h-screen py-24 sm:py-32 overflow-hidden"
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
                <motion.div variants={fadeUp} className="text-center mb-16 sm:mb-20">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-8 h-px bg-saffron/40" />
                        <span className="text-xs font-medium tracking-[0.2em] uppercase text-saffron/70">
                            Meet The Team
                        </span>
                        <div className="w-8 h-px bg-saffron/40" />
                    </div>
                    <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
                        The People Behind{" "}
                        <span className="text-saffron">Enewable.</span>
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-zinc-300 text-lg sm:text-xl">
                        Our team brings together 35+ years of combined experience in engineering, 
                        renewable energy, and customer service. We&apos;re dedicated to powering 
                        Johannesburg&apos;s transition to clean, reliable energy.
                    </p>
                </motion.div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    {team.map((member, i) => (
                        <motion.div
                            key={member.name}
                            variants={fadeUp}
                            custom={i}
                            className="group relative glass rounded-2xl p-6 sm:p-8 hover:border-saffron/20 transition-all duration-300"
                        >
                            <div className="flex flex-col sm:flex-row gap-6">
                                {/* Photo / Avatar */}
                                <div className="shrink-0 mx-auto sm:mx-0">
                                    {member.image ? (
                                        <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-zinc-800 group-hover:border-saffron/30 transition-colors duration-300">
                                            <Image
                                                src={member.image}
                                                alt={member.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-zinc-900/80 border-2 border-zinc-800 flex items-center justify-center group-hover:border-saffron/30 transition-colors duration-300">
                                            <span className="text-3xl sm:text-4xl font-bold text-saffron/70">
                                                {member.initials}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 text-center sm:text-left">
                                    {/* Name */}
                                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-white mb-1">
                                        {member.name}
                                    </h2>

                                    {/* Role */}
                                    <p className="text-sm text-saffron font-medium mb-3">
                                        {member.role}
                                    </p>

                                    {/* Credentials */}
                                    <p className="text-xs text-zinc-400 italic mb-4">
                                        {member.credentials}
                                    </p>

                                    {/* Bio */}
                                    <p className="text-sm text-zinc-300 leading-relaxed">
                                        {member.bio}
                                    </p>
                                </div>
                            </div>

                            {/* Hover accent */}
                            <div className="absolute top-0 left-0 w-px h-0 bg-saffron/30 group-hover:h-full transition-all duration-500" />
                        </motion.div>
                    ))}
                </div>

                {/* Company Stats */}
                <motion.div 
                    variants={fadeUp} 
                    className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                    <div className="text-center">
                        <p className="text-3xl sm:text-4xl font-bold text-saffron">35+</p>
                        <p className="text-sm text-zinc-400 mt-1">Years Combined Experience</p>
                    </div>
                    <div className="text-center">
                        <p className="text-3xl sm:text-4xl font-bold text-saffron">400+</p>
                        <p className="text-sm text-zinc-400 mt-1">Homes Powered</p>
                    </div>
                    <div className="text-center">
                        <p className="text-3xl sm:text-4xl font-bold text-saffron">ECSA</p>
                        <p className="text-sm text-zinc-400 mt-1">Registered</p>
                    </div>
                    <div className="text-center">
                        <p className="text-3xl sm:text-4xl font-bold text-saffron">JHB</p>
                        <p className="text-sm text-zinc-400 mt-1">Proudly Local</p>
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div variants={fadeUp} className="mt-16 text-center">
                    <p className="text-zinc-400 mb-6">Ready to work with our expert team?</p>
                    <motion.a
                        href="/"
                        className="inline-flex items-center gap-2 text-saffron hover:text-saffron-300 transition-colors"
                    >
                        <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        Back to Home
                    </motion.a>
                </motion.div>
            </motion.div>
        </section>
    );
}
