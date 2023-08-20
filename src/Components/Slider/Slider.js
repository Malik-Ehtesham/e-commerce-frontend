import React from "react";

// Import Swiper React components
import {
  Pagination,
  Scrollbar,
  Mousewheel,
  Autoplay,
  Grid,
} from "swiper/modules";

import { Swiper } from "swiper/react";

import MainImage from "../../utils/SliderImages/Main.png";
import SecondImage from "../../utils/SliderImages/Second.png";
import ThirdImage from "../../utils/SliderImages/Third.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/bundle";

// Utility Function
import { SliderUtility } from "../../UtilityFunctions/SliderUtility";

// ------COMPONENT-------
const Slider = (props) => {
  return props.width <= 576 ? (
    <Swiper
      modules={[Pagination, Scrollbar, Mousewheel, Autoplay, Grid]}
      pagination={{ clickable: true }}
      mousewheel
      autoplay
      slidesPerView={1}
      style={{ height: "40vh" }}
    >
      {SliderUtility(MainImage)}
      {SliderUtility(SecondImage)}
      {SliderUtility(ThirdImage)}
    </Swiper>
  ) : (
    <Swiper
      modules={[Pagination, Scrollbar, Mousewheel, Autoplay, Grid]}
      pagination={{ clickable: true }}
      mousewheel
      autoplay
      slidesPerView={1}
      style={{ height: "60vh" }}
    >
      {SliderUtility(MainImage)}
      {SliderUtility(SecondImage)}
      {SliderUtility(ThirdImage)}
    </Swiper>
  );
};
export default Slider;
