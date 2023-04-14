import MainSlider from "./SliderMain/Slider";
import LightBox from "./lightbox/Lightbox";
import Brands from "./brands/Brands";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import NavigationBlock from "../../templates/NavigationBlock/NavigationBlock";
import PopularProduct from "./PopularProduct/PopularProduct";

import "bootstrap/dist/css/bootstrap.min.css";
import LastProduct from "./LastProduct/LastProduct";

const mainPage = observer(() => {
  useEffect(() => {
    if (localStorage.getItem("user_details") !== null) {
      localStorage.removeItem("user_details");
    }
  }, []);

  return (
    <div className="mainPage">
      <MainSlider />
      <LightBox />
      <PopularProduct />
      <LastProduct />
      <Brands />
      <NavigationBlock />
    </div>
  );
});

export default mainPage;
