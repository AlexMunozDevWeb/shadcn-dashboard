"use client";

import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Download,
  GitBranch,
  Heart,
  Plus,
  RotateCw,
  Send,
  Trash2,
} from "lucide-react";
import { Button } from "@/modules/components//ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/components//ui/card";
import { uiText } from "@/modules/data/ui-text";

export default function ButtonPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground font-heading">
          {uiText.demo.button.heading}
        </h1>
        <p className="text-xs sm:text-sm md:text-sm text-paper-muted">
          {uiText.demo.button.description}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Semantic Action Palette */}
        <Card>
          <CardHeader>
            <CardTitle>{uiText.demo.button.colorVariants}</CardTitle>
            <CardDescription>
              {uiText.demo.button.colorDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button variant="default">{uiText.demo.button.primary}</Button>
            <Button variant="success">{uiText.demo.button.success}</Button>
            <Button variant="warning">{uiText.demo.button.warning}</Button>
            <Button variant="info">{uiText.demo.button.info}</Button>
            <Button variant="coral">{uiText.demo.button.coral}</Button>
            <Button variant="secondary">{uiText.demo.button.secondary}</Button>
            <Button variant="outline">{uiText.demo.button.outline}</Button>
            <Button variant="paper">{uiText.demo.button.paper}</Button>
            <Button variant="destructive">
              {uiText.demo.button.destructive}
            </Button>
            <Button variant="ghost">{uiText.demo.button.ghost}</Button>
            <Button variant="link">{uiText.demo.button.link}</Button>
            <Button disabled>{uiText.demo.button.disabled}</Button>
          </CardContent>
        </Card>

        {/* Buttons with Icons */}
        <Card>
          <CardHeader>
            <CardTitle>{uiText.demo.button.glyphs}</CardTitle>
            <CardDescription>
              {uiText.demo.button.glyphDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button variant="default">
              <Plus className="mr-1.5 h-4 w-4" />
              {uiText.demo.button.newDeployment}
            </Button>
            <Button variant="success">
              <Check className="mr-1.5 h-4 w-4" />
              {uiText.demo.button.confirmBuild}
            </Button>
            <Button variant="coral">
              <Trash2 className="mr-1.5 h-4 w-4" />
              {uiText.demo.button.deleteNode}
            </Button>
            <Button variant="outline">
              <Download className="mr-1.5 h-4 w-4" />
              {uiText.demo.button.exportCsv}
            </Button>
            <Button variant="outline">
              <GitBranch className="mr-1.5 h-4 w-4" />
              {uiText.demo.button.branchMain}
              <ArrowUpRight className="ml-1 h-3.5 w-3.5 opacity-60" />
            </Button>
            <Button variant="secondary">
              <RotateCw className="mr-1.5 h-4 w-4" />
              {uiText.demo.button.syncReplica}
            </Button>
          </CardContent>
        </Card>

        {/* Size Scale */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{uiText.demo.button.scale}</CardTitle>
            <CardDescription>
              {uiText.demo.button.scaleDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center gap-4">
            <Button size="xs" variant="outline">
              {uiText.demo.button.extraSmall}
            </Button>
            <Button size="sm" variant="outline">
              {uiText.demo.button.small}
            </Button>
            <Button size="default" variant="default">
              {uiText.demo.button.defaultSize}
            </Button>
            <Button size="lg" variant="default">
              {uiText.demo.button.large}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>

            <div className="h-6 w-px bg-border" />

            {/* Circular icon buttons */}
            <Button
              size="icon-xs"
              variant="outline"
              aria-label={uiText.accessibility.microAction}
            >
              <Heart className="h-3 w-3 text-accent-coral" />
            </Button>
            <Button
              size="icon-sm"
              variant="outline"
              aria-label={uiText.accessibility.smallAction}
            >
              <Plus className="h-3.5 w-3.5 text-accent-teal" />
            </Button>
            <Button
              size="icon"
              variant="default"
              aria-label={uiText.accessibility.defaultAction}
            >
              <Send className="h-4 w-4" />
            </Button>
            <Button
              size="icon-lg"
              variant="paper"
              aria-label={uiText.accessibility.largeAction}
            >
              <ArrowRight className="h-4 w-4 text-foreground" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
