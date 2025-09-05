import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef(({ style, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 50,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      ...style,
    }}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef(({ style, children, ...props }, ref) => {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gridColumns = windowWidth >= 768 ? "1fr 1fr" : "1fr"; // md breakpoint ~768px

  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        style={{
          position: "fixed",
          left: "50%",
          top: "50%",
          zIndex: 50,
          display: "grid",
          gridTemplateColumns: gridColumns,
          gap: "2rem",
          width: "100%",
          maxWidth: "80rem",
          transform: "translate(-50%, -50%)",
          border: "1px solid hsl(240, 5.9%, 90%)",
          backgroundColor: "hsl(0, 0%, 100%)",
          padding: "1.5rem",
          boxShadow:
            "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
          transition: "all 200ms",
          maxHeight: "90vh",
          overflow: "auto",
          ...style,
        }}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          style={{
            position: "absolute",
            right: "1rem",
            top: "1rem",
            borderRadius: "0.125rem",
            opacity: 0.7,
            backgroundColor: "transparent",
            transition: "opacity 200ms",
            cursor: "pointer",
          }}
        >
          <X size={16} />
          <span
            style={{
              position: "absolute",
              width: "1px",
              height: "1px",
              padding: 0,
              margin: "-1px",
              overflow: "hidden",
              clip: "rect(0, 0, 0, 0)",
              whiteSpace: "nowrap",
              border: 0,
            }}
          >
            Close
          </span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ style, ...props }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "0.375rem",
      textAlign: "center",
      ...style,
    }}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ style, ...props }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column-reverse",
      gap: "0.5rem",
      ...style,
    }}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef(({ style, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    style={{
      fontSize: "2rem",
      fontWeight: "bold",
      lineHeight: "2.5rem",
      ...style,
    }}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef(({ style, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    style={{
      fontSize: "1rem",
      color: "#6B7280",
      ...style,
    }}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
