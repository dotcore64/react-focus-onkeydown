import React from 'react';
import ReactDOM from 'react-dom';
import simulant from 'simulant';
import { expect } from 'chai';

import focusOnKeyDown from '../src';

describe('react-focus-onkeydown', () => {
  const EnhancedInput = focusOnKeyDown('input');

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

  it('should render single input', () => {
    const container = document.createElement('div');
    ReactDOM.render(<EnhancedInput />, container);
    expect(container.childNodes).to.have.lengthOf(1);
    expect(container.childNodes[0].tagName).to.equal('INPUT');
  });

  it('should focus on input', () => {
    const reactSpy = sinon.spy();
    const nativeSpy = sinon.spy();

    const container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(<EnhancedInput onFocus={reactSpy} />, container);

    const input = container.childNodes[0];
    input.addEventListener('focus', nativeSpy);

    window.dispatchEvent(event);

    expect(reactSpy.calledOnce).to.equal(true);
    const reactArgs = reactSpy.args[0];
    expect(reactArgs).to.have.lengthOf(2); // SyntheticUIEvent, Event (native)
    const reactArg = reactArgs[1];
    expect(reactArg).to.be.instanceOf(Event);

    expect(nativeSpy.calledOnce).to.equal(true);
    const nativeArgs = nativeSpy.args[0];
    expect(nativeArgs).to.have.lengthOf(1);
    const nativeArg = nativeArgs[0];
    expect(nativeArg.target).to.equal(input);

    expect(document.activeElement).to.equal(input);
  });

  it('should switch the focus feature on', () => {
    const spy = sinon.spy();

    const container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(<EnhancedInput focusOnKeyDown={false} onFocus={spy} />, container);

    window.dispatchEvent(event);
    expect(spy.called).to.equal(false);
    ReactDOM.render(<EnhancedInput focusOnKeyDown onFocus={spy} />, container);
    window.dispatchEvent(event);
    expect(spy.calledOnce).to.equal(true);
  });

  it('should switch the focus feature off', () => {
    const spy = sinon.spy();

    const container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(<EnhancedInput focusOnKeyDown onFocus={spy} />, container);

    window.dispatchEvent(event);
    expect(spy.calledOnce).to.equal(true);
    ReactDOM.render(<EnhancedInput focusOnKeyDown={false} onFocus={spy} />, container);
    window.dispatchEvent(event);
    expect(spy.calledOnce).to.equal(true);
  });

  it('should toggle focus off when component unmounts', () => {
    const spy = sinon.spy();

    const container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(<EnhancedInput onFocus={spy} />, container);

    window.dispatchEvent(event);
    expect(spy.calledOnce).to.equal(true);
    ReactDOM.unmountComponentAtNode(container);
    window.dispatchEvent(event);
    expect(spy.calledOnce).to.equal(true);
  });

  it('should keep focus off when component is rerendered', () => {
    const spy = sinon.spy();

    const container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(<EnhancedInput focusOnKeyDown={false}onFocus={spy} />, container);

    window.dispatchEvent(event);
    expect(spy.called).to.equal(false);
    ReactDOM.render(<EnhancedInput focusOnKeyDown={false} onFocus={spy} />, container);
    window.dispatchEvent(event);
    expect(spy.calledOnce).to.equal(false);
  });

  it('should not focus when ctrl key is used', () => {
    const spy = sinon.spy();

    const container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(<EnhancedInput focusOnKeyDown={false}onFocus={spy} />, container);

    const ctrlEvent = simulant('keydown', {
      key: 'a',
      keyCode: 65,
      which: 65,
      ctrlKey: true,
    });

    window.dispatchEvent(ctrlEvent);
    expect(spy.called).to.equal(false);
  });
});
