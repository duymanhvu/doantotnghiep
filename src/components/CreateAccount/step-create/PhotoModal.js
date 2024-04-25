import React from "react";
import { Button, Modal } from "antd";

const PhotoModal = (props) => {
  const { showModal, onClose, videoRef, canvasRef, handleStopCamera, handleTakePhoto } = props;

  return (
    <Modal visible={showModal} title="Chụp ảnh" onCancel={onClose} footer={null}>
      <div>
        <video autoPlay ref={videoRef} style={{ width: "100%", height: "100%" }} />
        <div className="d-flex justify-content-center mt-4" style={{gap: 12}}>
          <Button type="secondary" onClick={handleStopCamera}>Dừng chụp</Button>
          <Button type="primary" onClick={handleTakePhoto}>Chụp ảnh</Button>
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </Modal>
  );
};

export default PhotoModal;
