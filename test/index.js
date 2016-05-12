import React from 'react';
import ReactDOM from 'react-dom';
import simulant from 'simulant';

import focusOnKeyDown from '../src';

chai.should();

describe('react-focus-onkeydown', () => {
  const EnhancedInput = focusOnKeyDown('input');

  it('should render single input', () => {
    const container = document.createElement('div');
    ReactDOM.render(<EnhancedInput />, container);
    container.childNodes.length.should.equal(1);
    container.childNodes[0].tagName.should.equal('INPUT');
  });

  it('should focus on input', () => {
    const reactSpy = sinon.spy();
    const nativeSpy = sinon.spy();

    const container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(<EnhancedInput onFocus={reactSpy} />, container);

    const input = container.childNodes[0];
    input.addEventListener('focus', nativeSpy);

    // TODO: Not supported yet in phantomjs, uncomment when fixed
    // const event = new KeyboardEvent('keydown', {
    //   key: 'a',
    //   keyCode: 65,
    //   which: 65,
    // });

    const event = simulant('keydown', {
      key: 'a',
      keyCode: 65,
      which: 65,
    });

    window.dispatchEvent(event);

    reactSpy.calledOnce.should.equal(true);
    const reactArgs = reactSpy.args[0];
    reactArgs.length.should.equal(3); // SyntheticUIEvent, undefined, Event (native)
    const reactArg = reactArgs[2];
    reactArg.should.be.instanceOf(Event);

    nativeSpy.calledOnce.should.equal(true);
    const nativeArgs = nativeSpy.args[0];
    nativeArgs.length.should.equal(1);
    const nativeArg = nativeArgs[0];
    nativeArg.target.should.equal(input);

    document.activeElement.should.equal(input);
  });
});
