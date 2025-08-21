/* eslint-disable no-unused-vars */
import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

// Avatar component with inline styles
function Avatar({ className, style = {}, ...props }) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      style={{
        position: "relative",
        display: "flex",
        height: "32px",
        width: "32px",
        flexShrink: 0,
        overflow: "hidden",
        borderRadius: "50%",
        ...style
      }}
      {...props}
    />
  );
}

// AvatarImage component with inline styles
function AvatarImage({ className, style = {}, ...props }) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      style={{
        aspectRatio: "1 / 1",
        height: "100%",
        width: "100%",
        ...style
      }}
      {...props}
    />
  );
}

// AvatarFallback component with inline styles
function AvatarFallback({ className, style = {}, ...props }) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      style={{
        backgroundColor: "#f3f4f6", // bg-muted equivalent
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        ...style
      }}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };