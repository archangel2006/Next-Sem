"use client";

import React from "react";

type StatCardProps = {
  title: string;
  value: string;
  sub: string;
  extra?: string;
  progress?: number; // ✅ FIX ADDED
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  sub,
  extra,
  progress,
}) => {
  return (
    <div className="bg-zinc-900 rounded-xl p-5 shadow-md">
      
      {/* Title */}
      <p className="text-sm text-zinc-400">{title}</p>

      {/* Value */}
      <h2 className="text-2xl font-semibold mt-1">{value}</h2>

      {/* Sub */}
      <p className="text-sm text-zinc-500 mt-1">{sub}</p>

      {/* Extra (optional) */}
      {extra && (
        <p className="text-xs text-zinc-400 mt-1">{extra}</p>
      )}

      {/* Progress Bar (optional) */}
      {progress !== undefined && (
        <div className="mt-3">
          <div className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StatCard;