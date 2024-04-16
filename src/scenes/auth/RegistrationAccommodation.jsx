import React, { useState, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination } from "swiper";

import scroll_down from "../../assets/img/ic_scroll_down.svg";
import ic_home from "../../assets/img/registration/ic_home.svg";
import ic_location from "../../assets/img/registration/ic_location.svg";
import ic_tel from "../../assets/img/registration/ic_tel.svg";
import ic_direction from "../../assets/img/registration/ic_direction.svg";
import ic_extend from "../../assets/img/registration/ic_extend.svg";
import ic_internet from "../../assets/img/registration/ic_internet.svg";
import ic_check from "../../assets/img/registration/ic_check.svg";
import ic_star from "../../assets/img/registration/ic_star.svg";
import ic_star_1 from "../../assets/img/registration/ic_star_1.svg";
import ic_star_outline from "../../assets/img/registration/ic_star_outline.svg";
import ic_star_outline_1 from "../../assets/img/registration/ic_star_outline_1.svg";

import arrow_left_sw from "../../assets/img/ic_arrow_left_swiper.svg";
import arrow_right_sw from "../../assets/img/ic_arrow_right_swiper.svg";

const RatingStar = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 10; i++) {
    const star =
      rating >= i && rating !== null
        ? i % 2 === 0
          ? ic_star
          : ic_star_1
        : i % 2 === 0
        ? ic_star_outline
        : ic_star_outline_1;

    stars.push(
      <img
        key={i}
        src={star}
        alt={`star-${i}`}
        style={i % 2 !== 0 ? { marginRight: "8px", left: "-1px" } : {}}
      />
    );
  }

  return <div className="rating">{stars}</div>;
};

