import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef(({ style, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    style={{
      display: "flex",
      cursor: "default",
      userSelect: "none",
      alignItems: "center",
      borderRadius: "2px",
      padding: "6px 8px",
      fontSize: "14px",
      outline: "none",
      ...(inset ? { paddingLeft: "32px" } : {}),
      ...style,
    }}
    {...props}
  >
    {children}
    <ChevronRight style={{ marginLeft: "auto", width: "16px", height: "16px" }} />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef(({ style, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    style={{
      zIndex: 50,
      minWidth: "128px",
      overflow: "hidden",
      borderRadius: "6px",
      border: "1px solid var(--border-color, #e5e7eb)",
      backgroundColor: "var(--bg-popover, #ffffff)",
      color: "var(--text-popover, #111827)",
      padding: "4px",
      boxShadow: "var(--shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05))",
      ...style,
    }}
    {...props}
  />
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef(({ style, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      style={{
        zIndex: 50,
        minWidth: "128px",
        overflow: "hidden",
        borderRadius: "6px",
        border: "1px solid var(--border-color, #e5e7eb)",
        backgroundColor: "var(--bg-popover, #ffffff)",
        color: "var(--text-popover, #111827)",
        padding: "4px",
        boxShadow: "var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06))",
        ...style,
      }}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef(({ style, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    style={{
      position: "relative",
      display: "flex",
      cursor: "default",
      userSelect: "none",
      alignItems: "center",
      borderRadius: "2px",
      padding: "6px 8px",
      fontSize: "14px",
      outline: "none",
      transition: "all 150ms ease",
      ...(inset ? { paddingLeft: "32px" } : {}),
      ...style,
    }}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef(({ style, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    style={{
      position: "relative",
      display: "flex",
      cursor: "default",
      userSelect: "none",
      alignItems: "center",
      borderRadius: "2px",
      padding: "6px 8px 6px 32px",
      fontSize: "14px",
      outline: "none",
      transition: "all 150ms ease",
      ...style,
    }}
    checked={checked}
    {...props}
  >
    <span style={{ position: "absolute", left: "8px", display: "flex", height: "14px", width: "14px", alignItems: "center", justifyContent: "center" }}>
      <DropdownMenuPrimitive.ItemIndicator>
        <Check style={{ width: "16px", height: "16px" }} />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef(({ style, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    style={{
      position: "relative",
      display: "flex",
      cursor: "default",
      userSelect: "none",
      alignItems: "center",
      borderRadius: "2px",
      padding: "6px 8px 6px 32px",
      fontSize: "14px",
      outline: "none",
      transition: "all 150ms ease",
      ...style,
    }}
    {...props}
  >
    <span style={{ position: "absolute", left: "8px", display: "flex", height: "14px", width: "14px", alignItems: "center", justifyContent: "center" }}>
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle style={{ width: "8px", height: "8px", fill: "currentColor" }} />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef(({ style, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    style={{
      padding: "6px 8px",
      fontSize: "14px",
      fontWeight: 600,
      ...(inset ? { paddingLeft: "32px" } : {}),
      ...style,
    }}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef(({ style, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    style={{
      margin: "4px -4px",
      height: "1px",
      backgroundColor: "var(--muted-color, #e5e7eb)",
      ...style,
    }}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({ style, ...props }) => {
  return (
    <span
      style={{
        marginLeft: "auto",
        fontSize: "12px",
        letterSpacing: "0.1em",
        opacity: 0.6,
        ...style,
      }}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};