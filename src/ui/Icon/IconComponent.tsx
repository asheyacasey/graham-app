import React from 'react'
import * as AllIcons from './all-icons'
import { SvgProps } from './utils'
interface IconComponentsProps extends SvgProps {
  name: keyof typeof AllIcons
}
export const IconComponent = ({ name, width = '24', height = '24', fill = 'fill-black', stroke = 'stroke-black', ...rest }: IconComponentsProps) => {
  const Component = AllIcons[name]
  return (
    <Component width={width} height={height} fill={fill} stroke={stroke} {...rest} />
  )
}