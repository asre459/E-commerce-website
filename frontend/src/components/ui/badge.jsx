/* eslint-disable no-unused-vars */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

// Badge component with inline styles
function Badge({
  className,
  variant = "default",
  asChild = false,
  style = {},
  children,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  
  // Base styles for the badge
  const baseStyles = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "0.375rem",
    border: "1px solid",
    padding: "0.25rem 0.5rem",
    fontSize: "0.75rem",
    lineHeight: "1rem",
    fontWeight: "500",
    width: "fit-content",
    whiteSpace: "nowrap",
    flexShrink: 0,
    gap: "0.25rem",
    overflow: "hidden",
    transition: "color, box-shadow 0.2s ease-in-out",
    
    // SVG icon styles
    "& svg": {
      width: "12px",
      height: "12px",
      pointerEvents: "none"
    },
    
    // Focus styles
    "&:focus-visible": {
      outline: "none",
      ring: "3px solid rgba(0, 0, 0, 0.1)"
    }
  };
  
  // Variant styles
  const variantStyles = {
    default: {
      borderColor: "transparent",
      backgroundColor: "hsl(222.2, 47.4%, 11.2%)",
      color: "hsl(210, 40%, 98%)",
      "&:hover": asChild ? {
        backgroundColor: "hsl(222.2, 47.4%, 9.2%)"
      } : {}
    },
    secondary: {
      borderColor: "transparent",
      backgroundColor: "hsl(210, 40%, 96.1%)",
      color: "hsl(222.2, 47.4%, 11.2%)",
      "&:hover": asChild ? {
        backgroundColor: "hsl(210, 40%, 90.1%)"
      } : {}
    },
    destructive: {
      borderColor: "transparent",
      backgroundColor: "hsl(0, 84.2%, 60.2%)",
      color: "white",
      "&:focus-visible": {
        ring: "3px solid rgba(239, 68, 68, 0.2)"
      },
      "&:hover": asChild ? {
        backgroundColor: "hsl(0, 84.2%, 55.2%)"
      } : {}
    },
    outline: {
      borderColor: "hsl(214.3, 31.8%, 91.4%)",
      color: "hsl(222.2, 84%, 4.9%)",
      backgroundColor: "transparent",
      "&:hover": asChild ? {
        backgroundColor: "hsl(210, 40%, 96.1%)",
        color: "hsl(222.2, 47.4%, 11.2%)"
      } : {}
    }
  };
  
  // Merge base styles with variant styles and any custom styles
  const mergedStyles = {
    ...baseStyles,
    ...variantStyles[variant],
    ...style
  };
  
  // For the focus styles, we need to handle them differently
  // since they're pseudo-classes
  const focusStyles = mergedStyles["&:focus-visible"];
  delete mergedStyles["&:focus-visible"];
  
  const hoverStyles = mergedStyles["&:hover"];
  delete mergedStyles["&:hover"];
  
  return (
    <Comp
      data-slot="badge"
      style={mergedStyles}
      onFocus={(e) => {
        if (focusStyles) {
          e.currentTarget.style.boxShadow = focusStyles.ring;
        }
      }}
      onBlur={(e) => {
        e.currentTarget.style.boxShadow = "";
      }}
      onMouseEnter={(e) => {
        if (hoverStyles && asChild) {
          Object.keys(hoverStyles).forEach(key => {
            e.currentTarget.style[key] = hoverStyles[key];
          });
        }
      }}
      onMouseLeave={(e) => {
        if (hoverStyles && asChild) {
          Object.keys(variantStyles[variant]).forEach(key => {
            e.currentTarget.style[key] = variantStyles[variant][key];
          });
        }
      }}
      {...props}
    >
      {children}
    </Comp>
  );
}

export { Badge };