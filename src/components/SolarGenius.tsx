"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ──────────────────────────────────────────────
   Pre-built Responses (no API needed for MVP)
   ────────────────────────────────────────────── */
const QUICK_QUESTIONS = [
    "How much can I save?",
    "Best system for load shedding?",
    "What size do I need?",
    "How long is installation?",
] as const;

interface Message {
    role: "user" | "assistant";
    text: string;
}

const RESPONSES: Record<string, string> = {
    "How much can I save?":
        "Based on average Joburg conditions, a well-sized system can offset 70-85% of your Eskom bill. For a household spending R3,500/mo, that's roughly R2,500+ in monthly savings — and with Eskom increasing tariffs by ~12% annually, those savings compound dramatically. Try our ROI Calculator above for your exact numbers! ⚡",
    "Best system for load shedding?":
        "For load shedding protection, I'd recommend a hybrid inverter (5-8kW) paired with a lithium-ion battery bank (10-15kWh). This keeps your essentials running through Stage 6 — lights, Wi-Fi, fridge, security, and even a TV. Our systems switch over in under 10ms, so you won't even notice the grid dropping. 🔋",
    "What size do I need?":
        "System size depends on your monthly consumption and goals. As a rough guide:\n\n• R1,500-R3,000 bill → 3-5kW system\n• R3,000-R6,000 bill → 5-8kW system\n• R6,000-R10,000+ bill → 8-15kW system\n\nWe'll do a free site assessment — checking your roof orientation, shading, and DB board — to size it perfectly. Request a quote and we'll handle the rest! 🏠",
    "How long is installation?":
        "A typical residential installation takes 1-2 days for a standard system. Here's the timeline:\n\n• Site assessment: same week\n• Custom design: 2-3 days\n• Equipment delivery: 5-7 days\n• Installation: 1-2 days\n• CoCT/Eskom registration: 2-4 weeks\n\nWe handle all the paperwork and inspections. Most homeowners are generating power within 3 weeks of signing. ⚙️",
};

const DEFAULT_RESPONSE =
    "Great question! I'd love to help you with that. For a detailed answer tailored to your specific situation, I'd recommend requesting a free quote — our team will design a custom solution for your Joburg home. You can also try the ROI Calculator above for instant savings estimates! 🌞";

/* ──────────────────────────────────────────────
   Component
   ────────────────────────────────────────────── */
export default function SolarGenius() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            text: "Hey! I'm Solar Genius 🌞 — your AI solar advisor for Johannesburg. Ask me anything about solar savings, load shedding backup, or system sizing.",
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    const handleSend = (text: string) => {
        if (!text.trim()) return;

        const userMsg: Message = { role: "user", text: text.trim() };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simulate typing delay
        setTimeout(() => {
            const response = RESPONSES[text.trim()] ?? DEFAULT_RESPONSE;
            setMessages((prev) => [...prev, { role: "assistant", text: response }]);
            setIsTyping(false);
        }, 800 + Math.random() * 600);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSend(input);
    };

    return (
        <>
            {/* ─── FAB Button ─── */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-saffron text-zinc-950 shadow-[0_0_30px_rgba(254,212,32,0.3)] flex items-center justify-center cursor-pointer transition-shadow hover:shadow-[0_0_40px_rgba(254,212,32,0.5)]"
                aria-label={isOpen ? "Close Solar Genius" : "Open Solar Genius"}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.svg
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </motion.svg>
                    ) : (
                        <motion.svg
                            key="sun"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <circle cx="12" cy="12" r="5" />
                            <path strokeLinecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                        </motion.svg>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* ─── Chat Panel ─── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                        className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] rounded-2xl border border-zinc-800/50 bg-zinc-950/95 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col"
                        style={{ maxHeight: "min(520px, calc(100vh - 140px))" }}
                    >
                        {/* Header */}
                        <div className="px-5 py-4 border-b border-zinc-800/40 flex items-center gap-3 shrink-0">
                            <div className="w-9 h-9 rounded-full bg-saffron/10 flex items-center justify-center">
                                <svg
                                    className="w-5 h-5 text-saffron"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <circle cx="12" cy="12" r="5" />
                                    <path strokeLinecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">Solar Genius</p>
                                <p className="text-[10px] text-emerald-400/70 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                                    Online
                                </p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed whitespace-pre-line
                      ${msg.role === "user"
                                                ? "bg-saffron/10 text-saffron-100 border border-saffron/15 rounded-br-md"
                                                : "bg-zinc-900/60 text-zinc-300 border border-zinc-800/30 rounded-bl-md"
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-zinc-900/60 border border-zinc-800/30 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce [animation-delay:0ms]" />
                                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce [animation-delay:150ms]" />
                                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce [animation-delay:300ms]" />
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Questions */}
                        {messages.length <= 1 && (
                            <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
                                {QUICK_QUESTIONS.map((q) => (
                                    <button
                                        key={q}
                                        onClick={() => handleSend(q)}
                                        className="px-3 py-1.5 text-[11px] rounded-full border border-zinc-800/50 text-zinc-500 hover:text-saffron hover:border-saffron/30 transition-all cursor-pointer"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <form
                            onSubmit={handleSubmit}
                            className="px-4 py-3 border-t border-zinc-800/40 flex items-center gap-2 shrink-0"
                        >
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about solar…"
                                className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-700 focus:outline-none"
                            />
                            <motion.button
                                type="submit"
                                disabled={!input.trim()}
                                whileTap={{ scale: 0.9 }}
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer
                  ${input.trim() ? "bg-saffron text-zinc-950" : "bg-zinc-800 text-zinc-600"}`}
                            >
                                <svg
                                    className="w-3.5 h-3.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 12h14M12 5l7 7-7 7"
                                    />
                                </svg>
                            </motion.button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
