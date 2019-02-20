import React, { useEffect, createRef, forwardRef } from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';
import getDisplayName from 'react-display-name';

export default (Input) => {
  const FocusOnKeyDown = ({ forwardedRef, focusOnKeyDown, ...props }) => {
    const windowKeyDown = (e) => {
      // Auto-focus the current input when a key is typed
      if (!(e.ctrlKey || e.metaKey || e.altKey)) {
        forwardedRef.current.focus();
      }
    };

    useEffect(() => {
      if (focusOnKeyDown) {
        window.addEventListener('keydown', windowKeyDown);
      } else {
        window.removeEventListener('keydown', windowKeyDown);
      }

      return () => {
        if (focusOnKeyDown) {
          window.removeEventListener('keydown', windowKeyDown);
        }
      };
    }, [focusOnKeyDown]);

    return <Input {...props} ref={forwardedRef} />;
  };

  FocusOnKeyDown.propTypes = {
    forwardedRef: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    focusOnKeyDown: PropTypes.bool,
  };

  FocusOnKeyDown.defaultProps = {
    focusOnKeyDown: true,
  };

  FocusOnKeyDown.displayName = `FocusOnKeyDown(${getDisplayName(Input)})`;

  const HoistedFocusOnKeyDown = hoistStatics(FocusOnKeyDown, Input);

  function forwardToFocusOnKeyDown(props, ref) {
    return <HoistedFocusOnKeyDown {...props} forwardedRef={ref || createRef()} />;
  }
  forwardToFocusOnKeyDown.displayName = HoistedFocusOnKeyDown.displayName;

  return forwardRef(forwardToFocusOnKeyDown);
};
