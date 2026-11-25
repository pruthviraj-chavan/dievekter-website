"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Building2,
  Check,
  Clock,
  Compass,
  Copy,
  Grid3X3,
  Layers,
  MapPin,
  Navigation,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { toast } from "sonner";
import { FlyLeftBlock, FlyRightBlock, ScaleGlow } from "@/components/animation/MotionPrimitives";
import { OFFICE_LOCATIONS } from "@/config/site";
import { cn } from "@/lib/utils";

export function LocationsSection({
  tone = "light",
  id = "locations",
}: {
  tone?: "light" | "peach";
  id?: string;
}) {
  const reduceMotion = Boolean(useReducedMotion());
  const [selectedId, setSelectedId] = useState<string>(OFFICE_LOCATIONS[0].id);
  const [viewMode, setViewMode] = useState<"spotlight" | "grid">("spotlight");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeOffice =
    OFFICE_LOCATIONS.find((o) => o.id === selectedId) ?? OFFICE_LOCATIONS[0];

  const handleCopyAddress = (officeId: string, address: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(address);
      setCopiedId(officeId);
      toast.success("Office address copied to clipboard");
      window.setTimeout(() => setCopiedId((prev) => (prev === officeId ? null : prev)), 2000);
    }
  };

  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden py-20 sm:py-28 border-t border-stone-100",
        tone === "peach" ? "bg-[#FFF8F5]" : "dv-dot-bg bg-white",
      )}
    >
      {/* Ambient Accent Orbs */}
      <ScaleGlow
        aria-hidden
        className="pointer-events-none -top-24 left-1/4 absolute h-72 w-72 rounded-full bg-[#FF5422]/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-1/5 h-80 w-80 rounded-full bg-[#FF5422]/8 blur-[130px]"
      />

      <div className="container relative z-10 mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
        {/* Section Header + Mode Switcher */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#FF5422] px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
              Offices &amp; Branches
            </span>
            <h2
              className="mt-4 font-bold tracking-tight text-[#141210]"
              style={{ fontSize: "clamp(28px, 3.8vw, 46px)", lineHeight: 1.08 }}
            >
              Visit our studios across{" "}
              <span className="text-[#FF5422]">Radhanagari, Kolhapur &amp; Phondaghat.</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
              Meet our software engineering team or book an in-person Study Abroad counselling session
              at our head office or regional branches.
            </p>
          </div>

          {/* Animated View Mode Switcher */}
          <div
            role="group"
            aria-label="Map view mode"
            className="inline-flex self-start md:self-auto rounded-full border border-stone-200 bg-white p-1 shadow-sm"
          >
            {(
              [
                { id: "spotlight", label: "Interactive Map", icon: Layers },
                { id: "grid", label: "All 3 Maps", icon: Grid3X3 },
              ] as const
            ).map((mode) => {
              const isActive = viewMode === mode.id;
              const Icon = mode.icon;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setViewMode(mode.id)}
                  className={cn(
                    "relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-colors",
                    isActive ? "text-white" : "text-stone-600 hover:text-[#141210]",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="locations-mode-pill"
                      transition={{ type: "spring", stiffness: 360, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-[#141210]"
                    />
                  )}
                  <Icon className="relative z-10 h-3.5 w-3.5" />
                  <span className="relative z-10">{mode.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === "spotlight" ? (
            <motion.div
              key="spotlight-view"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
              className="grid gap-8 lg:grid-cols-12 items-stretch"
            >
              {/* Left Office Selector Stack */}
              <FlyLeftBlock className="lg:col-span-5 flex flex-col gap-4">
                {OFFICE_LOCATIONS.map((office, index) => {
                  const selected = office.id === activeOffice.id;
                  return (
                    <motion.div
                      key={office.id}
                      whileHover={reduceMotion ? undefined : { x: 4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 26 }}
                      onClick={() => setSelectedId(office.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedId(office.id);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-pressed={selected}
                      className={cn(
                        "group relative cursor-pointer rounded-2xl border p-5 sm:p-6 transition-all duration-300",
                        selected
                          ? "border-[#FF5422] bg-white shadow-[0_22px_50px_-18px_rgba(255,84,34,0.28)]"
                          : "border-[#FBE0D4] bg-white/85 hover:bg-white hover:border-[#FF5422]/45 shadow-sm",
                      )}
                    >
                      {selected && (
                        <motion.span
                          layoutId="active-office-accent-bar"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          className="absolute left-0 top-5 bottom-5 w-1 rounded-r-full bg-[#FF5422]"
                        />
                      )}

                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={cn(
                              "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors",
                              selected
                                ? "bg-[#FF5422] text-white"
                                : "bg-[#FFF4F0] text-[#FF5422] group-hover:bg-[#FF5422] group-hover:text-white",
                            )}
                          >
                            {index === 0 ? (
                              <Building2 className="h-4 w-4" />
                            ) : (
                              <MapPin className="h-4 w-4" />
                            )}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#FF5422]">
                                {office.badge}
                              </span>
                              {selected && (
                                <span className="relative flex h-2 w-2" aria-hidden="true">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                </span>
                              )}
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-[#141210]">
                              {office.title}
                            </h3>
                          </div>
                        </div>

                        <span className="shrink-0 rounded-full border border-stone-200 bg-stone-50 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-stone-500">
                          {office.postalCode}
                        </span>
                      </div>

                      <p className="mt-3 text-xs sm:text-sm leading-relaxed text-stone-600">
                        {office.address}
                      </p>

                      {selected && (
                        <motion.div
                          initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.24 }}
                          className="mt-4 pt-3.5 border-t border-stone-100 space-y-3"
                        >
                          <div className="flex flex-wrap gap-1.5">
                            {office.highlights.map((h) => (
                              <span
                                key={h}
                                className="rounded-full bg-[#FFF5F1] border border-[#FBE0D4] px-2.5 py-1 text-[11px] font-medium text-[#141210]"
                              >
                                {h}
                              </span>
                            ))}
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                            <span className="inline-flex items-center gap-1.5 text-[11px] text-stone-500">
                              <Clock className="h-3.5 w-3.5 text-[#FF5422]" />
                              {office.hours}
                            </span>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopyAddress(office.id, office.address);
                                }}
                                className="inline-flex items-center gap-1 rounded-full border border-stone-200 bg-white px-3 py-1 text-[11px] font-semibold text-stone-700 hover:border-[#FF5422] hover:text-[#FF5422] transition-colors"
                              >
                                {copiedId === office.id ? (
                                  <>
                                    <Check className="h-3 w-3 text-emerald-600" /> Copied
                                  </>
                                ) : (
                                  <>
                                    <Copy className="h-3 w-3" /> Copy
                                  </>
                                )}
                              </button>
                              <a
                                href={office.directionsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1 rounded-full bg-[#141210] px-3 py-1 text-[11px] font-semibold text-white hover:bg-[#FF5422] transition-colors"
                              >
                                <Navigation className="h-3 w-3" /> Directions
                              </a>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </FlyLeftBlock>

              {/* Right Animated Google Map Viewport */}
              <FlyRightBlock className="lg:col-span-7 flex flex-col">
                <div className="relative flex-1 min-h-[420px] sm:min-h-[480px] rounded-3xl border border-[#FBE0D4] bg-[#141210] p-2.5 shadow-[0_28px_60px_-24px_rgba(20,18,16,0.35)] flex flex-col overflow-hidden">
                  {/* Top Editorial Map Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-xs text-stone-300 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5422] opacity-80" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF5422]" />
                      </span>
                      <span className="font-semibold text-white">{activeOffice.title}</span>
                    </div>
                    <div className="flex items-center gap-3 font-mono text-[11px] text-stone-400">
                      <span className="inline-flex items-center gap-1">
                        <Compass className="h-3.5 w-3.5 text-[#FF5422]" />
                        {activeOffice.lat.toFixed(4)}° N, {activeOffice.lng.toFixed(4)}° E
                      </span>
                    </div>
                  </div>

                  {/* Animated Iframe Container */}
                  <div className="relative flex-1 overflow-hidden rounded-2xl mt-2 bg-stone-900">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeOffice.id}
                        initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={reduceMotion ? undefined : { opacity: 0, scale: 1.01 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0"
                      >
                        <iframe
                          src={activeOffice.embedUrl}
                          title={`Google Map showing ${activeOffice.title} — ${activeOffice.city}`}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="strict-origin-when-cross-origin"
                          className="h-full w-full grayscale-[8%] contrast-[1.04]"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Floating Glass Quick Card */}
                    <div className="pointer-events-none absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-sm">
                      <div className="pointer-events-auto rounded-2xl border border-white/15 bg-[#141210]/90 backdrop-blur-md p-3.5 text-white shadow-xl flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#FF5422]">
                            {activeOffice.badge}
                          </p>
                          <p className="text-xs font-medium text-stone-200 truncate">
                            {activeOffice.address}
                          </p>
                        </div>
                        <a
                          href={activeOffice.directionsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${activeOffice.title} in Google Maps`}
                          className="shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#FF5422] text-white hover:bg-[#e8460e] transition-colors"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </FlyRightBlock>
            </motion.div>
          ) : (
            <motion.div
              key="grid-view"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
              className="grid gap-6 md:grid-cols-3"
            >
              {OFFICE_LOCATIONS.map((office, idx) => (
                <motion.div
                  key={office.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  whileHover={reduceMotion ? undefined : { y: -6 }}
                  className="flex flex-col overflow-hidden rounded-3xl border border-[#FBE0D4] bg-white shadow-sm hover:border-[#FF5422]/60 hover:shadow-[0_24px_48px_-20px_rgba(255,84,34,0.22)] transition-all"
                >
                  <div className="relative h-64 w-full bg-stone-100 overflow-hidden">
                    <iframe
                      src={office.embedUrl}
                      title={`Google Map for ${office.title}`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                      className="h-full w-full"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="rounded-full bg-[#FFF5F1] border border-[#FBE0D4] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#FF5422]">
                          {office.badge}
                        </span>
                        <span className="font-mono text-[11px] text-stone-400">
                          {office.postalCode}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[#141210]">{office.title}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-stone-600">{office.address}</p>
                    </div>
                    <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopyAddress(office.id, office.address)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-stone-600 hover:text-[#FF5422]"
                      >
                        {copiedId === office.id ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-600" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" /> Copy address
                          </>
                        )}
                      </button>
                      <a
                        href={office.directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-full bg-[#141210] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#FF5422] transition-colors"
                      >
                        Directions <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
