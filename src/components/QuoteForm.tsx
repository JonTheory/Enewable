"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ──────────────────────────────────────────────
   Constants
   ────────────────────────────────────────────── */
const PROPERTY_TYPES = [
    { id: "house", label: "House", icon: "🏠" },
    { id: "complex", label: "Complex / Estate", icon: "🏘️" },
    { id: "business", label: "Business", icon: "🏢" },
    { id: "farm", label: "Smallholding / Farm", icon: "🌾" },
] as const;

const BILL_RANGES = [
    "R1,000 – R2,500",
    "R2,500 – R5,000",
    "R5,000 – R8,000",
    "R8,000 – R12,000",
    "R12,000+",
] as const;

/* ──────────────────────────────────────────────
   Variants
   ────────────────────────────────────────────── */
const sectionVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
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
export default function QuoteForm() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    const [property, setProperty] = useState<string>("");
    const [bill, setBill] = useState<string>("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [area, setArea] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [sending, setSending] = useState(false);

    const isValid = property && bill && name && (email || phone);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValid) return;
        setSending(true);

        try {
            const response = await fetch("/api/quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    property,
                    bill,
                    name,
                    email,
                    phone,
                    area,
                }),
            });

            if (!response.ok) throw new Error("Failed to submit");

            setSubmitted(true);
        } catch (error) {
            alert("Failed to submit quote request. Please try again.");
            console.error(error);
        } finally {
            setSending(false);
        }
    };

    return (
        <section
            id="quote"
            ref={sectionRef}
            className="relative py-24 sm:py-32 overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-zinc-950" />
            <div className="absolute inset-0 grid-overlay opacity-15" />
            <div
                className="absolute inset-0 opacity-50"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(254,212,32,0.06) 0%, transparent 60%)",
                }}
            />

            <motion.div
                className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8"
                variants={sectionVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {/* ─── Header ─── */}
                <motion.div variants={fadeUp} className="mb-12 sm:mb-16">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-px bg-saffron/40" />
                        <span className="text-xs font-medium tracking-[0.2em] uppercase text-saffron/70">
                            Free Consultation
                        </span>
                    </div>
                    <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                        Get Your Custom{" "}
                        <span className="text-saffron">Solar Quote.</span>
                    </h2>
                    <p className="mt-4 max-w-lg text-zinc-300 text-base sm:text-lg">
                        Tell us about your property. We&apos;ll design a system sized for
                        your Eskom bill, roof, and load shedding needs — obligation-free.
                    </p>
                </motion.div>

                <AnimatePresence mode="wait">
                    {!submitted ? (
                        <motion.form
                            key="form"
                            onSubmit={handleSubmit}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                            className="space-y-10"
                        >
                            {/* ─── Step 1: Property Type ─── */}
                            <motion.fieldset variants={fadeUp}>
                                <legend className="text-sm font-medium text-zinc-300 mb-4 flex items-center gap-2">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-saffron/10 text-saffron text-xs font-bold">
                                        1
                                    </span>
                                    Property Type
                                </legend>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {PROPERTY_TYPES.map((p) => (
                                        <button
                                            type="button"
                                            key={p.id}
                                            onClick={() => setProperty(p.id)}
                                            className={`relative rounded-xl border p-4 text-left transition-all duration-200 cursor-pointer
                        ${property === p.id
                                                    ? "border-saffron/50 bg-saffron/5 shadow-[0_0_20px_rgba(254,212,32,0.08)]"
                                                    : "border-zinc-800/60 bg-zinc-900/40 hover:border-zinc-700/60"
                                                }`}
                                        >
                                            <span className="text-2xl mb-2 block">{p.icon}</span>
                                            <span
                                                className={`text-sm font-medium ${property === p.id ? "text-white" : "text-zinc-300"
                                                    }`}
                                            >
                                                {p.label}
                                            </span>
                                            {/* Selection indicator */}
                                            {property === p.id && (
                                                <motion.div
                                                    layoutId="property-check"
                                                    className="absolute top-3 right-3 w-5 h-5 rounded-full bg-saffron flex items-center justify-center"
                                                >
                                                    <svg
                                                        className="w-3 h-3 text-zinc-950"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth={3}
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                </motion.div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </motion.fieldset>

                            {/* ─── Step 2: Monthly Bill ─── */}
                            <motion.fieldset variants={fadeUp}>
                                <legend className="text-sm font-medium text-zinc-300 mb-4 flex items-center gap-2">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-saffron/10 text-saffron text-xs font-bold">
                                        2
                                    </span>
                                    Monthly Eskom Bill
                                </legend>
                                <div className="flex flex-wrap gap-2">
                                    {BILL_RANGES.map((range) => (
                                        <button
                                            type="button"
                                            key={range}
                                            onClick={() => setBill(range)}
                                            className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-all duration-200 cursor-pointer
                        ${bill === range
                                                    ? "border-saffron/50 bg-saffron/10 text-saffron"
                                                    : "border-zinc-800/60 bg-zinc-900/40 text-zinc-300 hover:border-zinc-700/60 hover:text-zinc-300"
                                                }`}
                                        >
                                            {range}
                                        </button>
                                    ))}
                                </div>
                            </motion.fieldset>

                            {/* ─── Step 3: Contact Details ─── */}
                            <motion.fieldset variants={fadeUp}>
                                <legend className="text-sm font-medium text-zinc-300 mb-4 flex items-center gap-2">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-saffron/10 text-saffron text-xs font-bold">
                                        3
                                    </span>
                                    Your Details
                                </legend>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Full Name *"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/50 text-white placeholder:text-zinc-300 text-sm focus:outline-none focus:border-saffron/40 focus:ring-1 focus:ring-saffron/20 transition-all"
                                        required
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email Address *"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/50 text-white placeholder:text-zinc-300 text-sm focus:outline-none focus:border-saffron/40 focus:ring-1 focus:ring-saffron/20 transition-all"
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Phone (e.g. 082 xxx xxxx)"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/50 text-white placeholder:text-zinc-300 text-sm focus:outline-none focus:border-saffron/40 focus:ring-1 focus:ring-saffron/20 transition-all"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Suburb / Area (e.g. Sandton)"
                                        value={area}
                                        onChange={(e) => setArea(e.target.value)}
                                        className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/50 text-white placeholder:text-zinc-300 text-sm focus:outline-none focus:border-saffron/40 focus:ring-1 focus:ring-saffron/20 transition-all"
                                    />
                                </div>
                            </motion.fieldset>

                            {/* ─── Submit ─── */}
                            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <motion.button
                                    type="submit"
                                    disabled={!isValid || sending}
                                    whileHover={isValid ? { scale: 1.03, y: -2 } : {}}
                                    whileTap={isValid ? { scale: 0.97 } : {}}
                                    className={`px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2.5
                    ${isValid
                                            ? "bg-saffron text-zinc-950 hover:shadow-saffron-md cursor-pointer"
                                            : "bg-zinc-800 text-zinc-300 cursor-not-allowed"
                                        }`}
                                >
                                    {sending ? (
                                        <>
                                            <svg
                                                className="w-4 h-4 animate-spin"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                />
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                                />
                                            </svg>
                                            Sending…
                                        </>
                                    ) : (
                                        <>
                                            Request Free Quote
                                            <svg
                                                className="w-4 h-4"
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
                                        </>
                                    )}
                                </motion.button>
                                <p className="text-xs text-zinc-700">
                                    No spam. No sales pressure. Just a custom system design and
                                    transparent quote within 24 hours.
                                </p>
                            </motion.div>
                        </motion.form>
                    ) : (
                        /* ─── Success State ─── */
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                            className="glass rounded-2xl p-10 sm:p-14 text-center border border-saffron/20"
                        >
                            <div className="w-16 h-16 rounded-full bg-saffron/10 flex items-center justify-center mx-auto mb-6">
                                <svg
                                    className="w-8 h-8 text-saffron"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
                                Quote Request Received!
                            </h3>
                            <p className="text-zinc-300 max-w-md mx-auto">
                                Our solar team will design a custom system for your{" "}
                                {PROPERTY_TYPES.find((p) => p.id === property)?.label.toLowerCase() ?? "property"}{" "}
                                and send you a detailed proposal within{" "}
                                <span className="text-saffron font-medium">24 hours</span>.
                            </p>
                            <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-zinc-300">
                                <span className="flex items-center gap-1.5">
                                    <svg className="w-3.5 h-3.5 text-saffron/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Free site assessment
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <svg className="w-3.5 h-3.5 text-saffron/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Itemised pricing in ZAR
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <svg className="w-3.5 h-3.5 text-saffron/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Zero obligation
                                </span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}
