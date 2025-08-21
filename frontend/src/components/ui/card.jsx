import * as React from "react"

function Card({ style, ...props }) {
  return (
    <div
      data-slot="card"
      style={{
        backgroundColor: "#ffffff", // bg-card (white by default)
        color: "#111827", // text-card-foreground (gray-900 equivalent)
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem", // gap-6
        borderRadius: "0.75rem", // rounded-xl
        border: "1px solid #e5e7eb", // border (gray-200)
        paddingTop: "1.5rem", // py-6
        paddingBottom: "1.5rem",
        boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)", // shadow-sm
        ...style,
      }}
      {...props}
    />
  )
}

function CardHeader({ style, ...props }) {
  return (
    <div
      data-slot="card-header"
      style={{
        display: "grid",
        gridAutoRows: "min-content", // auto-rows-min
        gridTemplateRows: "auto auto",
        alignItems: "start",
        gap: "0.375rem", // gap-1.5
        paddingLeft: "1.5rem", // px-6
        paddingRight: "1.5rem",
        ...style,
      }}
      {...props}
    />
  )
}

function CardTitle({ style, ...props }) {
  return (
    <div
      data-slot="card-title"
      style={{
        lineHeight: "1", // leading-none
        fontWeight: 600, // font-semibold
        ...style,
      }}
      {...props}
    />
  )
}

function CardDescription({ style, ...props }) {
  return (
    <div
      data-slot="card-description"
      style={{
        color: "#6b7280", // text-muted-foreground (gray-500)
        fontSize: "0.875rem", // text-sm
        ...style,
      }}
      {...props}
    />
  )
}

function CardAction({ style, ...props }) {
  return (
    <div
      data-slot="card-action"
      style={{
        gridColumnStart: 2,
        gridRowStart: 1,
        gridRowEnd: "span 2",
        alignSelf: "start",
        justifySelf: "end",
        ...style,
      }}
      {...props}
    />
  )
}

function CardContent({ style, ...props }) {
  return (
    <div
      data-slot="card-content"
      style={{
        paddingLeft: "1.5rem", // px-6
        paddingRight: "1.5rem",
        ...style,
      }}
      {...props}
    />
  )
}

function CardFooter({ style, ...props }) {
  return (
    <div
      data-slot="card-footer"
      style={{
        display: "flex",
        alignItems: "center",
        paddingLeft: "1.5rem", // px-6
        paddingRight: "1.5rem",
        ...style,
      }}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
