import React from "react";

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
