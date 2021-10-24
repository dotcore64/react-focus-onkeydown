import { useState, useRef } from 'react';
import useFocusOnKeyDown from 'react-focus-onkeydown';

export default () => {
  const [active, setActive] = useState(true);
  const ref = useRef(null);
  useFocusOnKeyDown(ref, active);

  return (
    <div>
      <p>Try typing when not focused on the input below</p>
      <input ref={ref} />
      <button type="submit" onClick={() => setActive(!active)}>Toggle Focus on key down</button>
      <div>
        Current status.focus:
        {' '}
        {active === true ? 'true' : 'false'}
      </div>
    </div>
  );
};
