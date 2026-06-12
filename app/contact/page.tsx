"use client";

import { useState } from "react";
import Link from "next/link";
import { MailIcon, HomeIcon, DoodleStar, ClockIcon } from "@/components/Icons";

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
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 text-[#2d2d2d] dark:text-[#fdfbf7] font-hand">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-xs text-[#2d2d2d]/50 dark:text-[#fdfbf7]/50 mb-8">
        <Link href="/" className="flex items-center gap-1 hover:text-[#ff4d4d] transition-colors">
          <HomeIcon className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <span className="text-[#2d2d2d]/60 dark:text-[#fdfbf7]/60">Contact Us</span>
      </div>

      {/* Header */}
      <div className="text-center mb-10" style={{ transform: "rotate(0.5deg)" }}>
        <h1 className="text-4xl md:text-5xl font-doodle font-bold relative inline-block">
          Drop a Message!
          <span className="absolute -bottom-2 left-0 right-0 h-[5px] bg-[#ff4d4d]/30 rounded-full" />
        </h1>
        <p className="text-base md:text-lg text-[#2d2d2d]/60 dark:text-[#fdfbf7]/60 mt-4 max-w-lg mx-auto">
          Have game suggestions, bug reports, or just want to say hi? Sketch your thoughts below!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Info panel */}
        <div className="space-y-6 md:col-span-1">
          <div
            className="sticky-note p-5 border-2 border-[#2d2d2d] dark:border-[#fdfbf7]"
            style={{
              borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
              transform: "rotate(-1deg)",
            }}
          >
            <h3 className="font-doodle font-bold text-base md:text-lg mb-4 flex items-center gap-2 border-b-2 border-dashed border-[#e5e0d8] dark:border-[#44444a] pb-2 text-[#2d2d2d] dark:text-[#fdfbf7]">
              <MailIcon className="w-5 h-5 text-[#ff4d4d] dark:text-[#ff6b6b]" />
              Direct Mail
            </h3>
            <p className="text-sm text-[#2d2d2d]/70 dark:text-[#fdfbf7]/70 leading-relaxed mb-3">
              You can reach our primary inbox directly at:
            </p>
            <a
              href="mailto:support@eraogames.com"
              className="text-sm md:text-base font-bold text-[#ff4d4d] dark:text-[#ff6b6b] hover:underline"
            >
              support@eraogames.com
            </a>
          </div>

          <div
            className="sticky-note p-5 border-2 border-[#2d5da1] dark:border-[#4dabf7]"
            style={{
              borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
              transform: "rotate(1deg)",
            }}
          >
            <h3 className="font-doodle font-bold text-base md:text-lg mb-4 flex items-center gap-2 border-b-2 border-dashed border-[#e5e0d8] dark:border-[#44444a] pb-2 text-[#2d2d2d] dark:text-[#fdfbf7]">
              <ClockIcon className="w-5 h-5 text-[#2d5da1] dark:text-[#4dabf7]" />
              Response Time
            </h3>
            <p className="text-sm text-[#2d2d2d]/70 dark:text-[#fdfbf7]/70 leading-relaxed">
              We read every single drawing and report we get! Expect a handwritten email response from Alex or Jordan within <span className="font-bold text-[#2d2d2d] dark:text-[#fdfbf7]">24 to 48 hours</span>.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          {submitted ? (
            <div
              className="bg-white dark:bg-[#242429] border-2 border-[#2d2d2d] dark:border-[#fdfbf7] shadow-sketch p-8 text-center"
              style={{
                borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
                transform: "rotate(-0.5deg)",
              }}
            >
              <div
                className="w-16 h-16 bg-[#ff4d4d]/10 border-2 border-[#2d2d2d] dark:border-[#fdfbf7] shadow-sketch-sm flex items-center justify-center mx-auto mb-4 text-[#ff4d4d] dark:text-[#ff6b6b]"
                style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
              >
                <DoodleStar className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-doodle font-bold text-[#2d2d2d] dark:text-[#fdfbf7] mb-2">Scribble Sent!</h2>
              <p className="text-sm md:text-base text-[#2d2d2d]/60 dark:text-[#fdfbf7]/60 mb-6 leading-relaxed max-w-sm mx-auto">
                Thank you for reaching out! Your thoughts have been pinned to our bulletin board. We&apos;ll get back to you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="sketch-btn text-xs bg-white dark:bg-[#242429] hover:bg-[#ff4d4d] hover:text-white dark:hover:bg-[#ff6b6b]"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-[#242429] border-[3px] border-[#2d2d2d] dark:border-[#fdfbf7] shadow-sketch p-6 md:p-8 space-y-5"
              style={{
                borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
                transform: "rotate(0.5deg)",
              }}
            >
              <h2 className="text-lg md:text-xl font-doodle font-bold border-b-2 border-dashed border-[#e5e0d8] dark:border-[#44444a] pb-3 mb-2">
                ✍️ Write Us a Note
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-doodle font-bold uppercase tracking-wider text-[#2d2d2d]/60 dark:text-[#fdfbf7]/60">
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
                  <label className="block text-xs font-doodle font-bold uppercase tracking-wider text-[#2d2d2d]/60 dark:text-[#fdfbf7]/60">
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
                <label className="block text-xs font-doodle font-bold uppercase tracking-wider text-[#2d2d2d]/60 dark:text-[#fdfbf7]/60">
                  Topic / Subject
                </label>
                <div className="relative">
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white dark:bg-[#242429] border-2 border-[#2d2d2d] dark:border-[#fdfbf7] font-hand text-sm text-[#2d2d2d] dark:text-[#fdfbf7] focus:outline-none appearance-none cursor-pointer"
                    style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
                  >
                    <option value="feedback">🌟 General Feedback</option>
                    <option value="bug">🐛 Bug Report / Game Issue</option>
                    <option value="suggestion">💡 Game Submission / Suggestion</option>
                    <option value="business">💼 Partnerships & Other</option>
                  </select>
                  <div className="absolute pointer-events-none right-3 top-1/2 -translate-y-1/2 text-[#2d2d2d]/60 dark:text-[#fdfbf7]/60 font-bold">
                    ▼
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-doodle font-bold uppercase tracking-wider text-[#2d2d2d]/60 dark:text-[#fdfbf7]/60">
                  Your Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Draw your text here..."
                  className="w-full px-4 py-3 bg-white dark:bg-[#242429] border-2 border-[#2d2d2d] dark:border-[#fdfbf7] font-hand text-sm text-[#2d2d2d] dark:text-[#fdfbf7] placeholder:text-[#2d2d2d]/40 dark:placeholder:text-[#fdfbf7]/40 focus:outline-none focus:border-[#2d5da1] dark:focus:border-[#4dabf7] transition-colors resize-none"
                  style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="sketch-btn w-full py-3 bg-[#ff4d4d] dark:bg-[#ff6b6b] text-white hover:bg-[#ff4d4d]/95 dark:hover:bg-[#ff6b6b]/95 border-[#2d2d2d] dark:border-[#fdfbf7] disabled:bg-[#e5e0d8] dark:disabled:bg-[#44444a] disabled:text-[#2d2d2d]/40 dark:disabled:text-[#fdfbf7]/40"
                >
                  {submitting ? "Sending Scribble..." : "Submit Message"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
