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
import { uiText } from "@/modules/data/ui-text";

export default function BadgePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground font-heading">
          {uiText.demo.badge.heading}
        </h1>
        <p className="text-xs sm:text-sm md:text-sm text-paper-muted">
          {uiText.demo.badge.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Status Pills */}
        <Card>
          <CardHeader>
            <CardTitle>{uiText.demo.badge.semantic}</CardTitle>
            <CardDescription>
              {uiText.demo.badge.semanticDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2.5 items-center">
            <Badge variant="default">{uiText.demo.badge.active}</Badge>
            <Badge variant="success">{uiText.demo.badge.completed}</Badge>
            <Badge variant="warning">{uiText.demo.badge.review}</Badge>
            <Badge variant="destructive">{uiText.demo.badge.critical}</Badge>
            <Badge variant="info">{uiText.demo.badge.pending}</Badge>
            <Badge variant="secondary">{uiText.demo.badge.archived}</Badge>
            <Badge variant="outline">{uiText.demo.badge.draft}</Badge>
          </CardContent>
        </Card>

        {/* Analytical Metric Badges */}
        <Card>
          <CardHeader>
            <CardTitle>{uiText.demo.badge.analytical}</CardTitle>
            <CardDescription>
              {uiText.demo.badge.analyticalDescription}
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
              {uiText.demo.badge.threshold}
            </Badge>
            <Badge variant="default" className="gap-1">
              <Sparkles className="h-3 w-3" />
              {uiText.demo.badge.telemetry}
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
