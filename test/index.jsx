import { StrictMode, useRef } from 'react';
import { render as reactDomRender, unmountComponentAtNode } from 'react-dom';
import { createRoot } from 'react-dom/client';
import PropTypes from 'prop-types';
import { act } from 'react-dom/test-utils';
import sinon from 'sinon';
import { expect } from 'chai';

// https://github.com/import-js/eslint-plugin-import/issues/1649
// eslint-disable-next-line import/no-unresolved
import useFocusOnKeyDown from 'react-focus-onkeydown';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const Input = ({ active, ...props }) => {
  const ref = useRef(null);
  useFocusOnKeyDown(ref, active);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <input ref={ref} {...props} />;
};

Input.propTypes = {
  active: PropTypes.bool,
};

Input.defaultProps = {
  active: true,
};

describe('react-focus-onkeydown', () => {
  const event = new KeyboardEvent('keydown', {
    key: 'a',
    keyCode: 65,
    which: 65,
  });

  const render = (
    props = {},
    container = document.createElement('div'),
    root = createRoot ? createRoot(container) : undefined,
  ) => {
    document.body.append(container);

    // eslint-disable-next-line react/jsx-props-no-spreading
    const element = <Input {...props} />;
    if (createRoot) {
      act(() => {
        root.render(element);
      });
    } else {
      act(() => {
        reactDomRender(
          (
            <StrictMode>
              {element}
            </StrictMode>
          ), container,
        );
      });
    }

    return { container, root };
  };

  it('should render single input', () => {
    const { container } = render();
    expect(container.childNodes).to.have.lengthOf(1);
    expect(container.childNodes[0].tagName).to.equal('INPUT');
  });

  it('should focus on input', () => {
    const reactSpy = sinon.spy((e) => e.persist()); // https://reactjs.org/docs/events.html#event-pooling
    const nativeSpy = sinon.spy();

    const { container } = render({ onFocus: reactSpy });

    const input = container.childNodes[0];
    input.addEventListener('focus', nativeSpy);

    window.dispatchEvent(event);

    expect(reactSpy.calledOnce).to.equal(true);
    const reactArgs = reactSpy.args[0];
    expect(reactArgs).to.have.lengthOf(1); // SyntheticEvent
    const reactArg = reactArgs[0];
    expect(reactArg.nativeEvent).to.be.instanceOf(FocusEvent);

    expect(nativeSpy.calledOnce).to.equal(true);
    const nativeArgs = nativeSpy.args[0];
    expect(nativeArgs).to.have.lengthOf(1);
    const nativeArg = nativeArgs[0];
    expect(nativeArg.target).to.equal(input);

    expect(document.activeElement).to.equal(input);
  });

  it('should switch the focus feature on', () => {
    const spy = sinon.spy();
    const { container, root } = render({ active: false, onFocus: spy });

    window.dispatchEvent(event);
    expect(spy.called).to.equal(false);
    render({ active: true, onFocus: spy }, container, root);
    window.dispatchEvent(event);
    expect(spy.calledOnce).to.equal(true);
  });

  it('should switch the focus feature off', () => {
    const spy = sinon.spy();

    const { container, root } = render({ active: true, onFocus: spy });

    window.dispatchEvent(event);
    expect(spy.calledOnce).to.equal(true);
    render({ active: false, onFocus: spy }, container, root);
    window.dispatchEvent(event);
    expect(spy.calledOnce).to.equal(true);
  });

  it('should toggle focus off when component unmounts', () => {
    const spy = sinon.spy();

    const { container, root } = render({ onFocus: spy });

    window.dispatchEvent(event);
    expect(spy.calledOnce).to.equal(true);
    if (createRoot) {
      act(() => {
        root.unmount();
      });
    } else {
      act(() => {
        unmountComponentAtNode(container);
      });
    }
    window.dispatchEvent(event);
    expect(spy.calledOnce).to.equal(true);
  });

  it('should keep focus off when component is rerendered', () => {
    const spy = sinon.spy();

    const { container, root } = render({ active: false, onFocus: spy });

    window.dispatchEvent(event);
    expect(spy.called).to.equal(false);
    render({ active: false, onFocus: spy }, container, root);
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
