import React from "react";

import { Link } from "react-router-dom";

import bg_overview from "../../assets/img/bg_overview.png";
import scroll_down from "../../assets/img/ic_scroll_down.svg";

const Overview = () => {
  return (
    <div className="overview">
      <div className="background">
        <div className="background__hook">
          <h1 className="animate__animated animate__fadeInUp">OVERVIEW</h1>
        </div>

        <div className="scroll">
          <div className="scroll__down animate__animated animate__bounce animate__infinite animate__repeat-3">
            <span>SCROLL DOWN</span>
            <img src={scroll_down} alt="scroll" />
          </div>
        </div>
      </div>

      <div className="overview__wrapper">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="overview__bg animate__animated animate__fadeInLeft">
                <img src={bg_overview} alt="background" />
              </div>
            </div>
            <div className="col-lg-5">
              <div className="overview__content animate__animated animate__fadeInRight">
                <div className="heading">Overview</div>

                <div className="overview__text">
                  <p>
                    The Asia-Pacific Central Securities Depository Group (ACG)
                    was formed in November 1997 with the objective to facilitate
                    exchange of information and to promote mutual assistance
                    among member securities depositories and clearing
                    organizations in the Asia Pacific region. The Group, with 35
                    ACG members and 3 associate members, has always been
                    encouraging best practices and developing channels for
                    communication with other international organizations.
                    <br />
                    As a forum for dialogue and cooperation, the AGM keep
                    bringing forward trendy topics year after year so ACG’s
                    amazing journey can continue and expand.
                    <br />
                    Entering 2023, the 25th AGM continues that journey in the
                    coastal city of Da Nang with the theme &nbsp;
                    <span>
                      "CSDs' initiatives in line with global investment
                      trends".&nbsp;
                    </span>
                    Together, CSDs will figure out global investment trends and
                    discuss solutions and ideas that meet arising requirements
                    in the context of high volatility.
                  </p>

                  <div className="overview__box">
                    <h3>Agenda</h3>
                    <div>
                      View the <Link to="/program">Program</Link>
                    </div>
                  </div>

                  <div className="overview__box">
                    <h3>Venue</h3>
                    <div>
                      Furama Resort Danang
                      <br />
                      103 - 105 Vo Nguyen Giap Street, Khue My Ward, Ngu Hanh
                      Son District, Danang City, Vietnam
                      <br />{" "}
                      <Link
                        to="https://maps.app.goo.gl/5A45wYWVB4XSZVRv8"
                        target="_blank"
                      >
                        Directions
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="overview__map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.491772899504!2d108.24849317583868!3d16.039950740219638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31420fdbc8cc38ef%3A0x9a6a3e31121225d2!2sFurama%20Resort%20Danang!5e0!3m2!1svi!2s!4v1691660988905!5m2!1svi!2s"
            width="100%"
            height={272}
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Overview;
