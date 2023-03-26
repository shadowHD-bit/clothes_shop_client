import MainSlider from "./SliderMain/Slider";
import PopularSlider from "./SliderPopularProduct/SliderPopularSection";
import LightBox from "./lightbox/Lightbox";
import NewProduct from "./newProduct/newProduct";
import News from "./newsSlider/news";
import Brands from "./brands/Brands";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

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
      {/*
            <PopularSlider />
            <NewProduct />
            <News />
            */}
      <Brands />
    </div>
  );
});

export default mainPage;
