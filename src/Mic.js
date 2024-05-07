
import React, { useState } from "react";
import { ReactMic } from "react-mic";
import { FaMicrophone} from "react-icons/fa";
import { IoIosMicOff } from "react-icons/io";

class MicrophoneRecorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recordAudio: false,
      recordVideo: false,
      mediaRecorder: null,
    };
  }

  startRecording = () => {
    this.setState({ recordAudio: true, recordVideo: true });
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks = [];
        const videoChunks = [];
        mediaRecorder.ondataavailable = (e) => {
          if (e.data.type.includes('audio')) {
            audioChunks.push(e.data);
          } else if (e.data.type.includes('video')) {
            videoChunks.push(e.data);
          }
        };
        mediaRecorder.onstop = () => {
          const recordedAudioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          const recordedVideoBlob = new Blob(videoChunks, { type: 'video/webm' });
          this.saveAudioToFile(recordedAudioBlob);
          this.saveVideoToFile(recordedVideoBlob);
        };
        mediaRecorder.start();
        this.setState({ mediaRecorder });
      })
      .catch((err) => {
        console.error("Error accessing media devices:", err);
      });
  };

  stopRecording = () => {
    this.setState({ recordAudio: false, recordVideo: false });
    if (this.state.mediaRecorder) {
      this.state.mediaRecorder.stop();
    }
  };

  saveAudioToFile = (recordedBlob) => {
    const url = URL.createObjectURL(recordedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recorded_audio.wav';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  };

  saveVideoToFile = (recordedBlob) => {
    const url = URL.createObjectURL(recordedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recorded_video.webm';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  };

  handleToggleRecording = () => {
    if (this.state.recordAudio && this.state.recordVideo) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  };

  render() {
    return (
      <div className="sound_btn">
        <div className="s_s">
          <button className="btnn" onClick={this.handleToggleRecording} type="button">
            {this.state.recordAudio && this.state.recordVideo ? <FaMicrophone /> : <IoIosMicOff />}
          </button>
        <ReactMic
          record={this.state.recordAudio}
          className="sound_wave"
          onStop={this.onStop}
          onData={this.onData}
        //   strokeColor="dimgrey"
          strokeColor="#333333"
          backgroundColor="#333333"
          />
          </div>
      </div>
    );
  }
}

export default MicrophoneRecorder;
