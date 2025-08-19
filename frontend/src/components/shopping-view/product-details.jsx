import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  const { toast } = useToast();

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });
          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review added successfully!",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "32px",
          padding: "48px",
          maxWidth: "70vw",
        }}
      >
        <div style={{ position: "relative", overflow: "hidden", borderRadius: "0.5rem" }}>
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            style={{ width: "100%", objectFit: "cover", aspectRatio: "1/1" }}
          />
        </div>
        <div>
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: "800" }}>{productDetails?.title}</h1>
            <p style={{ color: "#6B7280", fontSize: "1.5rem", marginTop: "1rem", marginBottom: "1.25rem" }}>
              {productDetails?.description}
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p
              style={{
                fontSize: "1.875rem",
                fontWeight: "700",
                color: "#3b82f6",
                textDecoration: productDetails?.salePrice > 0 ? "line-through" : "none",
              }}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 && (
              <p style={{ fontSize: "1.5rem", fontWeight: "700", color: "#6B7280" }}>
                ${productDetails?.salePrice}
              </p>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "0.5rem" }}>
            <StarRatingComponent rating={averageReview} />
            <span style={{ color: "#6B7280" }}>({averageReview.toFixed(2)})</span>
          </div>
          <div style={{ marginTop: "1.25rem", marginBottom: "1.25rem" }}>
            {productDetails?.totalStock === 0 ? (
              <Button style={{ width: "100%", opacity: 0.6, cursor: "not-allowed" }}>
                Out of Stock
              </Button>
            ) : (
              <Button
                style={{ width: "100%" }}
                onClick={() =>
                  handleAddToCart(productDetails?._id, productDetails?.totalStock)
                }
              >
                Add to Cart
              </Button>
            )}
          </div>
          <Separator />
          <div style={{ maxHeight: "300px", overflow: "auto" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem" }}>Reviews</h2>
            <div style={{ display: "grid", gap: "24px" }}>
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => (
                  <div key={reviewItem.userId} style={{ display: "flex", gap: "16px" }}>
                    <Avatar style={{ width: "40px", height: "40px", border: "1px solid #e5e7eb" }}>
                      <AvatarFallback>
                        {reviewItem?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div style={{ display: "grid", gap: "4px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <h3 style={{ fontWeight: "700" }}>{reviewItem?.userName}</h3>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                        <StarRatingComponent rating={reviewItem?.reviewValue} />
                      </div>
                      <p style={{ color: "#6B7280" }}>{reviewItem.reviewMessage}</p>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No Reviews</h1>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "2.5rem" }}>
              <Label>Write a review</Label>
              <div style={{ display: "flex", gap: "4px" }}>
                <StarRatingComponent rating={rating} handleRatingChange={handleRatingChange} />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="Write a review..."
              />
              <Button onClick={handleAddReview} disabled={reviewMsg.trim() === ""}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
