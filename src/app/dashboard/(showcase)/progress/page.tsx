"use client";

import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/modules/components//ui/progress";
import { cn } from "cn";

import { useEffect, useState } from "react";
import { uiText } from "@/modules/data/ui-text";

export default function ProgressDemo() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col">
      <Progress value={56} className="w-full max-w-s mb-12">
        <ProgressLabel>{uiText.demo.progress.upload}</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Progress
        value={progress}
        className="w-[60%]"
        indicatorColor={cn(
          progress < 40 && "bg-red-500",
          progress >= 40 && progress <= 80 && "bg-yellow-500",
          progress > 80 && "bg-green-500",
        )}
      />
    </div>
  );
}
