"use client";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export default function SliderDemo() {
  const [sliderValue, setSliderValue] = useState(10);
  const [rangeValue, setRangeValue] = useState([10, 20]);

  return (
    <div className="grid grid-cols-1 gap-3">
      <span>Slider value: {sliderValue}</span>
      <Slider
        value={[sliderValue]}
        onValueChange={(value) =>
          setSliderValue(typeof value === "number" ? value : (value[0] ?? 0))
        }
        max={100}
        step={1}
        className="w-full max-w-xs"
      />

      <span>Range value: {rangeValue.join(",")}</span>
      <Slider
        value={rangeValue}
        onValueChange={setRangeValue}
        max={100}
        step={1}
        className="w-full max-w-xs"
      />
    </div>
  );
}
