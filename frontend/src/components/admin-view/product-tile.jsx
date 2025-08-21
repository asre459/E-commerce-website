import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card style={{ width: "100%", maxWidth: "400px", margin: "auto" }}>
      <div>
        <div style={{ position: "relative" }}>
          <img
            src={product?.image|| null}
            alt={product?.title}
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
            }}
          />
        </div>
        <CardContent>
          <h2 style={{ fontSize: "20px", fontWeight: "700", marginTop: "8px", marginBottom: "8px" }}>
            {product?.title}
          </h2>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span
              style={{
                fontSize: "18px",
                fontWeight: "600",
                textDecoration: product?.salePrice > 0 ? "line-through" : "none",
                color: "#222",
              }}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span style={{ fontSize: "18px", fontWeight: "700" }}>
                ${product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
