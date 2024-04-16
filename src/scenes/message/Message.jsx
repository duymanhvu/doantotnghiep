import React from "react";

import scroll_down from "../../assets/img/ic_scroll_down.svg";

const Message = () => {
  return (
    <div className="message">
      <div className="message__container">
        <div className="background">
          <div className="background__hook">
            <h1 className="animate__animated animate__fadeInUp">
              Message from the host
            </h1>
          </div>

          <div className="scroll">
            <div className="scroll__down animate__animated animate__bounce animate__infinite animate__repeat-3">
              <span>SCROLL DOWN</span>
              <img src={scroll_down} alt="scroll" />
            </div>
          </div>
        </div>

        <div className="message__content">
          <div className="container">
            <div className="message__wrap">
              <div className="message__content-text">
                <div className="heading v1">Message from the Host</div>

                <p>
                  Dear all delegates,
                  <br />
                  We have tremendous pleasure in warmly welcoming you all to the
                  25th AGM which takes place at Furama Resort Danang in the
                  charming city of Da Nang, from 17-20 October 2023.
                  <br />
                  We feel really honored to host this Meeting which marks the
                  3rd time VSDC's hosting ACG events (13th AGM in 2009 and ACG18
                  Cross Training Seminar in 2016). Association with ACG for more
                  than 16 years has been a wonderful path as ACG has always been
                  a unique platform for remarkable exchange of knowledge, ideas
                  and experiences especially in post-trade industry.
                  <br />
                  This year’s theme on “CSDs' Initiatives In Line With Global
                  Investment Trends”, is a relevant topic and promising to bring
                  benefits to all attendants. During the four-day journey,
                  various matters will be discussed on trendy investments
                  worldwide and what CSDs are doing in response to the fast
                  changing business landscape. As customary for any ACG event,
                  the 25th AGM will surely be a place to connect ACG family
                  members and network with new partners.
                  <br />
                  We really appreciate your accepting our invitation and we will
                  do our best to make your visit a pleasant and enlightening
                  experience by exposing you as much as possible to various
                  aspects of Vietnam culture, cuisine, heritage and history.
                </p>
              </div>
              <div className="message__content-hook">
                <div className="message__content-people v1">
                  <div className="sub">
                    <h4>Mr. Nguyen Son</h4>
                    <span>Chairman</span>
                  </div>
                </div>
                <div className="message__content-people v2">
                  <div className="sub">
                    <h4>Mr. Duong Van Thanh</h4>
                    <span>Chief Executive Officer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
