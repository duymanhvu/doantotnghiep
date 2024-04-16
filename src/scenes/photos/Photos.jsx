import React, { useState, useEffect } from "react";

import axios from "axios";
import moment from "moment";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import scroll_down from "../../assets/img/ic_scroll_down.svg";

import photo_bg_1 from "../../assets/img/photos/photo_bg_1.png";
import ic_download from "../../assets/img/ic_download.svg";

import { apiUrl } from "../../contexts/constants";

//http://192.168.2.19:8800/acg25/public/download/16-05-2023/images

const Photo = ({
  id,
  images,
  background,
  time,
  isActive,
  onClick,
  showImage,
  day,
}) => {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <>
      {isActive && images.length > 0 && (
        <div
          className={`photos__list`}
          onClick={handleClick}
          style={showImage ? { width: "100%" } : {}}
        >
          <div
            className="external"
            style={!showImage ? { display: "block" } : { display: "none" }}
          >
            <img src={background} alt={`background-${id}`} />
            <div className="hook">
              <span>{day}</span>
            </div>
          </div>

          {showImage && (
            <div className="internal">
              <h3>
                {day}
                <a
                  href={`${apiUrl}/download/${day}/images`}
                  className="btn-download"
                  style={{ marginRight: "16px" }}
                >
                  Download
                  <img src={ic_download} alt="icon" />
                </a>
              </h3>

              <div className="row">
                {images.map((image, index) => (
                  <div className="col-lg-4 col-md-6 col-xxs-12" key={index}>
                    <img key={index} src={image} alt={`img-${index}`} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

const Audio = ({
  id,
  videos,
  background,
  title,
  time,
  isActive,
  onClick,
  showImage,
}) => {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <>
      {isActive && (
        <div
          className={`photos__list`}
          onClick={handleClick}
          style={showImage ? { width: "100%" } : {}}
        >
          {!showImage && (
            <div className="external">
              <img src={background} alt={`background-${id}`} />
              <div className="hook">
                <h3>{title}</h3>
                {/* <span>{time}</span> */}
              </div>
            </div>
          )}

          {showImage && (
            <div className="internal">
              <h3>{title}</h3>
              <div className="row">
                <div className="col-lg-12">
                  <video controls>
                    <source src={videos} type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

const Photos = () => {
  const [imageList, setImageList] = useState([]);
  const [videoList, setVideoList] = useState([]);

  const [activeCard, setActiveCard] = useState(null);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    axios
      .get(`${apiUrl}/media/conference-photos`)
      .then((response) => {
        const store = [];
        let id = 1;
        console.log("aaaa", response.data);

        for (const time in response.data) {
          const images = response.data[time];
          const background = images.length > 0 ? images[0] : "";

          const inputFormat = "DD-MM-YYYY";
          const outputFormat = "DD MMMM YYYY";

          store.push({
            id: id,
            images: images,
            background: background,
            time: moment(time, inputFormat).format(outputFormat),
            day: time,
          });

          id++;
        }

        let order = [7, 4, 2, 5, 1, 3]

        store.sort(function(a, b) {
          return order.indexOf(a.id) - order.indexOf(b.id);
        });

        setImageList(store);
      })
      .catch((error) => console.log(error));

    axios
      .get(`${apiUrl}/media/conference-videos`)
      .then((response) => {
        const store = [];
        let id = 1;

        for (const data in response.data) {
          const newData = data.split(",");

          const videos = response.data[data];

          const inputFormat = "DD-MM-YYYY";
          const outputFormat = "DD MMMM YYYY";

          const gallery = [];

          videos.forEach((value) => {
            if (value && value.endsWith(".mp4")) {
              gallery.push(value);
            }
          });

          store.push({
            id: id,
            background: videos[0]?.endsWith(".mp4") ? videos[1] : videos[0],
            videos: gallery[0],
            time: moment(newData[1], inputFormat).format(outputFormat),
            title: newData[0],
          });

          id++;
        }

        setVideoList(store);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleCardClick = (cardId) => {
    setActiveCard(cardId);
    setShowImage(true);
  };

  const handleTabChange = () => {
    setActiveCard(null);
    setShowImage(false);
  };

  return (
    <div className="photos">
      <div className="photos__container">
        <div className="background">
          <div className="background__hook">
            <h1 className="animate__animated animate__fadeInUp">
              Conference Photos
            </h1>
          </div>

          <div className="scroll">
            <div className="scroll__down animate__animated animate__bounce animate__infinite animate__repeat-3">
              <span>SCROLL DOWN</span>
              <img src={scroll_down} alt="scroll" />
            </div>
          </div>
        </div>

        <div className="photos__content">
          <div className="photos__tabs">
            <Tabs fill onSelect={handleTabChange}>
              <Tab eventKey="conference" title="Conference Photos">
                <div className="container">
                  <div
                    className={`photos__galery ${showImage ? "internal" : ""}`}
                  >
                    {imageList.map((item) => (
                      <Photo
                        key={item.id}
                        id={item.id}
                        images={item.images}
                        background={item.background}
                        time={item.time}
                        isActive={activeCard === item.id || activeCard === null}
                        showImage={showImage}
                        day={item.day}
                        onClick={handleCardClick}
                      />
                    ))}
                  </div>

                  <div className="photos__controls">
                    {activeCard ? (
                      <>
                        {/* <button className="btn" style={{marginRight: "16px"}} onClick={handleDownload}>DOWWNLOAD</button> */}

                        <button
                          className="btn"
                          onClick={() => {
                            setActiveCard(null);
                            setShowImage(false);
                          }}
                        >
                          LIST
                        </button>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </Tab>
              <Tab eventKey="video" title="Video">
                <div className="container">
                  <div
                    className={`photos__galery video ${
                      showImage ? "internal" : ""
                    }`}
                  >
                    {videoList.map((item) => (
                      <Audio
                        key={item.id}
                        id={item.id}
                        videos={item.videos}
                        background={item.background}
                        time={item.time}
                        title={item.title}
                        isActive={activeCard === item.id || activeCard === null}
                        showImage={showImage}
                        onClick={handleCardClick}
                      />
                    ))}
                  </div>

                  <div className="photos__controls">
                    {activeCard ? (
                      <>
                        {/* <button className="btn" style={{marginRight: "16px"}}>DOWWNLOAD</button> */}

                        <button
                          className="btn"
                          onClick={() => {
                            setActiveCard(null);
                            setShowImage(false);
                          }}
                        >
                          LIST
                        </button>
                      </>
                    ) : (
                      <></>
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

export default Photos;
