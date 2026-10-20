"use client";

import React, { useState } from "react";
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
  MoreVertical,
  Play,
  Plus,
  RotateCw,
  Share2,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePaperTheme } from "@/components/theme-provider";

const initialStatCards = [
  {
    id: "capacity",
    label: "Capacity",
    value: "150GB",
    meta: "Update Now",
    metaIcon: RotateCw,
    Icon: Globe,
    iconBg: "bg-amber-50 text-[#fbc658]",
    borderHover: "hover:border-amber-200",
  },
  {
    id: "revenue",
    label: "Revenue",
    value: "$ 1,345",
    meta: "Last day",
    metaIcon: Calendar,
    Icon: CreditCard,
    iconBg: "bg-emerald-50 text-[#6bd098]",
    borderHover: "hover:border-emerald-200",
  },
  {
    id: "errors",
    label: "Errors",
    value: "23",
    meta: "In the last hour",
    metaIcon: Clock,
    Icon: Share2,
    iconBg: "bg-orange-50 text-[#ef8157]",
    borderHover: "hover:border-orange-200",
  },
  {
    id: "followers",
    label: "Followers",
    value: "+45K",
    meta: "Update now",
    metaIcon: RotateCw,
    Icon: Heart,
    iconBg: "bg-cyan-50 text-[#51cbce]",
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
    name: "USA",
    total: "2.920",
    share: "53.23%",
    coords: { x: 95, y: 72 },
  },
  {
    id: "germany",
    flag: "🇩🇪",
    name: "Germany",
    total: "1.300",
    share: "20.43%",
    coords: { x: 195, y: 55 },
  },
  {
    id: "australia",
    flag: "🇦🇺",
    name: "Australia",
    total: "760",
    share: "10.35%",
    coords: { x: 310, y: 135 },
  },
  {
    id: "uk",
    flag: "🇬🇧",
    name: "United Kingdom",
    total: "690",
    share: "7.87%",
    coords: { x: 182, y: 50 },
  },
  {
    id: "romania",
    flag: "🇷🇴",
    name: "Romania",
    total: "600",
    share: "5.94%",
    coords: { x: 215, y: 62 },
  },
  {
    id: "brasil",
    flag: "🇧🇷",
    name: "Brasil",
    total: "550",
    share: "4.34%",
    coords: { x: 135, y: 118 },
  },
];

const defaultTasks = [
  {
    id: 1,
    title: 'Sign contract for "What conference organizes af?"',
    meta: "Completed 2h ago",
    metaClass: "text-gray-400 font-normal",
    done: true,
  },
  {
    id: 2,
    title: "Lines From Great Russian Literature? Or E-mails From My Boss?",
    meta: "Priority High",
    metaClass: "text-accent-teal font-semibold",
    done: false,
  },
  {
    id: 3,
    title:
      "Flooded: One year later, assessing what was lost and what was found",
    meta: "Yesterday",
    metaClass: "text-gray-400 font-normal",
    done: true,
  },
  {
    id: 4,
    title: "Update Tailwind responsive styles for mobile breakpoints",
    meta: "In Progress",
    metaClass: "text-amber-600 font-semibold",
    done: false,
  },
];

