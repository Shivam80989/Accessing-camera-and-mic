"use client";
import { useState, useRef, useEffect } from "react";
import { FaVideo, FaVideoSlash } from "react-icons/fa";
import Mic from "./Mic";
import "./App.css";
import { ReactMic } from "react-mic";


function App() {
  const videoRef = useRef(null);

  const [cameraOn, setCameraOn] = useState(false);

  const toggleCamera = () => {
    if (cameraOn) {
      stopVideo();
    } else {
      startVideo();
    }
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 1920, height: 1080 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
        setCameraOn(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const stopVideo = () => {
    let video = videoRef.current;
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    video.srcObject = null;
    setCameraOn(false);
  };

  useEffect(() => {
    if (cameraOn) {
      startVideo();
    }
  }, [cameraOn]);

  return (
    <div className="App">
      <div className="Camera">
        <ReactMic
        backgroundColor="#333333"
        strokeColor="#844fff"
        className="sound_wave"
        />       
        <video ref={videoRef} /> 
        <div className="parent">
          <button className="btnnn"  onClick={toggleCamera}>
            {cameraOn ? <FaVideo /> : <FaVideoSlash />}
          </button>
          <Mic />
        </div>
      </div>
    </div>
  );
}

export default App;
