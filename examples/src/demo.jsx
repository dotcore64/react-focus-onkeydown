import React, { PureComponent } from 'react';
import focusOnKeyDown from 'react-focus-onkeydown';

const EnhancedInput = focusOnKeyDown('input');

export default class extends PureComponent {
  state = {
    focus: true,
  }

  toggleFocusOnKeyDown = () => {
    this.setState(({ focus }) => ({ focus: !focus }));
  }

  render() {
    const { focus } = this.state;

    return (
      <div>
        <p>Try typing when not focused on the input below</p>
        <EnhancedInput focusOnKeyDown={focus} />
        <button type="submit" onClick={this.toggleFocusOnKeyDown}>Toggle Focus on key down</button>
        <div>
          Current status.focus:
          {' '}
          {focus === true ? 'true' : 'false'}
        </div>
      </div>
    );
  }
}
