import React, { Component } from "react";
import Countdown from "react-countdown-now";
import "./MeditationTimer.css";

class MeditationTimer extends Component {
  timerRenderer = ({ minutes, seconds }) => (
    <span>
      {minutes}:{seconds}
    </span>
  );
  render() {
    const { duration, onCancel } = this.props;
    return (
      <div className="meditation">
        <div onClick={onCancel} className="meditationAnimation" />
        <Countdown renderer={this.timerRenderer} date={Date.now() + duration} />
      </div>
    );
  }
}

export default MeditationTimer;
