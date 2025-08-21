import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef(({ style, ...props }, ref) => (
  <SheetPrimitive.Overlay
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 50,
      backgroundColor: "rgba(0,0,0,0.8)",
      ...style,
    }}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

// Sheet Content Variants (side positioning)
const getSheetContentStyle = (side) => {
  const baseStyle = {
    position: "fixed",
    zIndex: 50,
    backgroundColor: "white",
    padding: "1.5rem",
    boxShadow: "0px 10px 25px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease-in-out",
  };

  switch (side) {
    case "top":
      return {
        ...baseStyle,
        left: 0,
        right: 0,
        top: 0,
        borderBottom: "1px solid #e5e7eb",
      };
    case "bottom":
      return {
        ...baseStyle,
        left: 0,
        right: 0,
        bottom: 0,
        borderTop: "1px solid #e5e7eb",
      };
    case "left":
      return {
        ...baseStyle,
        top: 0,
        bottom: 0,
        left: 0,
        width: "75%",
        maxWidth: "20rem",
        borderRight: "1px solid #e5e7eb",
      };
    case "right":
    default:
      return {
        ...baseStyle,
        top: 0,
        bottom: 0,
        right: 0,
        width: "75%",
        maxWidth: "20rem",
        borderLeft: "1px solid #e5e7eb",
      };
  }
};

const SheetContent = React.forwardRef(
  ({ side = "right", style, children, ...props }, ref) => (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        ref={ref}
        style={{
          ...getSheetContentStyle(side),
          ...style,
        }}
        {...props}
      >
        {children}
        <SheetPrimitive.Close
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            borderRadius: "4px",
            opacity: 0.7,
            transition: "opacity 0.2s ease-in-out",
            cursor: "pointer",
          }}
        >
          <X style={{ width: "16px", height: "16px" }} />
          <span style={{ position: "absolute", left: "-9999px" }}>Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
);
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({ style, ...props }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      textAlign: "center",
      ...style,
    }}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({ style, ...props }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column-reverse",
      gap: "0.5rem",
      marginTop: "1rem",
      justifyContent: "flex-end",
      ...style,
    }}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef(({ style, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    style={{
      fontSize: "1.125rem",
      fontWeight: 600,
      color: "#111827",
      ...style,
    }}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef(({ style, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    style={{
      fontSize: "0.875rem",
      color: "#6b7280",
      ...style,
    }}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
