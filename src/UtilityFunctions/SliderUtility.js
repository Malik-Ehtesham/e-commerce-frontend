import { SwiperSlide } from "swiper/react";

export const SliderUtility = (image) => {
  return (
    <SwiperSlide>
      <img
        src={image}
        className=" rounded-1 "
        style={{ width: "100%", height: "100%" }}
        alt="..."
      />
    </SwiperSlide>
  );
};
