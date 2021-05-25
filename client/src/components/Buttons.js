import React from "react";
import Button from "@material-ui/core/Button";
import VideoCam from "@material-ui/icons/Videocam";
import AddToQueue from "@material-ui/icons/AddToQueue";

const Buttons = (props) => {
  return (
    <div className="div-buttons">
      <input
        accept="video/mp4,video/x-m4v,video/*"
        style={{ display: "none" }}
        id="raised-video-file"
        type="file"
        onChange={props.onFileSelected}
        onClick={(e) => (e.target.value = null)}
      />

      <label htmlFor="raised-video-file">
        <Button
          className="buttons"
          variant="contained"
          color="primary"
          startIcon={<VideoCam />}
          component="span"
          disabled={props.disabledSelectVideo}
        >
          Select Video
        </Button>
      </label>
      <Button
        className="buttons"
        variant="contained"
        color="primary"
        startIcon={<AddToQueue />}
        component="span"
        onClick={props.onAddWatermark}
        disabled={props.disabledaddWatermark}
      >
        Add WaterMark
      </Button>
      <Button
        className="buttons"
        variant="contained"
        color="primary"
        startIcon={<AddToQueue />}
        component="span"
        onClick={props.onDownload}
        disabled={props.disabledDownload}
      >
        Download
      </Button>
    </div>
  );
};

export default Buttons;
