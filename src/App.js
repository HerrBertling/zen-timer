import React, { Component } from "react";
import "./App.css";
import { Button, MeditationTimer, Select } from "./components";

class App extends Component {
  state = {
    duration: 10,
    reminderEvery: 5,
    meditationRunning: false
  };

  changeDuration = event => {
    const value = event.target.value;
    this.setState(() => ({
      duration: value
    }));
  };
  changeReminder = event => {
    const value = event.target.value;
    this.setState(() => ({
      reminderEvery: value
    }));
  };
  startMeditation = event => {
    event.preventDefault();
    this.playGong(2, 200);
    this.setState(() => ({
      meditationRunning: true
    }));
    const durationInMs = this.state.duration * 60000;
    setTimeout(() => {
      this.abortMeditation();
    }, durationInMs);
  };
  abortMeditation = () => {
    this.playGong(2, 400);
    this.setState(() => ({
      meditationRunning: false
    }));
  };
  playGong = (gongDuration, gongFrequency) => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const gong = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    gong.type = "sine";
    gong.frequency.setValueAtTime(gongFrequency, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.00001,
      audioCtx.currentTime + gongDuration
    );
    gong.connect(gain);
    gain.connect(audioCtx.destination);
    gong.start(0);
    gong.stop(gongDuration);
  };

  render() {
    return (
      <div className="app">
        {!this.state.meditationRunning && (
          <div className="fadeIn">
            <form onSubmit={this.startMeditation} className="form">
              <fieldset className="fieldset">
                <legend className="title">Zen Timer</legend>
                <label htmlFor="duration">I would like to meditate for</label>
                <Select
                  onChange={this.changeDuration}
                  times={[5, 10, 15, 20, 30, 40, 50, 60]}
                  value={this.state.duration}
                  id="duration"
                />
                <label htmlFor="reminder">with a reminder bell every</label>
                <Select
                  onChange={this.changeReminder}
                  times={[2, 4, 5, 10]}
                  value={this.state.reminderEvery}
                  id="reminder"
                />
              </fieldset>
              <Button>Start</Button>
            </form>
          </div>
        )}
        {this.state.meditationRunning && (
          <div className="fadeIn">
            <MeditationTimer
              onCancel={this.abortMeditation}
              duration={this.state.duration * 60000}
              reminder={this.state.reminderEvery}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
