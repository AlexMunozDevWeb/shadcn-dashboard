"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import {
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  CreditCard,
  Globe,
  Heart,
  History,
  Minus,
  Play,
  Plus,
  RotateCw,
  Share2,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";
import { cn } from "@/modules/lib/utils";
import { usePaperTheme } from "@/modules/components/theme-provider";
import { uiText } from "@/modules/data/ui-text";

const initialStatCards = [
  {
    id: "capacity",
    label: uiText.dashboard.capacity,
    value: "150GB",
    meta: uiText.dashboard.updateNow,
    metaIcon: RotateCw,
    Icon: Globe,
    iconBg:
      "bg-amber-50 text-accent-yellow dark:bg-amber-950/60 dark:text-amber-300",
    borderHover: "hover:border-amber-200",
  },
  {
    id: "revenue",
    label: uiText.dashboard.revenue,
    value: "$ 1,345",
    meta: uiText.dashboard.lastDay,
    metaIcon: Calendar,
    Icon: CreditCard,
    iconBg:
      "bg-emerald-50 text-accent-mint dark:bg-emerald-950/60 dark:text-emerald-300",
    borderHover: "hover:border-emerald-200",
  },
  {
    id: "errors",
    label: uiText.dashboard.errors,
    value: "23",
    meta: uiText.dashboard.lastHour,
    metaIcon: Clock,
    Icon: Share2,
    iconBg:
      "bg-orange-50 text-accent-coral dark:bg-orange-950/60 dark:text-orange-300",
    borderHover: "hover:border-orange-200",
  },
  {
    id: "followers",
    label: uiText.dashboard.followers,
    value: "+45K",
    meta: uiText.dashboard.updateNowLower,
    metaIcon: RotateCw,
    Icon: Heart,
    iconBg:
      "bg-cyan-50 text-accent-teal dark:bg-cyan-950/60 dark:text-cyan-300",
    borderHover: "hover:border-cyan-200",
  },
];

const earningsData = [
  { month: "Jan", val: 54, amount: "$22,400" },
  { month: "Feb", val: 62, amount: "$26,100" },
  { month: "Mar", val: 58, amount: "$24,500" },
  { month: "Apr", val: 72, amount: "$30,200" },
  { month: "May", val: 68, amount: "$28,900" },
  { month: "Jun", val: 84, amount: "$34,657" },
  { month: "Jul", val: 78, amount: "$32,800" },
  { month: "Aug", val: 92, amount: "$38,400" },
  { month: "Sep", val: 86, amount: "$36,100" },
  { month: "Oct", val: 95, amount: "$41,200" },
];

const subscriptionData = [
  { time: "12pm", val: 25, count: 110 },
  { time: "3pm", val: 40, count: 128 },
  { time: "6pm", val: 55, count: 142 },
  { time: "9pm", val: 62, count: 154 },
  { time: "12am", val: 70, count: 161 },
  { time: "3am", val: 66, count: 158 },
  { time: "6am", val: 82, count: 165 },
  { time: "9am", val: 90, count: 169 },
];

const initialCountries = [
  {
    id: "usa",
    flag: "🇺🇸",
    name: uiText.dashboard.countries.usa,
    total: "2.920",
    share: "53.23%",
    coords: { x: 95, y: 72 },
  },
  {
    id: "germany",
    flag: "🇩🇪",
    name: uiText.dashboard.countries.germany,
    total: "1.300",
    share: "20.43%",
    coords: { x: 195, y: 55 },
  },
  {
    id: "australia",
    flag: "🇦🇺",
    name: uiText.dashboard.countries.australia,
    total: "760",
    share: "10.35%",
    coords: { x: 310, y: 135 },
  },
  {
    id: "uk",
    flag: "🇬🇧",
    name: uiText.dashboard.countries.uk,
    total: "690",
    share: "7.87%",
    coords: { x: 182, y: 50 },
  },
  {
    id: "romania",
    flag: "🇷🇴",
    name: uiText.dashboard.countries.romania,
    total: "600",
    share: "5.94%",
    coords: { x: 215, y: 62 },
  },
  {
    id: "brasil",
    flag: "🇧🇷",
    name: uiText.dashboard.countries.brasil,
    total: "550",
    share: "4.34%",
    coords: { x: 135, y: 118 },
  },
];

