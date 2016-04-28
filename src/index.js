import { PropTypes, Component, createElement } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import getDisplayName from 'react-display-name';

export default Input => {
  class FocusOnKeyDown extends Component {
    static propTypes = {
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
      this.messageInput.focus();
    }

    storeMessageInput = c => {
      this.messageInput = c;
    }

    render() {
      return createElement(Input, { ...this.props, ref: this.storeMessageInput });
    }
  }

  return hoistStatics(FocusOnKeyDown, Input);
};
