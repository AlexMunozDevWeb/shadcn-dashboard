"use client";

import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Download,
  GitBranch,
  GitFork,
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

export default function ButtonPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground font-heading">
          Buttons &amp; Interactive Triggers
        </h1>
        <p className="text-xs sm:text-sm md:text-sm text-paper-muted">
          Paper Tactile button hierarchy with crisp typography, hover elevation
          lift, and micro-press transitions.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Semantic Action Palette */}
        <Card>
          <CardHeader>
            <CardTitle>Color Variants</CardTitle>
            <CardDescription>
              Stitch Paper Tactile palette: Primary Teal, Coral Orange, Mint
              Green, Radiant Yellow, and Sky Blue.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button variant="default">Primary Teal</Button>
            <Button variant="success">Success Mint</Button>
            <Button variant="warning">Warning Amber</Button>
            <Button variant="info">Info Sky</Button>
            <Button variant="coral">Warm Coral</Button>
            <Button variant="secondary">Secondary Slate</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="paper">Paper Sheet</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost Trigger</Button>
            <Button variant="link">Inline Link</Button>
            <Button disabled>Disabled State</Button>
          </CardContent>
        </Card>

        {/* Buttons with Icons */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons with Glyphs</CardTitle>
            <CardDescription>
              Structured action buttons paired with leading or trailing Lucide
              icons.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button variant="default">
              <Plus className="mr-1.5 h-4 w-4" />
              New Deployment
            </Button>
            <Button variant="success">
              <Check className="mr-1.5 h-4 w-4" />
              Confirm Build
            </Button>
            <Button variant="coral">
              <Trash2 className="mr-1.5 h-4 w-4" />
              Delete Node
            </Button>
            <Button variant="outline">
              <Download className="mr-1.5 h-4 w-4" />
              Export CSV
            </Button>
            <Button variant="outline">
              <GitBranch className="mr-1.5 h-4 w-4" />
              Branch main
              <ArrowUpRight className="ml-1 h-3.5 w-3.5 opacity-60" />
            </Button>
            <Button variant="secondary">
              <RotateCw className="mr-1.5 h-4 w-4" />
              Sync Replica
            </Button>
          </CardContent>
        </Card>

        {/* Size Scale */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Scale &amp; Dimensions</CardTitle>
            <CardDescription>
              From compact table micro-triggers (xs) to dominant hero
              call-to-actions (lg).
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center gap-4">
            <Button size="xs" variant="outline">
              Extra Small
            </Button>
            <Button size="sm" variant="outline">
              Small Button
            </Button>
            <Button size="default" variant="default">
              Default Size
            </Button>
            <Button size="lg" variant="default">
              Large Hero Action
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>

            <div className="h-6 w-px bg-border" />

            {/* Circular icon buttons */}
            <Button size="icon-xs" variant="outline" aria-label="Micro Action">
              <Heart className="h-3 w-3 text-accent-coral" />
            </Button>
            <Button size="icon-sm" variant="outline" aria-label="Small Action">
              <Plus className="h-3.5 w-3.5 text-accent-teal" />
            </Button>
            <Button size="icon" variant="default" aria-label="Default Action">
              <Send className="h-4 w-4" />
            </Button>
            <Button size="icon-lg" variant="paper" aria-label="Large Action">
              <ArrowRight className="h-4 w-4 text-foreground" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
