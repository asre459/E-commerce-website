import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { useToast } from "@/components/ui/use-toast";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  function handleInitiatePaypalPayment() {
    if (!cartItems || cartItems.items.length === 0) {
      toast({ title: "Your cart is empty. Please add items to proceed", variant: "destructive" });
      return;
    }
    if (!currentSelectedAddress) {
      toast({ title: "Please select one address to proceed.", variant: "destructive" });
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        image: item?.image,
        price: item?.salePrice > 0 ? item?.salePrice : item?.price,
        quantity: item?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      setIsPaymentStart(data?.payload?.success || false);
    });
  }

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  // Inline Styles
  const containerStyle = { display: "flex", flexDirection: "column" };
  const bannerStyle = { position: "relative", height: "300px", width: "100%", overflow: "hidden" };
  const bannerImgStyle = { width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" };
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "20px",
    marginTop: "20px",
    padding: "20px",
  };
  const gridResponsiveStyle = { gridTemplateColumns: "repeat(2, 1fr)" };
  const rightColumnStyle = { display: "flex", flexDirection: "column", gap: "16px" };
  const totalStyle = { display: "flex", justifyContent: "space-between", fontWeight: "bold", marginTop: "16px" };
  const buttonStyle = { width: "100%", padding: "12px", fontWeight: "600", cursor: "pointer" };

  return (
    <div style={containerStyle}>
      <div style={bannerStyle}>
        <img src={img} alt="Checkout Banner" style={bannerImgStyle} />
      </div>
      <div style={{ ...gridStyle, ...(window.innerWidth > 640 ? gridResponsiveStyle : {}) }}>
        <Address selectedId={currentSelectedAddress} setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div style={rightColumnStyle}>
          {cartItems && cartItems.items && cartItems.items.length > 0 &&
            cartItems.items.map((item) => <UserCartItemsContent cartItem={item} />)}
          <div style={totalStyle}>
            <span>Total</span>
            <span>${totalCartAmount}</span>
          </div>
          <button style={buttonStyle} onClick={handleInitiatePaypalPayment}>
            {isPaymentStart ? "Processing Paypal Payment..." : "Checkout with Paypal"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
