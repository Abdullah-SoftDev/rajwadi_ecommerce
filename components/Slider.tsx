'use client'
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Slider = () => {
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper h-60 sm:h-96"
            >
                <SwiperSlide>
                    <img
                        className="object-cover w-full h-full"
                        src="https://img.freepik.com/free-vector/nice-happy-diwali-sale-banner-with-discount-details_1017-39614.jpg?w=826&t=st=1666347756~exp=1666348356~hmac=86e7cb17ddce424af357e0fcff3ee15870fd2624acff4adf24aaeab033c5476c"
                        alt="image slide 1"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className="object-cover w-full h-full bg-red-400"
                        src="https://img.freepik.com/free-vector/realistic-akshaya-tritiya-horizontal-banner-template_23-2149379141.jpg?w=996&t=st=1666347809~exp=1666348409~hmac=bfd2e51141c6fd9900de74233bf7dff7a6d67e2a8853367591e5d8556a1796ca"
                        alt="image slide 2"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className="object-cover w-full h-full bg-red-400"
                        src="https://img.freepik.com/premium-vector/fashion-sale-social-media-facebook-cover-banner-template_123633-573.jpg"
                        alt="image slide 3"
                    />
                </SwiperSlide>
            </Swiper>
        </>
    );
}
export default Slider