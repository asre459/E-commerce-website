import * as React from "react";

const Input = React.forwardRef(({ type, style, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      style={{
        display: "flex",
        height: "2.5rem",            // h-10
        width: "100%",               // w-full
        borderRadius: "0.375rem",    // rounded-md
        border: "1px solid #d1d5db", // border-input (gray-300)
        backgroundColor: "white",    // bg-background
        padding: "0.5rem 0.75rem",   // px-3 py-2
        fontSize: "0.875rem",        // text-sm
        lineHeight: "1.25rem",
        outline: "none",
        transition: "box-shadow 0.2s, border-color 0.2s",

        // Disabled state (disabled:cursor-not-allowed disabled:opacity-50)
        cursor: props.disabled ? "not-allowed" : "text",
        opacity: props.disabled ? 0.5 : 1,

        // Allow custom overrides
        ...style,
      }}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
