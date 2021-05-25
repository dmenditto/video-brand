import React from "react";

const videoStyle = {
  fluid: "false",
  height: "500px",
};

const Player = (props) => {
  return (
    <div className="player-wrapper">
      <video
        key={props.video}
        className="react-player"
        src={props.video}
        width="100%"
        height="100%"
        controls
      />
    </div>
  );
};

export default Player;

/*
<video
        style={videoStyle}
        width="100%"
        height="100%"
        key={props.video}
        controls
        autoPlay
        src={props.video}
      /> */
