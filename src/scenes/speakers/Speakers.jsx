import React, { useRef } from "react";

import scroll_down from "../../assets/img/ic_scroll_down.svg";

import { Swiper, SwiperSlide } from "swiper/react";

import Card from "react-bootstrap/Card";

import speaker_1 from "../../assets/img/speakers/speaker_1.png";
import speaker_2 from "../../assets/img/speakers/speaker_2.png";
import speaker_4 from "../../assets/img/speakers/speaker_3.png";
import speaker_5 from "../../assets/img/speakers/speaker_3.png";
import speaker_6 from "../../assets/img/speakers/speaker_6.png";
import speaker_8 from "../../assets/img/speakers/speaker_8.png";
import speaker_7 from "../../assets/img/speakers/speaker_7.png";
import speaker_9 from "../../assets/img/speakers/speaker_9.png";
import speaker_10 from "../../assets/img/speakers/speaker_10.png";
import speaker_11 from "../../assets/img/speakers/speaker_11.png";
import speaker_12 from "../../assets/img/speakers/speaker_12.png";
import speaker_13 from "../../assets/img/speakers/speaker_13.png";
import speaker_14 from "../../assets/img/speakers/speaker_14.png";
import speaker_15 from "../../assets/img/speakers/speaker_15.png";
import speaker_16 from "../../assets/img/speakers/speaker_16.png";

import arrow_left_sw from "../../assets/img/speakers/ic_arrow_left.svg";
import arrow_right_sw from "../../assets/img/speakers/ic_arrow_right.svg";

