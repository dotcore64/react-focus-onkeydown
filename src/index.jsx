import React, { Component, createRef, forwardRef } from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';
import getDisplayName from 'react-display-name';

export default (Input) => {
  class FocusOnKeyDown extends Component {
    static propTypes = {
      forwardedRef: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
      focusOnKeyDown: PropTypes.bool,
    }

    static defaultProps = {
      focusOnKeyDown: true,
    }

    static displayName = `FocusOnKeyDown(${getDisplayName(Input)})`

    componentDidMount() {
      const { focusOnKeyDown } = this.props;
      this.syncEventListener(focusOnKeyDown);
    }

    componentDidUpdate(prevProps) {
      const { focusOnKeyDown } = this.props;

      if (focusOnKeyDown !== prevProps.focusOnKeyDown) {
        this.syncEventListener(focusOnKeyDown);
      }
    }

    componentWillUnmount() {
      this.syncEventListener(false);
    }

    syncEventListener = (focusOnKeyDown) => {
      if (focusOnKeyDown) {
        window.addEventListener('keydown', this.windowKeyDown);
      } else {
        window.removeEventListener('keydown', this.windowKeyDown);
      }
    }

    windowKeyDown = (e) => {
      // Auto-focus the current input when a key is typed
      if (!(e.ctrlKey || e.metaKey || e.altKey)) {
        this.focus();
      }
    }

    focus = () => {
      const { forwardedRef: input } = this.props;
      input.current.focus();
    }

    render() {
      const { focusOnKeyDown, forwardedRef, ...props } = this.props;

      return <Input {...props} ref={forwardedRef} />;
    }
  }

  const HoistedFocusOnKeyDown = hoistStatics(FocusOnKeyDown, Input);

  function forwardToFocusOnKeyDown(props, ref) {
    return <HoistedFocusOnKeyDown {...props} forwardedRef={ref || createRef()} />;
  }
  forwardToFocusOnKeyDown.displayName = `ForwardRef(${HoistedFocusOnKeyDown.displayName})`;

  return forwardRef(forwardToFocusOnKeyDown);
};
