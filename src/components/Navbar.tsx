"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ──────────────────────────────────────────────
   Navigation Links
   ────────────────────────────────────────────── */
const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Calculator", href: "#calculator" },
    { label: "Quote", href: "#quote" },
];

/* ──────────────────────────────────────────────
   Component
   ────────────────────────────────────────────── */
export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    return (
        <>
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                        ? "glass-strong shadow-lg shadow-black/20"
                        : "bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="flex items-center justify-between h-16 sm:h-18">
                        {/* ─── Logo ─── */}
                        <a href="/" className="flex items-center gap-2.5 group">
                            {/* Logo Icon */}
                            <div className="relative w-8 h-8 flex items-center justify-center">
                                <div className="absolute inset-0 rounded-lg bg-saffron/10 group-hover:bg-saffron/20 transition-colors duration-300" />
                                <svg
                                    className="w-5 h-5 text-saffron relative z-10"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                >
                                    <circle cx="12" cy="12" r="4" />
                                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                                </svg>
                            </div>
                            {/* Wordmark */}
                            <span className="font-heading text-xl font-bold tracking-tight text-white">
                                ene
                                <span className="text-saffron">w</span>
                                able
                            </span>
                        </a>

                        {/* ─── Desktop Nav ─── */}
                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="relative px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors duration-200 group"
                                >
                                    {link.label}
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-saffron/60 group-hover:w-3/4 transition-all duration-300" />
                                </a>
                            ))}

                            {/* CTA */}
                            <motion.a
                                href="#quote"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="ml-4 px-5 py-2 bg-saffron text-zinc-950 text-sm font-semibold rounded-lg hover:shadow-saffron-sm transition-shadow duration-300"
                            >
                                Get Quote
                            </motion.a>
                        </div>

                        {/* ─── Mobile Hamburger ─── */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden relative w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                            aria-label="Toggle menu"
                        >
                            <div className="w-5 flex flex-col gap-1.5">
                                <span
                                    className={`block h-px bg-current transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""
                                        }`}
                                />
                                <span
                                    className={`block h-px bg-current transition-all duration-300 ${mobileOpen ? "opacity-0 scale-0" : ""
                                        }`}
                                />
                                <span
                                    className={`block h-px bg-current transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
                                        }`}
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* ─── Mobile Menu Overlay ─── */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 md:hidden"
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-zinc-950/90 backdrop-blur-xl"
                            onClick={() => setMobileOpen(false)}
                        />

                        {/* Menu Content */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
                            className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-8 px-8"
                        >
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.08 }}
                                    className="font-heading text-3xl font-semibold text-zinc-300 hover:text-saffron transition-colors duration-200"
                                >
                                    {link.label}
                                </motion.a>
                            ))}

                            <motion.a
                                href="#quote"
                                onClick={() => setMobileOpen(false)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + navLinks.length * 0.08 }}
                                className="mt-4 px-8 py-3.5 bg-saffron text-zinc-950 font-semibold rounded-lg text-lg"
                            >
                                Get Quote
                            </motion.a>

                            {/* Trust line */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="absolute bottom-12 text-xs text-zinc-600 tracking-wide"
                            >
                                ⚡ Powering 400+ Gauteng Homes
                            </motion.p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