const Speakers = () => {
  const swiperRef = useRef(null);
  const swiperRef1 = useRef(null);
  const swiperRef2 = useRef(null);

  const handlePrevClick = (index) => {
    galery[index].ref.current.slidePrev();
  };

  const handleNextClick = (index) => {
    galery[index].ref.current.slideNext();
  };

  const galery = [
    {
      id: 1,
      title: "KEYNOTE SPEECHES",
      ref: swiperRef,
      people: [
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
        // {
        //   id: 4,
        //   name: "Mr. Nalin Fonseka",
        //   desc: "Division Head of Payment Systems Operation Division, Hong Kong Monetary Authority and Chief Executive Officer, Hong Kong FMI",
        //   avatar: speaker_4,
        // },
        // {
        //   id: 5,
        //   name: "Mr. Gary Huang",
        //   desc: "  Manager, Equity Services Department of Taiwan Depository & Clearing Corporation",
        //   avatar: speaker_5,
        // },
        // {
        //   id: 6,
        //   name: "Mr. Kwang Yeon Cho",
        //   desc: "Director, Global Securities Services Department,Korea Securities Depository",
        //   avatar: speaker_1,
        // },
      ],
    },
    {
      id: 2,
      title: "PANEL DISCUSSION 1",
      ref: swiperRef1,
      people: [
        {
          id: 1,
          name: "Duong Ngoc Tuan",
          desc: [
            "Senior Managing Director",
            "Viet Nam Securities Depository & Clearing Corporation",
            "Moderator",
          ],
          avatar: speaker_1,
        },
        {
          id: 2,
          name: "Pichaya Chomchaiya",
          desc: [
            "Senior Vice President-Head of Registrar Dept.",
            "Thailand Securities Depository Co., Ltd.",
            "Panelist",
          ],
          avatar: speaker_5,
        },
        {
          id: 3,
          name: "Wallace Chu",
          desc: [
            "ESG Product Manager",
            "Taiwan Depository & Clearing Corporation (TDCC)",
            "Panelist",
          ],
          avatar: speaker_4,
        },
        {
          id: 4,
          name: "Colin Parry",
          desc: [
            "Chief Executive Officer",
            "International Securities Services Association",
            "Panelist",
          ],
          avatar: speaker_8,
        },
        {
          id: 5,
          name: "Nguyen Thuy Van",
          desc: ["Head of Asia Business Strategy", "Clearstream Banking S.A, HongKong", "Panelist"],
          avatar: speaker_12,
        },
        {
          id: 6,
          name: "Satoru Yamadera",
          desc: [
            "Advisor",
            "Economic Research and Regional Cooperation Department Asia Development Bank",
            "Panelist",
          ],
          avatar: speaker_9,
        },
      ],
    },
    {
      id: 3,
      title: "PANEL DISCUSSION 2",
      ref: swiperRef2,
      people: [
        {
          id: 1,
          name: "Richard Shum",
          desc: [
            "Senior Vice President – Clearing and Depository, Operations Division",
            "Hong Kong Exchanges and Clearing Limited",
            "Moderator",
          ],
          avatar: speaker_13,
        },
        {
          id: 2,
          name: "Imelda Sebayang",
          desc: [
            "Director of Finance and Administration",
            "Indonesia Central Securities Depository",
            "Panelist",
          ],
          avatar: speaker_14,
        },
        {
          id: 3,
          name: "Amit Jindal",
          desc: ["Senior Vice President","National Securities Depository Limited (India)", "Panelist"],
          avatar: speaker_15,
        },
        {
          id: 4,
          name: "Alexandr Kamchatnyy",
          desc: ["Managing Director", "Central Securities Depsitory JSC (Kazakhstan)", "Panelist"],
          avatar: speaker_7,
        },
        {
          id: 5,
          name: "Yanru Ge",
          desc: [
            "Manager",
            "China Securities Depository and Clearing Corporation Limited",
            "Panelist",
          ],
          avatar: speaker_2,
        },
        {
          id: 6,
          name: "Hossein Mohammadi",
          desc: [
            "Senior Advisor to CEO, Central Securities Depository of Iran",
            "Vice Chairman to Technology and International Affairs, Securities and Exchange Organization of Iran",
            "Panelist",
          ],
          avatar: speaker_16,
        },
      ],
    },
  ];

  return (
    <div className="speakers">
      <div className="background">
        <div className="background__hook">
          <h1 className="animate__animated animate__fadeInUp">Speakers</h1>
        </div>

        <div className="scroll">
          <div className="scroll__down animate__animated animate__bounce animate__infinite animate__repeat-3">
            <span>SCROLL DOWN</span>
            <img src={scroll_down} alt="scroll" />
          </div>
        </div>
      </div>

      <div className="speakers__galery">
        {galery.map((item) => (
          <div className="speakers__galery-rows" key={item.id}>
            <div className="speakers__galery-heading">
              <h3>{item.title}</h3>
              <div className="swiper-button-wrap">
                <button
                  className="swiper-button-prev-cs"
                  onClick={() => handlePrevClick(item.id - 1)}
                >
                  <img src={arrow_left_sw} alt="arrow" />
                </button>
                <button
                  className="swiper-button-next-cs"
                  onClick={() => handleNextClick(item.id - 1)}
                >
                  <img src={arrow_right_sw} alt="arrow" />
                </button>
              </div>
            </div>
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={35}
              grabCursor
              onSwiper={(swiper) => (item.ref.current = swiper)}
              navigation={{
                prevEl: ".swiper-button-prev-cs",
                nextEl: ".swiper-button-next-cs",
              }}
              className="speakers__galery-slide"
              breakpoints={{
                375: {
                  spaceBetween: 30,
                  slidesPerView: 1,
                },
                424: {
                  spaceBetween: 30,
                  slidesPerView: 1.5,
                },
                576: {
                  spaceBetween: 30,
                  slidesPerView: 1.7,
                },
                600: {
                  spaceBetween: 30,
                  slidesPerView: 2,
                },
                1110: {
                  spaceBetween: 30,
                  slidesPerView: 2,
                },
                1150: {
                  spaceBetween: 30,
                  slidesPerView: 2.5,
                },
                1280: {
                  spaceBetween: 30,
                  slidesPerView: 2.8,
                },
                1400: {
                  spaceBetween: 30,
                  slidesPerView: 3,
                },
                1600: {
                  spaceBetween: 30,
                  slidesPerView: 3.5,
                },
                1700: {
                  spaceBetween: 30,
                  slidesPerView: 4,
                },
                1800: {
                  spaceBetween: 30,
                  slidesPerView: 4.2,
                },
              }}
            >
              {item.people.map((person) => (
                <SwiperSlide key={person.id}>
                  <Card>
                    <div className="card-img">
                      <Card.Img variant="top" src={person.avatar} />
                    </div>
                    <Card.Body>
                      <Card.Title>{person.name}</Card.Title>
                      <ul>
                        {person.desc.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </Card.Body>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Speakers;
