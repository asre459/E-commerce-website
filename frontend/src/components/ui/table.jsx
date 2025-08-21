import * as React from "react"

const Table = React.forwardRef(({ style, ...props }, ref) => (
  <div
    style={{
      position: "relative",
      width: "100%",
      overflow: "auto",
    }}
  >
    <table
      ref={ref}
      style={{
        width: "100%",
        fontSize: "0.875rem", // text-sm
        captionSide: "bottom", // caption-bottom
        ...style,
      }}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef(({ style, ...props }, ref) => (
  <thead
    ref={ref}
    style={{
      borderBottom: "1px solid #e5e7eb", // Tailwind border-b
      ...style,
    }}
    {...props}
  />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef(({ style, ...props }, ref) => (
  <tbody
    ref={ref}
    style={{
      ...style,
    }}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef(({ style, ...props }, ref) => (
  <tfoot
    ref={ref}
    style={{
      borderTop: "1px solid #e5e7eb", // border-t
      backgroundColor: "rgba(229, 231, 235, 0.5)", // bg-muted/50
      fontWeight: 500, // font-medium
      ...style,
    }}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef(({ style, ...props }, ref) => (
  <tr
    ref={ref}
    style={{
      borderBottom: "1px solid #e5e7eb", // border-b
      transition: "background-color 0.2s ease", // transition-colors
      cursor: "pointer",
      ...style,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = "rgba(229,231,235,0.5)" // hover:bg-muted/50
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = ""
    }}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef(({ style, ...props }, ref) => (
  <th
    ref={ref}
    style={{
      height: "3rem", // h-12
      paddingLeft: "1rem", // px-4
      paddingRight: "1rem",
      textAlign: "left", // text-left
      verticalAlign: "middle", // align-middle
      fontWeight: 500, // font-medium
      color: "#6b7280", // text-muted-foreground
      ...style,
    }}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef(({ style, ...props }, ref) => (
  <td
    ref={ref}
    style={{
      padding: "1rem", // p-4
      verticalAlign: "middle", // align-middle
      ...style,
    }}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef(({ style, ...props }, ref) => (
  <caption
    ref={ref}
    style={{
      marginTop: "1rem", // mt-4
      fontSize: "0.875rem", // text-sm
      color: "#6b7280", // text-muted-foreground
      ...style,
    }}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
