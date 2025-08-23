// import { Card, CardContent, CardFooter } from "../ui/card";
// import { Button } from "../ui/button";
// import { brandOptionsMap, categoryOptionsMap } from "@/config";

// function ShoppingProductTile({ product, handleGetProductDetails, handleAddtoCart }) {
//   const badgeStyle = {
//     position: "absolute",
//     top: "8px",
//     left: "8px",
//     backgroundColor: "#EF4444", // red-500
//     color: "#FFFFFF",
//     padding: "4px 8px",
//     borderRadius: "4px",
//     fontSize: "0.875rem",
//     fontWeight: "500",
//     cursor: "default",
//   };

//   const cardStyle = {
//     width: "100%",
//     maxWidth: "24rem", // ~sm
//     margin: "0 auto",
//     borderRadius: "8px",
//     overflow: "hidden",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
//     backgroundColor: "#FFFFFF",
//     display: "flex",
//     flexDirection: "column",
//   };

//   const imageStyle = {
//     width: "100%",
//     height: "300px",
//     objectFit: "cover",
//     cursor: "pointer",
//   };

//   const contentStyle = {
//     padding: "16px",
//     flexGrow: 1,
//   };

//   const titleStyle = {
//     fontSize: "1.25rem",
//     fontWeight: "700",
//     marginBottom: "8px",
//     cursor: "pointer",
//   };

//   const textStyle = {
//     fontSize: "16px",
//     color: "#6B7280", // muted-foreground
//   };

//   const priceStyle = (sale) => ({
//     fontSize: "1.125rem",
//     fontWeight: "600",
//     color: "#1D4ED8", // primary
//     textDecoration: sale ? "line-through" : "none",
//   });

//   const salePriceStyle = {
//     fontSize: "1.125rem",
//     fontWeight: "600",
//     color: "#1D4ED8",
//   };

//   const footerStyle = {
//     padding: "16px",
//   };

//   const buttonStyle = (disabled) => ({
//     width: "100%",
//     padding: "12px",
//     backgroundColor: disabled ? "#9CA3AF" : "#3B82F6", // gray if disabled, blue otherwise
//     color: "#FFFFFF",
//     fontWeight: "600",
//     border: "none",
//     borderRadius: "4px",
//     cursor: disabled ? "not-allowed" : "pointer",
//     opacity: disabled ? 0.6 : 1,
//   });

//   return (
//     <div style={cardStyle}>
//       <div onClick={() => handleGetProductDetails(product?._id)} style={{ position: "relative" }}>
//         <img src={product?.image} alt={product?.title} style={imageStyle} />
//         {product?.totalStock === 0 ? (
//           <span style={badgeStyle}>Out Of Stock</span>
//         ) : product?.totalStock < 10 ? (
//           <span style={badgeStyle}>{`Only ${product?.totalStock} items left`}</span>
//         ) : product?.salePrice > 0 ? (
//           <span style={badgeStyle}>Sale</span>
//         ) : null}
//       </div>

//       <div style={contentStyle}>
//         <h2 style={titleStyle}>{product?.title}</h2>
//         <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
//           <span style={textStyle}>{categoryOptionsMap[product?.category]}</span>
//           <span style={textStyle}>{brandOptionsMap[product?.brand]}</span>
//         </div>
//         <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
//           <span style={priceStyle(product?.salePrice > 0)}>${product?.price}</span>
//           {product?.salePrice > 0 && <span style={salePriceStyle}>${product?.salePrice}</span>}
//         </div>
//       </div>

//       <div style={footerStyle}>
//         {product?.totalStock === 0 ? (
//           <button style={buttonStyle(true)}>Out Of Stock</button>
//         ) : (
//           <button
//             style={buttonStyle(false)}
//             onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
//           >
//             Add to cart
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ShoppingProductTile;

import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";

function ShoppingProductTile({ product, handleGetProductDetails, handleAddtoCart }) {
  const badgeStyle = {
    position: "absolute",
    top: "8px",
    left: "8px",
    backgroundColor: "#EF4444",
    color: "#FFFFFF",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "0.875rem",
    fontWeight: "500",
    cursor: "default",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "24rem",
    margin: "0 auto",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    backgroundColor: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
  };

  const imageStyle = {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    cursor: "pointer",
  };

  const contentStyle = {
    padding: "16px",
    flexGrow: 1,
  };

  const titleStyle = {
    fontSize: "1.25rem",
    fontWeight: "700",
    marginBottom: "8px",
    cursor: "pointer",
  };

  const textStyle = {
    fontSize: "16px",
    color: "#6B7280",
  };

  const priceStyle = (sale) => ({
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#1D4ED8",
    textDecoration: sale ? "line-through" : "none",
  });

  const salePriceStyle = {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#1D4ED8",
  };

  const footerStyle = {
    padding: "16px",
  };

  const buttonStyle = (disabled) => ({
    width: "100%",
    padding: "12px",
    backgroundColor: disabled ? "#9CA3AF" : "#3B82F6",
    color: "#FFFFFF",
    fontWeight: "600",
    border: "none",
    borderRadius: "4px",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
  });

  return (
    <div style={cardStyle}>
      <div onClick={() => handleGetProductDetails(product?._id)} style={{ position: "relative" }}>
        {/* Only render image if it has a valid src */}
        {product?.image ? (
          <img src={product.image} alt={product?.title || "Product image"} style={imageStyle} />
        ) : (
          <div style={{...imageStyle, backgroundColor: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center"}}>
            No Image
          </div>
        )}
        {product?.totalStock === 0 ? (
          <span style={badgeStyle}>Out Of Stock</span>
        ) : product?.totalStock < 10 ? (
          <span style={badgeStyle}>{`Only ${product?.totalStock} items left`}</span>
        ) : product?.salePrice > 0 ? (
          <span style={badgeStyle}>Sale</span>
        ) : null}
      </div>

      <div style={contentStyle}>
        <h2 style={titleStyle}>{product?.title}</h2>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <span style={textStyle}>{categoryOptionsMap[product?.category]}</span>
          <span style={textStyle}>{brandOptionsMap[product?.brand]}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <span style={priceStyle(product?.salePrice > 0)}>${product?.price}</span>
          {product?.salePrice > 0 && <span style={salePriceStyle}>${product?.salePrice}</span>}
        </div>
      </div>

      <div style={footerStyle}>
        {product?.totalStock === 0 ? (
          <button style={buttonStyle(true)}>Out Of Stock</button>
        ) : (
          <button
            style={buttonStyle(false)}
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ShoppingProductTile;