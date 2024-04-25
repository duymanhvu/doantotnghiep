/** @format */

import React, { useState, useEffect, forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import { Form, Select, Space, Tag, Button, Tooltip, Input, Modal, Upload, Slider } from "antd";
import { useStore } from "react-redux";
import _ from "lodash";
import "react-phone-number-input/style.css";
import {  RotateLeftOutlined, RotateRightOutlined } from "@ant-design/icons";
import AvatarEditor from "react-avatar-editor";
import PhotoModal from "./PhotoModal";
import { useGlobalConst } from "../../apiCore/useGlobalConst";

const ImageUpload = forwardRef((props, ref) => {
  const { editedImage, setEditedImage } = props;
  const store = useStore();
  const globalConst = useGlobalConst();
  const [modalVisible, setModalVisible] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [editor, setEditor] = useState(null);
  const [rotation, setRotation] = useState(0);
  const beforeUpload = (file) => {
    setUploadedImage(file);
    setEditedImage(URL.createObjectURL(file)); // Update editedImage with selected file
    return false; // Prevent default behavior (uploading to server)
  };

  const onImageChange = (position, rotation) => {
    // Handle image changes (crop and rotate)
    // You can use the position and rotation values as needed.
  };

  const handleSave = () => {
    if (editor) {
      setEditedImage(editor.getImageScaledToCanvas().toDataURL());
      setModalVisible(false);
    }
  };

  const handleRotateLeft = () => {
    setRotation((prevRotation) => prevRotation - 90);
  };

  const handleRotateRight = () => {
    setRotation((prevRotation) => prevRotation + 90);
  };

  const [cameraStream, setCameraStream] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const videoRef = useRef();
  const canvasRef = useRef();

  const handleStartCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
      setShowModal(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing the camera:", error);
    }
  };

  const handleTakePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoData = canvas.toDataURL("image/png");
      setEditedImage(photoData);
      setUploadedImage(photoData);
      setShowModal(false);
    }
  };

  const handleStopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };
  
  return (
    <>
      <Modal
        title="Kiểm tra hình ảnh"
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setRotation(0);
        }}
        onOk={handleSave}
        centered
        footer={null}
      >
        {uploadedImage && (
          <div>
            <div className="d-flex align-items-center justify-content-center mb-3" style={{ gap: "12px" }}>
              <Button type="text cl_wh" icon={<RotateLeftOutlined />} onClick={handleRotateLeft}></Button>
              <Button type="text cl_wh" icon={<RotateRightOutlined />} onClick={handleRotateRight}></Button>
            </div>
            <AvatarEditor
              ref={(editorRef) => setEditor(editorRef)}
              image={uploadedImage}
              style={{
                backgroundSize: "cover",
                width: "80%",
                display: "flex",
                margin: "0 auto",
              }}
              border={10}
              color={[255, 255, 255, 0.6]}
              scale={1}
              rotate={rotation}
              onPositionChange={onImageChange}
              onRotate={onImageChange}
            />
            <div className="desc mt-4" style={{ fontSize: 12, maxWidth: 350, margin: "0 auto" }}>
              Vui lòng đảm bảo ảnh không bị mất góc, rõ nét, có thể đọc được tất cả nội dung rõ ràng bằng mắt thường
            </div>
            <div className="foot">
              <Button type="file" onClick={handleStartCamera}>
                <span>Chụp lại</span>
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  handleSave();
                }}
              >
                <span>Sử dụng ảnh này</span>
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {editedImage && <img src={editedImage} alt="Edited" onClick={() => setModalVisible(true)} />}
      <div className="createacc__photo-box">
        <div className="box-control">
        <Upload beforeUpload={beforeUpload} showUploadList={false} customRequest={() => {}}>
            <Button type="actions">
              <img src="/static/img/icon/ic_upload.svg" alt="upload" />
            </Button>
          </Upload>

          <Button type="actions">
            <img src="/static/img/icon/ic_camera.svg" alt="upload" onClick={handleStartCamera} />
          </Button>
        </div>
          
          {showModal && (
            <PhotoModal
              showModal={showModal}
              onClose={closeModal}
              handleStopCamera={handleStopCamera}
              videoRef={videoRef}
              canvasRef={canvasRef}
              handleTakePhoto={handleTakePhoto}
            />
          )}
          {/* {!cameraStream ? (
            <button onClick={handleStartCamera}>Camera</button>
          ) : (
            <div>
              <video autoPlay ref={videoRef} />
              <div>
                <button onClick={handleTakePhoto}>Take Photo</button>
                <button onClick={handleStopCamera}>Stop Camera</button>
              </div>

              <canvas ref={canvasRef} style={{ display: "none" }} />
            </div>
          )} */}
      </div>
    </>
  );
});

export default ImageUpload;
