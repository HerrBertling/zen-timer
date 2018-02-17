import React, { Component } from "react";
import Countdown from "react-countdown-now";
import "./MeditationTimer.css";

class MeditationTimer extends Component {
  timerRenderer = ({ minutes, seconds }) => (
    <span className="timer">
      <span className="timerMinutes">{minutes}</span>
      <span className="timerColon">:</span>
      <span className="timerSeconds">{seconds}</span>
    </span>
  );
  render() {
    const { duration, onCancel } = this.props;
    return (
      <section className="meditation">
        <button onClick={onCancel} className="meditationAnimation" />
        <Countdown renderer={this.timerRenderer} date={Date.now() + duration} />
      </section>
    );
  }
}

export default MeditationTimer;
