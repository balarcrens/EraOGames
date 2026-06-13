"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Home, Star, Clock, PenTool } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("feedback");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSubmitting(true);
    // Simulate API request delay
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 text-slate-700 dark:text-slate-300 font-sans">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 mb-8 font-medium">
        <Link href="/" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <span className="text-slate-500 dark:text-slate-400 font-semibold">Contact Us</span>
      </div>

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-display font-bold relative inline-block text-slate-800 dark:text-white tracking-wide">
          Drop a Message!
          <span className="absolute -bottom-1.5 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
        </h1>
        <p className="text-base text-slate-400 dark:text-slate-500 mt-4 max-w-lg mx-auto font-medium">
          Have game suggestions, bug reports, or general feedback? Send us a note below!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Info panel */}
        <div className="space-y-6 md:col-span-1">
          <div className="bg-white dark:bg-[#121824] p-5 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-premium">
            <h3 className="font-display font-bold text-base md:text-lg mb-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3 text-slate-800 dark:text-white">
              <Mail className="w-5 h-5 text-indigo-500" />
              <span>Direct Mail</span>
            </h3>
            <p className="text-sm text-slate-400 dark:text-slate-500 font-medium leading-relaxed mb-3">
              You can reach our primary inbox directly at:
            </p>
            <a
              href="mailto:support@eraogames.com"
              className="text-sm md:text-base font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              support@eraogames.com
            </a>
          </div>

          <div className="bg-white dark:bg-[#121824] p-5 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-premium">
            <h3 className="font-display font-bold text-base md:text-lg mb-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3 text-slate-800 dark:text-white">
              <Clock className="w-5 h-5 text-violet-500" />
              <span>Response Time</span>
            </h3>
            <p className="text-sm text-slate-400 dark:text-slate-500 font-medium leading-relaxed">
              We read every single message and report we get! Expect an email response from our support team within <span className="font-bold text-slate-700 dark:text-slate-200">24 to 48 hours</span>.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          {submitted ? (
            <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-premium p-8 text-center">
              <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/30 flex items-center justify-center mx-auto mb-4 rounded-full text-indigo-500"
              >
                <Star className="w-7 h-7 fill-current" />
              </div>
              <h2 className="text-xl md:text-2xl font-display font-bold text-slate-800 dark:text-white mb-2">Message Sent!</h2>
              <p className="text-sm text-slate-400 dark:text-slate-500 mb-6 leading-relaxed max-w-sm mx-auto font-medium">
                Thank you for reaching out! Your thoughts have been pinned to our board. We&apos;ll get back to you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="sketch-btn text-xs bg-white dark:bg-[#242429] hover:shadow-lg"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 shadow-premium p-6 md:p-8 space-y-5 rounded-2xl"
            >
              <h2 className="text-lg md:text-xl font-display font-bold border-b border-slate-100 dark:border-slate-800/80 pb-3 text-slate-800 dark:text-white flex items-center gap-2">
                <PenTool className="w-5 h-5 text-indigo-500" />
                <span>Write Us a Note</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Pixel Player"
                    className="sketch-input py-2.5"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. player@games.com"
                    className="sketch-input py-2.5"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Topic / Subject
                </label>
                <div className="relative">
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800/80 rounded-xl font-sans text-sm text-slate-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500/40 appearance-none cursor-pointer"
                  >
                    <option value="feedback">General Feedback</option>
                    <option value="bug">Bug Report / Game Issue</option>
                    <option value="suggestion">Game Submission / Suggestion</option>
                    <option value="business">Partnerships & Other</option>
                  </select>
                  <div className="absolute pointer-events-none right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-xs">
                    ▼
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Your Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message details here..."
                  className="w-full px-4 py-3 bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-xl font-sans text-sm text-slate-800 dark:text-gray-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="sketch-btn w-full py-3.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Sending message..." : "Submit Message"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
