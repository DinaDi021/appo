import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { FC, PropsWithChildren } from "react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { IImage } from "../../interfaces";

interface IProps extends PropsWithChildren {
  slides: IImage[];
}

const Slider: FC<IProps> = ({ slides }) => {
  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      loop={true}
      slidesPerView={1}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
      }}
      pagination={{ el: ".swiper-pagination", clickable: true }}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        clickable: true,
      }}
      modules={[EffectCoverflow, Pagination, Navigation]}
      className="swiper_container"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.image_url}>
          <img src={slide.image_url} alt={slide.image_url} />
        </SwiperSlide>
      ))}

      <div className="slider-controler">
        <div className="swiper-button-prev slider-arrow">
          <svg name="arrow-back-outline">
            <ArrowBackIcon />
          </svg>
        </div>
        <div className="swiper-button-next slider-arrow">
          <svg name="arrow-forward-outline">
            <ArrowForwardIcon />
          </svg>
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </Swiper>
  );
};

export { Slider };
