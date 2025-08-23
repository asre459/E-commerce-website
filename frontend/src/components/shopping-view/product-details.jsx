import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";
import StarRatingComponent from "../common/star-rating";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { setProductDetails } from "@/store/shop/products-slice";
import { addReview, getReviews } from "@/store/shop/review-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingReview, setIsAddingReview] = useState(false);
  
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const { toast } = useToast();

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  async function handleAddToCart(getCurrentProductId, getTotalStock) {
    if (!user) {
      toast({
        title: "Please login to add items to cart",
        variant: "destructive",
      });
      return;
    }
    
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

    setIsAddingToCart(true);
    try {
      const result = await dispatch(
        addToCart({
          userId: user?.id,
          productId: getCurrentProductId,
          quantity: 1,
        })
      ).unwrap();
      
      if (result?.success) {
        await dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product added to cart",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to add product to cart",
        variant: "destructive",
      });
      console.error("Add to cart error:", error);
    } finally {
      setIsAddingToCart(false);
    }
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  async function handleAddReview() {
    if (!user) {
      toast({
        title: "Please login to add a review",
        variant: "destructive",
      });
      return;
    }
    
    if (rating === 0) {
      toast({
        title: "Please select a rating",
        variant: "destructive",
      });
      return;
    }
    
    setIsAddingReview(true);
    try {
      const result = await dispatch(
        addReview({
          productId: productDetails?._id,
          userId: user?.id,
          userName: user?.userName,
          reviewMessage: reviewMsg,
          reviewValue: rating,
        })
      ).unwrap();
      
      if (result.success) {
        setRating(0);
        setReviewMsg("");
        await dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review added successfully!",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to add review",
        variant: "destructive",
      });
      console.error("Review error:", error);
    } finally {
      setIsAddingReview(false);
    }
  }

  useEffect(() => {
    if (productDetails !== null && open) {
      dispatch(getReviews(productDetails?._id));
    }
  }, [productDetails, open, dispatch]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="max-w-5xl grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-12">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            className="w-full h-auto object-cover aspect-square"
          />
        </div>
        
        <div className="flex flex-col h-full">
          <DialogHeader className="px-0">
            <DialogTitle className="text-3xl font-bold">{productDetails?.title}</DialogTitle>
          </DialogHeader>
          
          <p className="text-gray-500 text-lg mt-2 mb-5">
            {productDetails?.description}
          </p>
          
          <div className="flex justify-between items-center mb-2">
            <p
              className={`text-2xl font-bold text-blue-500 ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 && (
              <p className="text-xl font-bold text-gray-600">
                ${productDetails?.salePrice}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-2 mb-6">
            <StarRatingComponent rating={averageReview} />
            <span className="text-gray-500">({averageReview.toFixed(2)})</span>
          </div>
          
          <div className="mt-4 mb-6">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() =>
                  handleAddToCart(productDetails?._id, productDetails?.totalStock)
                }
                disabled={isAddingToCart}
              >
                {isAddingToCart ? "Adding..." : "Add to Cart"}
              </Button>
            )}
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex-grow overflow-auto max-h-80">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            
            <div className="space-y-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => (
                  <div key={`${reviewItem.userId}-${reviewItem.createdAt || ""}`} 
                       className="flex gap-4">
                    <Avatar className="w-10 h-10 border border-gray-200">
                      <AvatarFallback>
                        {reviewItem?.userName?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{reviewItem?.userName}</h3>
                      </div>
                      <div className="flex items-center gap-1">
                        <StarRatingComponent rating={reviewItem?.reviewValue} />
                      </div>
                      <p className="text-gray-500">{reviewItem.reviewMessage}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No reviews yet</p>
              )}
            </div>
            
            <div className="mt-8 space-y-4">
              <Label>Write a review</Label>
              <div className="flex gap-1">
                <StarRatingComponent 
                  rating={rating} 
                  handleRatingChange={handleRatingChange} 
                  editable={true}
                />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="Share your experience with this product..."
                className="mt-2"
              />
              <Button 
                onClick={handleAddReview} 
                disabled={reviewMsg.trim() === "" || rating === 0 || isAddingReview}
                className="mt-2"
              >
                {isAddingReview ? "Submitting..." : "Submit Review"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;