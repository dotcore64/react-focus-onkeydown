import React, { Component } from 'react';
import focusOnKeyDown from 'react-focus-onkeydown';

const EnhancedInput = focusOnKeyDown('input');

export default class extends Component {
  state = {
    focusOnKeyDown: true,
  }

  toggleFocusOnKeyDown = () => {
    this.setState({
      focusOnKeyDown: !this.state.focusOnKeyDown,
    });
  }

  render() {
    return (
      <div>
        <p>Try typing when not focused on the input below</p>
        <EnhancedInput focusOnKeyDown={this.state.focusOnKeyDown} />
        <button onClick={this.toggleFocusOnKeyDown}>Toggle Focus on key down</button>
        <div>Current status.focusOnKeyDown: {this.state.focusOnKeyDown === true ? 'true' : 'false'}</div>
      </div>
    );
  }
}
