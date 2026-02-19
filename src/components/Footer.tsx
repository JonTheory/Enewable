"use client";

import { motion } from "framer-motion";

const NAV_LINKS = [
    { label: "Features", href: "#features" },
    { label: "Calculator", href: "#calculator" },
    { label: "Get Quote", href: "#quote" },
] as const;

const CERTIFICATIONS = [
    "SABS Approved",
    "CoCT Compliant",
    "Eskom Registered",
    "BEE Level 2",
] as const;

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative border-t border-zinc-800/40">
            {/* Subtle top glow */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, rgba(254,212,32,0.3), transparent)",
                }}
            />

            <div className="relative bg-zinc-950 py-16 sm:py-20">
                <div className="max-w-6xl mx-auto px-6 sm:px-8">
                    {/* ─── Top Row ─── */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 mb-14">
                        {/* Brand */}
                        <div className="max-w-sm">
                            <a
                                href="/"
                                className="inline-flex items-center gap-2 mb-4 group"
                            >
                                <span className="text-xl font-heading font-bold text-white tracking-tight">
                                    ene
                                    <span className="text-saffron">w</span>
                                    able
                                </span>
                            </a>
                            <p className="text-sm text-zinc-600 leading-relaxed">
                                Premium solar solutions engineered for Johannesburg&apos;s
                                unique conditions. Built to outlast load shedding and outperform
                                Eskom tariffs.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="flex flex-col sm:flex-row gap-8 sm:gap-14">
                            <div>
                                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">
                                    Navigate
                                </p>
                                <ul className="space-y-2">
                                    {NAV_LINKS.map((link) => (
                                        <li key={link.href}>
                                            <a
                                                href={link.href}
                                                className="text-sm text-zinc-500 hover:text-saffron transition-colors duration-200"
                                            >
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">
                                    Certifications
                                </p>
                                <ul className="space-y-2">
                                    {CERTIFICATIONS.map((cert) => (
                                        <li
                                            key={cert}
                                            className="text-sm text-zinc-600 flex items-center gap-1.5"
                                        >
                                            <svg
                                                className="w-3 h-3 text-saffron/40"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2.5}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                            {cert}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">
                                    Contact
                                </p>
                                <ul className="space-y-2 text-sm text-zinc-600">
                                    <li>Johannesburg, Gauteng</li>
                                    <li>
                                        <a
                                            href="tel:+27000000000"
                                            className="hover:text-saffron transition-colors"
                                        >
                                            +27 (0) 00 000 0000
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="mailto:hello@enewable.co.za"
                                            className="hover:text-saffron transition-colors"
                                        >
                                            hello@enewable.co.za
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* ─── Divider ─── */}
                    <div className="h-px bg-zinc-800/50 mb-8" />

                    {/* ─── Bottom Row ─── */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-zinc-700">
                            © {currentYear} Enewable. Powering Joburg&apos;s independence.
                        </p>
                        <div className="flex items-center gap-5">
                            <a
                                href="#"
                                className="text-zinc-700 hover:text-saffron transition-colors"
                                aria-label="Facebook"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="text-zinc-700 hover:text-saffron transition-colors"
                                aria-label="Instagram"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="text-zinc-700 hover:text-saffron transition-colors"
                                aria-label="LinkedIn"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
