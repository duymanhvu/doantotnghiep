import React from "react";
import { Link } from "react-router-dom";

import scroll_down from "../../assets/img/ic_scroll_down.svg";
import contact_bg from "../../assets/img/contact_bg.png";
import ic_mail from "../../assets/img/ic_mail.svg";
import ic_location from "../../assets/img/ic_location.svg";
import ic_phone_contact from "../../assets/img/ic_phone_contact.svg";

const Contact = () => {
  return (
    <div className="contact">
      <div className="background">
        <div className="background__hook">
          <h1 className="animate__animated animate__fadeInUp">Contact</h1>
        </div>

        <div className="scroll">
          <div className="scroll__down animate__animated animate__bounce animate__infinite animate__repeat-3">
            <span>SCROLL DOWN</span>
            <img src={scroll_down} alt="scroll" />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="contact__wrap">
          <div
            className="contact__question"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <img src={contact_bg} alt="background" />

            <div className="contact__question-hook">
              <h3>Still have a questions?</h3>
              <span>Feel free to ask us now</span>
              {/* <Link href="#" className="contact__question-link">
                ASK A QUESTION
              </Link> */}
              <a
                href="mailto:ACG25contact@vsd.vn"
                className="contact__question-link"
              >
                ASK A QUESTION
              </a>
            </div>
          </div>

          <div
            className="contact__content"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <h3 className="heading">Contact</h3>

            <div className="contact__box">
              <h4>The 25th AGM Organizing Committee</h4>

              <div className="contact__info">
                <div>
                  <img src={ic_mail} alt="gmail" />
                  {/* <span>ACG25contact@vsd.vn (ACG25 Organizing Team)</span> */}
                  <a href="mailto:ACG25contact@vsd.vn">
                    ACG25contact@vsd.vn (The 25th AGM Organizing Team)
                  </a>
                </div>
                <div>
                  <img src={ic_location} alt="location" />
                  <span>
                    112 Hoang Quoc Viet, Nghia Tan ward, Cau Giay district,
                    Hanoi, Vietnam
                  </span>
                </div>
                <div>
                  <img src={ic_phone_contact} alt="phone" />
                  <span>
                    (+84) 2439740870
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
