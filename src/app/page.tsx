"use client";

import { useState } from "react";
import Image from "next/image";
import logoSvg from "@/assets/logo.svg";
import {
  RiInstagramLine,
  RiWhatsappLine,
  RiMailLine,
  RiSparklingLine,
  RiArrowRightLine,
  RiCheckLine,
  RiCameraLensLine,
  RiFocus3Line,
} from "@remixicon/react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Ocorreu um erro ao salvar seu e-mail.");
      } else {
        setFeedbackMessage(data.message || "Você receberá em primeira mão o convite de lançamento.");
        setSubscribed(true);
        setEmail("");
      }
    } catch {
      setErrorMessage("Erro de conexão. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const specialties = [
    "Casamentos & Destination",
    "15 Anos",
    "Pré-Wedding",
  ];

  return (
    <main className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-zinc-950 text-zinc-100 font-sans selection:bg-amber-500/25 selection:text-amber-200">
      {/* Dynamic Ambient Background Glows */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        {/* Top radial champagne/gold warm glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[450px] rounded-full bg-gradient-to-b from-amber-500/12 via-amber-600/5 to-transparent blur-[120px]" />

        {/* Soft bottom ambient vignette */}
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[500px] sm:w-[800px] h-[350px] rounded-full bg-gradient-to-t from-zinc-800/25 via-zinc-900/10 to-transparent blur-[140px]" />

        {/* Photography rule-of-thirds grid lines (subtle atmospheric texture) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,#000_50%,transparent_100%)] opacity-70" />
      </div>

      {/* Camera Viewfinder Corner Brackets */}
      <div className="pointer-events-none fixed inset-3 sm:inset-6 z-30 flex flex-col justify-between" aria-hidden="true">
        <div className="flex justify-between items-start">
          <div className="w-3.5 h-3.5 sm:w-5 sm:h-5 border-t border-l border-zinc-700/60" />
          <div className="w-3.5 h-3.5 sm:w-5 sm:h-5 border-t border-r border-zinc-700/60" />
        </div>
        <div className="flex justify-between items-end">
          <div className="w-3.5 h-3.5 sm:w-5 sm:h-5 border-b border-l border-zinc-700/60" />
          <div className="w-3.5 h-3.5 sm:w-5 sm:h-5 border-b border-r border-zinc-700/60" />
        </div>
      </div>

      {/* Top Bar Navigation / Header */}
      <header className="relative z-20 w-full max-w-6xl mx-auto px-6 sm:px-10 pt-6 sm:pt-8 flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-xs tracking-[0.2em] uppercase text-zinc-400 font-medium">
          <RiCameraLensLine className="size-4 text-amber-400/90" />
          <span className="hidden sm:inline">Pilotto Studio</span>
          <span className="hidden sm:inline text-zinc-600">•</span>
          <span className="text-zinc-500">Fine Art Photography</span>
        </div>

        {/* Live Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800/80 shadow-xs backdrop-blur-md text-[11px] font-medium tracking-wider uppercase text-zinc-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          <span>Site em Construção</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-20 w-full max-w-4xl mx-auto px-6 py-6 sm:py-10 flex flex-col items-center text-center my-auto">
        {/* Optical Center Marker / Focal tag */}
        <div className="mb-4 sm:mb-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-zinc-500 font-medium">
          <RiFocus3Line className="size-3.5 text-amber-500/80" />
          <span>Foco &bull; Sensibilidade &bull; Atemporalidade</span>
        </div>

        {/* The Brand Logo - Tamanho Reduzido */}
        <div className="relative group my-2 sm:my-3 flex items-center justify-center">
          {/* Subtle logo back-glow */}
          <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full scale-110 pointer-events-none transition-transform duration-700 group-hover:scale-125" />

          <Image
            src={logoSvg}
            alt="Pilotto Fotografia"
            priority
            className="relative w-[170px] sm:w-[220px] md:w-[260px] h-auto object-contain drop-shadow-[0_8px_25px_rgba(255,255,255,0.12)] transition-all duration-700 group-hover:drop-shadow-[0_12px_35px_rgba(255,255,255,0.20)]"
          />
        </div>

        {/* Delicate divider with photography crosshair */}
        <div className="my-5 sm:my-6 flex items-center justify-center gap-4 w-full max-w-xs text-zinc-800">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-zinc-800" />
          <span className="text-amber-500/80 text-xs tracking-widest font-mono">+</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-zinc-800" />
        </div>

        {/* Main Headline */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-zinc-100 max-w-2xl leading-[1.2]">
          Eternizando momentos com{" "}
          <span className="italic font-serif text-amber-200/90 drop-shadow-[0_2px_15px_rgba(253,230,138,0.2)]">
            sensibilidade e arte
          </span>
          .
        </h1>

        {/* Subtitle Description */}
        <p className="mt-4 text-sm sm:text-base text-zinc-400 font-light max-w-lg leading-relaxed">
          Estamos preparando uma nova experiência digital para apresentar nossos ensaios,
          casamentos e histórias visuais com o cuidado que cada instante merece.
        </p>

        {/* Specialty Tags */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 max-w-lg">
          {specialties.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-light tracking-wide bg-zinc-900/60 border border-zinc-800/80 text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white"
            >
              <span className="w-1 h-1 rounded-full bg-amber-400/70" />
              {item}
            </span>
          ))}
        </div>

        {/* Notification Form / Capture */}
        <div className="mt-8 sm:mt-9 w-full max-w-md">
          {subscribed ? (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm flex items-center justify-center gap-2.5 transition-all">
              <RiCheckLine className="size-5 text-amber-400 shrink-0" />
              <span>{feedbackMessage}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage("");
                  }}
                  placeholder="Seu melhor e-mail para novidades..."
                  required
                  className="w-full h-11 px-4 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-100 placeholder:text-zinc-500 text-sm outline-none transition-all focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 backdrop-blur-md"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="h-11 px-5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-sm tracking-wide transition-all shadow-md hover:shadow-lg active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                {loading ? (
                  <span className="size-4 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Avise-me</span>
                    <RiArrowRightLine className="size-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {errorMessage && (
            <p className="mt-2 text-xs text-rose-400 font-medium text-center">
              {errorMessage}
            </p>
          )}

          <p className="mt-2 text-[11px] text-zinc-500 tracking-wide">
            Sem spam. Apenas o convite exclusivo para a estreia do novo portfólio.
          </p>
        </div>

        {/* Direct Contact CTAs during construction */}
        <div className="mt-8 pt-6 border-t border-zinc-900/90 w-full max-w-md flex flex-col items-center">
          <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400 font-medium mb-3">
            Precisa agendar uma data agora?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 w-full">
            <a
              href="https://wa.me/5517997435040"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/40 hover:border-emerald-700/60 text-emerald-200 text-xs sm:text-sm font-medium transition-all shadow-xs"
            >
              <RiWhatsappLine className="size-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>Fale no WhatsApp</span>
            </a>

            <a
              href="https://instagram.com/pilottofotografia"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800/90 border border-zinc-800 hover:border-zinc-700 text-zinc-200 text-xs sm:text-sm font-medium transition-all shadow-xs"
            >
              <RiInstagramLine className="size-4 text-pink-400 group-hover:scale-110 transition-transform" />
              <span>@pilottofotografia</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 w-full max-w-6xl mx-auto px-6 sm:px-10 pb-6 sm:pb-8 pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
        <div className="flex items-center gap-2">
          <RiSparklingLine className="size-3.5 text-amber-500/80" />
          <span>Agenda aberta para temporadas de casamentos e ensaios</span>
        </div>

        <div className="flex items-center gap-4 text-zinc-500">
          <a
            href="mailto:contato@pilottofotografia.com.br"
            className="hover:text-zinc-300 transition-colors inline-flex items-center gap-1.5"
          >
            <RiMailLine className="size-3.5" />
            <span>contato@pilottofotografia.com.br</span>
          </a>
          <span className="text-zinc-800">•</span>
          <span>© 2026 Pilotto Fotografia</span>
        </div>
      </footer>
    </main>
  );
}
