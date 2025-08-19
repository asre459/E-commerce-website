import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accImg from "../../assets/images/account.jpg";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";

function ShoppingAccount() {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const bannerStyle = {
    position: "relative",
    height: "300px",
    width: "100%",
    overflow: "hidden",
  };

  const bannerImgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
  };

  const contentWrapperStyle = {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "32px",
    padding: "32px 0",
    width: "90%",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const tabsContainerStyle = {
    display: "flex",
    flexDirection: "column",
    borderRadius: "8px",
    border: "1px solid #E5E7EB",
    backgroundColor: "#FFFFFF",
    padding: "24px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  };

  return (
    <div style={containerStyle}>
      <div style={bannerStyle}>
        <img src={accImg} alt="Account Banner" style={bannerImgStyle} />
      </div>
      <div style={contentWrapperStyle}>
        <div style={tabsContainerStyle}>
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <ShoppingOrders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
