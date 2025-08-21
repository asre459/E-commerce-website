import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

const Separator = React.forwardRef(
  ({  orientation = "horizontal", decorative = true, ...props }, ref) => {
    // Convert the Tailwind classes to inline styles
    const baseStyle = {
      flexShrink: 0,
      backgroundColor: "hsl(var(--border))", // Using CSS variable for consistency
    };
    
    const orientationStyle = orientation === "horizontal" 
      ? { height: "1px", width: "100%" } 
      : { height: "100%", width: "1px" };
    
    // Merge styles with any additional style from className
    const combinedStyle = { ...baseStyle, ...orientationStyle };
    
    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        style={combinedStyle}
        {...props}
      />
    );
  }
);

Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };