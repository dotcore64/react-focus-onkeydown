import 'core-js/es6/map';
import 'core-js/es6/set';

import React, { StrictMode, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { act } from 'react-dom/test-utils';
import sinon from 'sinon';
import { expect } from 'chai';
import 'events-polyfill'; // TODO: Not supported yet in phantomjs, remove when fixed

import useFocusOnKeyDown from '..';

const Input = ({ active, ...props }) => {
  const ref = useRef(null);
  useFocusOnKeyDown(ref, active);

  return <input ref={ref} {...props} />;
};

Input.propTypes = {
  active: PropTypes.bool,
};

Input.defaultProps = {
  active: true,
};

describe('react-focus-onkeydown', () => {
  // TODO: figure out why this is needed and send PR if necessary
  KeyboardEvent.prototype = Event.prototype;

  const event = new KeyboardEvent('keydown', {
    key: 'a',
    keyCode: 65,
    which: 65,
  });

  const render = (props = {}, container = document.createElement('div')) => {
    document.body.appendChild(container);

    act(() => {
      ReactDOM.render((
        <StrictMode>
          <Input {...props} />
        </StrictMode>
      ), container);
    });

    return container;
  };

  it('should render single input', () => {
    const container = render();
    expect(container.childNodes).to.have.lengthOf(1);
    expect(container.childNodes[0].tagName).to.equal('INPUT');
  });

  it('should focus on input', () => {
    const reactSpy = sinon.spy(e => e.persist()); // https://reactjs.org/docs/events.html#event-pooling
    const nativeSpy = sinon.spy();

    const container = render({ onFocus: reactSpy });

    const input = container.childNodes[0];
    input.addEventListener('focus', nativeSpy);

    window.dispatchEvent(event);

    expect(reactSpy.calledOnce).to.equal(true);
    const reactArgs = reactSpy.args[0];
    expect(reactArgs).to.have.lengthOf(1); // SyntheticEvent
    const reactArg = reactArgs[0];
    expect(reactArg.nativeEvent).to.be.instanceOf(KeyboardEvent);

    expect(nativeSpy.calledOnce).to.equal(true);
    const nativeArgs = nativeSpy.args[0];
    expect(nativeArgs).to.have.lengthOf(1);
    const nativeArg = nativeArgs[0];
    expect(nativeArg.target).to.equal(input);

    expect(document.activeElement).to.equal(input);
  });

  it('should switch the focus feature on', () => {
    const spy = sinon.spy();
    const container = render({ active: false, onFocus: spy });

    window.dispatchEvent(event);
    expect(spy.called).to.equal(false);
    render({ active: true, onFocus: spy }, container);
    window.dispatchEvent(event);
    expect(spy.calledOnce).to.equal(true);
  });

  it('should switch the focus feature off', () => {
    const spy = sinon.spy();

    const container = render({ active: true, onFocus: spy });

    window.dispatchEvent(event);
    expect(spy.calledOnce).to.equal(true);
    render({ active: false, onFocus: spy }, container);
    window.dispatchEvent(event);
    expect(spy.calledOnce).to.equal(true);
  });

  it('should toggle focus off when component unmounts', () => {
    const spy = sinon.spy();

    const container = render({ onFocus: spy });

    window.dispatchEvent(event);
    expect(spy.calledOnce).to.equal(true);
    ReactDOM.unmountComponentAtNode(container);
    window.dispatchEvent(event);
    expect(spy.calledOnce).to.equal(true);
  });

  it('should keep focus off when component is rerendered', () => {
    const spy = sinon.spy();

    const container = render({ active: false, onFocus: spy });

    window.dispatchEvent(event);
    expect(spy.called).to.equal(false);
    render({ active: false, onFocus: spy }, container);
    window.dispatchEvent(event);
    expect(spy.calledOnce).to.equal(false);
  });

  it('should not focus when ctrl key is used', () => {
    const spy = sinon.spy();

    render({ onFocus: spy });

    const ctrlEvent = new KeyboardEvent('keydown', {
      key: 'a',
      keyCode: 65,
      which: 65,
      ctrlKey: true,
    });

    window.dispatchEvent(ctrlEvent);
    expect(spy.called).to.equal(false);
  });
});
