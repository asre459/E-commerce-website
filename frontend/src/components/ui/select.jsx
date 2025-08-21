import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef(({ style, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    style={{
      display: "flex",
      height: "2.5rem",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: "0.375rem",
      border: "1px solid #d1d5db",
      backgroundColor: "white",
      padding: "0.5rem 0.75rem",
      fontSize: "0.875rem",
      outline: "none",
      cursor: "pointer",
      ...style,
    }}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown style={{ width: "16px", height: "16px", opacity: 0.5 }} />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef(({ style, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0.25rem 0",
      cursor: "default",
      ...style,
    }}
    {...props}
  >
    <ChevronUp style={{ width: "16px", height: "16px" }} />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef(({ style, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0.25rem 0",
      cursor: "default",
      ...style,
    }}
    {...props}
  >
    <ChevronDown style={{ width: "16px", height: "16px" }} />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef(
  ({ style, children, position = "popper", ...props }, ref) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        style={{
          position: "relative",
          zIndex: 50,
          maxHeight: "24rem",
          minWidth: "8rem",
          overflow: "hidden",
          borderRadius: "0.375rem",
          border: "1px solid #e5e7eb",
          backgroundColor: "white",
          color: "#111827",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
          ...style,
        }}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          style={{
            padding: "0.25rem",
            ...(position === "popper"
              ? {
                  height: "var(--radix-select-trigger-height)",
                  width: "100%",
                  minWidth: "var(--radix-select-trigger-width)",
                }
              : {}),
          }}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef(({ style, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    style={{
      padding: "0.375rem 0.5rem 0.375rem 2rem",
      fontSize: "0.875rem",
      fontWeight: 600,
      ...style,
    }}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef(({ style, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    style={{
      position: "relative",
      display: "flex",
      width: "100%",
      alignItems: "center",
      borderRadius: "0.25rem",
      padding: "0.375rem 0.5rem 0.375rem 2rem",
      fontSize: "0.875rem",
      cursor: "default",
      userSelect: "none",
      outline: "none",
      ...style,
    }}
    {...props}
  >
    <span
      style={{
        position: "absolute",
        left: "0.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "14px",
        height: "14px",
      }}
    >
      <SelectPrimitive.ItemIndicator>
        <Check style={{ width: "16px", height: "16px" }} />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef(({ style, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    style={{
      margin: "0.25rem 0",
      height: "1px",
      backgroundColor: "#e5e7eb",
      ...style,
    }}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
