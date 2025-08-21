import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

const baseStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  whiteSpace: "nowrap",
  borderRadius: "0.375rem",
  fontSize: "0.875rem",
  fontWeight: "500",
  transition: "all 0.2s ease-in-out",
  outline: "none",
  cursor: "pointer",
};

// Variants
const variantStyles = {
  default: {
    backgroundColor: "var(--primary)",
    color: "var(--primary-foreground)",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
  },
  destructive: {
    backgroundColor: "var(--destructive)",
    color: "#fff",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
  },
  outline: {
    border: "1px solid var(--input, #ddd)",
    backgroundColor: "var(--background)",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
  },
  secondary: {
    backgroundColor: "var(--secondary)",
    color: "var(--secondary-foreground)",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
  },
  ghost: {
    backgroundColor: "transparent",
    color: "inherit",
  },
  link: {
    backgroundColor: "transparent",
    color: "var(--primary)",
    textDecoration: "underline",
    textUnderlineOffset: "4px",
  },
};

// Sizes
const sizeStyles = {
  default: { height: "2.25rem", padding: "0.5rem 1rem" },
  sm: { height: "2rem", padding: "0.25rem 0.75rem", gap: "0.375rem" },
  lg: { height: "2.5rem", padding: "0.5rem 1.5rem" },
  icon: { width: "2.25rem", height: "2.25rem", padding: "0" },
};

function Button({
  style,
  variant = "default",
  size = "default",
  asChild = false,
  disabled = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";

  const mergedStyle = {
    ...baseStyle,
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...(disabled
      ? { opacity: 0.5, pointerEvents: "none", cursor: "not-allowed" }
      : {}),
    ...style, // allow overrides
  };

  return <Comp style={mergedStyle} disabled={disabled} {...props} />;
}

export { Button };