const RegistrationAccommodation = () => {
  const hotelList = [
    {
      id: 1,
      name: "Furama Resort Danang",
      link: "https://book-directonline.com/properties/furamaresortdanangdirect?locale=en&checkInDate=2023-10-17&checkOutDate=2023-10-20&promo=&items[0][adults]=2&items[0][children]=0&items[0][infants]=0&currency=VND&trackPage=yes",
      star: 10,
      homepage: "https://furamavietnam.com/the-resort/",
      address:
        "103 - 105 Vo Nguyen Giap Street, Khue My Ward, Ngu Hanh Son District, Danang City, Vietnam",
      decs: " is a gateway to three World Heritage Sites of Hoi An (20 minutes), My Son (90 minutes) and Hue (2 hours). The 196 rooms and suites plus 70 two to four bedroom pool villas feature tasteful décor, designed with traditional Vietnamese style and a touch of French colonial architecture and guarantee the Vietnam’s the most prestigious resort -counting royalty, presidents, movie stars and international business leaders among its celebrity guests.",
      tel: "+84 236 3847 333/+84 236 3847 888",
      direction: "https://goo.gl/maps/eeavavSSc9U6t7QN7",
      extend: "Swimming pool, Fitness, Sauna, Casio",
      internet: "Free internet Access Available",
      check: "02:00 PM - 12:00 AM",
    },
    {
      id: 2,
      name: "Olalani Resort & Condotel",
      link: "https://www.book-secure.com/index.php?s=results&property=vndan26750&arrival=2023-08-09&departure=2023-08-10&adults1=1&children1=0&locale=en_GB&currency=VND&stid=jhq8oljbd",
      star: 7,
      homepage: "https://www.olalani.net/",
      address: "111 Vo Nguyen Giap, Street, Ngu Hanh Son, Da Nang, Vietnam",
      decs: "is new five star resort with concept of Experience Hawaiian Lifestyle Resort in Da Nang City, Central Coast of Vietnam. The property met standard of five star resort both of guests facilities and guests services. The resort contains of 285 rooms (197 Hotel Rooms & 88 Condo Rooms), Spa, 5 F&B Outlets, Wedding Hall for 400 persons and Convention Hall for 800 persons.",
      tel: "+84 236 3981 999",
      direction: "https://goo.gl/maps/fd1NsPjSXfH3LfQQ9",
      extend: "Swimming pool, Fitness, Sauna, Casio",
      internet: "Free internet Access Available",
      check: "02:00 PM - 12:00 AM",
    },
    {
      id: 3,
      name: "Sea Phoenix Hotel",
      link: "https://www.agoda.com/sea-phoenix-da-nang-hotel/hotel/da-nang-vn.html?cid=1844104",
      star: 5,
      homepage: "http://en.seaphoenixhotels.com/",
      address:
        "115 Ho Xuan Huong Str., Bac My An, Ngu Hanh Son, Da Nang, Viet Nam",
      decs: "is an international standard three star hotel. Beside the beautiful Mykhe beach which was voted one of the six most exquisite beaches by Forbes Magazine. At a great location and tasteful European semi-classic design, our hotel could give you a warm and romantic feeling. Sea Phoenix Hotel prides itself on providing services at a professional level.",
      tel: "+84 (0)236 3525 999",
      direction: "https://goo.gl/maps/3RhfpEAKkjhbLLkX9",
      extend: "Swimming pool, Fitness, Sauna, Casio",
      internet: "Free internet Access Available",
      check: "02:00 PM - 12:00 AM",
    },
    {
      id: 4,
      name: "Furama Resort Danang",
      link: "https://book-directonline.com/properties/furamaresortdanangdirect?locale=en&checkInDate=2023-10-17&checkOutDate=2023-10-20&promo=&items[0][adults]=2&items[0][children]=0&items[0][infants]=0&currency=VND&trackPage=yes",
      star: 10,
      homepage: "https://furamavietnam.com/the-resort/",
      address:
        "103 - 105 Vo Nguyen Giap Street, Khue My Ward, Ngu Hanh Son District, Danang City, Vietnam",
      decs: " is a gateway to three World Heritage Sites of Hoi An (20 minutes), My Son (90 minutes) and Hue (2 hours). The 196 rooms and suites plus 70 two to four bedroom pool villas feature tasteful décor, designed with traditional Vietnamese style and a touch of French colonial architecture and guarantee the Vietnam’s the most prestigious resort -counting royalty, presidents, movie stars and international business leaders among its celebrity guests.",
      tel: "+84 236 3847 333/+84 236 3847 888",
      direction: "https://goo.gl/maps/eeavavSSc9U6t7QN7",
      extend: "Swimming pool, Fitness, Sauna, Casio",
      internet: "Free internet Access Available",
      check: "02:00 PM - 12:00 AM",
    },
    {
      id: 5,
      name: "Olalani Resort & Condotel",
      link: "https://www.book-secure.com/index.php?s=results&property=vndan26750&arrival=2023-08-09&departure=2023-08-10&adults1=1&children1=0&locale=en_GB&currency=VND&stid=jhq8oljbd",
      star: 7,
      homepage: "https://www.olalani.net/",
      address: "111 Vo Nguyen Giap, Street, Ngu Hanh Son, Da Nang, Vietnam",
      decs: "is new five star resort with concept of Experience Hawaiian Lifestyle Resort in Da Nang City, Central Coast of Vietnam. The property met standard of five star resort both of guests facilities and guests services. The resort contains of 285 rooms (197 Hotel Rooms & 88 Condo Rooms), Spa, 5 F&B Outlets, Wedding Hall for 400 persons and Convention Hall for 800 persons.",
      tel: "+84 236 3981 999",
      direction: "https://goo.gl/maps/fd1NsPjSXfH3LfQQ9",
      extend: "Swimming pool, Fitness, Sauna, Casio",
      internet: "Free internet Access Available",
      check: "02:00 PM - 12:00 AM",
    },
    {
      id: 6,
      name: "Sea Phoenix Hotel",
      link: "https://www.agoda.com/sea-phoenix-da-nang-hotel/hotel/da-nang-vn.html?cid=1844104",
      star: 5,
      homepage: "http://en.seaphoenixhotels.com/",
      address:
        "115 Ho Xuan Huong Str., Bac My An, Ngu Hanh Son, Da Nang, Viet Nam",
      decs: "is an international standard three star hotel. Beside the beautiful Mykhe beach which was voted one of the six most exquisite beaches by Forbes Magazine. At a great location and tasteful European semi-classic design, our hotel could give you a warm and romantic feeling. Sea Phoenix Hotel prides itself on providing services at a professional level.",
      tel: "+84 (0)236 3525 999",
      direction: "https://goo.gl/maps/3RhfpEAKkjhbLLkX9",
      extend: "Swimming pool, Fitness, Sauna, Casio",
      internet: "Free internet Access Available",
      check: "02:00 PM - 12:00 AM",
    },
  ];

  const swiperRef = useRef(null);

  const handlePrevClick = () => {
    swiperRef.current.slidePrev();
  };

  const handleNextClick = () => {
    swiperRef.current.slideNext();
  };

  const [hotel, setHotel] = useState(hotelList[0]);

  const handleSlideChange = (swiper) => {
    const activeSlide = swiper.slides[swiper.activeIndex];
    const activeHotelId = activeSlide.dataset.hotelId;
    const activeHotel = hotelList.find(
      (item) => item.id.toString() === activeHotelId
    );

    setHotel(activeHotel);
  };

  return (
    <div className="accommodation">
      <div className="accommodation__container">
        <div className="background">
          <div className="background__hook">
            <h1 className="animate__animated animate__fadeInUp">
              accomodation
            </h1>
          </div>

          <div className="scroll">
            <div className="scroll__down animate__animated animate__bounce animate__infinite animate__repeat-3">
              <span>SCROLL DOWN</span>
              <img src={scroll_down} alt="scroll" />
            </div>
          </div>
        </div>

        <div className="accommodation__wrap">
          <div
            className="accommodation__show"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            {hotel.name === "Furama Resort Danang" ? (
              <h3 className="heading">Furama Resort Danang (Meeting hotel)</h3>
            ) : (
              <h3 className="heading">Accomodation</h3>
            )}

            {/* <div className="accommodation__content">
              {hotel.name === "Furama Resort Danang" && (
                <a href={hotel.link} target="_blank" className="btn">
                  BOOK NOW
                </a>
              )}
            </div> */}
          </div>

          <div
            className="accommodation__slides"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <Swiper
              spaceBetween={32}
              slidesPerView={1.5}
              breakpoints={{
                300: {
                  spaceBetween: 16,
                  slidesPerView: 1,
                },
                768: {
                  spaceBetween: 32,
                  slidesPerView: 1.2,
                },
                991: {
                  spaceBetween: 32,
                  slidesPerView: 1.7,
                },
                1025: {
                  spaceBetween: 32,
                  slidesPerView: 1.8,
                },
                1280: {
                  spaceBetween: 32,
                  slidesPerView: 2.2,
                },
                1400: {
                  spaceBetween: 32,
                  slidesPerView: 2,
                },
                1680: {
                  spaceBetween: 32,
                  slidesPerView: 2,
                },
              }}
              grabCursor
              loop
              pagination={true}
              modules={[]}
              onSlideChange={handleSlideChange}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              navigation={{
                prevEl: ".swiper-button-prev-cs",
                nextEl: ".swiper-button-next-cs",
              }}
            >
              {hotelList.map((item) => (
                <SwiperSlide key={item.id} data-hotel-id={item.id}>
                  <div className="accommodation__card">
                    <div className="accommodation__head">
                      <h4>{item.name}</h4>
                      <RatingStar rating={item.star} />
                    </div>

                    <div className="accommodation__body">
                      <div className="box">
                        <img src={ic_home} alt="home" />

                        <div className="box__content">
                          <h5>Homepage</h5>
                          <a href={item.homepage}>{item.homepage}</a>
                        </div>
                      </div>
                      <div className="box">
                        <img src={ic_extend} alt="extend" />

                        <div className="box__content">
                          <h5>Extend</h5>
                          <span>{item.extend}</span>
                        </div>
                      </div>

                      <div className="box">
                        <img src={ic_location} alt="location" />

                        <div className="box__content">
                          <h5>Address</h5>
                          <span>{item.address}</span>
                        </div>
                      </div>
                      <div className="box">
                        <img src={ic_internet} alt="internet" />

                        <div className="box__content">
                          <h5>Internet</h5>
                          <span>{item.internet}</span>
                        </div>
                      </div>
                      <div className="box">
                        <img src={ic_tel} alt="tel" />

                        <div className="box__content">
                          <h5>Tel</h5>
                          <span>{item.tel}</span>
                        </div>
                      </div>
                      <div className="box">
                        <img src={ic_check} alt="check" />

                        <div className="box__content">
                          <h5>Check-in/Check-out</h5>
                          <span>{item.check}</span>
                        </div>
                      </div>
                      <div className="box">
                        <img src={ic_direction} alt="direction" />

                        <div className="box__content">
                          <h5>Direction</h5>
                          <a href={item.direction}>{item.direction}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-button-wrap">
              <button
                className="swiper-button-prev-cs"
                onClick={handlePrevClick}
              >
                <img src={arrow_right_sw} alt="arrow" />
              </button>
              <button
                className="swiper-button-next-cs"
                onClick={handleNextClick}
              >
                <img src={arrow_left_sw} alt="arrow" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationAccommodation;
