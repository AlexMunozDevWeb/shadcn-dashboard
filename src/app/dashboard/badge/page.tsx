"use client";

import { Badge } from "@/modules/components//ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/components//ui/card";
import {
  AlertTriangle,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Clock,
} from "lucide-react";

export default function BadgePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground font-heading">
          Badges &amp; Status Indicators
        </h1>
        <p className="text-xs sm:text-sm md:text-sm text-paper-muted">
          Tactile status pills and contextual micro-badges from the Stitch
          design system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Status Pills */}
        <Card>
          <CardHeader>
            <CardTitle>Semantic Status Pills</CardTitle>
            <CardDescription>
              Color-coded status indicators with gentle pastel tint fills and
              crisp borders.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2.5 items-center">
            <Badge variant="default">Active / Live</Badge>
            <Badge variant="success">Completed</Badge>
            <Badge variant="warning">In Review</Badge>
            <Badge variant="destructive">Critical Error</Badge>
            <Badge variant="info">Pending Node</Badge>
            <Badge variant="secondary">Archived</Badge>
            <Badge variant="outline">Draft State</Badge>
          </CardContent>
        </Card>

        {/* Analytical Metric Badges */}
        <Card>
          <CardHeader>
            <CardTitle>Analytical Delta Chips</CardTitle>
            <CardDescription>
              Numeric badges with directional indicators for KPI trends and
              real-time delta tracking.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2.5 items-center">
            <Badge variant="success" className="gap-1">
              <TrendingUp className="h-3 w-3" />
              +18.4% YoY
            </Badge>
            <Badge variant="destructive" className="gap-1">
              <TrendingDown className="h-3 w-3" />
              -14.2% W/W
            </Badge>
            <Badge variant="warning" className="gap-1">
              <AlertTriangle className="h-3 w-3" />
              Threshold 92%
            </Badge>
            <Badge variant="default" className="gap-1">
              <Sparkles className="h-3 w-3" />
              PRO Telemetry
            </Badge>
            <Badge variant="info" className="gap-1">
              <Clock className="h-3 w-3" />
              Updated 2m ago
            </Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
