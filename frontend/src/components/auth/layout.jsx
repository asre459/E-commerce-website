import { Outlet } from "react-router-dom";

function AuthLayout() {
  const style = {
    container:{
      display: "flex",
      minHeight: "screen",
      width: "full",
      height: "100vh",
      items: "center",
      textAlign: "center",
      

      
    },
    container2:{
      hidden: "lg:flex",
      items: "center",
      justifyContent: "center",
      backgroundColor: "black",
      width: "1/2",
      overflow: "hidden",
      padding: "px-62",
      color: "white",
      textAlign: "center",

    },
    continaer3:{
      items: "center",
      justifyContent: "center",
      width: "full",
      maxWidth: "md",
      spaceY: "6",
      backgroundColor: "background",
      padding: "px-4 py-12 sm:px-6 lg:px-8",
    },
    container4:{
      maxWidth: "md",
      textAlign: "center",
      textColor: "primary-foreground",
      textSize: "3xl",
      fontWeight: "bold",
      items: "center",
      justifyContent: "center",
      tracking: "tight",
      text:"foreground",
      fontSize: "3xl",
      
    },
    container5:{
      small: "hidden lg:flex flex-1 items-center justify-center bg-black px-12",
      medium: "mx-auto w-full max-w-md space-y-6",
      backgroundColor: "background",
      padding: "px-4 py-12 sm:px-6 lg:px-8",
      
    }





  }
  return (
    <div style={style.container} >
      <div style={style.container2} >
        <div style={style.container3}>
          <h1 style={style.container4}>
            Welcome to ECommerce Shopping
          </h1>
        </div>
      </div>
      <div style={style.container5} >
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
