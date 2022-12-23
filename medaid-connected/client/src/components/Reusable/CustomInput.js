import React from "react";

const CustomInput = React.forwardRef((props, ref) => {
  return (
    <button onClick={props.onClick} ref={ref}>
      {props.value || props.placeholder}
    </button>
  );
});

export default CustomInput;
