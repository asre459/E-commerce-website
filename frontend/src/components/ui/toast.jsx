import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { X } from "lucide-react";

// ToastProvider remains the same
const ToastProvider = ToastPrimitives.Provider;

// ToastViewport with inline styles
const ToastViewport = React.forwardRef(({ style = {}, ...props }, ref) => {
  const viewportStyles = {
    position: "fixed",
    top: 0,
    zIndex: 100,
    display: "flex",
    flexDirection: "column-reverse",
    maxHeight: "100vh",
    width: "100%",
    padding: "1rem",
    ...style
  };

  return (
    <ToastPrimitives.Viewport
      ref={ref}
      style={viewportStyles}
      {...props}
    />
  );
});
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

// Toast component with inline styles
const Toast = React.forwardRef(({ variant = "default", style = {}, ...props }, ref) => {
  const baseStyles = {
    pointerEvents: "auto",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: "1rem",
    overflow: "hidden",
    borderRadius: "0.375rem",
    border: "1px solid",
    padding: "1.5rem",
    paddingRight: "2rem",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    transition: "all 0.2s ease-in-out",
  };

  const variantStyles = {
    default: {
      borderColor: "hsl(214.3, 31.8%, 91.4%)",
      backgroundColor: "hsl(0, 0%, 100%)",
      color: "hsl(222.2, 84%, 4.9%)",
    },
    destructive: {
      borderColor: "hsl(0, 84.2%, 60.2%)",
      backgroundColor: "hsl(0, 84.2%, 60.2%)",
      color: "hsl(210, 40%, 98%)",
    }
  };

  const mergedStyles = {
    ...baseStyles,
    ...variantStyles[variant],
    ...style
  };

  return (
    <ToastPrimitives.Root
      ref={ref}
      style={mergedStyles}
      {...props}
    />
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

// ToastAction with inline styles
const ToastAction = React.forwardRef(({ style = {}, ...props }, ref) => {
  const actionStyles = {
    display: "inline-flex",
    height: "2rem",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "0.375rem",
    border: "1px solid",
    borderColor: "hsl(214.3, 31.8%, 91.4%)",
    backgroundColor: "transparent",
    padding: "0 0.75rem",
    fontSize: "0.875rem",
    fontWeight: 500,
    transition: "background-color 0.2s ease-in-out",
    cursor: "pointer",
  };

  return (
    <ToastPrimitives.Action
      ref={ref}
      style={{ ...actionStyles, ...style }}
      {...props}
    />
  );
});
ToastAction.displayName = ToastPrimitives.Action.displayName;

// ToastClose with inline styles
const ToastClose = React.forwardRef(({ style = {}, ...props }, ref) => {
  const closeStyles = {
    position: "absolute",
    right: "0.5rem",
    top: "0.5rem",
    borderRadius: "0.375rem",
    padding: "0.25rem",
    color: "hsl(215.4, 16.3%, 46.9%)",
    opacity: 0,
    transition: "opacity 0.2s ease-in-out, color 0.2s ease-in-out",
    cursor: "pointer",
  };

  return (
    <ToastPrimitives.Close
      ref={ref}
      style={{ ...closeStyles, ...style }}
      {...props}
    >
      <X size={16} />
    </ToastPrimitives.Close>
  );
});
ToastClose.displayName = ToastPrimitives.Close.displayName;

// ToastTitle with inline styles
const ToastTitle = React.forwardRef(({ style = {}, ...props }, ref) => {
  const titleStyles = {
    fontSize: "0.875rem",
    fontWeight: 600,
    margin: 0,
  };

  return (
    <ToastPrimitives.Title
      ref={ref}
      style={{ ...titleStyles, ...style }}
      {...props}
    />
  );
});
ToastTitle.displayName = ToastPrimitives.Title.displayName;

// ToastDescription with inline styles
const ToastDescription = React.forwardRef(({ style = {}, ...props }, ref) => {
  const descriptionStyles = {
    fontSize: "0.875rem",
    opacity: 0.9,
    margin: 0,
  };

  return (
    <ToastPrimitives.Description
      ref={ref}
      style={{ ...descriptionStyles, ...style }}
      {...props}
    />
  );
});
ToastDescription.displayName = ToastPrimitives.Description.displayName;

export { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction };