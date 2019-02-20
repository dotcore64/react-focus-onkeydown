import React, { createRef, forwardRef } from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';
import getDisplayName from 'react-display-name';

import useFocusOnKeyDown from './hook';

export default (Input) => {
  const FocusOnKeyDown = ({ forwardedRef, focusOnKeyDown, ...props }) => {
    useFocusOnKeyDown(forwardedRef, focusOnKeyDown);

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
