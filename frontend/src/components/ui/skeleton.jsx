function Skeleton({ className, style, ...props }) {
  return (
    <div
      style={{
        borderRadius: "0.375rem", // rounded-md
        backgroundColor: "#e5e7eb", // bg-muted (approx neutral gray)
        animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        ...style,
      }}
      className={className}
      {...props}
    />
  );
}

// Define pulse animation in CSS
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`, styleSheet.cssRules.length);

export { Skeleton };
