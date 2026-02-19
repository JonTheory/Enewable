"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ──────────────────────────────────────────────
   Constants & Helpers
   ────────────────────────────────────────────── */
const MIN_BILL = 1500;
const MAX_BILL = 10000;
const STEP = 100;

// Eskom avg annual tariff increase (%)
const ESKOM_ANNUAL_INCREASE = 12;
// Average solar offset percentage for JHB rooftop
const SOLAR_OFFSET_PCT = 0.72;
// Load shedding hours avoided per month (proportional to system size)
const BASE_LS_HOURS = 6;
const MAX_LS_HOURS = 14;
// Estimated system cost per R of monthly bill
const SYSTEM_COST_MULTIPLIER = 28;
// Years for ROI projection
const PROJECTION_YEARS = 25;

function formatZAR(value: number): string {
    return new Intl.NumberFormat("en-ZA", {
        style: "currency",
        currency: "ZAR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    })
        .format(value)
        .replace("ZAR", "R");
}

function calculateSavings(monthlyBill: number) {
    const monthlySaving = Math.round(monthlyBill * SOLAR_OFFSET_PCT);
    const annualSaving = monthlySaving * 12;

    // Compounded savings over projection period (accounting for Eskom increases)
    let totalSavings = 0;
    let currentAnnualSaving = annualSaving;
    for (let y = 0; y < PROJECTION_YEARS; y++) {
        totalSavings += currentAnnualSaving;
        currentAnnualSaving *= 1 + ESKOM_ANNUAL_INCREASE / 100;
    }

    const systemCost = monthlyBill * SYSTEM_COST_MULTIPLIER;
    const paybackMonths = Math.ceil(systemCost / monthlySaving);
    const paybackYears = Math.floor(paybackMonths / 12);
    const paybackRemainderMonths = paybackMonths % 12;

    // Load shedding hours proportional to bill
    const billRatio = (monthlyBill - MIN_BILL) / (MAX_BILL - MIN_BILL);
    const lsHoursAvoided = Math.round(BASE_LS_HOURS + billRatio * (MAX_LS_HOURS - BASE_LS_HOURS));

    return {
        monthlySaving,
        annualSaving,
        totalSavings: Math.round(totalSavings),
        systemCost,
        paybackYears,
        paybackRemainderMonths,
        lsHoursAvoided,
    };
}

/* ──────────────────────────────────────────────
   Animation Variants
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
export default function ROICalculator() {
    const [monthlyBill, setMonthlyBill] = useState(3500);
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    const handleSliderChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setMonthlyBill(Number(e.target.value));
        },
        []
    );

    const results = useMemo(() => calculateSavings(monthlyBill), [monthlyBill]);
    const sliderPercent = ((monthlyBill - MIN_BILL) / (MAX_BILL - MIN_BILL)) * 100;

    return (
        <section
            id="calculator"
            ref={sectionRef}
            className="relative py-24 sm:py-32 overflow-hidden"
        >
            {/* ─── Background ─── */}
            <div className="absolute inset-0 bg-zinc-950" />
            <div className="absolute inset-0 grid-overlay opacity-20" />
            <div
                className="absolute inset-0 opacity-50"
                style={{
                    background:
                        "radial-gradient(ellipse 50% 60% at 50% 80%, rgba(254, 212, 32, 0.08) 0%, transparent 60%)",
                }}
            />

            {/* ─── Content ─── */}
            <motion.div
                className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8"
                variants={sectionVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {/* Header */}
                <motion.div variants={fadeUp} className="text-center mb-14 sm:mb-18">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-8 h-px bg-saffron/40" />
                        <span className="text-xs font-medium tracking-[0.2em] uppercase text-saffron/70">
                            ROI Calculator
                        </span>
                        <div className="w-8 h-px bg-saffron/40" />
                    </div>
                    <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                        See What You&apos;ll{" "}
                        <span className="text-saffron">Save.</span>
                    </h2>
                    <p className="mt-4 max-w-lg mx-auto text-zinc-300 text-base sm:text-lg">
                        Slide to your current Eskom bill and watch the numbers work in your
                        favour. Based on Johannesburg&apos;s average 2,500+ sun hours per year.
                    </p>
                </motion.div>

                {/* Calculator Card */}
                <motion.div
                    variants={fadeUp}
                    className="glass rounded-2xl p-6 sm:p-10 border border-zinc-800/50"
                >
                    {/* ─── Slider Section ─── */}
                    <div className="mb-10">
                        <div className="flex items-end justify-between mb-6">
                            <div>
                                <p className="text-xs text-zinc-300 uppercase tracking-wider mb-1">
                                    Current Monthly Eskom Bill
                                </p>
                                <p className="font-heading text-4xl sm:text-5xl font-bold text-white">
                                    {formatZAR(monthlyBill)}
                                    <span className="text-lg font-normal text-zinc-300 ml-1">
                                        /mo
                                    </span>
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-zinc-300 uppercase tracking-wider mb-1">
                                    Eskom Increase Rate
                                </p>
                                <p className="font-heading text-lg font-semibold text-red-400/80">
                                    +{ESKOM_ANNUAL_INCREASE}% /yr
                                </p>
                            </div>
                        </div>

                        {/* Custom Slider */}
                        <div className="relative pt-2 pb-1">
                            {/* Track background */}
                            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1.5 rounded-full bg-zinc-800/80" />
                            {/* Track fill */}
                            <div
                                className="absolute top-1/2 -translate-y-1/2 left-0 h-1.5 rounded-full bg-gradient-to-r from-saffron/50 to-saffron transition-all duration-100"
                                style={{ width: `${sliderPercent}%` }}
                            />
                            {/* Glow under thumb */}
                            <div
                                className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-saffron/20 blur-md transition-all duration-100"
                                style={{ left: `calc(${sliderPercent}% - 12px)` }}
                            />
                            {/* Native range input */}
                            <input
                                type="range"
                                min={MIN_BILL}
                                max={MAX_BILL}
                                step={STEP}
                                value={monthlyBill}
                                onChange={handleSliderChange}
                                className="relative z-10 w-full appearance-none bg-transparent cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-5
                  [&::-webkit-slider-thumb]:h-5
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-saffron
                  [&::-webkit-slider-thumb]:border-2
                  [&::-webkit-slider-thumb]:border-saffron-300
                  [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(254,212,32,0.4)]
                  [&::-webkit-slider-thumb]:transition-shadow
                  [&::-webkit-slider-thumb]:duration-200
                  [&::-webkit-slider-thumb]:hover:shadow-[0_0_20px_rgba(254,212,32,0.6)]
                  [&::-moz-range-thumb]:w-5
                  [&::-moz-range-thumb]:h-5
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:bg-saffron
                  [&::-moz-range-thumb]:border-2
                  [&::-moz-range-thumb]:border-saffron-300
                  [&::-moz-range-thumb]:shadow-[0_0_12px_rgba(254,212,32,0.4)]
                "
                                aria-label="Monthly electricity bill"
                            />
                        </div>

                        {/* Range labels */}
                        <div className="flex justify-between mt-2 text-[11px] text-zinc-700">
                            <span>{formatZAR(MIN_BILL)}</span>
                            <span>{formatZAR(MAX_BILL)}+</span>
                        </div>
                    </div>

                    {/* ─── Results Grid ─── */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Monthly Savings */}
                        <div className="rounded-xl bg-zinc-900/60 border border-zinc-800/40 p-4 sm:p-5 text-center">
                            <div className="flex items-center justify-center mb-2">
                                <svg className="w-4 h-4 text-emerald-400/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                    <polyline points="17 6 23 6 23 12" />
                                </svg>
                            </div>
                            <p className="font-heading text-2xl sm:text-3xl font-bold text-emerald-400">
                                {formatZAR(results.monthlySaving)}
                            </p>
                            <p className="mt-1 text-[10px] sm:text-[11px] text-zinc-300 uppercase tracking-wider">
                                Monthly Savings
                            </p>
                        </div>

                        {/* Annual Savings */}
                        <div className="rounded-xl bg-zinc-900/60 border border-zinc-800/40 p-4 sm:p-5 text-center">
                            <div className="flex items-center justify-center mb-2">
                                <svg className="w-4 h-4 text-saffron/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 6v6l4 2" />
                                </svg>
                            </div>
                            <p className="font-heading text-2xl sm:text-3xl font-bold text-white">
                                {formatZAR(results.annualSaving)}
                            </p>
                            <p className="mt-1 text-[10px] sm:text-[11px] text-zinc-300 uppercase tracking-wider">
                                Annual Savings
                            </p>
                        </div>

                        {/* Payback Period */}
                        <div className="rounded-xl bg-zinc-900/60 border border-zinc-800/40 p-4 sm:p-5 text-center">
                            <div className="flex items-center justify-center mb-2">
                                <svg className="w-4 h-4 text-saffron/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                            </div>
                            <p className="font-heading text-2xl sm:text-3xl font-bold text-white">
                                {results.paybackYears}
                                <span className="text-base font-normal text-zinc-300">y </span>
                                {results.paybackRemainderMonths}
                                <span className="text-base font-normal text-zinc-300">m</span>
                            </p>
                            <p className="mt-1 text-[10px] sm:text-[11px] text-zinc-300 uppercase tracking-wider">
                                Payback Period
                            </p>
                        </div>

                        {/* Load Shedding Hours */}
                        <div className="rounded-xl bg-saffron/5 border border-saffron/15 p-4 sm:p-5 text-center">
                            <div className="flex items-center justify-center mb-2">
                                <svg className="w-4 h-4 text-saffron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                </svg>
                            </div>
                            <p className="font-heading text-2xl sm:text-3xl font-bold text-saffron">
                                {results.lsHoursAvoided}
                                <span className="text-base font-normal text-saffron/50">hrs</span>
                            </p>
                            <p className="mt-1 text-[10px] sm:text-[11px] text-saffron/50 uppercase tracking-wider">
                                LS Hours Avoided /mo
                            </p>
                        </div>
                    </div>

                    {/* ─── 25-Year Projection ─── */}
                    <div className="mt-8 rounded-xl bg-gradient-to-r from-zinc-900/80 to-zinc-900/40 border border-zinc-800/30 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <p className="text-xs text-zinc-300 uppercase tracking-wider mb-1">
                                Projected {PROJECTION_YEARS}-Year Savings
                            </p>
                            <p className="font-heading text-3xl sm:text-4xl font-bold text-white">
                                {formatZAR(results.totalSavings)}
                            </p>
                            <p className="text-xs text-zinc-300 mt-1">
                                Accounting for {ESKOM_ANNUAL_INCREASE}% annual Eskom tariff increases
                            </p>
                        </div>
                        <motion.a
                            href="#quote"
                            whileHover={{ scale: 1.04, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            className="shrink-0 px-6 py-3.5 bg-saffron text-zinc-950 font-semibold text-sm rounded-lg hover:shadow-saffron-md transition-shadow duration-300 flex items-center gap-2"
                        >
                            Lock In Your Savings
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </motion.a>
                    </div>

                    {/* Disclaimer */}
                    <p className="mt-5 text-[10px] text-zinc-700 text-center leading-relaxed">
                        * Estimates based on average Johannesburg solar irradiance (5.5
                        kWh/m²/day), north-facing roof, and current Eskom municipal
                        tariffs. Actual results may vary based on roof orientation,
                        shading, and consumption patterns. System sizing subject to site
                        assessment.
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
}
