import React, { useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";

interface Props {
  min: number;
  max: number;
}
const DoubleRange = ({ min, max }: Props) => {
  const [minValue, set_minValue] = useState(min);
  const [maxValue, set_maxValue] = useState(max ? max : 1000);
  console.log(minValue, maxValue);
  const handleInput = (e: any) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };

  return (
    <div className="App">
      <MultiRangeSlider
        ruler={false}
        barInnerColor="#FFC10E"
        thumbLeftColor="#fff"
        barLeftColor="#000"
        barRightColor="#000"
        style={{ background: "none", boxShadow: "none", border: "none" }}
        min={0}
        max={2000}
        step={5}
        minValue={min}
        maxValue={max}
        onInput={(e) => {
          handleInput(e);
        }}
      />
    </div>
  );
};

export default DoubleRange;
