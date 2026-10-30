"use client";
import { Slider } from "@/modules/components//ui/slider";
import { useState } from "react";
import { uiText } from "@/modules/data/ui-text";

export default function SliderDemo() {
  const [sliderValue, setSliderValue] = useState(10);
  const [rangeValue, setRangeValue] = useState([10, 20]);

  return (
    <div className="grid grid-cols-1 gap-3">
      <span>
        {uiText.demo.slider.value} {sliderValue}
      </span>
      <Slider
        value={[sliderValue]}
        onValueChange={(value) =>
          setSliderValue(typeof value === "number" ? value : (value[0] ?? 0))
        }
        max={100}
        step={1}
        className="w-full max-w-xs"
      />

      <span>
        {uiText.demo.slider.range} {rangeValue.join(",")}
      </span>
      <Slider
        value={rangeValue}
        onValueChange={(value) =>
          setRangeValue(
            Array.isArray(value) ? [...value] : ([value] as number[]),
          )
        }
        max={100}
        step={1}
        className="w-full max-w-xs"
      />
    </div>
  );
}
