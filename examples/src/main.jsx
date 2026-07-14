import { useState, useRef } from "react";
import { createRoot } from "react-dom/client";

import useFocusOnKeyDown from "react-focus-onkeydown";

const InputOnEnterDemo = () => {
  const [active, setActive] = useState(true);
  const ref = useRef(null);
  useFocusOnKeyDown(ref, active);

  return (
    <div>
      <p>Try typing when not focused on the input below</p>
      <input ref={ref} />
      <button type="submit" onClick={() => setActive(!active)}>
        Toggle Focus on key down
      </button>
      <div>Current status.focus: {active === true ? "true" : "false"}</div>
    </div>
  );
};

createRoot(document.querySelector("#demo")).render(<InputOnEnterDemo />);
