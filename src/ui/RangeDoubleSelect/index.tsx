import React, { memo } from 'react'
import MultiRangeSlider from "multi-range-slider-react";
import type { } from 'multi-range-slider-react'
interface RageDoubleSelectProps extends React.ComponentProps<typeof MultiRangeSlider> {

}
const RageDoubleSelect = (props: RageDoubleSelectProps) => {
    return (
        <MultiRangeSlider
            {...props}
        />
    )
}

export default memo(RageDoubleSelect) 