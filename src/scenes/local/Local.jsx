import React, { useState, useEffect, useCallback } from "react";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import scroll_down from "../../assets/img/ic_scroll_down.svg";
import local_bg_1 from "../../assets/img/local_bg_1.png";
import local_bg_2 from "../../assets/img/local_bg_2.png";
import local_bg_3 from "../../assets/img/local_bg_3.png";
import local_bg_4 from "../../assets/img/local_bg_4.png";
import local_bg_5 from "../../assets/img/local_bg_5.png";
import local_bg_6 from "../../assets/img/local_bg_6.png";
import ic_box_head from "../../assets/img/ic_box_head.svg";
import bg_local_airport from "../../assets/img/bg_local_airport.png";
import local_img_0 from "../../assets/img/local/local_img_0.png";
import local_img_1 from "../../assets/img/local/local_img_1.png";
import local_img_2 from "../../assets/img/local/local_img_2.png";
import local_img_3 from "../../assets/img/local/local_img_3.png";
import local_img_4 from "../../assets/img/local/local_img_4.png";
import local_img_5 from "../../assets/img/local/local_img_5.png";

import ImageViewer from "react-simple-image-viewer";

const Local = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const images = [
    local_img_0,
    local_img_1,
    local_img_2,
    local_img_3,
    local_img_4,
    local_img_5,
  ];

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <div className="local">
      <div className="local__container">
        <div className={`background ${width < 1280 ? "change" : ""}`}>
          <div className="background__hook">
            <h1 className="animate__animated animate__fadeInUp">
              Local information
            </h1>
          </div>

          <div className="scroll">
            <div className="scroll__down animate__animated animate__bounce animate__infinite animate__repeat-3">
              <span>SCROLL DOWN</span>
              <img src={scroll_down} alt="scroll" />
            </div>
          </div>
        </div>

        <div className="local__content">
          <div className="local__tabs">
            <Tabs fill>
              <Tab eventKey="home" title="About Viet Nam">
                <div className="container">
                  <div className="local__explore">
                    <div className="local__explore-bg">
                      <img src={local_bg_1} alt="background" />
                    </div>
                    <div className="local__explore-news">
                      <span className="year">2023</span>
                      <h4 className="title">EXPLORE VIETNAM</h4>
                      <p>
                        Vietnam is a country that honors the past and celebrates
                        the future. Sharing borders with Cambodia, Laos, and
                        China, the topography varies from coastal plains to
                        mountain ranges.
                      </p>
                    </div>
                  </div>

                  <div className="local__info">
                    <div className="local__info-text">
                      <p>
                        Vietnam is a country that honors the past and celebrates
                        the future. Sharing borders with Cambodia, Laos, and
                        China, the topography varies from coastal plains to
                        mountain ranges. The Vietnamese culture has evolved on
                        the basis of wet rice civilization, and the local
                        lifestyle is closely related to its village and native
                        lands. “Xin chao” is the warm greeting that you will
                        hear as you enter Vietnam. Besides being famous for its
                        great hospitality, Vietnam is also a peaceful country
                        and a top worth-visiting place due to its ancient
                        history, diverse culture, and quintessential natural
                        landscapes.
                      </p>
                      <br />
                      <p>
                        One of Vietnam’s strongest draws is the diversity of its
                        natural beauty and landscapes. The capital of Hanoi is
                        your gateway to the treasures of the north: spectacular
                        mountains, valleys and bays studded with limestone
                        karsts. Smack in the centre, up-and-coming Danang is one
                        of Vietnam’s most progressive cities. From here you have
                        easy access to photogenic riverside towns, national
                        parks and long, sandy beaches. The southern metropolis
                        of Ho Chi Minh City will entice you with its cool
                        culture and captivating streets (just watch out for
                        those motorcycles.) Nearby, the Mekong Delta runs to the
                        sea, passing on-the-water villages and mangrove forests
                        along the way. And all down Vietnam's S-shaped coast,
                        you’ll find islands big and small, just waiting to be
                        explored. For further information about Vietnam, kindly
                        visit{" "}
                        <a href="https://vietnam.travel" target="_blank">
                          https://vietnam.travel
                        </a>
                      </p>
                    </div>
                    <div className="local__info-bg">
                      <img src={local_bg_2} alt="background" />
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="profile" title="About Da Nang">
                <div className="container">
                  <div className="local__info dn">
                    <div className="local__info-text dn">
                      <p>
                        The city is in the site of the East Sea and Han River
                        with special different charms. Nature has offered the
                        city a great position among three World heritages
                        generously: ancient royal capital Hue, ancient city Hoi
                        An and Holy land My Son. Thanks to this, Da Nang plays
                        an important role in hosting, serving and transferring
                        visitors. Not only being in the middle point of three
                        world heritages, but also does it have numerous
                        unforgettable beautiful scenes.
                      </p>
                      <br />
                      <p>
                        Da Nang closely related with the Sa Huynh cultural
                        traditions. Many imposing, palaces, towers, temples,
                        citadels and ramparts, the vestiges from 1st to 13th are
                        still to be seen in Cham Museum.
                      </p>
                      <br />
                      <p>
                        Da Nang has other various interesting attractions as Ba
                        Na Tourist Resort, Ngu Hanh Son (Marble Mountains) as
                        well as the Linh Ung Pagoda, Han River, and My An, Non
                        Nuoc beaches, stretching on dozens of kilometers...
                      </p>
                    </div>
                    <div className="local__info-gallery">
                      <img src={local_bg_4} alt="background" />

                      <div className="d-flex flex-column">
                        <img src={local_bg_5} alt="background" />
                        <img src={local_bg_6} alt="background" />
                      </div>
                    </div>
                  </div>
                  <div className="local__explore dn">
                    <div className="local__explore-bg">
                      <img src={local_bg_3} alt="background" />
                    </div>
                    <div className="local__explore-news">
                      <span className="year dn">Da Nang</span>
                      <h4 className="title dn">Expected Weather</h4>
                      <p>
                        October marks the beginning of the winter in Da Nang. It
                        is a comfortable month in Da Nang, with average
                        temperature fluctuating between 23.0°C (73.4°F) and
                        27.6°C (81.68°F), and this makes October one of the best
                        months to visit Da Nang.
                      </p>
                    </div>
                  </div>

                  <div className="local__box">
                    <div className="box">
                      <div className="box__head">
                        <img src={ic_box_head} alt="icon" />
                        Currency
                      </div>
                      <div className="box__body">
                        <ul>
                          <li>Vietnam Dong (VND)</li>
                          <li>1USD = 23.470 VND (variable)</li>
                          <li>All major credit cards are accepted widely</li>
                        </ul>
                      </div>
                    </div>
                    <div className="box">
                      <div className="box__head">
                        <img src={ic_box_head} alt="icon" />
                        Local time
                      </div>
                      <div className="box__body">
                        <ul>
                          <li>GMT + 7 hours</li>
                        </ul>
                      </div>
                    </div>
                    <div className="box">
                      <div className="box__head">
                        <img src={ic_box_head} alt="icon" />
                        Emergency Numbers
                      </div>
                      <div className="box__body">
                        <ul>
                          <li>Police: 113 </li>
                          <li>Ambulance: 114</li>
                          <li>Fire & Rescue: 115</li>
                        </ul>
                      </div>
                    </div>
                    <div className="box">
                      <div className="box__head">
                        <img src={ic_box_head} alt="icon" />
                        Electricity
                      </div>
                      <div className="box__body">
                        <ul>
                          <li>Voltage 220V/50Hz</li>
                          <li>
                            Three types of plugs type A (two flat vertical
                            pins), type C and type F (two round pins) fit
                            Vietnam electrical outlets
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab
                eventKey="transportation"
                title="Transportation from the airport to the meeting hotel"
              >
                <div className="local__wrapper">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-7">
                        <div className="local__bg animate__animated animate__fadeInLeft">
                          <img src={bg_local_airport} alt="background" />
                        </div>
                      </div>
                      <div className="col-lg-5">
                        <div className="local__content animate__animated animate__fadeInRight">
                          <div className="heading">
                            Transportation from the airport to the meeting hotel
                          </div>

                          <div className="local__text">
                            <div>
                              <div>Danang International Airport (DAN)</div>
                              <div>Distance: 7km to the meeting hotel</div>
                              <div>
                                It takes about 15-20 minutes to get the meeting
                                hotel by taxi.
                              </div>
                              <br />
                              <div>
                                *If you do not use the Airport pick service by
                                the Hotel, you are advised to take a taxi. It is
                                suggested to take the following taxis which are
                                easily seen when you get out the exit door:
                              </div>
                              <div>1. Mai Linh taxi at 0236 356 5656 </div>
                              <div>2. Vinasun taxi at 0236 368 6868</div>
                              <div>
                                3. Grab App (if you have available account on
                                app)
                              </div>
                              <div>
                                The taxi rate ranges from US$ 8 to US$ 10
                                depending on the size of the taxi. However, you
                                should pay in Vietnam Dong (VND), given the
                                prevailing USD/VND exchange rate. You can visit
                                https://www.danangairportonline.com/da-nang-airport-transportation/
                                for further information.
                              </div>
                              <br />
                              <div>
                                *Transportation service from Hotel: it’s cheaper
                                when you go in a group
                              </div>
                              <div>
                                1. Max 3 person/car with luggage: US$ 46/per
                                car/per way
                              </div>
                              <div>
                                2. Max 8 person/car with luggage: US$ 58/per
                                car/per way
                              </div>
                              <div>
                                3. Max 16 person/car with luggage: US$ 70/per
                                car/per way
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="scenery" title="Scenery show: Hoi An Memories">
                <div className="local__scenery">
                  <div className="local__scenery-content">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-8">
                          <div className="section">
                            <img
                              src={local_img_0}
                              alt="img"
                              className="h-100"
                              onClick={() => openImageViewer(0)}
                            />
                          </div>
                        </div>

                        <div className="col-lg-4">
                          <div className="section__wrap">
                            <div className="section">
                              <img
                                src={local_img_1}
                                alt="img"
                                onClick={() => openImageViewer(1)}
                              />
                            </div>
                            <div className="section">
                              <img
                                src={local_img_2}
                                alt="img"
                                onClick={() => openImageViewer(2)}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-4">
                          <div className="section">
                            <img
                              src={local_img_3}
                              alt="img"
                              onClick={() => openImageViewer(3)}
                            />
                          </div>
                        </div>

                        <div className="col-lg-4">
                          <div className="section">
                            <img
                              src={local_img_4}
                              alt="img"
                              onClick={() => openImageViewer(4)}
                            />
                          </div>
                        </div>

                        <div className="col-lg-4">
                          <div className="section">
                            <img
                              src={local_img_5}
                              alt="img"
                              onClick={() => openImageViewer(5)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {isViewerOpen && (
                      <ImageViewer
                        src={images}
                        currentIndex={currentImage}
                        onClose={closeImageViewer}
                        disableScroll={true}
                        backgroundStyle={{
                          backgroundColor: "rgba(0,0,0,0.9)",
                        }}
                        closeOnClickOutside={true}
                      />
                    )}
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Local;
