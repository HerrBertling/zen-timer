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
    this.setState({
      ...this.state,
      duration: event.target.value
    });
  };
  changeReminder = event => {
    this.setState({
      ...this.state,
      reminderEvery: event.target.value
    });
  };
  startMeditation = event => {
    this.setState({
      ...this.state,
      meditationRunning: true
    });
    const durationInMs = this.state.duration * 60000;
    setTimeout(() => {
      this.abortMeditation();
    }, durationInMs);
  };
  abortMeditation = () => {
    this.setState({
      ...this.state,
      meditationRunning: false
    });
  };

  render() {
    return (
      <div className="app">
        {!this.state.meditationRunning && (
          <div className="fadeIn">
            <form onSubmit={this.startMeditation} className="form">
              <fieldset className="fieldset">
                <legend className="title">Zen Timer</legend>
                <span>I would like to meditate for</span>
                <Select
                  onChange={this.changeDuration}
                  times={[5, 10, 15, 20, 30, 40, 50, 60]}
                  value={this.state.duration}
                />
                <span>with a reminder bell every</span>
                <Select
                  onChange={this.changeReminder}
                  times={[2, 4, 5, 10]}
                  value={this.state.reminderEvery}
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
