import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div
      style={{
        background: "var(--background)",
        borderRadius: "8px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          padding: "16px",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <h2 style={{ fontSize: "18px", fontWeight: "800" }}>Filters</h2>
      </div>
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: "700" }}>{keyItem}</h3>
              <div style={{ display: "grid", gap: "8px", marginTop: "8px" }}>
                {filterOptions[keyItem].map((option) => (
                  <Label
                    key={option.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    <Checkbox
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
