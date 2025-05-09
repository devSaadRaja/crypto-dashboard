"use client";

import { useEffect, useRef } from "react";

interface PriceChartProps {
  data: number[];
  color: string;
}

export function PriceChart({ data, color }: PriceChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions with device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    if (data.length < 2) return;

    // Find min and max for scaling
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1; // Avoid division by zero

    // Draw the line
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;

    // Move to first point
    const xStep = rect.width / (data.length - 1);
    const getY = (value: number) =>
      rect.height -
      ((value - min) / range) * rect.height * 0.8 -
      rect.height * 0.1;

    ctx.moveTo(0, getY(data[0]));

    // Draw lines to each point
    for (let i = 1; i < data.length; i++) {
      ctx.lineTo(i * xStep, getY(data[i]));
    }

    ctx.stroke();

    // Fill area under the line
    ctx.lineTo((data.length - 1) * xStep, rect.height);
    ctx.lineTo(0, rect.height);
    ctx.closePath();

    // Create gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, rect.height);
    gradient.addColorStop(0, `${color}40`); // 25% opacity
    gradient.addColorStop(1, `${color}00`); // 0% opacity

    ctx.fillStyle = gradient;
    ctx.fill();
  }, [data, color]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      aria-label="Price chart"
      role="img"
    />
  );
}
