"use client";

import { motion } from "framer-motion";
import SunLogo from "./SunLogo";

const NAV_LINKS = [
    { label: "Features", href: "#features" },
    { label: "Team", href: "/team" },
    { label: "Calculator", href: "#calculator" },
    { label: "Get Quote", href: "#quote" },
] as const;

const CERTIFICATIONS = [
    "ECSA Registered",
    "CoJ Compliant",
    "Eskom Registered",
    "BEE Level 1",
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
                                className="inline-flex items-center gap-3 mb-4 group"
                            >
                                <SunLogo
                                    size="header"
                                    className="text-saffron transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(245,193,7,0.5)]"
                                />
                                <span className="text-xl font-heading font-extrabold text-white tracking-tight" style={{letterSpacing: '-0.03em'}}>
                                    ene<span className="text-saffron">w</span>able
                                </span>
                            </a>
                            <p className="text-sm text-zinc-300 leading-relaxed">
                                Premium solar solutions engineered for South Africa&apos;s
                                unique conditions. Built to outlast load shedding and outperform
                                Eskom tariffs. Serving Sandton, Midrand, Fourways, Centurion
                                and greater Gauteng.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="flex flex-col md:flex-row gap-8 md:gap-14">
                            <div>
                                <p className="text-xs font-medium text-zinc-300 uppercase tracking-wider mb-3">
                                    Navigate
                                </p>
                                <ul className="space-y-2">
                                    {NAV_LINKS.map((link) => (
                                        <li key={link.href}>
                                            <a
                                                href={link.href}
                                                className="text-sm text-zinc-300 hover:text-saffron transition-colors duration-200"
                                            >
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-zinc-300 uppercase tracking-wider mb-3">
                                    Certifications
                                </p>
                                <ul className="space-y-2">
                                    {CERTIFICATIONS.map((cert) => (
                                        <li
                                            key={cert}
                                            className="text-sm text-zinc-300 flex items-center gap-1.5"
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
                                <p className="text-xs font-medium text-zinc-300 uppercase tracking-wider mb-3">
                                    Contact
                                </p>
                                <ul className="space-y-2 text-sm text-zinc-300">
                                    <li>Gauteng, South Africa</li>
                                    <li>
                                        <a
                                            href="tel:+27829006199"
                                            className="hover:text-saffron transition-colors"
                                        >
                                            Rob Bagley: +27 82 900 6199
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="mailto:zimbalwa@mweb.co.za"
                                            className="hover:text-saffron transition-colors"
                                        >
                                            zimbalwa@mweb.co.za
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
                            © {currentYear} Enewable. Powering South Africa&apos;s independence.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
