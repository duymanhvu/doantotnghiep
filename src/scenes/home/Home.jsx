import React, { useRef, useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import Card from "react-bootstrap/Card";

import meeting_1 from "../../assets/img/meeting_bg_1.png";
import meeting_2 from "../../assets/img/meeting_bg_2.png";
import meeting_3 from "../../assets/img/meeting_bg_3.png";
import sign_1 from "../../assets/img/signature_1.png";
import sign_2 from "../../assets/img/signature_2.png";

import meeting_bg from "../../assets/img/meeting_bg.png";
import scroll_down from "../../assets/img/ic_scroll_down.svg";
import arrow_right from "../../assets/img/ic_arrow_right.svg";
import arrow_left_sw from "../../assets/img/ic_arrow_left_swiper.svg";
import arrow_right_sw from "../../assets/img/ic_arrow_right_swiper.svg";

import speaker_1 from "../../assets/img/speakers/speaker_1.png";
import speaker_6 from "../../assets/img/speakers/speaker_6.png";
import speaker_7 from "../../assets/img/speakers/speaker_7.png";
import speaker_8 from "../../assets/img/speakers/speaker_8.png";
import speaker_9 from "../../assets/img/speakers/speaker_9.png";
import speaker_2 from "../../assets/img/speakers/speaker_2.png";
import speaker_4 from "../../assets/img/speakers/speaker_3.png";
import speaker_5 from "../../assets/img/speakers/speaker_3.png";
import speaker_10 from "../../assets/img/speakers/speaker_10.png";
import speaker_11 from "../../assets/img/speakers/speaker_11.png";
import speaker_12 from "../../assets/img/speakers/speaker_12.png";
import speaker_13 from "../../assets/img/speakers/speaker_13.png";
import speaker_14 from "../../assets/img/speakers/speaker_14.png";
import speaker_15 from "../../assets/img/speakers/speaker_15.png";
import speaker_16 from "../../assets/img/speakers/speaker_16.png";

import pla_band_1 from "../../assets/img/sponsors/pla_band_1.png";
import bro_band_1 from "../../assets/img/sponsors/bro_band_1.png";
import bro_band_2 from "../../assets/img/sponsors/bro_band_2.png";
import bro_band_3 from "../../assets/img/sponsors/bro_band_3.png";

import { Link } from "react-router-dom";

const Home = () => {
  const swiperRef = useRef(null);

  const handlePrevClick = () => {
    swiperRef.current.slidePrev();
  };

  const handleNextClick = () => {
    swiperRef.current.slideNext();
  };

  const people = [
    {
      id: 1,
      name: "Yedil Medeu",
      desc: ["WFC Chairman"],
      avatar: speaker_6,
    },
    {
      id: 2,
      name: "Dominic Scriven OBE",
      desc: ["Chairman", "Dragon Capital VietFund Management Joint Stock Company"],
      avatar: speaker_10,
    },
    {
      id: 3,
      name: "Rajeev Tummala",
      desc: ["Head of Digital, Asia & MENA", "HSBC Securities Services"],
      avatar: speaker_11,
    },
    {
      id: 4,
      name: "Duong Ngoc Tuan",
      desc: ["Senior Managing Director", "Viet Nam Securities Depository & Clearing Corporation", "Moderator"],
      avatar: speaker_1,
    },
    {
      id: 5,
      name: "Pichaya Chomchaiya",
      desc: ["Senior Vice President-Head of Registrar Dept.", "Thailand Securities Depository Co., Ltd.", "Panelist"],
      avatar: speaker_5,
    },
    {
      id: 6,
      name: "Wallace Chu",
      desc: ["ESG Product Manager", "Taiwan Depository & Clearing Corporation (TDCC)", "Panelist"],
      avatar: speaker_4,
    },
    {
      id: 7,
      name: "Nguyen Thuy Van",
      desc: ["Head of Asia Business Strategy", "Clearstream Banking S.A, HongKong", "Panelist"],
      avatar: speaker_12,
    },
    {
      id: 8,
      name: "Satoru Yamadera",
      desc: ["Advisor", "Economic Research and Regional Cooperation Department Asia Development Bank", "Panelist"],
      avatar: speaker_9,
    },
    {
      id: 9,
      name: "Richard Shum",
      desc: ["Senior Vice President – Clearing and Depository, Operations Division", "Hong Kong Exchanges and Clearing Limited", "Moderator"],
      avatar: speaker_13,
    },
    {
      id: 10,
      name: "Imelda Sebayang",
      desc: ["Director of Finance and Administration", "Indonesia Central Securities Depository", "Panelist"],
      avatar: speaker_14,
    },
    {
      id: 11,
      name: "Amit Jindal",
      desc: ["Senior Vice President", "National Securities Depository Limited (India)", "Panelist"],
      avatar: speaker_15,
    },

    {
      id: 12,
      name: "Alexandr Kamchatnyy",
      desc: ["Managing Director", "Central Securities Depsitory JSC (Kazakhstan)", "Panelist"],
      avatar: speaker_7,
    },
    {
      id: 13,
      name: "Yanru Ge",
      desc: ["Manager", "China Securities Depository and Clearing Corporation Limited", "Panelist"],
      avatar: speaker_2,
    },
    {
      id: 14,
      name: "Hossein Mohammadi",
      desc: ["Senior Advisor to CEO, Central Securities Depository of Iran", "Vice Chairman to Technology and International Affairs, Securities and Exchange Organization of Iran", "Panelist"],
      avatar: speaker_16,
    },
  ];

  return (
    <div className="home">
      <div className="home__container">
        <div className={`background`}>
          <div className="background__hook">
            <h1 className="animate__animated animate__fadeInUp">
              Trung tâm dạy thêm
              <br />
              SEN Center
            </h1>
            <span className="background__time animate__animated animate__fadeInUp">Giáo dục và phát triển</span>
          </div>

          <div className="scroll">
            <div className="scroll__down animate__animated animate__bounce animate__infinite animate__repeat-3">
              <span>SCROLL DOWN</span>
              <img src={scroll_down} alt="scroll" />
            </div>
          </div>
        </div>

        <div className="home__meeting">
          <div className="home__meeting-wrap">
            <div>
              <div className="home__meeting-content" data-aos="fade-right" data-aos-duration="1000">
                <div className="title">
                  GIỚI THIỆU VỀ SEN
                  <br />
                  <span>(Trung tâm dạy thêm)</span>
                </div>
                <p>
                  SEN, là một trung tâm dạy thêm tại Hà Nội với sứ mệnh đem cơ hội học các môn Toán,Văn, Tiếng Anh, đặc biệt là giúp các bạn ôn luyện thi vào lớp 6 và 10, đến gần hơn với các bạn học sinh từ cấp 1 và cấp 2. Nhưng với các bạn Senners,
                  SEN còn là một ngôi nhà chung để về và cùng nhau sinh hoạt, giúp đỡ và phát triển bản thân.
                  <br />
                  Được thành lập bởi cô giáo vô cùng tâm huyết Hoàng Thị Mai Nhung vào ngày 12 tháng 5 năm 2019, SEN hiện nay đã và đang cải thiện kỹ năng tiếng Anh cho hàng trăm các bạn học sinh từ nhiều lứa tuổi. Cùng với đội ngũ giáo viên bản xứ
                  chuyên nghiệp, nhiệt huyết và giàu kinh nghiệm, SEN đã trở thành một điểm tựa vững chắc cho các bậc phụ huynh khi gửi gắm con em mình tại đây.
                  <br />
                 
                  SEN rất mong nhận được sự ủng hộ và tương tác của mọi người trong thời gian sắp tới ạ!
                </p>

                <div className="home__meeting-sign">
                  {/* <img src={sign_1} alt="sign" />
                  <img src={sign_2} alt="sign" /> */}
                </div>

                <Link className="btn btn-home" to="/overview">
                  <span>Read more</span>
                  <img src={arrow_right} alt="arrow" />
                </Link>
              </div>
            </div>
            <div className="home__meeting-ceo" data-aos="fade-left" data-aos-duration="1000">
              <div className="home__meeting-after">
                <img src={meeting_1} alt="img" />
                <img src={meeting_3} alt="img" />
              </div>
            </div>
          </div>
          <div className="home__meeting-bg">
            <img src={meeting_bg} alt="background" />
          </div>
        </div>

        <div className="home__speakers">
          <div className="container">
            <div className="heading d-flex justify-content-between">
              Speakers
              <div className="swiper-button-wrap">
                <button className="swiper-button-prev-cs" onClick={handlePrevClick}>
                  <img src={arrow_right_sw} alt="arrow" />
                </button>
                <button className="swiper-button-next-cs" onClick={handleNextClick}>
                  <img src={arrow_left_sw} alt="arrow" />
                </button>
              </div>
            </div>
          </div>

          <div data-aos="fade-right" data-aos-offset="300" data-aos-duration="1000">
            <Swiper
              spaceBetween={40}
              breakpoints={{
                300: {
                  spaceBetween: 15,
                  slidesPerView: 1,
                },
                424: {
                  spaceBetween: 15,
                  slidesPerView: 1.2,
                },
                440: {
                  spaceBetween: 20,
                  slidesPerView: 1.3,
                },
                500: {
                  spaceBetween: 20,
                  slidesPerView: 1.6,
                },
                600: {
                  spaceBetween: 20,
                  slidesPerView: 2,
                },
                700: {
                  spaceBetween: 20,
                  slidesPerView: 2.2,
                },
                991: {
                  spaceBetween: 20,
                  slidesPerView: 3,
                },
                1024: {
                  spaceBetween: 20,
                  slidesPerView: 3.2,
                },
                1080: {
                  spaceBetween: 20,
                  slidesPerView: 3.5,
                },
                1280: {
                  spaceBetween: 20,
                  slidesPerView: 3.8,
                },
                1356: {
                  spaceBetween: 30,
                  slidesPerView: 4,
                },
                1440: {
                  spaceBetween: 30,
                  slidesPerView: 4.2,
                },
                1536: {
                  spaceBetween: 30,
                  slidesPerView: 4.5,
                },
                1624: {
                  spaceBetween: 30,
                  slidesPerView: 4.8,
                },
                1760: {
                  spaceBetween: 30,
                  slidesPerView: 5,
                },
                1850: {
                  spaceBetween: 30,
                  slidesPerView: 5.5,
                },
                1920: {
                  spaceBetween: 40,
                  slidesPerView: 5.5,
                },
                2000: {
                  spaceBetween: 40,
                  slidesPerView: 6,
                },
                2300: {
                  spaceBetween: 40,
                  slidesPerView: 6.5,
                },
              }}
              grabCursor
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              className="home__speakers-slide"
              navigation={{
                prevEl: ".swiper-button-prev-cs",
                nextEl: ".swiper-button-next-cs",
              }}
            >
              {people.map((item) => (
                <SwiperSlide key={item.id}>
                  <Card>
                    <div className="card-img">
                      <Card.Img variant="top" src={item.avatar} />
                    </div>
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>
                        <ul>
                          {item.desc.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="home__sponsors">
          <div className="container">
            <div className="heading">Hosted by VSDC</div>

            <div className="home__sponsors-list">{/* Sponsors */}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
