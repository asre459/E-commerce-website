import * as React from "react"

function Skeleton({ className, style, ...props }) {
  return (
    <div
      style={{
        borderRadius: "0.375rem", // rounded-md
        backgroundColor: "#e5e7eb", // bg-muted (gray-200)
        animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        ...style,
      }}
      className={className}
      {...props}
    />
  )
}

// Inject keyframes safely once
if (typeof document !== "undefined") {
  const styleId = "skeleton-pulse-animation"
  if (!document.getElementById(styleId)) {
    const styleEl = document.createElement("style")
    styleEl.id = styleId
    styleEl.innerHTML = `
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `
    document.head.appendChild(styleEl)
  }
}

export { Skeleton }
