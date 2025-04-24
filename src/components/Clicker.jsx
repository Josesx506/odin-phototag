import React from 'react'

export default function Clicker({
  x, y, radius = '10', stroke = 'red', strokeWidth = '3', fill = 'none',
}) {
  return (
    <circle
      cx={x} cy={y}
      r={radius} stroke={stroke}
      strokeWidth={strokeWidth} fill={fill}
    />
  )
}