type DashboardTask = {
  id: number;
  title: string;
  meta: string;
  metaClass: string;
  done: boolean;
};

const defaultTasks: DashboardTask[] = [
  {
    id: 1,
    title: uiText.dashboard.taskOne,
    meta: uiText.dashboard.taskCompleted,
    metaClass: "text-muted-foreground font-normal",
    done: true,
  },
  {
    id: 2,
    title: uiText.dashboard.taskTwo,
    meta: uiText.dashboard.taskPriority,
    metaClass: "text-accent-teal font-semibold",
    done: false,
  },
  {
    id: 3,
    title: uiText.dashboard.taskThree,
    meta: uiText.dashboard.taskYesterday,
    metaClass: "text-muted-foreground font-normal",
    done: true,
  },
  {
    id: 4,
    title: uiText.dashboard.taskFour,
    meta: uiText.dashboard.taskInProgress,
    metaClass: "text-amber-600 font-semibold",
    done: false,
  },
];

export default function DashboardOverview() {
  const { activeAccentHex } = usePaperTheme();

  // State management
  const [tasks, setTasks] = useState(defaultTasks);
  const [newTaskInput, setNewTaskInput] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [mapZoom, setMapZoom] = useState(1);
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(5);
  const [hoveredHour, setHoveredHour] = useState<number | null>(7);
  const [donutHover, setDonutHover] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const refreshTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current);
    };
  }, []);

  // Toggle task checkbox
  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              done: !t.done,
              meta: !t.done
                ? uiText.dashboard.taskJustNow
                : uiText.dashboard.taskPending,
              metaClass: !t.done
                ? "text-muted-foreground font-normal"
                : "text-amber-600 font-semibold",
            }
          : t,
      ),
    );
  };

  // Remove task
  const removeTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Add task
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    setTasks((prev) => [
      {
        id: Date.now(),
        title: newTaskInput.trim(),
        meta: uiText.dashboard.taskNew,
        metaClass: "text-accent-teal font-semibold",
        done: false,
      },
      ...prev,
    ]);
    setNewTaskInput("");
    setShowAddTask(false);
  };

  // Refresh animation trigger
  const handleRefreshStats = () => {
    if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current);
    setIsRefreshing(true);
    refreshTimeoutRef.current = setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div className="space-y-6 sm:space-y-7 md:space-y-8">
      {/* 1. Stat KPI Cards Grid with Responsive Typography */}
      <section className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {initialStatCards.map((card) => {
          const MetaIcon = card.metaIcon;
          return (
            <div
              key={card.id}
              className={cn(
                "group relative rounded-xl border border-border bg-card p-5 md:p-6 shadow-paper transition-all duration-300 hover:-translate-y-1 hover:shadow-paper-hover",
                card.borderHover,
              )}
            >
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div
                  className={cn(
                    "flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full p-3 shadow-xs transition-transform duration-300 group-hover:scale-105",
                    card.iconBg,
                  )}
                >
                  <card.Icon className="h-6 w-6 md:h-7 md:w-7 stroke-[1.8]" />
                </div>
                <div className="text-right">
                  <p className="mb-0.5 text-[10px] sm:text-xs md:text-xs lg:text-xs font-bold tracking-wider text-paper-muted uppercase font-heading">
                    {card.label}
                  </p>
                  <h3
                    className={cn(
                      "text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground font-heading transition-opacity duration-300",
                      isRefreshing && "opacity-50",
                    )}
                  >
                    {card.value}
                  </h3>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 text-xs md:text-sm font-medium text-paper-muted">
                <button
                  type="button"
                  onClick={handleRefreshStats}
                  className="flex items-center gap-1.5 transition-colors hover:text-foreground"
                >
                  <MetaIcon
                    className={cn(
                      "h-3.5 w-3.5 md:h-4 md:w-4 text-muted-foreground transition-transform",
                      isRefreshing && "animate-spin text-accent-teal",
                    )}
                  />
                  <span className="text-[11px] sm:text-xs md:text-xs lg:text-sm">
                    {card.meta}
                  </span>
                </button>
                <span className="text-[10px] sm:text-xs md:text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 font-heading uppercase">
                  {uiText.dashboard.details}
                </span>
              </div>
            </div>
          );
        })}
      </section>

      {/* 2. Charts Section with Responsive Typography */}
      <section className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-3">
        {/* Chart 1: Total Earnings */}
        <div className="flex flex-col justify-between rounded-xl border border-border bg-card p-5 sm:p-6 md:p-7 shadow-paper transition-all duration-300 hover:shadow-paper-hover">
          <div>
            <div className="mb-1 flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground font-heading">
                {hoveredMonth !== null
                  ? earningsData[hoveredMonth].amount
                  : "$34,657"}
              </h2>
              <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs md:text-sm font-bold text-accent-mint border border-emerald-200 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
                <TrendingUp className="h-3.5 w-3.5" />
                +18%
              </span>
            </div>
            <p className="mb-4 text-[10px] sm:text-xs md:text-xs lg:text-sm font-bold tracking-wider text-paper-muted uppercase font-heading">
              {uiText.dashboard.earnings}
            </p>

            {/* Interactive SVG Chart */}
            <div className="relative h-44 sm:h-48 md:h-52 w-full pt-2">
              <Image
                src="/dashboard-earnings-chart.svg"
                alt=""
                width={350}
                height={120}
                className="h-full w-full object-contain"
              />

              <div className="mt-2 flex justify-between text-[10px] sm:text-[11px] md:text-xs lg:text-xs font-medium text-paper-muted">
                {earningsData.map((d, i) => (
                  <button
                    key={d.month}
                    type="button"
                    onMouseEnter={() => setHoveredMonth(i)}
                    onFocus={() => setHoveredMonth(i)}
                    className={cn(
                      "cursor-pointer transition-colors hover:text-accent-mint",
                      hoveredMonth === i
                        ? "font-bold text-accent-mint scale-105"
                        : "",
                    )}
                  >
                    {d.month}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-border pt-5">
            <span className="text-xs sm:text-sm md:text-sm lg:text-base font-bold text-foreground font-heading">
              {uiText.dashboard.financialStatistics}
            </span>
            <button
              type="button"
              aria-label={uiText.accessibility.addMetric}
              onClick={() => toast.success(uiText.dashboard.addMetricFeedback)}
              className="flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-full bg-emerald-50 text-accent-mint transition duration-200 hover:bg-accent-mint hover:text-white dark:bg-emerald-950 dark:hover:text-primary-foreground"
            >
              <Plus className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </button>
          </div>
        </div>

        {/* Chart 2: Total Subscriptions */}
        <div className="flex flex-col justify-between rounded-xl border border-border bg-card p-5 sm:p-6 md:p-7 shadow-paper transition-all duration-300 hover:shadow-paper-hover">
          <div>
            <div className="mb-1 flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground font-heading">
                {hoveredHour !== null
                  ? subscriptionData[hoveredHour].count
                  : 169}
              </h2>
              <span className="flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1 text-xs md:text-sm font-bold text-accent-coral border border-orange-200 dark:border-orange-900 dark:bg-orange-950 dark:text-orange-300">
                <TrendingDown className="h-3.5 w-3.5" />
                -14%
              </span>
            </div>
            <p className="mb-4 text-[10px] sm:text-xs md:text-xs lg:text-sm font-bold tracking-wider text-paper-muted uppercase font-heading">
              {uiText.dashboard.subscriptions}
            </p>

            {/* Interactive SVG Subscriptions Chart */}
            <div className="relative h-44 sm:h-48 md:h-52 w-full pt-2">
              <Image
                src="/dashboard-subscriptions-chart.svg"
                alt=""
                width={350}
                height={120}
                className="h-full w-full object-contain"
              />

              <div className="mt-2 flex justify-between text-[10px] sm:text-[11px] md:text-xs lg:text-xs font-medium text-paper-muted">
                {subscriptionData.map((d, i) => (
                  <button
                    key={d.time}
                    type="button"
                    onMouseEnter={() => setHoveredHour(i)}
                    onFocus={() => setHoveredHour(i)}
                    className={cn(
                      "cursor-pointer transition-colors hover:text-accent-coral",
                      hoveredHour === i
                        ? "font-bold text-accent-coral scale-105"
                        : "",
                    )}
                  >
                    {d.time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-border pt-5">
            <span className="text-xs sm:text-sm md:text-sm lg:text-base font-bold text-foreground font-heading">
              {uiText.dashboard.viewMembers}
            </span>
            <button
              type="button"
              aria-label={uiText.accessibility.playPlayback}
              onClick={() => toast.success(uiText.dashboard.playbackFeedback)}
              className="flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-full bg-orange-50 text-accent-coral transition duration-200 hover:bg-accent-coral hover:text-white dark:bg-orange-950 dark:hover:text-primary-foreground"
            >
              <Play className="h-3 w-3 md:h-3.5 md:w-3.5 fill-current ml-0.5" />
            </button>
          </div>
        </div>

        {/* Chart 3: Email Statistics */}
        <div className="flex flex-col justify-between rounded-xl border border-border bg-card p-5 sm:p-6 md:p-7 shadow-paper transition-all duration-300 hover:shadow-paper-hover">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold tracking-tight text-foreground font-heading">
                  {uiText.dashboard.emailStatistics}
                </h2>
                <p className="text-[10px] sm:text-xs md:text-xs lg:text-sm font-bold tracking-wider text-paper-muted uppercase font-heading">
                  {uiText.dashboard.campaignPerformance}
                </p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-cyan-50 px-2.5 py-1 text-xs md:text-sm font-bold text-accent-teal border border-cyan-200 dark:border-cyan-900 dark:bg-cyan-950 dark:text-cyan-300">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-teal animate-pulse" />
                Live
              </span>
            </div>

            {/* SVG Donut Chart */}
            <div className="relative flex h-44 sm:h-48 md:h-52 items-center justify-center">
              <Image
                src="/dashboard-email-statistics.svg"
                alt=""
                width={100}
                height={100}
                className="h-36 w-36 -rotate-90 sm:h-40 sm:w-40 md:h-44 md:w-44"
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground font-heading">
                  {donutHover === "Opened"
                    ? "62%"
                    : donutHover === "Bounced"
                      ? "23%"
                      : donutHover === "Unsub"
                        ? "15%"
                        : "62%"}
                </span>
                <span className="text-[10px] sm:text-[11px] md:text-xs font-bold tracking-wider text-muted-foreground uppercase font-heading">
                  {donutHover || "Open Rate"}
                </span>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-center gap-4 text-xs sm:text-sm md:text-sm font-semibold text-muted-foreground">
              {[
                { label: uiText.dashboard.opened, color: "bg-accent-teal" },
                { label: uiText.dashboard.bounced, color: "bg-accent-coral" },
                {
                  label: uiText.dashboard.unsubscribed,
                  color: "bg-accent-yellow",
                },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onMouseEnter={() => setDonutHover(item.label)}
                  onMouseLeave={() => setDonutHover(null)}
                  onFocus={() => setDonutHover(item.label)}
                  onBlur={() => setDonutHover(null)}
                  className="flex items-center gap-1.5 transition-transform hover:scale-105"
                >
                  <span
                    className={cn("h-2.5 w-2.5 rounded-full", item.color)}
                  />
                  <span className="font-heading text-[11px] sm:text-xs md:text-sm tracking-wide">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-border pt-5">
            <span className="text-xs sm:text-sm md:text-sm lg:text-base font-bold text-foreground font-heading">
              {uiText.dashboard.campaignSent}
            </span>
            <button
              type="button"
              aria-label={uiText.accessibility.refreshCampaign}
              onClick={() => toast.success(uiText.dashboard.campaignFeedback)}
              className="flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-full bg-cyan-50 text-accent-teal transition duration-200 hover:bg-accent-teal hover:text-white dark:bg-cyan-950 dark:hover:text-primary-foreground"
            >
              <RotateCw className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Global Sales & Interactive Tasks Section */}
      <section className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-3">
        {/* Global Sales Card (2 Cols) */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5 sm:p-6 md:p-7 shadow-paper transition-all duration-300 hover:shadow-paper-hover">
          <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-foreground font-heading">
                {uiText.dashboard.globalSales}
              </h3>
              <p className="text-xs sm:text-sm md:text-sm text-paper-muted font-medium">
                {uiText.dashboard.shippedAcrossNodes}
              </p>
            </div>
            {selectedCountry && (
              <button
                type="button"
                onClick={() => setSelectedCountry(null)}
                className="text-[11px] sm:text-xs md:text-sm font-semibold text-accent-teal hover:underline self-start sm:self-auto"
              >
                {uiText.dashboard.clearSelection}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 items-center gap-6 sm:gap-8 md:grid-cols-2">
            {/* Country Data Rows */}
            <div className="space-y-2 sm:space-y-3">
              {initialCountries.map((country) => {
                const isSelected = selectedCountry === country.id;
                return (
                  <button
                    type="button"
                    key={country.name}
                    onClick={() =>
                      setSelectedCountry(isSelected ? null : country.id)
                    }
                    aria-pressed={isSelected}
                    className={cn(
                      "flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 md:py-2.5 text-xs sm:text-sm md:text-sm lg:text-base font-medium transition-all duration-200 border-b border-border last:border-b-0",
                      isSelected
                        ? "bg-accent-teal/10 font-bold text-accent-teal"
                        : "text-foreground hover:bg-muted",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-base sm:text-lg md:text-lg">
                        {country.flag}
                      </span>
                      <span className="font-semibold text-foreground font-heading">
                        {country.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-muted-foreground font-mono">
                        {country.total}
                      </span>
                      <span
                        className="w-14 text-right font-bold font-mono"
                        style={
                          isSelected
                            ? { color: activeAccentHex }
                            : { color: "var(--foreground)" }
                        }
                      >
                        {country.share}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Vector Heatmap Visual View */}
            <div className="group relative flex min-h-[240px] md:min-h-[270px] flex-col items-center justify-center overflow-hidden rounded-xl border border-border bg-muted/50 p-5 shadow-inner">
              <div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(#51cbce 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />

              <div
                className="relative w-full max-w-[340px] md:max-w-[380px] h-32 md:h-36 transition-transform duration-300"
                style={{ transform: `scale(${mapZoom})` }}
              >
                <Image
                  src="/dashboard-global-sales-map.svg"
                  alt=""
                  width={380}
                  height={180}
                  className="h-full w-full object-contain opacity-85 dark:hidden"
                />
                <Image
                  src="/dashboard-global-sales-map-dark.svg"
                  alt=""
                  width={380}
                  height={180}
                  className="hidden h-full w-full object-contain opacity-85 dark:block"
                />
              </div>

              <p className="relative mt-2 text-xs sm:text-sm md:text-sm lg:text-base font-bold tracking-wider text-foreground uppercase font-heading">
                {selectedCountry
                  ? `Active Focus: ${initialCountries.find((c) => c.id === selectedCountry)?.name}`
                  : uiText.dashboard.vectorHeatmap}
              </p>
              <span className="relative text-[11px] sm:text-xs md:text-sm text-paper-muted">
                {selectedCountry
                  ? `Volume: ${initialCountries.find((c) => c.id === selectedCountry)?.total} items shipped`
                  : uiText.dashboard.worldDistribution}
              </span>

              <div className="relative mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMapZoom((z) => Math.min(z + 0.2, 1.8))}
                  className="flex min-h-11 items-center rounded-md border border-border bg-card px-3 py-1 text-[11px] font-bold text-foreground shadow-xs transition hover:border-accent-teal hover:text-accent-teal font-heading sm:text-xs md:text-sm"
                >
                  <Plus className="mr-1 h-3 w-3 md:h-3.5 md:w-3.5" />{" "}
                  {uiText.dashboard.zoomIn}
                </button>
                <button
                  type="button"
                  onClick={() => setMapZoom((z) => Math.max(z - 0.2, 0.8))}
                  className="flex min-h-11 items-center rounded-md border border-border bg-card px-3 py-1 text-[11px] font-bold text-foreground shadow-xs transition hover:border-accent-teal hover:text-accent-teal font-heading sm:text-xs md:text-sm"
                >
                  <Minus className="mr-1 h-3 w-3 md:h-3.5 md:w-3.5" />{" "}
                  {uiText.dashboard.zoomOut}
                </button>
                {mapZoom !== 1 && (
                  <button
                    type="button"
                    onClick={() => setMapZoom(1)}
                    className="text-[10px] sm:text-xs text-muted-foreground hover:text-foreground font-semibold"
                  >
                    {uiText.dashboard.reset}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tasks and Activity Card (1 Col) */}
        <div className="flex flex-col justify-between rounded-xl border border-border bg-card p-5 sm:p-6 md:p-7 shadow-paper transition-all duration-300 hover:shadow-paper-hover">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-foreground font-heading">
                  {uiText.dashboard.tasks}
                </h3>
                <p className="text-xs sm:text-sm md:text-sm text-paper-muted font-medium">
                  {uiText.dashboard.development}
                </p>
              </div>
              <button
                type="button"
                aria-label={uiText.accessibility.addTask}
                onClick={() => setShowAddTask((prev) => !prev)}
                className="flex h-8 w-8 md:h-9 md:w-9 cursor-pointer items-center justify-center rounded-full bg-muted text-muted-foreground transition hover:bg-muted"
              >
                <Plus className="h-4 w-4 md:h-4.5 md:w-4.5" />
              </button>
            </div>

            {showAddTask && (
              <form
                onSubmit={handleAddTask}
                className="mb-3 flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder={uiText.dashboard.taskPlaceholder}
                  value={newTaskInput}
                  onChange={(e) => setNewTaskInput(e.target.value)}
                  autoFocus
                  className="h-8 md:h-9 flex-1 rounded-md border border-border bg-card px-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent-teal"
                />
                <button
                  type="submit"
                  className="rounded-md bg-accent-teal px-2.5 py-1 text-xs sm:text-sm font-bold text-white dark:text-primary-foreground shadow-xs"
                >
                  {uiText.dashboard.add}
                </button>
              </form>
            )}

            <div className="space-y-3.5 pt-1">
              {tasks.length === 0 ? (
                <div className="py-6 text-center text-xs sm:text-sm text-muted-foreground">
                  <CheckCircle2 className="mx-auto mb-1 h-6 w-6 text-accent-mint" />
                  {uiText.dashboard.allTasksCompleted}
                </div>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className="group flex items-start gap-3 text-xs sm:text-sm md:text-sm lg:text-base transition-opacity duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => toggleTask(task.id)}
                      role="checkbox"
                      aria-checked={task.done}
                      className={cn(
                        "mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-[4px] border transition-all duration-200",
                        task.done
                          ? "border-transparent bg-accent-teal text-white dark:text-primary-foreground shadow-xs"
                          : "border-input bg-card hover:border-accent-teal",
                      )}
                      style={
                        task.done
                          ? { backgroundColor: activeAccentHex }
                          : undefined
                      }
                    >
                      {task.done && (
                        <Check className="h-3 w-3 md:h-3.5 md:w-3.5 stroke-[2.5]" />
                      )}
                    </button>

                    <button
                      type="button"
                      className="flex-1 text-left"
                      onClick={() => toggleTask(task.id)}
                    >
                      <p
                        className={cn(
                          "transition-all",
                          task.done
                            ? "font-medium text-muted-foreground line-through"
                            : "font-semibold text-foreground leading-snug",
                        )}
                      >
                        {task.title}
                      </p>
                      <span
                        className={cn(
                          "text-[10px] sm:text-[11px] md:text-xs tracking-tight",
                          task.metaClass,
                        )}
                      >
                        {task.meta}
                      </span>
                    </button>

                    <button
                      type="button"
                      aria-label={uiText.accessibility.deleteTask}
                      onClick={() => removeTask(task.id)}
                      className="flex h-11 w-11 items-center justify-center text-muted-foreground transition-opacity hover:text-accent-coral sm:opacity-0 sm:group-hover:opacity-100"
                    >
                      <X className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-xs sm:text-sm text-paper-muted">
            <span className="flex items-center gap-1.5 text-[11px] sm:text-xs md:text-sm">
              <History className="h-3 w-3 md:h-3.5 md:w-3.5 text-muted-foreground" />
              {uiText.dashboard.updatedMinutesAgo}
            </span>
            <button
              type="button"
              onClick={() => setTasks(defaultTasks)}
              className="text-xs sm:text-sm md:text-sm font-bold text-accent-teal hover:underline font-heading"
            >
              {uiText.dashboard.resetList}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
