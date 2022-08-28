import React, { Component } from "react";
import axios from "axios";
import download from "js-file-download";
import "./App.css";
import ProgressBar from "./ProgressBar.js";
import Buttons from "./Buttons";
import Player from "./Player";
import Footer from "./Footer";
import Header from "./Header";
import WMposition from "./WMposition";

export default class App extends Component {
  state = {
    file: null, //Selected Video Object
    video: null, //Video blob_http reference
    fileNameNoExt: null, //Video File Name wo Extension
    WMposition: "Down", //Watermark Position
    intervalId: null, //Timer for progress catching
    progress: 0, //Encoding Video progress
    UIStateButton: {
      //UI State
      NewVideoButton: false,
      AddWaterMarkButton: true,
      DownloadButton: true,
    },
  };

  //Video File Selection
  onFileSelected = (event) => {
    this.setState({
      file: event.target.files[0],
      video: URL.createObjectURL(event.target.files[0]),
      fileNameNoExt: event.target.files[0].name
        .split(".")
        .slice(0, -1)
        .join("."),
      UIStateButton: {
        NewVideoButton: true,
        AddWaterMarkButton: false,
        DownloadButton: true,
      },
    });

    axios.get("http://192.168.68.106:8000/cleanup").then((res) => {
      console.log("CleanedUp" + res);
    });
  };

  //Add WaterMark button event handler
  onAddWatermark = () => {
    var intervalId = setInterval(this.onProgress, 1000); //Activate periodic progress update

    this.setState({ intervalId: intervalId });

    const data = new FormData();
    data.append("file", this.state.file);
    data.append("WMposition", this.state.WMposition);
    axios
      .post("http://192.168.68.106:8000/upload", data, { responseType: "blob" })
      .then((res) => {
        this.setState({
          video: URL.createObjectURL(res.data),
        });
        clearInterval(this.state.intervalId);
        this.setState({ progress: 0 });
        this.setState({
          UIStateButton: {
            NewVideoButton: false,
            AddWaterMarkButton: true,
            DownloadButton: false,
          },
        });
      });
  };

  onProgress = () => {
    axios.get("http://192.168.68.106:8000/progress").then((res) => {
      this.setState({ progress: res.data.progress });
    });
  };

  onDownload = () => {
    const data = new FormData();

    axios
      .post("http://192.168.68.106:8000/download", data, {
        responseType: "blob",
      })
      .then((res) => {
        download(res.data, this.state.fileNameNoExt + "_WM.mp4", (err) => {
          if (err) console.log(err);
        });

        this.setState({
          UIStateButton: {
            NewVideoButton: false,
            AddWaterMarkButton: true,
            DownloadButton: true,
          },
        });
      });
  };

  WMhandleChange = (event) => {
    this.setState({ WMposition: event.target.value });
  };

  render() {
    return (
      <div>
        <div>
          <Header />
        </div>

        <div className="main">
          <Player video={this.state.video} />
        </div>
        <div className="div-buttons">
          <ProgressBar value={this.state.progress} />
        </div>
        <div>
          <WMposition WMhandleChange={this.WMhandleChange} />
        </div>
        <div>
          <Buttons
            uistateButton={this.state.UIStateButton}
            onFileSelected={this.onFileSelected} //Handle Select Video button
            onAddWatermark={this.onAddWatermark}
            onDownload={this.onDownload}
          />
        </div>

        <div>
          <Footer />
        </div>
      </div>
    );
  }
}
