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

    componentWillReceiveProps(nextProps) {
      const { focusOnKeyDown } = this.props;

      if (focusOnKeyDown !== nextProps.focusOnKeyDown) {
        this.syncEventListener(nextProps.focusOnKeyDown);
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
  return forwardRef((props, ref) => (
    <HoistedFocusOnKeyDown {...props} forwardedRef={ref || createRef()} />
  ));
};
