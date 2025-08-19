import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = { [section]: [getCurrentItem.id] };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({ title: "Product is added to cart" });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);
    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  const containerStyle = { display: "flex", flexDirection: "column", minHeight: "100vh" };
  const bannerContainerStyle = { position: "relative", width: "100%", height: "600px", overflow: "hidden" };
  const bannerImageStyle = (isActive) => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: isActive ? 1 : 0,
    transition: "opacity 1s",
  });
  const slideButtonStyle = (position) => ({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(255,255,255,0.8)",
    ...(position === "left" ? { left: "1rem" } : { right: "1rem" }),
  });
  const sectionStyle = { padding: "3rem 0", backgroundColor: "#f9fafb" };
  const containerInnerStyle = { width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" };
  const titleStyle = { fontSize: "2rem", fontWeight: "bold", textAlign: "center", marginBottom: "2rem" };
  const gridCategoriesStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: "1rem" };
  const cardContentStyle = { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "1.5rem" };
  const productGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "1.5rem" };

  return (
    <div style={containerStyle}>
      <div style={bannerContainerStyle}>
        {featureImageList && featureImageList.map((slide, index) => (
          <img key={index} src={slide?.image} style={bannerImageStyle(index === currentSlide)} />
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + featureImageList.length) % featureImageList.length
            )
          }
          style={slideButtonStyle("left")}
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length)
          }
          style={slideButtonStyle("right")}
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      <section style={sectionStyle}>
        <div style={containerInnerStyle}>
          <h2 style={titleStyle}>Shop by category</h2>
          <div style={gridCategoriesStyle}>
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                key={categoryItem.id}
                onClick={() => handleNavigateToListingPage(categoryItem, "category")}
                style={{ cursor: "pointer", transition: "box-shadow 0.3s" }}
              >
                <CardContent style={cardContentStyle}>
                  <categoryItem.icon style={{ width: "3rem", height: "3rem", marginBottom: "1rem", color: "#3b82f6" }} />
                  <span style={{ fontWeight: "bold" }}>{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <div style={containerInnerStyle}>
          <h2 style={titleStyle}>Shop by Brand</h2>
          <div style={{ ...gridCategoriesStyle, gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))" }}>
            {brandsWithIcon.map((brandItem) => (
              <Card
                key={brandItem.id}
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                style={{ cursor: "pointer", transition: "box-shadow 0.3s" }}
              >
                <CardContent style={cardContentStyle}>
                  <brandItem.icon style={{ width: "3rem", height: "3rem", marginBottom: "1rem", color: "#3b82f6" }} />
                  <span style={{ fontWeight: "bold" }}>{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "3rem 0" }}>
        <div style={containerInnerStyle}>
          <h2 style={titleStyle}>Feature Products</h2>
          <div style={productGridStyle}>
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    key={productItem.id}
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
