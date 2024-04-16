import React from "react";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import scroll_down from "../../assets/img/ic_scroll_down.svg";

const Program = () => {
  return (
    <div className="program">
      <div className="program__container">
        <div className="background">
          <div className="background__hook">
            <h1 className="animate__animated animate__fadeInUp">Program</h1>
          </div>

          <div className="scroll">
            <div className="scroll__down animate__animated animate__bounce animate__infinite animate__repeat-3">
              <span>SCROLL DOWN</span>
              <img src={scroll_down} alt="scroll" />
            </div>
          </div>
        </div>

        <div className="program__tabs">
          <Tabs fill>
            <Tab eventKey="program" title="Program">
              <div className="container">
                <div className="program__wrap">
                  <div className="program__list one">
                    <h3 className="heading">
                      Day One: Tuesday, 17th October 2023
                    </h3>

                    <div className="program__list-item">
                      <div className="time">17:00-18:00</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">Registration</div>

                          <ul className="details">
                            {/* <li>Meeting room</li> */}
                            <li>Ocean Ballroom</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="program__list-item">
                      <div className="time">18:00 – 20:30</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">Welcome Dinner</div>

                          <ul className="details">
                            {/* <li>Meeting room</li>
                            <li>Furama Resort Danang</li> */}
                            <li>Ocean Ballroom</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="program__list two">
                    <h3 className="heading">
                      Day Two: Wednesday, 18th October 2023
                    </h3>

                    <div className="program__list-item">
                      <div className="time">09:00 – 09:30</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">Registration</div>

                          <ul className="details">
                            {/* <li>Meeting room</li>
                            <li>Furama Resort Danang</li> */}
                            <li>Danang 1 + 2 Ballroom</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">09:30 – 09:40</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">Inauguration ceremony</div>
                          <ul className="details">
                            {/* <li>Meeting room</li>
                            <li>Furama Resort Danang</li> */}
                            <li>Danang 1 + 2 Ballroom</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">09:40 – 09:50</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">
                            Welcome speech by Dr. Nguyen Son, Chairman of the
                            Board of Members, VSDC
                          </div>
                          <ul className="details">
                            {/* <li>Meeting room</li>
                            <li>Furama Resort Danang</li> */}
                            <li>Danang 1 + 2 Ballroom</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">09:50 – 10:00</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">
                            Opening speech by Dr. Wenhua Dai, ACG Chairman
                          </div>
                          <ul className="details">
                            {/* <li>Meeting room</li>
                            <li>Furama Resort Danang</li> */}
                            <li>Danang 1 + 2 Ballroom</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">10:00 – 10:15</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">Speech by MOF</div>
                          <ul className="details">
                            {/* <li>Meeting room</li>
                            <li>Furama Resort Danang</li> */}
                            <li>Danang 1 + 2 Ballroom</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">10:15 – 10:45</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">Group photo & Tea Break</div>
                          <ul className="details">
                            {/* <li>Meeting room</li>
                            <li>Furama Resort Danang</li> */}
                            <li>Danang 1 + 2 Ballroom</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">10:45 – 11:45</div>
                      <div className="box">
                        <div className="box__inner mw-100">
                          <div className="title">
                            Keynote speeches
                            <ul className="details">
                              <li>Mr. Yedil Medeu, WFC Chairman</li>
                              <li>
                                Mr. Dominic Scriven OBE, Chairman of the Board
                                of Directors, Dragon Capital VietFund Management
                                Joint Stock Company
                              </li>
                              <li>
                                Mr. Rajeev Tummala, Head of Digital, Asia &
                                MENA, HSBC Securities Services
                              </li>
                            </ul>
                          </div>
                          <ul className="details">
                            <li>Danang 1 + 2 Ballroom</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">11:45 – 14:00</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">Lunch</div>
                          <ul className="details">
                            <li>Indochine Restaurant</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">14:00 - 15:15</div>
                      <div className="box">
                        <div className="box__inner mw-100">
                          <div className="title">
                            Panel Discussion I: Recognition of global investment
                            trends and CSDs’ expected business transformation
                            Moderator: Mr. Duong Ngoc Tuan, Senior Managing
                            Director, VSDC
                            <ul className="details">
                            Panelists: 
                              <li>
                                Ms. Pichaya Chomchaiya, Senior Vice
                                President-Head of Registrar Dept., Thailand
                                Securities Depository Co., Ltd. (TSD){" "}
                              </li>
                              <li>
                                Mr. Wallace Chu, ESG Product Manager, Taiwan
                                Depository & Clearing Corporation (TDCC)
                              </li>
                              <li>
                                Mr. Colin Parry, Chief Executive Officer,
                                International Securities Services Association
                                (ISSA)
                              </li>
                              <li>
                                Ms. Nguyen Thuy Van, Head of Asia Business
                                Strategy, Clearstream Banking S.A, HongKong
                              </li>
                              <li>
                                Mr. Satoru Yamadera, Advisor, Economic Research
                                and Regional Cooperation Department, Asia
                                Development Bank (ADB)
                              </li>
                            </ul>
                          </div>
                          <ul className="details">
                            <li>Danang 1 + 2 Ballroom</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">15:15 – 15:45</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">Tea break</div>
                          <ul className="details">
                            {/* <li>Meeting room</li>
                            <li>Furama Resort Danang</li> */}
                            <li>Danang 1 + 2 Ballroom</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">15:45 – 17:00</div>
                      <div className="box">
                        <div className="box__inner mw-100">
                          <div className="title">
                            Panel discussion II: CSDs’ initiatives for faster
                            and more secure businesses in the context of high
                            volatility
                            <ul className="details">
                              Moderator:
                              <li>
                                Mr. Richard Shum, Senior Vice President –
                                Clearing and Depository, Operations Division,
                                Hong Kong Exchanges and Clearing Limited
                              </li>
                              Panelists:
                              <li>
                                Ms. Imelda Sebayang, Director of Finance and
                                Administration, Indonesia Central Securities
                                Depository (KSEI)
                              </li>
                              <li>
                                Mr. Amit Jindal, Senior Vice President, National
                                Securities Depository Limited (NSDL)
                              </li>
                              <li>
                                Mr. Alexandr Kamchatnyy, Managing Director,
                                Central Securities Depository JSC (KCSD)
                              </li>
                              <li>
                                Ms. Yanru Ge, Manager, China Securities
                                Depository and Clearing Corporation Limited
                                (CSDC) - Beijing Branch, Clearing Department
                              </li>
                              <li>
                                Mr. Hossein Mohammadi, Senior Advisor to CEO-
                                Central Securities Depository of Iran (CSDI),
                                Vice Chairman to Technology and International
                                Affairs-Securities and Exchange Organization of
                                Iran
                              </li>
                            </ul>
                          </div>
                          <ul className="details">
                            <li>Danang 1 + 2 Ballroom</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">18:30 – 21:00</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">Gala Dinner</div>
                          <ul className="details">
                            {/* <li>Meeting room</li>
                            <li>Furama Resort Danang</li> */}
                            <li>Ballroom 1A – (Ariyana Convention Centre)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="program__list three">
                    <h3 className="heading">
                      Day Three: Thursday, 19th October 2023
                    </h3>

                    <div className="program__list-item">
                      <div className="time">08:30 – 09:30</div>
                      <div className="box">
                        <div className="box__inner mw-100">
                          <div className="title">
                            Task Force Group Meeting I (Breakout session):
                            <ul className="details">
                              <li>New Business Initiative T/F</li>
                              <li>Exchange of Information T/F</li>
                              <li>Technical T/F</li>
                            </ul>
                          </div>
                          <ul className="details">
                            <li>Danang 1 + 2 ballroom</li>
                            <li>Han River 2 room</li>
                            <li>Son Tra room</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">09:30 – 09:45</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">Tea break</div>
                          <ul className="details">
                            {/* <li>Meeting room</li>
                            <li>Furama Resort Danang</li> */}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">09:45 – 10:45</div>
                      <div className="box">
                        <div className="box__inner mw-100">
                          <div className="title">
                            Task Force Group Meeting I (Breakout session):
                            <ul className="details">
                              <li>Risk and Recovery Management T/F</li>
                              <li>Investor Services T/F</li>
                              <li>Legal T/F</li>
                            </ul>
                          </div>
                          <ul className="details">
                            <li>Danang 1 + 2 ballroom</li>
                            <li>Han River 2 room</li>
                            <li>Son Tra room</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">11:00 – 12:00</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">
                            Senior Management Meeting (high-level
                            representatives of ACG members only)
                          </div>

                          <ul className="details">
                            {/* <li>Meeting room</li>
                            <li>Furama Resort Danang</li> */}
                            <li>Danang 1 + 2 ballroom</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">12:00 – 13:30</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">Lunch</div>

                          <ul className="details">
                            {/* <li>Meeting room</li>
                            <li>Furama Resort Danang</li> */}
                            <li>Indochine Restaurant</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">13:30 – 14:30</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">
                            Task Force Group Reporting
                          </div>

                          <ul className="details">
                            {/* <li>Meeting room</li>
                            <li>Furama Resort Danang</li> */}
                            <li>Danang 1 + 2 Ballroom</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">14:30 – 14:40</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">Tea break</div>
                          <ul className="details">
                            {/* <li>Meeting room</li>
                            <li>Furama Resort Danang</li> */}
                            <li>Danang 1 + 2 Ballroom</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">14:40 – 16:00</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">
                            ACG General Meeting (ACG members only)
                          </div>
                          <ul className="details">
                            {/* <li>Meeting room</li>
                            <li>Furama Resort Danang</li> */}
                            <li>Danang 1 + 2 Ballroom</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">16:30-22:00</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">
                            Farewell Dinner (18:00 -19:30) & Scenery show: Hoi
                            An Memories
                          </div>
                          <ul className="details">
                            {/* <li>Non La Restaurant, Hoi An</li>
                            <li>Hoi An Memories Theater</li> */}
                            <li>Hoi An Memories Land</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="program__list four">
                    <h3 className="heading">
                      Day Four: Friday, 20th October 2023
                    </h3>

                    <div className="program__list-item">
                      <div className="time">08:00 – 14:00</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">Optional Tour (Hoi An)</div>
                          <ul className="details">
                            {/* <li>Hoi An</li> */}
                            <li>Hoi An Ancient Town</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="one" title="Day One (17 Oct)">
              <div className="container">
                <div className="program__wrap">
                <div className="program__list one">
                    <h3 className="heading">
                      Day One: Tuesday, 17th October 2023
                    </h3>

                    <div className="program__list-item">
                      <div className="time">17:00-18:00</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">Registration</div>

                          <ul className="details">
                            {/* <li>Meeting room</li> */}
                            <li>Ocean Ballroom</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="program__list-item">
                      <div className="time">18:00 – 20:30</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">Welcome Dinner</div>

                          <ul className="details">
                            {/* <li>Meeting room</li>
                            <li>Furama Resort Danang</li> */}
                            <li>Ocean Ballroom</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="two" title="Day Two (18 Oct)">
              <div className="container">
                <div className="program__wrap">
                <div className="program__list two">
                    <h3 className="heading">
                      Day Two: Wednesday, 18th October 2023
                    </h3>

                    <div className="program__list-item">
                      <div className="time">09:00 – 09:30</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">Registration</div>

                          <ul className="details">
                            {/* <li>Meeting room</li>
                            <li>Furama Resort Danang</li> */}
                            <li>Danang 1 + 2 Ballroom</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">09:30 – 09:40</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">Inauguration ceremony</div>
                          <ul className="details">
                            {/* <li>Meeting room</li>
                            <li>Furama Resort Danang</li> */}
                            <li>Danang 1 + 2 Ballroom</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">09:40 – 09:50</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">
                            Welcome speech by Dr. Nguyen Son, Chairman of the
                            Board of Members, VSDC
                          </div>
                          <ul className="details">
                            {/* <li>Meeting room</li>
                            <li>Furama Resort Danang</li> */}
                            <li>Danang 1 + 2 Ballroom</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">09:50 – 10:00</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">
                            Opening speech by Dr. Wenhua Dai, ACG Chairman
                          </div>
                          <ul className="details">
                            {/* <li>Meeting room</li>
                            <li>Furama Resort Danang</li> */}
                            <li>Danang 1 + 2 Ballroom</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">10:00 – 10:15</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">Speech by MOF</div>
                          <ul className="details">
                            {/* <li>Meeting room</li>
                            <li>Furama Resort Danang</li> */}
                            <li>Danang 1 + 2 Ballroom</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">10:15 – 10:45</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">Group photo & Tea Break</div>
                          <ul className="details">
                            {/* <li>Meeting room</li>
                            <li>Furama Resort Danang</li> */}
                            <li>Danang 1 + 2 Ballroom</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">10:45 – 11:45</div>
                      <div className="box">
                        <div className="box__inner mw-100">
                          <div className="title">
                            Keynote speeches
                            <ul className="details">
                              <li>Mr. Yedil Medeu, WFC Chairman</li>
                              <li>
                                Mr. Dominic Scriven OBE, Chairman of the Board
                                of Directors, Dragon Capital VietFund Management
                                Joint Stock Company
                              </li>
                              <li>
                                Mr. Rajeev Tummala, Head of Digital, Asia &
                                MENA, HSBC Securities Services
                              </li>
                            </ul>
                          </div>
                          <ul className="details">
                            <li>Danang 1 + 2 Ballroom</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">11:45 – 14:00</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">Lunch</div>
                          <ul className="details">
                            <li>Indochine Restaurant</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">14:00 - 15:15</div>
                      <div className="box">
                        <div className="box__inner mw-100">
                          <div className="title">
                            Panel Discussion I: Recognition of global investment
                            trends and CSDs’ expected business transformation
                            Moderator: Mr. Duong Ngoc Tuan, Senior Managing
                            Director, VSDC
                            <ul className="details">
                            Panelists: 
                              <li>
                                Ms. Pichaya Chomchaiya, Senior Vice
                                President-Head of Registrar Dept., Thailand
                                Securities Depository Co., Ltd. (TSD){" "}
                              </li>
                              <li>
                                Mr. Wallace Chu, ESG Product Manager, Taiwan
                                Depository & Clearing Corporation (TDCC)
                              </li>
                              <li>
                                Mr. Colin Parry, Chief Executive Officer,
                                International Securities Services Association
                                (ISSA)
                              </li>
                              <li>
                                Ms. Nguyen Thuy Van, Head of Asia Business
                                Strategy, Clearstream Banking S.A, HongKong
                              </li>
                              <li>
                                Mr. Satoru Yamadera, Advisor, Economic Research
                                and Regional Cooperation Department, Asia
                                Development Bank (ADB)
                              </li>
                            </ul>
                          </div>
                          <ul className="details">
                            <li>Danang 1 + 2 Ballroom</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">15:15 – 15:45</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">Tea break</div>
                          <ul className="details">
                            {/* <li>Meeting room</li>
                            <li>Furama Resort Danang</li> */}
                            <li>Danang 1 + 2 Ballroom</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">15:45 – 17:00</div>
                      <div className="box">
                        <div className="box__inner mw-100">
                          <div className="title">
                            Panel discussion II: CSDs’ initiatives for faster
                            and more secure businesses in the context of high
                            volatility
                            <ul className="details">
                              Moderator:
                              <li>
                                Mr. Richard Shum, Senior Vice President –
                                Clearing and Depository, Operations Division,
                                Hong Kong Exchanges and Clearing Limited
                              </li>
                              Panelists:
                              <li>
                                Ms. Imelda Sebayang, Director of Finance and
                                Administration, Indonesia Central Securities
                                Depository (KSEI)
                              </li>
                              <li>
                                Mr. Amit Jindal, Senior Vice President, National
                                Securities Depository Limited (NSDL)
                              </li>
                              <li>
                                Mr. Alexandr Kamchatnyy, Managing Director,
                                Central Securities Depository JSC (KCSD)
                              </li>
                              <li>
                                Ms. Yanru Ge, Manager, China Securities
                                Depository and Clearing Corporation Limited
                                (CSDC) - Beijing Branch, Clearing Department
                              </li>
                              <li>
                                Mr. Hossein Mohammadi, Senior Advisor to CEO-
                                Central Securities Depository of Iran (CSDI),
                                Vice Chairman to Technology and International
                                Affairs-Securities and Exchange Organization of
                                Iran
                              </li>
                            </ul>
                          </div>
                          <ul className="details">
                            <li>Danang 1 + 2 Ballroom</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">18:30 – 21:00</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">Gala Dinner</div>
                          <ul className="details">
                            {/* <li>Meeting room</li>
                            <li>Furama Resort Danang</li> */}
                            <li>Ballroom 1A – (Ariyana Convention Centre)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="three" title="Day Three (19 Oct)">
              <div className="container">
                <div className="program__wrap">
                <div className="program__list three">
                    <h3 className="heading">
                      Day Three: Thursday, 19th October 2023
                    </h3>

                    <div className="program__list-item">
                      <div className="time">08:30 – 09:30</div>
                      <div className="box">
                        <div className="box__inner mw-100">
                          <div className="title">
                            Task Force Group Meeting I (Breakout session):
                            <ul className="details">
                              <li>New Business Initiative T/F</li>
                              <li>Exchange of Information T/F</li>
                              <li>Technical T/F</li>
                            </ul>
                          </div>
                          <ul className="details">
                            <li>Danang 1 + 2 ballroom</li>
                            <li>Han River 2 room</li>
                            <li>Son Tra room</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">09:30 – 09:45</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">Tea break</div>
                          <ul className="details">
                            {/* <li>Meeting room</li>
                            <li>Furama Resort Danang</li> */}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">09:45 – 10:45</div>
                      <div className="box">
                        <div className="box__inner mw-100">
                          <div className="title">
                            Task Force Group Meeting I (Breakout session):
                            <ul className="details">
                              <li>Risk and Recovery Management T/F</li>
                              <li>Investor Services T/F</li>
                              <li>Legal T/F</li>
                            </ul>
                          </div>
                          <ul className="details">
                            <li>Danang 1 + 2 ballroom</li>
                            <li>Han River 2 room</li>
                            <li>Son Tra room</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">11:00 – 12:00</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">
                            Senior Management Meeting (high-level
                            representatives of ACG members only)
                          </div>

                          <ul className="details">
                            {/* <li>Meeting room</li>
                            <li>Furama Resort Danang</li> */}
                            <li>Danang 1 + 2 ballroom</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">12:00 – 13:30</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">Lunch</div>

                          <ul className="details">
                            {/* <li>Meeting room</li>
                            <li>Furama Resort Danang</li> */}
                            <li>Indochine Restaurant</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">13:30 – 14:30</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">
                            Task Force Group Reporting
                          </div>

                          <ul className="details">
                            {/* <li>Meeting room</li>
                            <li>Furama Resort Danang</li> */}
                            <li>Danang 1 + 2 Ballroom</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">14:30 – 14:40</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">Tea break</div>
                          <ul className="details">
                            {/* <li>Meeting room</li>
                            <li>Furama Resort Danang</li> */}
                            <li>Danang 1 + 2 Ballroom</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">14:40 – 16:00</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">
                            ACG General Meeting (ACG members only)
                          </div>
                          <ul className="details">
                            {/* <li>Meeting room</li>
                            <li>Furama Resort Danang</li> */}
                            <li>Danang 1 + 2 Ballroom</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="program__list-item">
                      <div className="time">16:30-22:00</div>
                      <div className="box">
                        <div className="box__inner">
                          <div className="title">
                            Farewell Dinner (18:00 -19:30) & Scenery show: Hoi
                            An Memories
                          </div>
                          <ul className="details">
                            {/* <li>Non La Restaurant, Hoi An</li>
                            <li>Hoi An Memories Theater</li> */}
                            <li>Hoi An Memories Land</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Program;