export default function DashboardPage() {
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

  // Toggle task checkbox
  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              done: !t.done,
              meta: !t.done ? "Just now" : "Pending",
              metaClass: !t.done
                ? "text-gray-400 font-normal"
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
        meta: "New",
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
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
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
                "group relative rounded-xl border border-gray-100/80 bg-white p-5 md:p-6 shadow-paper transition-all duration-300 hover:-translate-y-1 hover:shadow-paper-hover",
                card.borderHover,
              )}
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
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
                      "text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-800 font-heading transition-opacity duration-300",
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
                  className="flex items-center gap-1.5 transition-colors hover:text-gray-700"
                >
                  <MetaIcon
                    className={cn(
                      "h-3.5 w-3.5 md:h-4 md:w-4 text-gray-400 transition-transform",
                      isRefreshing && "animate-spin text-accent-teal",
                    )}
                  />
                  <span className="text-[11px] sm:text-xs md:text-xs lg:text-sm">
                    {card.meta}
                  </span>
                </button>
                <span className="text-[10px] sm:text-xs md:text-xs text-gray-400 opacity-0 transition-opacity group-hover:opacity-100 font-heading uppercase">
                  Details &rarr;
                </span>
              </div>
            </div>
          );
        })}
      </section>

      {/* 2. Charts Section with Responsive Typography */}
      <section className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-3">
        {/* Chart 1: Total Earnings */}
        <div className="flex flex-col justify-between rounded-xl border border-gray-100/80 bg-white p-5 sm:p-6 md:p-7 shadow-paper transition-all duration-300 hover:shadow-paper-hover">
          <div>
            <div className="mb-1 flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-800 font-heading">
                {hoveredMonth !== null
                  ? earningsData[hoveredMonth].amount
                  : "$34,657"}
              </h2>
              <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs md:text-sm font-bold text-accent-mint border border-emerald-200">
                <TrendingUp className="h-3.5 w-3.5" />
                +18%
              </span>
            </div>
            <p className="mb-4 text-[10px] sm:text-xs md:text-xs lg:text-sm font-bold tracking-wider text-paper-muted uppercase font-heading">
              Total Earnings in Last Ten Quarters
            </p>

            {/* Interactive SVG Chart */}
            <div className="relative h-44 sm:h-48 md:h-52 w-full pt-2">
              <svg
                viewBox="0 0 350 120"
                className="h-full w-full overflow-visible"
              >
                <defs>
                  <linearGradient id="mintGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6bd098" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#6bd098" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {[20, 55, 90].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    x2="350"
                    y1={y}
                    y2={y}
                    stroke="#f0f0f0"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                ))}

                <path
                  d="M 10,75 C 45,85 75,55 110,60 C 145,65 175,90 220,80 C 265,70 300,50 340,48 L 340,110 L 10,110 Z"
                  fill="url(#mintGradient)"
                />

                <path
                  d="M 10,75 C 45,85 75,55 110,60 C 145,65 175,90 220,80 C 265,70 300,50 340,48"
                  fill="none"
                  stroke="#6bd098"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                />

                <circle
                  cx="110"
                  cy="60"
                  r={hoveredMonth === 3 ? 6 : 3.5}
                  fill="#ffffff"
                  stroke="#6bd098"
                  strokeWidth="2.5"
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredMonth(3)}
                />
                <circle
                  cx="220"
                  cy="80"
                  r={hoveredMonth === 6 ? 6 : 3.5}
                  fill="#ffffff"
                  stroke="#6bd098"
                  strokeWidth="2.5"
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredMonth(6)}
                />
                <circle
                  cx="340"
                  cy="48"
                  r={hoveredMonth === 9 ? 7 : 4.5}
                  fill="#6bd098"
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredMonth(9)}
                />
              </svg>

              <div className="mt-2 flex justify-between text-[10px] sm:text-[11px] md:text-xs lg:text-xs font-medium text-paper-muted">
                {earningsData.map((d, i) => (
                  <button
                    key={d.month}
                    type="button"
                    onMouseEnter={() => setHoveredMonth(i)}
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

          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-5">
            <span className="text-xs sm:text-sm md:text-sm lg:text-base font-bold text-gray-700 font-heading">
              Financial Statistics
            </span>
            <button
              type="button"
              aria-label="Add metric"
              onClick={() =>
                alert("Financial telemetry updated from primary ledger.")
              }
              className="flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-full bg-emerald-50 text-accent-mint transition duration-200 hover:bg-accent-mint hover:text-white"
            >
              <Plus className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </button>
          </div>
        </div>

        {/* Chart 2: Total Subscriptions */}
        <div className="flex flex-col justify-between rounded-xl border border-gray-100/80 bg-white p-5 sm:p-6 md:p-7 shadow-paper transition-all duration-300 hover:shadow-paper-hover">
          <div>
            <div className="mb-1 flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-800 font-heading">
                {hoveredHour !== null
                  ? subscriptionData[hoveredHour].count
                  : 169}
              </h2>
              <span className="flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1 text-xs md:text-sm font-bold text-accent-coral border border-orange-200">
                <TrendingDown className="h-3.5 w-3.5" />
                -14%
              </span>
            </div>
            <p className="mb-4 text-[10px] sm:text-xs md:text-xs lg:text-sm font-bold tracking-wider text-paper-muted uppercase font-heading">
              Total Subscriptions in Last 7 Days
            </p>

            {/* Interactive SVG Subscriptions Chart */}
            <div className="relative h-44 sm:h-48 md:h-52 w-full pt-2">
              <svg
                viewBox="0 0 350 120"
                className="h-full w-full overflow-visible"
              >
                <defs>
                  <linearGradient
                    id="coralGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#ef8157" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#ef8157" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {[20, 55, 90].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    x2="350"
                    y1={y}
                    y2={y}
                    stroke="#f0f0f0"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                ))}

                <path
                  d="M 10,105 C 50,90 90,85 140,82 C 190,80 240,60 280,58 C 310,56 325,45 345,35 L 345,110 L 10,110 Z"
                  fill="url(#coralGradient)"
                />

                <path
                  d="M 10,105 C 50,90 90,85 140,82 C 190,80 240,60 280,58 C 310,56 325,45 345,35"
                  fill="none"
                  stroke="#ef8157"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                />

                <circle
                  cx="140"
                  cy="82"
                  r={hoveredHour === 2 ? 6 : 3.5}
                  fill="#ffffff"
                  stroke="#ef8157"
                  strokeWidth="2.5"
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredHour(2)}
                />
                <circle
                  cx="280"
                  cy="58"
                  r={hoveredHour === 5 ? 6 : 3.5}
                  fill="#ffffff"
                  stroke="#ef8157"
                  strokeWidth="2.5"
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredHour(5)}
                />
                <circle
                  cx="345"
                  cy="35"
                  r={hoveredHour === 7 ? 7 : 4.5}
                  fill="#ef8157"
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredHour(7)}
                />
              </svg>

              <div className="mt-2 flex justify-between text-[10px] sm:text-[11px] md:text-xs lg:text-xs font-medium text-paper-muted">
                {subscriptionData.map((d, i) => (
                  <button
                    key={d.time}
                    type="button"
                    onMouseEnter={() => setHoveredHour(i)}
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

          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-5">
            <span className="text-xs sm:text-sm md:text-sm lg:text-base font-bold text-gray-700 font-heading">
              View all members
            </span>
            <button
              type="button"
              aria-label="Play playback"
              onClick={() => alert("Replaying 7-day subscription lifecycle...")}
              className="flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-full bg-orange-50 text-accent-coral transition duration-200 hover:bg-accent-coral hover:text-white"
            >
              <Play className="h-3 w-3 md:h-3.5 md:w-3.5 fill-current ml-0.5" />
            </button>
          </div>
        </div>

        {/* Chart 3: Email Statistics */}
        <div className="flex flex-col justify-between rounded-xl border border-gray-100/80 bg-white p-5 sm:p-6 md:p-7 shadow-paper transition-all duration-300 hover:shadow-paper-hover">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold tracking-tight text-gray-800 font-heading">
                  Email Statistics
                </h2>
                <p className="text-[10px] sm:text-xs md:text-xs lg:text-sm font-bold tracking-wider text-paper-muted uppercase font-heading">
                  Last Campaign Performance
                </p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-cyan-50 px-2.5 py-1 text-xs md:text-sm font-bold text-accent-teal border border-cyan-200">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-teal animate-pulse" />
                Live
              </span>
            </div>

            {/* SVG Donut Chart */}
            <div className="relative flex h-44 sm:h-48 md:h-52 items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                className="h-36 w-36 sm:h-40 sm:w-40 md:h-44 md:w-44 -rotate-90"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#f4f3ef"
                  strokeWidth="12"
                />

                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#51cbce"
                  strokeWidth={donutHover === "Opened" ? "14" : "12"}
                  strokeDasharray="238.7"
                  strokeDashoffset="90"
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setDonutHover("Opened")}
                  onMouseLeave={() => setDonutHover(null)}
                />

                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#ef8157"
                  strokeWidth={donutHover === "Bounced" ? "14" : "12"}
                  strokeDasharray="238.7"
                  strokeDashoffset="183"
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setDonutHover("Bounced")}
                  onMouseLeave={() => setDonutHover(null)}
                />

                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#fbc658"
                  strokeWidth={donutHover === "Unsub" ? "14" : "12"}
                  strokeDasharray="238.7"
                  strokeDashoffset="219"
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setDonutHover("Unsub")}
                  onMouseLeave={() => setDonutHover(null)}
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-800 font-heading">
                  {donutHover === "Opened"
                    ? "62%"
                    : donutHover === "Bounced"
                      ? "23%"
                      : donutHover === "Unsub"
                        ? "15%"
                        : "62%"}
                </span>
                <span className="text-[10px] sm:text-[11px] md:text-xs font-bold tracking-wider text-gray-400 uppercase font-heading">
                  {donutHover || "Open Rate"}
                </span>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-center gap-4 text-xs sm:text-sm md:text-sm font-semibold text-gray-600">
              {[
                { label: "Opened", color: "bg-accent-teal" },
                { label: "Bounced", color: "bg-accent-coral" },
                { label: "Unsub", color: "bg-accent-yellow" },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onMouseEnter={() => setDonutHover(item.label)}
                  onMouseLeave={() => setDonutHover(null)}
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

          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-5">
            <span className="text-xs sm:text-sm md:text-sm lg:text-base font-bold text-gray-700 font-heading">
              Campaign Sent 2 Days Ago
            </span>
            <button
              type="button"
              aria-label="Refresh campaign"
              onClick={() => alert("Checking incoming webhook deliveries...")}
              className="flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-full bg-cyan-50 text-accent-teal transition duration-200 hover:bg-accent-teal hover:text-white"
            >
              <RotateCw className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Global Sales & Interactive Tasks Section */}
      <section className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-3">
        {/* Global Sales Card (2 Cols) */}
        <div className="lg:col-span-2 rounded-xl border border-gray-100/80 bg-white p-5 sm:p-6 md:p-7 shadow-paper transition-all duration-300 hover:shadow-paper-hover">
          <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-gray-800 font-heading">
                Global Sales by Top Locations
              </h3>
              <p className="text-xs sm:text-sm md:text-sm text-paper-muted font-medium">
                All Products That Were Shipped Across Continental Nodes
              </p>
            </div>
            {selectedCountry && (
              <button
                type="button"
                onClick={() => setSelectedCountry(null)}
                className="text-[11px] sm:text-xs md:text-sm font-semibold text-accent-teal hover:underline self-start sm:self-auto"
              >
                Clear selection
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 items-center gap-6 sm:gap-8 md:grid-cols-2">
            {/* Country Data Rows */}
            <div className="space-y-2 sm:space-y-3">
              {initialCountries.map((country) => {
                const isSelected = selectedCountry === country.id;
                return (
                  <div
                    key={country.name}
                    onClick={() =>
                      setSelectedCountry(isSelected ? null : country.id)
                    }
                    className={cn(
                      "flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 md:py-2.5 text-xs sm:text-sm md:text-sm lg:text-base font-medium transition-all duration-200 border-b border-gray-100 last:border-b-0",
                      isSelected
                        ? "bg-accent-teal/10 font-bold text-accent-teal"
                        : "text-gray-700 hover:bg-gray-50",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-base sm:text-lg md:text-lg">
                        {country.flag}
                      </span>
                      <span className="font-semibold text-gray-800 font-heading">
                        {country.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-gray-500 font-mono">
                        {country.total}
                      </span>
                      <span
                        className="w-14 text-right font-bold font-mono"
                        style={
                          isSelected
                            ? { color: activeAccentHex }
                            : { color: "#252422" }
                        }
                      >
                        {country.share}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Vector Heatmap Visual View */}
            <div className="group relative flex min-h-[240px] md:min-h-[270px] flex-col items-center justify-center overflow-hidden rounded-xl border border-gray-200/80 bg-[#fcfbf9] p-5 shadow-inner">
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
                <svg viewBox="0 0 380 180" className="w-full h-full opacity-85">
                  <path
                    d="M 50,45 Q 80,35 110,48 Q 120,70 100,85 Q 70,80 50,45 Z"
                    fill="#e5e4de"
                    stroke="#d1cfc7"
                    strokeWidth="1"
                  />
                  <path
                    d="M 115,95 Q 140,95 145,130 Q 130,165 115,140 Q 105,115 115,95 Z"
                    fill="#e5e4de"
                    stroke="#d1cfc7"
                    strokeWidth="1"
                  />
                  <path
                    d="M 175,40 Q 220,35 240,55 Q 225,75 185,70 Q 165,55 175,40 Z"
                    fill="#e5e4de"
                    stroke="#d1cfc7"
                    strokeWidth="1"
                  />
                  <path
                    d="M 185,78 Q 225,80 230,120 Q 200,145 185,115 Z"
                    fill="#e5e4de"
                    stroke="#d1cfc7"
                    strokeWidth="1"
                  />
                  <path
                    d="M 245,45 Q 310,35 340,65 Q 330,95 270,90 Q 235,70 245,45 Z"
                    fill="#e5e4de"
                    stroke="#d1cfc7"
                    strokeWidth="1"
                  />
                  <path
                    d="M 295,120 Q 330,115 340,145 Q 310,160 295,140 Z"
                    fill="#e5e4de"
                    stroke="#d1cfc7"
                    strokeWidth="1"
                  />

                  {initialCountries.map((c) => {
                    const isPinSelected = selectedCountry === c.id;
                    return (
                      <g
                        key={c.id}
                        className="cursor-pointer transition-transform duration-200 hover:scale-125"
                        onClick={() =>
                          setSelectedCountry(isPinSelected ? null : c.id)
                        }
                      >
                        <circle
                          cx={c.coords.x}
                          cy={c.coords.y}
                          r={isPinSelected ? "7" : "4"}
                          fill={isPinSelected ? "#ef8157" : activeAccentHex}
                          className={
                            isPinSelected ? "animate-ping opacity-75" : ""
                          }
                        />
                        <circle
                          cx={c.coords.x}
                          cy={c.coords.y}
                          r={isPinSelected ? "5" : "3"}
                          fill={isPinSelected ? "#ef8157" : activeAccentHex}
                          stroke="#ffffff"
                          strokeWidth="1.5"
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>

              <p className="relative mt-2 text-xs sm:text-sm md:text-sm lg:text-base font-bold tracking-wider text-gray-700 uppercase font-heading">
                {selectedCountry
                  ? `Active Focus: ${initialCountries.find((c) => c.id === selectedCountry)?.name}`
                  : "Vector Heatmap View"}
              </p>
              <span className="relative text-[11px] sm:text-xs md:text-sm text-paper-muted">
                {selectedCountry
                  ? `Volume: ${initialCountries.find((c) => c.id === selectedCountry)?.total} items shipped`
                  : "Interactive World Distribution"}
              </span>

              <div className="relative mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMapZoom((z) => Math.min(z + 0.2, 1.8))}
                  className="flex items-center rounded-md border border-gray-200 bg-white px-3 py-1 text-[11px] sm:text-xs md:text-sm font-bold text-gray-700 shadow-xs transition hover:border-accent-teal hover:text-accent-teal font-heading"
                >
                  <Plus className="mr-1 h-3 w-3 md:h-3.5 md:w-3.5" /> Zoom In
                </button>
                <button
                  type="button"
                  onClick={() => setMapZoom((z) => Math.max(z - 0.2, 0.8))}
                  className="flex items-center rounded-md border border-gray-200 bg-white px-3 py-1 text-[11px] sm:text-xs md:text-sm font-bold text-gray-700 shadow-xs transition hover:border-accent-teal hover:text-accent-teal font-heading"
                >
                  <Minus className="mr-1 h-3 w-3 md:h-3.5 md:w-3.5" /> Zoom Out
                </button>
                {mapZoom !== 1 && (
                  <button
                    type="button"
                    onClick={() => setMapZoom(1)}
                    className="text-[10px] sm:text-xs text-gray-400 hover:text-gray-700 font-semibold"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tasks and Activity Card (1 Col) */}
        <div className="flex flex-col justify-between rounded-xl border border-gray-100/80 bg-white p-5 sm:p-6 md:p-7 shadow-paper transition-all duration-300 hover:shadow-paper-hover">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-gray-800 font-heading">
                  Tasks
                </h3>
                <p className="text-xs sm:text-sm md:text-sm text-paper-muted font-medium">
                  Backend &amp; React development
                </p>
              </div>
              <button
                type="button"
                aria-label="Add task trigger"
                onClick={() => setShowAddTask((prev) => !prev)}
                className="flex h-8 w-8 md:h-9 md:w-9 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"
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
                  placeholder="New task description..."
                  value={newTaskInput}
                  onChange={(e) => setNewTaskInput(e.target.value)}
                  autoFocus
                  className="h-8 md:h-9 flex-1 rounded-md border border-gray-200 bg-white px-2.5 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-accent-teal"
                />
                <button
                  type="submit"
                  className="rounded-md bg-accent-teal px-2.5 py-1 text-xs sm:text-sm font-bold text-white shadow-xs"
                >
                  Add
                </button>
              </form>
            )}

            <div className="space-y-3.5 pt-1">
              {tasks.length === 0 ? (
                <div className="py-6 text-center text-xs sm:text-sm text-gray-400">
                  <CheckCircle2 className="mx-auto mb-1 h-6 w-6 text-accent-mint" />
                  All tasks completed!
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
                        "mt-0.5 flex h-4.5 w-4.5 md:h-5 md:w-5 shrink-0 items-center justify-center rounded-[4px] border transition-all duration-200",
                        task.done
                          ? "border-transparent bg-accent-teal text-white shadow-xs"
                          : "border-gray-300 bg-white hover:border-accent-teal",
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

                    <div
                      className="flex-1 cursor-pointer"
                      onClick={() => toggleTask(task.id)}
                    >
                      <p
                        className={cn(
                          "transition-all",
                          task.done
                            ? "font-medium text-gray-400 line-through"
                            : "font-semibold text-gray-800 leading-snug",
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
                    </div>

                    <button
                      type="button"
                      aria-label="Delete task"
                      onClick={() => removeTask(task.id)}
                      className="opacity-0 transition-opacity hover:text-accent-coral group-hover:opacity-100 text-gray-400 p-0.5"
                    >
                      <X className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 text-xs sm:text-sm text-paper-muted">
            <span className="flex items-center gap-1.5 text-[11px] sm:text-xs md:text-sm">
              <History className="h-3 w-3 md:h-3.5 md:w-3.5 text-gray-400" />
              Updated 3 minutes ago
            </span>
            <button
              type="button"
              onClick={() => setTasks(defaultTasks)}
              className="text-xs sm:text-sm md:text-sm font-bold text-accent-teal hover:underline font-heading"
            >
              Reset list
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
