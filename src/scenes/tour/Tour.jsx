import React, { useState, useEffect } from "react";
import scroll_down from "../../assets/img/ic_scroll_down.svg";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/effect-coverflow";

import { EffectCoverflow, Pagination, Navigation } from "swiper";

import slider_1 from "../../assets/img/tour/slider_1.png";
import slider_2 from "../../assets/img/tour/slider_2.png";
import slider_3 from "../../assets/img/tour/slider_3.png";

import tour_1 from "../../assets/img/tour/tour_1.png";
import tour_2 from "../../assets/img/tour/tour_2.png";
import tour_3 from "../../assets/img/tour/tour_3.png";
import tour_4 from "../../assets/img/tour/tour_4.png";

const Tour = () => {
 
  return (
    <div className="tour">
      <div className="tour__container">
        <div className="background">
          <div className="background__hook">
            <h1 className="animate__animated animate__fadeInUp">
              OPTIONAL TOUR
            </h1>
          </div>

          <div className="scroll">
            <div className="scroll__down animate__animated animate__bounce animate__infinite animate__repeat-3">
              <span>SCROLL DOWN</span>
              <img src={scroll_down} alt="scroll" />
            </div>
          </div>
        </div>

        <div className="tour__inner">
          <div className="container">
            <div className="tour__top">
              <div className="tour__slider">
                <Swiper
                  effect={"coverflow"}
                  grabCursor={true}
                  centeredSlides={true}
                  slidesPerView={"auto"}
                  coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    slideShadows: false,
                    depth: 100,
                    modifier: 2.5,
                  }}
                  modules={[EffectCoverflow]}
                  className="mySwiper"
                  loop
                >
                  <SwiperSlide>
                    <img src={slider_1} alt="slide_image" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={slider_2} alt="slide_image" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={slider_3} alt="slide_image" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={slider_1} alt="slide_image" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={slider_2} alt="slide_image" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={slider_3} alt="slide_image" />
                  </SwiperSlide>
                </Swiper>
              </div>

              <div className="tour__info">
                <div className="tour__info-heading">
                  <h3>HỘI AN TOUR INFORMATION</h3>
                  <span>DAY 4 – 20th October 2023</span>
                </div>

                <div className="tour__desc">
                  <p>
                    <span>Hoi An</span> is an old town down the Thu Bon River,
                    on the coastal plain of Quang Nam Province. Hoi An used to
                    be known on the international market with many different
                    names such as Lam Ap, Faifo and Hoi An
                  </p>
                  <p>
                    This reputation of Hoi An comes from many factors. However,
                    the three most special things may be architecture, food and
                    tailor. Hoi An used to be an international commercial port,
                    the meeting place of the merchant ships of Japan, China and
                    the West during the 17th and 18th centuries, which affected
                    a lot on its architecture. Hoi An’s architecture is a
                    harmonious blend of Vietnamese, Chinese and Japanese design.
                    It is a density of many pagodas, temples and ancient houses
                    that bear its very unique mark, which makes it very special
                    and unlike any other places in Vietnam. Some sites in Hoi An
                    town which reflects the history of the period and shouldn’t
                    be missed are{" "}
                    <span>
                      Japanese Covered Bridge, Phuc Kien Assembly Hall, Tan Ky
                      old house, Sa Huynh Culture Museum…
                    </span>{" "}
                    Hoi An, Viet Nam is considered a living museum of
                    architecture and urban lifestyle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="tour__options">
          <div className="container">
            <div className="tour__options-inner">
              <Swiper
                grabCursor={true}
                spaceBetween={40}
                slidesPerView={4}
                loop
                modules={[Navigation]}
                navigation
                className="tour__options-swiper"
              breakpoints={{
                375: {
                  spaceBetween: 30,
                  slidesPerView: 1,
                },
                424: {
                  spaceBetween: 30,
                  slidesPerView: 1,
                },
                500: {
                  spaceBetween: 30,
                  slidesPerView: 1.5,
                },
                576: {
                  spaceBetween: 30,
                  slidesPerView: 1.7,
                },
                768: {
                  spaceBetween: 30,
                  slidesPerView: 2,
                },
                991: {
                  spaceBetween: 30,
                  slidesPerView: 2.5,
                },
                1024: {
                  spaceBetween: 30,
                  slidesPerView: 2.7,
                },
                1280: {
                  spaceBetween: 30,
                  slidesPerView: 3,
                },
                1536: {
                  spaceBetween: 30,
                  slidesPerView: 3.5,
                },
                1600: {
                  spaceBetween: 40,
                  slidesPerView: 4,
                }
              }}
              >
                <SwiperSlide>
                  <div className="tour__options-card">
                    <img src={tour_1} alt="" />

                    <div className="tour__options-desc">
                      <h4>Japanese Covered Bridge</h4>
                      <p>
                        The Japanese Covered Bridge is one of the famous tourist
                        attractions in Hoi An, Vietnam. The original Vietnamese
                        name of this bridge is “Lai Vien Kieu”. The word can be
                        interpreted as “Pagoda in Japan”. It is considered that
                        the Japanese Covered Bridge, Hoi An is a possession of
                        the Japanese community of Hoi An
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="tour__options-card">
                    <img src={tour_2} alt="" />

                    <div className="tour__options-desc">
                      <h4>Old House of Tan Ky</h4>
                      <p>
                        The name Old House of Tan Ky itself suggests that the
                        building is one of the remotest historical buildings in
                        Hoi An. The age of the old house is approximately a
                        couple of centuries. The old house reflects the
                        combination of both Japanese and Chinese architectural
                        geniuses. So while visiting the small town Hoi An, you
                        must also visit this Old House of Tan Ky to encounter
                        great historical and cultural significance of Vietnam.
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="tour__options-card">
                    <img src={tour_3} alt="" />

                    <div className="tour__options-desc">
                      <h4>Fukian Assembly Hall (Phuc Kien)</h4>
                      <p>
                        Among the various popular assembly halls in Hoi An, the
                        Fukian Assembly Hall (Phuc Kien) is the exceptional one.
                        Hoi An is a small town in Vietnam that is full of
                        excitements and tourist attractions. You must visit this
                        assembly hall to encounter an excellent work of
                        architecture that is also considered as a heritage of
                        historical significance.
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="tour__options-card">
                    <img src={tour_4} alt="" />

                    <div className="tour__options-desc">
                      <h4>Sa Huynh Culture Museum</h4>
                      <p>
                        The museum supplies plenty of information on the ancient
                        people of Sa Huynh civilization, who were the first
                        owners of the Hoi An trading port, having trading
                        relationships with the people of China, India, and South
                        East Asia.
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="tour__options-card">
                    <img src={tour_1} alt="" />

                    <div className="tour__options-desc">
                      <h4>Japanese Covered Bridge</h4>
                      <p>
                        The Japanese Covered Bridge is one of the famous tourist
                        attractions in Hoi An, Vietnam. The original Vietnamese
                        name of this bridge is “Lai Vien Kieu”. The word can be
                        interpreted as “Pagoda in Japan”. It is considered that
                        the Japanese Covered Bridge, Hoi An is a possession of
                        the Japanese community of Hoi An
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="tour__options-card">
                    <img src={tour_2} alt="" />

                    <div className="tour__options-desc">
                      <h4>Old House of Tan Ky</h4>
                      <p>
                        The name Old House of Tan Ky itself suggests that the
                        building is one of the remotest historical buildings in
                        Hoi An. The age of the old house is approximately a
                        couple of centuries. The old house reflects the
                        combination of both Japanese and Chinese architectural
                        geniuses. So while visiting the small town Hoi An, you
                        must also visit this Old House of Tan Ky to encounter
                        great historical and cultural significance of Vietnam.
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="tour__options-card">
                    <img src={tour_3} alt="" />

                    <div className="tour__options-desc">
                      <h4>Fukian Assembly Hall (Phuc Kien)</h4>
                      <p>
                        Among the various popular assembly halls in Hoi An, the
                        Fukian Assembly Hall (Phuc Kien) is the exceptional one.
                        Hoi An is a small town in Vietnam that is full of
                        excitements and tourist attractions. You must visit this
                        assembly hall to encounter an excellent work of
                        architecture that is also considered as a heritage of
                        historical significance.
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="tour__options-card">
                    <img src={tour_4} alt="" />

                    <div className="tour__options-desc">
                      <h4>Sa Huynh Culture Museum</h4>
                      <p>
                        The museum supplies plenty of information on the ancient
                        people of Sa Huynh civilization, who were the first
                        owners of the Hoi An trading port, having trading
                        relationships with the people of China, India, and South
                        East Asia.
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tour;
